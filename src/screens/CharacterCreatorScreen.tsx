import { useState } from 'react';
import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { cloakColors, heroClasses, type CharacterAvatar, type CloakColor, type HeroClassId } from '../game/avatar';
import type { PlayerState } from '../storage/playerStorage';

type CharacterCreatorScreenProps = {
  player: PlayerState;
  onBack: () => void;
  onSave: (avatar: CharacterAvatar) => void;
};

export function CharacterCreatorScreen({ player, onBack, onSave }: CharacterCreatorScreenProps) {
  const [name, setName] = useState(player.avatar.name);
  const [classId, setClassId] = useState<HeroClassId>(player.avatar.classId);
  const [cloakColor, setCloakColor] = useState<CloakColor>(player.avatar.cloakColor);
  const selectedClass = heroClasses.find((heroClass) => heroClass.id === classId) ?? heroClasses[0];

  return (
    <section className="screen">
      <ScreenHeader title="Создание героя" subtitle="Выбери имя, класс и цвет плаща. Персонаж сохранится в localStorage." onBack={onBack} />
      <GlassCard className="creator-preview">
        <IconBadge icon={selectedClass.icon} size="xl" />
        <div>
          <h2>{name || 'Новый герой'}</h2>
          <p>{selectedClass.title}: {selectedClass.bonus}</p>
          <span className="cloak-chip" style={{ '--cloak-color': cloakColors.find((color) => color.id === cloakColor)?.color }}>Плащ: {cloakColor}</span>
        </div>
      </GlassCard>
      <GlassCard className="form-card">
        <label className="field-label">Имя героя</label>
        <input className="answer-input" value={name} maxLength={16} onChange={(event: any) => setName(event.target.value)} placeholder="Например, Ари" />
        <label className="field-label">Класс</label>
        <div className="option-grid">
          {heroClasses.map((heroClass) => (
            <button className={`option-card ${classId === heroClass.id ? 'is-selected' : ''}`} type="button" key={heroClass.id} onClick={() => setClassId(heroClass.id)}>
              <IconBadge icon={heroClass.icon} size="md" />
              <strong>{heroClass.title}</strong>
              <small>{heroClass.bonus}</small>
            </button>
          ))}
        </div>
        <label className="field-label">Цвет плаща</label>
        <div className="cloak-grid">
          {cloakColors.map((color) => (
            <button className={`cloak-button ${cloakColor === color.id ? 'is-selected' : ''}`} type="button" key={color.id} style={{ '--cloak-color': color.color }} onClick={() => setCloakColor(color.id)}>
              {color.title}
            </button>
          ))}
        </div>
        <PrimaryButton onClick={() => onSave({ name: name.trim() || 'Ари', classId, cloakColor })}>Начать путь</PrimaryButton>
      </GlassCard>
    </section>
  );
}
