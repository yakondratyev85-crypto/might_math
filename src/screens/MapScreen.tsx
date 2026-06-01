import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
import { locations } from '../data/locations';
import type { Location } from '../data/locations';
import type { PlayerState } from '../storage/playerStorage';

type MapScreenProps = {
  player: PlayerState;
  onBack: () => void;
  onPickLocation: (location: Location) => void;
};

export function MapScreen({ player, onBack, onPickLocation }: MapScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title="Карта мира" subtitle="Открывай яркие fantasy-локации и выбирай путь героя." onBack={onBack} />
      <div className="location-list">
        {locations.map((location) => {
          const unlocked = player.unlockedLocations.includes(location.id);
          return (
            <button
              className={`map-card ${unlocked ? '' : 'map-card--locked'}`}
              type="button"
              key={location.id}
              onClick={() => unlocked && onPickLocation(location)}
              disabled={!unlocked}
            >
              <IconBadge icon={location.icon} label={location.name} />
              <div>
                <h3>{location.name}</h3>
                <p>{unlocked ? `Глава ${location.level}` : `Откроется на уровне ${location.level}`}</p>
              </div>
              <span className="map-status">{unlocked ? 'В бой' : '🔒'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
