import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { enemies } from '../data/enemies';
import { heroes } from '../data/heroes';
import { items } from '../data/items';
import type { IconId } from '../data/iconRegistry';
import type { PlayerState } from '../storage/playerStorage';

type CollectionScreenProps = {
  player: PlayerState;
  onBack: () => void;
};

type Card = { id: string; name: string; icon: IconId; opened: boolean; type: string };

export function CollectionScreen({ player, onBack }: CollectionScreenProps) {
  const cards: Card[] = [
    ...heroes.map((hero) => ({ id: hero.id, name: hero.name, icon: hero.icon, opened: player.collection.heroes.includes(hero.id), type: 'Герой' })),
    ...enemies.map((enemy) => ({ id: enemy.id, name: enemy.name, icon: enemy.icon, opened: player.collection.enemies.includes(enemy.id), type: 'Враг' })),
    ...items.map((item) => ({ id: item.id, name: item.name, icon: item.icon, opened: player.collection.items.includes(item.id), type: 'Предмет' })),
  ];

  return (
    <section className="screen">
      <ScreenHeader title="Коллекция" subtitle="Открытые иконки яркие, закрытые затемнены. Все иконки идут через iconRegistry." onBack={onBack} />
      <div className="collection-grid">
        {cards.map((card) => (
          <GlassCard className={`collection-card ${card.opened ? '' : 'is-locked'}`} key={`${card.type}-${card.id}`}>
            <IconBadge icon={card.opened ? card.icon : 'ui_lock'} size="md" muted={!card.opened} />
            <strong>{card.opened ? card.name : '???'}</strong>
            <span>{card.type}</span>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="achievement-card">
        <h3>Достижения</h3>
        {player.collection.achievements.map((achievement) => <span key={achievement}>{achievement}</span>)}
      </GlassCard>
    </section>
  );
}
