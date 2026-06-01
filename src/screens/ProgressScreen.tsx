import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { chapters } from '../data/chapters';
import { getChapterStats, getGlobalProgress } from '../game/progression';
import type { PlayerState } from '../storage/playerStorage';

type ProgressScreenProps = {
  player: PlayerState;
  onBack: () => void;
};

export function ProgressScreen({ player, onBack }: ProgressScreenProps) {
  const nextLevelXp = player.heroLevel * 100;
  return (
    <section className="screen">
      <ScreenHeader title="Прогресс игрока" subtitle="XP, серии, звёзды глав и статистика ответов." onBack={onBack} />
      <GlassCard className="progress-card">
        <h2>Уровень героя: {player.heroLevel}</h2>
        <ProgressBar value={player.xp % nextLevelXp} max={nextLevelXp} tone="xp" label={`${player.xp} XP всего`} />
        <ProgressBar value={getGlobalProgress(player)} max={100} tone="chapter" label={`Весь путь: ${getGlobalProgress(player)}%`} />
      </GlassCard>
      <div className="stats-grid">
        <GlassCard><strong>{player.stats.correctAnswers}</strong><span>верных</span></GlassCard>
        <GlassCard><strong>{player.stats.wrongAnswers}</strong><span>ошибок</span></GlassCard>
        <GlassCard><strong>{player.correctStreak}</strong><span>серия</span></GlassCard>
        <GlassCard><strong>{player.bestMarathonScore}</strong><span>марафон</span></GlassCard>
      </div>
      {chapters.map((chapter) => {
        const stats = getChapterStats(player, chapter.id);
        return <GlassCard key={chapter.id}><ProgressBar value={stats.percent} max={100} tone="topic" label={`${chapter.title}: ${stats.percent}% · ${stats.stars}/30 звёзд`} /></GlassCard>;
      })}
    </section>
  );
}
