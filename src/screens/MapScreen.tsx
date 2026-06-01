import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
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
    <section className="screen chapters-screen">
      <ScreenHeader title="Карта глав" subtitle="10 fantasy-глав. В каждой — 10 тем, 3 подуровня и 10 мини-заданий." onBack={onBack} />
      <div className="location-list chapter-list">
        {chapters.map((chapter) => {
          const unlocked = isChapterUnlocked(player, chapter.id);
          const stats = getChapterStats(player, chapter.id);
          return (
            <button
              className={`map-card chapter-card ${unlocked ? '' : 'map-card--locked'}`}
              type="button"
              key={chapter.id}
              onClick={() => unlocked && onPickChapter(chapter)}
              disabled={!unlocked}
              style={{ '--chapter-a': chapter.colorA, '--chapter-b': chapter.colorB } as any}
            >
              <IconBadge icon={chapter.icon} label={chapter.title} />
              <div>
                <h3>Глава {chapter.order}: {chapter.title}</h3>
                <p>{unlocked ? `${stats.completedTopics}/10 тем · ${stats.completedSublevels}/30 подуровней` : `Откроется после прогресса героя`}</p>
                <small>{chapter.description}</small>
              </div>
              <span className="map-status">{unlocked ? `${stats.percent}%` : '🔒'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
