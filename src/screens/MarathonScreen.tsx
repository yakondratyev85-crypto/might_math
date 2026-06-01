import { useState } from 'react';
import { ScreenHeader } from '../components/ScreenHeader';
import { StatPill } from '../components/StatPill';
import { AnswerInput } from '../components/ui/AnswerInput';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { isAnswerCorrect } from '../game/answerValidation';
import { generateMarathonQuestion, getMarathonReward, marathonDifficulties, type MarathonDifficulty } from '../game/marathon';
import type { MathQuestion } from '../game/questionGenerators';
import { playSound } from '../game/sound';
import type { PlayerState } from '../storage/playerStorage';

type MarathonScreenProps = {
  player: PlayerState;
  onBack: () => void;
  onFinish: (score: number) => void;
};

export function MarathonScreen({ player, onBack, onFinish }: MarathonScreenProps) {
  const [difficulty, setDifficulty] = useState<MarathonDifficulty>('easy');
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [question, setQuestion] = useState<MathQuestion>(() => generateMarathonQuestion('easy'));
  const [finished, setFinished] = useState(false);

  const start = () => {
    setStarted(true);
    setFinished(false);
    setTimeLeft(60);
    setScore(0);
    setCombo(0);
    setQuestion(generateMarathonQuestion(difficulty));
    playSound('click', player.settings.sound);
  };

  const tick = () => {
    const nextTime = Math.max(0, timeLeft - 3);
    setTimeLeft(nextTime);
    if (nextTime === 0) {
      setFinished(true);
      onFinish(score);
      playSound('victory', player.settings.sound);
    }
  };

  const answer = () => {
    if (!started || finished || inputValue.trim() === '') {
      return;
    }
    if (isAnswerCorrect(inputValue, question.correctAnswer, question.answerType)) {
      setScore(score + 1);
      setCombo(combo + 1);
      playSound('correct', player.settings.sound);
    } else {
      setCombo(0);
      playSound('wrong', player.settings.sound);
    }
    setInputValue('');
    setQuestion(generateMarathonQuestion(difficulty));
    tick();
  };

  const reward = getMarathonReward(score);

  return (
    <section className="screen marathon-screen">
      <ScreenHeader title="Марафон" subtitle="60 секунд быстрого счёта. В MVP таймер двигается на каждом ответе, чтобы режим был стабильным без сервера." onBack={onBack} />
      <div className="top-hud">
        <StatPill icon="ui_timer" label="Таймер" value={`${timeLeft}с`} />
        <StatPill icon="ui_star" label="Счёт" value={score} />
        <StatPill icon="ui_attack" label="Комбо" value={combo} />
        <StatPill icon="ui_xp" label="Рекорд" value={player.bestMarathonScore} />
      </div>
      {!started && (
        <div className="sublevel-grid">
          {marathonDifficulties.map((item) => (
            <GlassCard asButton className={`sublevel-card ${difficulty === item.id ? 'is-selected' : ''}`} key={item.id} onClick={() => setDifficulty(item.id)}>
              <IconBadge icon="ui_marathon" size="lg" />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </GlassCard>
          ))}
          <PrimaryButton onClick={start}>Старт 60 секунд</PrimaryButton>
        </div>
      )}
      {started && !finished && (
        <GlassCard className="question-card">
          <p className="visual-hint">{question.visualHint}</p>
          <h2>{question.prompt}</h2>
          <AnswerInput value={inputValue} answerType={question.answerType} onChange={setInputValue} onSubmit={answer} />
          <PrimaryButton icon="ui_attack" onClick={answer}>Ответить</PrimaryButton>
        </GlassCard>
      )}
      {finished && (
        <GlassCard className="reward-card" tone="gold">
          <IconBadge icon="ui_chest" size="xl" />
          <h2>Результат: {score}</h2>
          <p>Награда: {reward.coins} монет и {reward.xp} XP</p>
          <p>{score > player.bestMarathonScore ? 'Новый рекорд!' : 'Попробуй побить рекорд!'}</p>
          <PrimaryButton onClick={start}>Еще раз</PrimaryButton>
        </GlassCard>
      )}
    </section>
  );
}
