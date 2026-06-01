import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import type { PlayerState } from '../storage/playerStorage';

type ProgressScreenProps = {
  player: PlayerState;
  onBack: () => void;
};

export function ProgressScreen({ player, onBack }: ProgressScreenProps) {
  const nextLevelXp = player.heroLevel * 100;
  return (
    <section className="screen">
      <ScreenHeader title="Прогресс игрока" subtitle="Смотри рост героя и статистику ответов." onBack={onBack} />
      <div className="progress-card">
        <h2>Уровень героя: {player.heroLevel}</h2>
        <ProgressBar value={player.xp % nextLevelXp} max={nextLevelXp} tone="xp" />
        <p>{player.xp} XP всего</p>
      </div>
      <div className="stats-grid">
        <article><strong>{player.stats.correctAnswers}</strong><span>верных</span></article>
        <article><strong>{player.stats.wrongAnswers}</strong><span>ошибок</span></article>
        <article><strong>{player.stats.wins}</strong><span>побед</span></article>
        <article><strong>{player.stats.battles}</strong><span>боев</span></article>
      </div>
    </section>
  );
}
