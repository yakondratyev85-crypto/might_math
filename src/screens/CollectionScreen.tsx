import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
import { enemies } from '../data/enemies';
import { heroes } from '../data/heroes';
import { items } from '../data/items';
import type { PlayerState } from '../storage/playerStorage';

type CollectionScreenProps = {
  player: PlayerState;
  onBack: () => void;
};

export function CollectionScreen({ player, onBack }: CollectionScreenProps) {
  const cards = [
    ...heroes.map((hero) => ({ id: hero.id, name: hero.name, icon: hero.icon, opened: player.collection.heroes.includes(hero.id), type: 'Герой' })),
    ...enemies.map((enemy) => ({ id: enemy.id, name: enemy.name, icon: enemy.icon, opened: player.collection.enemies.includes(enemy.id), type: 'Враг' })),
    ...items.map((item) => ({ id: item.id, name: item.name, icon: item.icon, opened: player.collection.items.includes(item.id), type: 'Предмет' })),
  ];

  return (
    <section className="screen">
      <ScreenHeader title="Коллекция" subtitle="Герои, враги, предметы, сундуки и достижения." onBack={onBack} />
      <div className="collection-grid">
        {cards.map((card) => (
          <article className={`collection-card ${card.opened ? '' : 'collection-card--locked'}`} key={`${card.type}-${card.id}`}>
            <IconBadge icon={card.opened ? card.icon : 'spark'} label={card.name} />
            <strong>{card.opened ? card.name : '???'}</strong>
            <span>{card.type}</span>
          </article>
        ))}
      </div>
      <div className="achievement-card">
        <h3>Достижения</h3>
        {player.collection.achievements.map((achievement) => <span key={achievement}>🏅 {achievement}</span>)}
      </div>
    </section>
  );
}
