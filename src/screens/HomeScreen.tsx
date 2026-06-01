import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { StatPill } from '../components/StatPill';
import { getAvatarIcon } from '../game/avatar';
import { getGlobalProgress } from '../game/progression';
import type { PlayerState } from '../storage/playerStorage';
import type { Screen } from '../App';

type HomeScreenProps = {
  player: PlayerState;
  navigate: (screen: Screen) => void;
};

export function HomeScreen({ player, navigate }: HomeScreenProps) {
  return (
    <section className="screen home-screen">
      <ScreenHeader title="Math Knight" subtitle="Мобильная fantasy RPG для тренировки математики 5–10 лет." />
      <GlassCard className="hero-card hero-card--home" tone="strong">
        <IconBadge icon={getAvatarIcon(player.avatar.classId)} label={player.avatar.name} size="xl" />
        <div>
          <p className="eyebrow">Математический рыцарь</p>
          <h2>{player.avatar.name}</h2>
          <p>Глава: {player.currentChapter.replaceAll('_', ' ')}</p>
          <div className="stat-row">
            <StatPill icon="ui_xp" label="Уровень" value={`Ур. ${player.heroLevel}`} />
            <StatPill icon="ui_coin" label="Монеты" value={player.coins} />
            <StatPill icon="ui_heart" label="Сердца" value={player.hearts} />
          </div>
        </div>
      </GlassCard>
      <GlassCard className="mini-progress-card">
        <span>Глобальный прогресс</span>
        <strong>{getGlobalProgress(player)}%</strong>
        <small>3000 мини-заданий генерируются по правилам тем.</small>
      </GlassCard>
      <div className="home-actions">
        <PrimaryButton icon="ui_map" onClick={() => navigate('chapters')}>Приключение</PrimaryButton>
        <PrimaryButton icon="ui_marathon" variant="secondary" onClick={() => navigate('marathon')}>Марафон</PrimaryButton>
        <PrimaryButton icon="hero_knight" variant="secondary" onClick={() => navigate('character')}>Герой</PrimaryButton>
        <PrimaryButton icon="ui_shop" variant="secondary" onClick={() => navigate('shop')}>Магазин</PrimaryButton>
        <PrimaryButton icon="ui_collection" variant="secondary" onClick={() => navigate('collection')}>Коллекция</PrimaryButton>
        <PrimaryButton icon="ui_settings" variant="secondary" onClick={() => navigate('settings')}>Настройки</PrimaryButton>
      </div>
    </section>
  );
}
