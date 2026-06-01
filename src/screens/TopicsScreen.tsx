import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { getEnemy } from '../data/enemies';
import type { Chapter } from '../data/chapters';
import { getTopicsByChapter, type Topic } from '../data/topics';
import { getChapterStats, getTopicStars } from '../game/progression';
import type { PlayerState } from '../storage/playerStorage';

type TopicsScreenProps = {
  player: PlayerState;
  chapter: Chapter;
  onBack: () => void;
  onPickTopic: (topic: Topic) => void;
};

export function TopicsScreen({ player, chapter, onBack, onPickTopic }: TopicsScreenProps) {
  const stats = getChapterStats(player, chapter.id);
  return (
    <section className="screen">
      <ScreenHeader title={chapter.title} subtitle="Выбери одну из 10 тем главы. В каждой теме 3 подуровня по 10 заданий." onBack={onBack} />
      <GlassCard>
        <ProgressBar value={stats.percent} max={100} tone="chapter" label={`Прогресс главы ${stats.percent}%`} />
      </GlassCard>
      <div className="topic-list">
        {getTopicsByChapter(chapter.id).map((topic, index) => {
          const enemy = getEnemy(topic.enemyId);
          const stars = getTopicStars(player, topic.id);
          return (
            <GlassCard asButton className="topic-card" key={topic.id} onClick={() => onPickTopic(topic)}>
              <span className="topic-number">{index + 1}</span>
              <IconBadge icon={enemy.icon} size="md" />
              <div>
                <h3>{topic.title}</h3>
                <p>{topic.mathSkill} · {topic.answerMode === 'choice' ? 'выбор ответа' : 'ручной ввод'} · награда {topic.reward.coins} монет</p>
                <span className="stars-row">{'★'.repeat(stars)}{'☆'.repeat(3 - stars)}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
