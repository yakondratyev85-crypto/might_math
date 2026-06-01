import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { items, type Item } from '../data/items';
import type { PlayerState } from '../storage/playerStorage';

type ShopScreenProps = {
  player: PlayerState;
  onBack: () => void;
  onBuy: (item: Item) => void;
  onEquip: (item: Item) => void;
};

const rarityLabel = { common: 'обычный', rare: 'редкий', epic: 'эпический', legendary: 'легендарный' };

export function ShopScreen({ player, onBack, onBuy, onEquip }: ShopScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title="Магазин" subtitle={`Монеты: ${player.coins}. Карточки предметов имеют рамку редкости.`} onBack={onBack} />
      <div className="shop-list">
        {items.map((item) => {
          const purchased = player.purchasedItems.includes(item.id);
          const equipped = player.equippedItems[item.slot] === item.id;
          return (
            <GlassCard className={`shop-card rarity-${item.rarity}`} key={item.id}>
              <IconBadge icon={item.icon} size="lg" />
              <div>
                <h3>{item.name}</h3>
                <p>{rarityLabel[item.rarity]} · бонус +{item.bonus}</p>
              </div>
              {purchased ? (
                <PrimaryButton variant="ghost" onClick={() => onEquip(item)} disabled={equipped}>{equipped ? 'Надето' : 'Надеть'}</PrimaryButton>
              ) : (
                <PrimaryButton icon="ui_coin" onClick={() => onBuy(item)} disabled={player.coins < item.price}>{item.price}</PrimaryButton>
              )}
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
