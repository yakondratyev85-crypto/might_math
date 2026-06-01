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
        {sublevels.map((sublevel) => {
          const done = player.completedSublevels.includes(makeProgressKey(topic.id, sublevel.id));
          return (
            <GlassCard className="sublevel-card" key={sublevel.id} tone={done ? 'success' : 'default'}>
              <IconBadge icon={done ? 'ui_star' : 'ui_attack'} size="lg" />
              <h2>{sublevel.title}</h2>
              <p>{sublevel.description}</p>
              <div className="meta-grid">
                <span>10 заданий</span>
                <span>Сложность +{sublevel.difficultyBonus}</span>
                <span>Награда ×{sublevel.rewardMultiplier}</span>
              </div>
              <PrimaryButton onClick={() => onStart(sublevel)}>{done ? 'Повторить' : 'Начать'}</PrimaryButton>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
