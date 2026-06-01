import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
import { items } from '../data/items';
import type { Item } from '../data/items';
import type { PlayerState } from '../storage/playerStorage';

type ShopScreenProps = {
  player: PlayerState;
  onBack: () => void;
  onBuy: (item: Item) => void;
  onEquip: (item: Item) => void;
};

export function ShopScreen({ player, onBack, onBuy, onEquip }: ShopScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title="Магазин" subtitle={`Монеты: ${player.coins}. Покупай яркое снаряжение для рыцаря.`} onBack={onBack} />
      <div className="shop-list">
        {items.map((item) => {
          const purchased = player.purchasedItems.includes(item.id);
          const equipped = player.equippedItems[item.slot] === item.id;
          return (
            <article className="shop-card" key={item.id}>
              <IconBadge icon={item.icon} label={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Бонус силы +{item.bonus}</p>
              </div>
              {purchased ? (
                <button className="small-button" type="button" onClick={() => onEquip(item)} disabled={equipped}>
                  {equipped ? 'Надето' : 'Надеть'}
                </button>
              ) : (
                <button className="small-button" type="button" onClick={() => onBuy(item)} disabled={player.coins < item.price}>
                  {item.price} 🪙
                </button>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
