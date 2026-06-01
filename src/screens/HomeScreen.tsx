import { heroes } from '../data/heroes';
import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
import { StatPill } from '../components/StatPill';
import type { PlayerState } from '../storage/playerStorage';
import type { Screen } from '../App';

type HomeScreenProps = {
  player: PlayerState;
  navigate: (screen: Screen) => void;
};

export function HomeScreen({ player, navigate }: HomeScreenProps) {
  const hero = heroes[0];

  return (
    <section className="screen home-screen">
      <ScreenHeader title="Математический рыцарь" subtitle="Тренируй математику, побеждай монстров и собирай сокровища!" />

      <div className="hero-card hero-card--home">
        <IconBadge icon={hero.icon} label={hero.name} size="lg" />
        <div>
          <h2>{hero.name}</h2>
          <p>{hero.role}</p>
          <div className="stat-row">
            <StatPill icon="xp" label="Уровень" value={`Ур. ${player.heroLevel}`} />
            <StatPill icon="coin" label="Монеты" value={player.coins} />
            <StatPill icon="heart" label="Сердца" value={player.hearts} />
          </div>
        </div>
      </div>

      <div className="primary-actions">
        <button className="big-button" type="button" onClick={() => navigate('map')}>
          🗺️ Играть
        </button>
        <button className="big-button big-button--secondary" type="button" onClick={() => navigate('shop')}>
          🏪 Магазин
        </button>
      </div>

      <nav className="tile-grid" aria-label="Разделы игры">
        <button className="menu-tile" type="button" onClick={() => navigate('collection')}>
          <IconBadge icon="collection" label="Коллекция" />
          <span>Коллекция</span>
        </button>
        <button className="menu-tile" type="button" onClick={() => navigate('progress')}>
          <IconBadge icon="progress" label="Прогресс" />
          <span>Прогресс</span>
        </button>
        <button className="menu-tile" type="button" onClick={() => navigate('chests')}>
          <IconBadge icon="chest" label="Сундуки" />
          <span>Сундуки</span>
        </button>
        <button className="menu-tile" type="button" onClick={() => navigate('settings')}>
          <IconBadge icon="settings" label="Настройки" />
          <span>Настройки</span>
        </button>
      </nav>
    </section>
  );
}
