import { useMemo, useState } from 'react';
import { ScreenHeader } from '../components/ScreenHeader';
import { StatPill } from '../components/StatPill';
import { AnswerInput } from '../components/ui/AnswerInput';
import { ChoiceGrid } from '../components/ui/ChoiceGrid';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { ProgressBar } from '../components/ui/ProgressBar';
import type { Chapter } from '../data/chapters';
import { getEnemy } from '../data/enemies';
import type { Sublevel } from '../data/sublevels';
import type { Topic } from '../data/topics';
import { heroDamage, heroMaxHp, monsterDamage } from '../game/battle';
import { isAnswerCorrect } from '../game/answerValidation';
import { generateQuestion, type MathQuestion } from '../game/questionGenerators';
import { playSound } from '../game/sound';
import type { PlayerState } from '../storage/playerStorage';

type BattleScreenProps = {
  player: PlayerState;
  chapter: Chapter;
  topic: Topic;
  sublevel: Sublevel;
  onBack: () => void;
  onComplete: (result: { won: boolean; correct: number; wrong: number; coins: number; xp: number; enemyId: string; sublevelId: string; topicId: string }) => void;
};

export function BattleScreen({ player, chapter, topic, sublevel, onBack, onComplete }: BattleScreenProps) {
  const enemy = getEnemy(topic.enemyId);
  const maxHeroHp = heroMaxHp(player);
  const maxMonsterHp = Math.max(45, enemy.hp + topic.difficulty * 6 + sublevel.difficultyBonus * 10);
  const [taskIndex, setTaskIndex] = useState(1);
  const [heroHp, setHeroHp] = useState(maxHeroHp);
  const [monsterHp, setMonsterHp] = useState(maxMonsterHp);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [combo, setCombo] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [message, setMessage] = useState('Ответь на задание, чтобы герой атаковал.');
  const [locked, setLocked] = useState(false);
  const activeAnswerMode = chapter.id === 'green_meadow' ? 'choice' : 'input';
  const [question, setQuestion] = useState<MathQuestion>(() => generateQuestion({ topic, sublevel, taskIndex: 1, answerMode: activeAnswerMode }));

  const reward = useMemo(() => ({
    coins: Math.round(topic.reward.coins * sublevel.rewardMultiplier),
    xp: Math.round(topic.reward.xp * sublevel.rewardMultiplier),
  }), [sublevel.rewardMultiplier, topic.reward.coins, topic.reward.xp]);

  const finish = (won: boolean, nextCorrect: number, nextWrong: number) => {
    playSound(won ? 'victory' : 'damage', player.settings.sound);
    onComplete({ won, correct: nextCorrect, wrong: nextWrong, coins: won ? reward.coins : 3, xp: won ? reward.xp : 5, enemyId: enemy.id, sublevelId: sublevel.id, topicId: topic.id });
  };

  const goNext = () => {
    if (taskIndex >= sublevel.miniTasks) {
      finish(heroHp > 0, correct, wrong);
      return;
    }
    const nextIndex = taskIndex + 1;
    setTaskIndex(nextIndex);
    setQuestion(generateQuestion({ topic, sublevel, taskIndex: nextIndex, answerMode: activeAnswerMode }));
    setInputValue('');
    setShowHint(false);
    setStatus('idle');
    setMessage('Следующее задание готово.');
    setLocked(false);
  };

  const submitAnswer = (value: string | number) => {
    if (locked || String(value).trim() === '') {
      return;
    }
    const ok = isAnswerCorrect(value, question.correctAnswer, question.answerType);
    if (ok) {
      const nextCorrect = correct + 1;
      const damage = heroDamage(player, { difficulty: topic.difficulty, id: 'add10', name: topic.title, action: question.rpgAction, rounds: 1 });
      const nextMonsterHp = Math.max(0, monsterHp - damage);
      setCorrect(nextCorrect);
      setCombo(combo + 1);
      setMonsterHp(nextMonsterHp);
      setStatus('correct');
      setMessage(`Верно! ${question.rpgAction}. ${question.explanation}`);
      playSound('correct', player.settings.sound);
      playSound('attack', player.settings.sound);
      if (nextMonsterHp <= 0 && sublevel.id !== 'training') {
        finish(true, nextCorrect, wrong);
        return;
      }
    } else {
      const nextWrong = wrong + 1;
      const damage = monsterDamage(enemy, { difficulty: topic.difficulty, id: 'subtract', name: topic.title, action: 'атака', rounds: 1 });
      const nextHeroHp = Math.max(0, heroHp - damage);
      setWrong(nextWrong);
      setCombo(0);
      setHeroHp(nextHeroHp);
      setStatus('wrong');
      setMessage(`Почти! Правильный ответ: ${question.correctAnswer}. ${question.explanation}`);
      playSound('wrong', player.settings.sound);
      playSound('damage', player.settings.sound);
      if (nextHeroHp <= 0) {
        finish(false, correct, nextWrong);
        return;
      }
    }
    setInputValue('');
    setLocked(true);
  };

  return (
    <section className="screen battle-screen">
      <ScreenHeader title="RPG-бой" subtitle={`${chapter.title} · ${topic.title} · ${sublevel.title}`} onBack={onBack} />
      <div className="top-hud">
        <StatPill icon="ui_coin" label="Монеты" value={player.coins} />
        <StatPill icon="ui_xp" label="XP" value={player.xp} />
        <StatPill icon="ui_heart" label="HP" value={player.hearts} />
        <StatPill icon="ui_star" label="Комбо" value={combo} />
      </div>
      <GlassCard className="battle-arena" tone="strong">
        <div className="fighter">
          <IconBadge icon="hero_knight" size="xl" />
          <strong>{player.avatar.name}</strong>
          <ProgressBar value={heroHp} max={maxHeroHp} tone="hp" label={`${heroHp}/${maxHeroHp} HP`} />
        </div>
        <div className="versus">VS</div>
        <div className="fighter">
          <IconBadge icon={enemy.icon} size="xl" />
          <strong>{enemy.name}</strong>
          <ProgressBar value={monsterHp} max={maxMonsterHp} tone="monster" label={`${monsterHp}/${maxMonsterHp} HP`} />
        </div>
      </GlassCard>
      <GlassCard className={`question-card question-card--${status}`}>
        <div className="question-meta">
          <span>Задание {taskIndex}/{sublevel.miniTasks}</span>
          <span>{activeAnswerMode === 'choice' ? 'Выбор ответа' : 'Ручной ввод'}</span>
        </div>
        <p className="visual-hint">{question.visualHint}</p>
        <h2>{question.prompt}</h2>
        {activeAnswerMode === 'choice' ? (
          <ChoiceGrid options={question.options ?? []} disabled={locked} onChoose={submitAnswer} />
        ) : (
          <div className="manual-answer-zone">
            <AnswerInput value={inputValue} answerType={question.answerType} disabled={locked} onChange={setInputValue} onSubmit={() => submitAnswer(inputValue)} />
            <PrimaryButton icon="ui_attack" disabled={locked} onClick={() => submitAnswer(inputValue)}>Ответить</PrimaryButton>
          </div>
        )}
        <div className="battle-actions">
          <PrimaryButton icon="ui_hint" variant="ghost" onClick={() => setShowHint(!showHint)}>Подсказка</PrimaryButton>
          {locked && <PrimaryButton onClick={goNext}>{taskIndex >= sublevel.miniTasks ? 'Завершить' : 'Дальше'}</PrimaryButton>}
        </div>
        {showHint && <p className="hint-box">Магическая подсказка: {question.visualHint}</p>}
        <p className="battle-message">{message}</p>
      </GlassCard>
    </section>
  );
}
