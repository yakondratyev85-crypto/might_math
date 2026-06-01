import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import type { PlayerState } from '../storage/playerStorage';

type ChestsScreenProps = {
  player: PlayerState;
  onBack: () => void;
  onOpenChest: () => void;
};

export function ChestsScreen({ player, onBack, onOpenChest }: ChestsScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title="Сундуки" subtitle="За испытания и серии побед можно получить сундуки с монетами." onBack={onBack} />
      <GlassCard className="reward-card" tone="gold">
        <IconBadge icon="ui_chest" size="xl" />
        <h2>Доступно сундуков: {player.chests}</h2>
        <p>Открой сундук и получи 25 монет.</p>
        <PrimaryButton icon="ui_chest" onClick={onOpenChest} disabled={player.chests <= 0}>Открыть сундук</PrimaryButton>
      </GlassCard>
    </section>
  );
}
