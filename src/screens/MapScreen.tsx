import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { chapters, type Chapter } from '../data/chapters';
import { getChapterStats, isChapterUnlocked } from '../game/progression';
import type { PlayerState } from '../storage/playerStorage';

type MapScreenProps = {
  player: PlayerState;
  onBack: () => void;
  onPickChapter: (chapter: Chapter) => void;
};

export function MapScreen({ player, onBack, onPickChapter }: MapScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title="Карта глав" subtitle="10 больших глав, 100 тем и 3000 мини-заданий без ручного списка." onBack={onBack} />
      <div className="chapter-road">
        {chapters.map((chapter) => {
          const stats = getChapterStats(player, chapter.id);
          const unlocked = isChapterUnlocked(player, chapter.id);
          return (
            <GlassCard asButton disabled={!unlocked} className={`chapter-card ${!unlocked ? 'is-locked' : ''}`} key={chapter.id} onClick={() => onPickChapter(chapter)}>
              <IconBadge icon={unlocked ? chapter.icon : 'ui_lock'} size="lg" muted={!unlocked} />
              <div className="chapter-card__body">
                <span className="eyebrow">Глава {chapter.order} · возраст {chapter.ageRange}</span>
                <h2>{chapter.title}</h2>
                <p>{chapter.description}</p>
                <ProgressBar value={stats.percent} max={100} tone="chapter" label={`${stats.percent}% · тем пройдено ${stats.completedTopics}/10`} />
              </div>
              <div className="stars-row" aria-label="Звезды">{stats.stars}/30 ★</div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
