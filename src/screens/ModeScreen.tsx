import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
import { mathModes } from '../data/mathModes';
import type { MathMode } from '../data/mathModes';
import type { Location } from '../data/locations';

type ModeScreenProps = {
  location: Location;
  onBack: () => void;
  onPickMode: (mode: MathMode) => void;
};

export function ModeScreen({ location, onBack, onPickMode }: ModeScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title="Выбор режима" subtitle={`Локация: ${location.name}. Математика превращается в магию RPG!`} onBack={onBack} />
      <div className="mode-grid">
        {mathModes.map((mode) => (
          <button className="mode-card" type="button" key={mode.id} onClick={() => onPickMode(mode)}>
            <IconBadge icon={mode.id === 'boss' ? 'boss' : 'spark'} label={mode.name} />
            <h3>{mode.name}</h3>
            <p>{mode.action}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
