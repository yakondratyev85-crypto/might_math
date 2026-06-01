import { useMemo, useState } from 'react';
import { IconBadge } from '../components/IconBadge';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { enemies } from '../data/enemies';
import type { Enemy } from '../data/enemies';
import type { Location } from '../data/locations';
import type { MathMode } from '../data/mathModes';
import { heroDamage, heroMaxHp, monsterDamage, monsterMaxHp } from '../game/battle';
import { createQuestion } from '../game/mathEngine';
import type { PlayerState } from '../storage/playerStorage';

type BattleScreenProps = {
  player: PlayerState;
  location: Location;
  mode: MathMode;
  onBack: () => void;
  onVictory: (enemy: Enemy, correct: number, wrong: number) => void;
  onDefeat: (correct: number, wrong: number) => void;
};

export function BattleScreen({ player, location, mode, onBack, onVictory, onDefeat }: BattleScreenProps) {
  const enemy = useMemo(() => {
    const locationEnemies = enemies.filter((item) => location.enemyIds.includes(item.id));
    return mode.id === 'boss' ? enemies.find((item) => item.id === 'super-boss') ?? locationEnemies[0] : locationEnemies[0];
  }, [location.enemyIds, mode.id]);
  const maxHeroHp = heroMaxHp(player);
  const maxMonsterHp = monsterMaxHp(enemy, mode);
  const [heroHp, setHeroHp] = useState(maxHeroHp);
  const [monsterHp, setMonsterHp] = useState(maxMonsterHp);
  const [question, setQuestion] = useState(() => createQuestion(mode.id));
  const [round, setRound] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [message, setMessage] = useState('Выбери правильный ответ!');

  const answer = (option: number | string) => {
    const isCorrect = option === question.answer;

    if (isCorrect) {
      const nextMonsterHp = Math.max(0, monsterHp - heroDamage(player, mode));
      const nextCorrect = correct + 1;
      setMonsterHp(nextMonsterHp);
      setCorrect(nextCorrect);
      setMessage(`Верно! ${mode.action} наносит урон.`);

      if (nextMonsterHp <= 0 || (mode.id === 'boss' && round >= mode.rounds)) {
        window.setTimeout(() => onVictory(enemy, nextCorrect, wrong), 450);
        return;
      }
    } else {
      const nextHeroHp = Math.max(0, heroHp - monsterDamage(enemy, mode));
      const nextWrong = wrong + 1;
      setHeroHp(nextHeroHp);
      setWrong(nextWrong);
      setMessage(`Почти! Правильный ответ: ${question.answer}. Монстр атакует.`);

      if (nextHeroHp <= 0) {
        window.setTimeout(() => onDefeat(correct, nextWrong), 450);
        return;
      }
    }

    if (mode.id === 'boss') {
      setRound((value) => Math.min(mode.rounds, value + 1));
    }
    setQuestion(createQuestion(mode.id));
  };

  return (
    <section className="screen battle-screen">
      <ScreenHeader title="Бой с монстром" subtitle={`${location.name} · ${mode.name}`} onBack={onBack} />

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
        <span className="round-pill">Раунд {round}/{mode.rounds}</span>
        <p>{message}</p>
        <h2>{question.prompt}</h2>
        <div className="answers-grid">
          {question.options.map((option) => (
            <button className="answer-button" type="button" key={option.toString()} onClick={() => answer(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
