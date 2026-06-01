import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
import type { PlayerState } from '../storage/playerStorage';

type ChestsScreenProps = {
  player: PlayerState;
  onBack: () => void;
  onOpenChest: () => void;
};

export function ChestsScreen({ player, onBack, onOpenChest }: ChestsScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title="Сундуки" subtitle="За победы можно получить сундуки с монетами." onBack={onBack} />
      <div className="reward-card">
        <IconBadge icon="chest" label="Сундук" size="lg" />
        <h2>Доступно сундуков: {player.chests}</h2>
        <p>Открой сундук и получи 25 монет.</p>
        <button className="big-button" type="button" onClick={onOpenChest} disabled={player.chests <= 0}>
          Открыть сундук
        </button>
      </div>
    </section>
  );
}
