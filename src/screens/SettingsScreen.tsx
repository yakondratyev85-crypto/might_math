import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import type { PlayerSettings } from '../storage/playerStorage';

type SettingsScreenProps = {
  settings: PlayerSettings;
  onBack: () => void;
  onChange: (settings: PlayerSettings) => void;
  onResetProgress: () => void;
};

export function SettingsScreen({ settings, onBack, onChange, onResetProgress }: SettingsScreenProps) {
  return (
    <section className="screen">
      <ScreenHeader title="Настройки" subtitle="Звук, громкость, контраст и размер текста сохраняются автоматически." onBack={onBack} />
      <GlassCard className="settings-card">
        <div className="settings-row">
          <IconBadge icon="ui_sound" size="md" />
          <div>
            <h3>Звук</h3>
            <p>{settings.sound.enabled ? 'включён' : 'выключен'}</p>
          </div>
          <PrimaryButton variant="ghost" onClick={() => onChange({ ...settings, sound: { ...settings.sound, enabled: !settings.sound.enabled } })}>{settings.sound.enabled ? 'Выключить' : 'Включить'}</PrimaryButton>
        </div>
        <label className="field-label">Громкость: {settings.sound.volume}</label>
        <input className="range-input" type="range" min="0" max="100" value={settings.sound.volume} onChange={(event: any) => onChange({ ...settings, sound: { ...settings.sound, volume: Number(event.target.value) } })} />
        <label className="field-label">Режим интерфейса</label>
        <div className="home-actions two">
          <PrimaryButton variant={settings.interfaceMode === 'soft' ? 'primary' : 'secondary'} onClick={() => onChange({ ...settings, interfaceMode: 'soft' })}>Мягкий</PrimaryButton>
          <PrimaryButton variant={settings.interfaceMode === 'contrast' ? 'primary' : 'secondary'} onClick={() => onChange({ ...settings, interfaceMode: 'contrast' })}>Контрастный</PrimaryButton>
        </div>
        <label className="field-label">Размер текста</label>
        <div className="home-actions two">
          <PrimaryButton variant={settings.textSize === 'normal' ? 'primary' : 'secondary'} onClick={() => onChange({ ...settings, textSize: 'normal' })}>Обычный</PrimaryButton>
          <PrimaryButton variant={settings.textSize === 'large' ? 'primary' : 'secondary'} onClick={() => onChange({ ...settings, textSize: 'large' })}>Крупный</PrimaryButton>
        </div>
        <PrimaryButton variant="danger" onClick={onResetProgress}>Сбросить прогресс</PrimaryButton>
      </GlassCard>
    </section>
  );
}
