import { useMemo, useState } from 'react';
import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
import { ProgressBar } from '../components/ProgressBar';
import { AnswerInput } from '../components/ui/AnswerInput';
import { ChoiceGrid } from '../components/ui/ChoiceGrid';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import type { Chapter } from '../data/chapters';
import { getEnemy, type Enemy } from '../data/enemies';
import type { Sublevel } from '../data/sublevels';
import type { Topic } from '../data/topics';
import { isAnswerCorrect } from '../game/answerValidation';
import { generateQuestion, type MathQuestion } from '../game/questionGenerators';
import { playSound } from '../game/sound';
import type { PlayerState } from '../storage/playerStorage';

type BattleScreenProps = {
  player: PlayerState;
  chapter: Chapter;
  topic: Topic;
  sublevel: Sublevel;
  chapterId: string;
  topicId: string;
  sublevelId: string;
  taskIndex: number;
  onBack: () => void;
  onVictory: (enemy: Enemy, correct: number, wrong: number) => void;
  onDefeat: (correct: number, wrong: number) => void;
};

const heroMaxHp = (player: PlayerState, sublevel: Sublevel) => 72 + player.heroLevel * 8 + player.hearts * 2 - sublevel.difficultyBonus * 4;
const monsterMaxHp = (enemy: Enemy, topic: Topic, sublevel: Sublevel) => enemy.hp + topic.difficulty * 3 + sublevel.difficultyBonus * 12;
const heroDamage = (player: PlayerState, sublevel: Sublevel) => 12 + player.heroLevel * 2 + sublevel.difficultyBonus * 3;
const monsterDamage = (enemy: Enemy, sublevel: Sublevel) => 6 + Math.floor(enemy.hp / 14) + sublevel.difficultyBonus * 2;

const createTopicQuestion = (topic: Topic, sublevel: Sublevel, taskIndex: number): MathQuestion =>
  generateQuestion({ topic, sublevel, taskIndex, answerMode: topic.answerMode });

export function BattleScreen({
  player,
  chapter,
  topic,
  sublevel,
  chapterId,
  topicId,
  sublevelId,
  taskIndex,
  onBack,
  onVictory,
  onDefeat,
}: BattleScreenProps) {
  const enemy = useMemo(() => getEnemy(topic.enemyId), [topic.enemyId]);
  const maxHeroHp = heroMaxHp(player, sublevel);
  const maxMonsterHp = monsterMaxHp(enemy, topic, sublevel);
  const [heroHp, setHeroHp] = useState(maxHeroHp);
  const [monsterHp, setMonsterHp] = useState(maxMonsterHp);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(taskIndex);
  const [question, setQuestion] = useState(() => createTopicQuestion(topic, sublevel, taskIndex));
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState(`Задание ${taskIndex + 1}/10. ${topic.answerMode === 'choice' ? 'Выбери ответ.' : 'Введи ответ вручную.'}`);

  const finishVictory = (nextCorrect: number, nextWrong: number) => {
    setLocked(true);
    playSound('victory', player.settings.sound);
    window.setTimeout(() => onVictory(enemy, nextCorrect, nextWrong), 450);
  };

  const submitAnswer = (value: string | number) => {
    if (locked || String(value).trim() === '') {
      return;
    }

    playSound('click', player.settings.sound);
    const answerIsCorrect = isAnswerCorrect(value, question.correctAnswer, question.answerType);
    let nextCorrect = correct;
    let nextWrong = wrong;

    if (answerIsCorrect) {
      nextCorrect += 1;
      const nextMonsterHp = Math.max(0, monsterHp - heroDamage(player, sublevel));
      setCorrect(nextCorrect);
      setMonsterHp(nextMonsterHp);
      setMessage(`Верно! ${question.rpgAction}: герой атакует.`);
      playSound('correct', player.settings.sound);
      playSound('attack', player.settings.sound);
    } else {
      nextWrong += 1;
      const nextHeroHp = Math.max(0, heroHp - monsterDamage(enemy, sublevel));
      setWrong(nextWrong);
      setHeroHp(nextHeroHp);
      setMessage(`Неверно. Правильный ответ: ${question.correctAnswer}. Монстр наносит урон.`);
      playSound('wrong', player.settings.sound);
      playSound('damage', player.settings.sound);
      if (nextHeroHp <= 0) {
        setLocked(true);
        window.setTimeout(() => onDefeat(nextCorrect, nextWrong), 450);
        return;
      }
    }

    const nextTaskIndex = currentTaskIndex + 1;
    setInputValue('');
    if (nextTaskIndex >= sublevel.miniTasks) {
      finishVictory(nextCorrect, nextWrong);
      return;
    }

    setCurrentTaskIndex(nextTaskIndex);
    setQuestion(createTopicQuestion(topic, sublevel, nextTaskIndex));
  };

  const isChoiceMode = topic.answerMode === 'choice';
  const options = question.options?.slice(0, 4) ?? [];

  return (
    <section className="screen battle-screen">
      <ScreenHeader
        title="Бой с монстром"
        subtitle={`home → chapters → topics → sublevel → battle · ${chapter.title} / ${topic.title} / ${sublevel.title}`}
        onBack={onBack}
      />

      <div className="battle-meta">
        <span>chapterId: {chapterId}</span>
        <span>topicId: {topicId}</span>
        <span>sublevelId: {sublevelId}</span>
        <span>taskIndex: {currentTaskIndex}</span>
      </div>

      <div className="battle-arena">
        <div className="fighter fighter--hero">
          <IconBadge icon="knight" label="Герой" size="lg" />
          <strong>Герой</strong>
          <ProgressBar value={heroHp} max={maxHeroHp} tone="hero" />
          <span>{heroHp}/{maxHeroHp} HP</span>
        </div>
        <div className="versus">VS</div>
        <div className="fighter fighter--monster">
          <IconBadge icon={enemy.icon} label={enemy.name} size="lg" />
          <strong>{enemy.name}</strong>
          <ProgressBar value={monsterHp} max={maxMonsterHp} tone="monster" />
          <span>{monsterHp}/{maxMonsterHp} HP</span>
        </div>
      </div>

      <div className="question-card">
        <span className="round-pill">Мини-задание {currentTaskIndex + 1}/{sublevel.miniTasks}</span>
        <p>{message}</p>
        {question.visualHint && <p className="visual-hint">{question.visualHint}</p>}
        <h2>{question.prompt}</h2>
        {isChoiceMode ? (
          <ChoiceGrid options={options} disabled={locked} onChoose={submitAnswer} />
        ) : (
          <div className="input-answer-panel">
            <AnswerInput value={inputValue} answerType={question.answerType} disabled={locked} onChange={setInputValue} onSubmit={() => submitAnswer(inputValue)} />
            <PrimaryButton icon="ui_attack" disabled={locked || inputValue.trim() === ''} onClick={() => submitAnswer(inputValue)}>Ответить</PrimaryButton>
          </div>
        )}
      </div>
    </section>
  );
}
