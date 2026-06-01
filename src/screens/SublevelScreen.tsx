import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import type { Chapter } from '../data/chapters';
import { sublevels, type Sublevel } from '../data/sublevels';
import type { Topic } from '../data/topics';
import { makeProgressKey } from '../game/progression';
import type { PlayerState } from '../storage/playerStorage';

type SublevelScreenProps = {
  player: PlayerState;
  chapter: Chapter;
  topic: Topic;
  onBack: () => void;
  onStart: (sublevel: Sublevel) => void;
};

export function SublevelScreen({ player, chapter, topic, onBack, onStart }: SublevelScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title={topic.title} subtitle={`${chapter.title}: выбери подуровень. Каждый содержит 10 мини-заданий.`} onBack={onBack} />
      <div className="sublevel-grid">
        {sublevels.map((sublevel, index) => {
          const progressKey = makeProgressKey(topic.id, sublevel.id);
          const done = player.completedSublevels.includes(progressKey);
          const previous = index === 0 ? undefined : sublevels[index - 1];
          const unlocked = !previous || player.completedSublevels.includes(makeProgressKey(topic.id, previous.id));
          const result = player.sublevelResults[progressKey];
          return (
            <GlassCard className={`sublevel-card ${!unlocked ? 'is-locked' : ''}`} key={sublevel.id} tone={done ? 'success' : 'default'}>
              <IconBadge icon={done ? 'ui_star' : unlocked ? 'ui_attack' : 'ui_lock'} size="lg" muted={!unlocked} />
              <h2>{sublevel.title}</h2>
              <p>{sublevel.description}</p>
              <div className="meta-grid">
                <span>10 заданий</span>
                <span>Сложность +{sublevel.difficultyBonus}</span>
                <span>Звёзды: {result?.stars ?? 0}/1</span>
                <span>Верно: {result?.correct ?? 0}/10</span>
              </div>
              <PrimaryButton disabled={!unlocked} onClick={() => onStart(sublevel)}>{done ? 'Повторить' : unlocked ? 'Начать' : 'Закрыто'}</PrimaryButton>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
