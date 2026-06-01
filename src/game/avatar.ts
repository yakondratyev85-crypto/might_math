import type { IconId } from '../data/iconRegistry';

export type HeroClassId = 'knight' | 'mage' | 'archer' | 'rogue';
export type CloakColor = 'red' | 'blue' | 'green' | 'purple' | 'gold';

export type CharacterAvatar = {
  name: string;
  classId: HeroClassId;
  cloakColor: CloakColor;
};

export type HeroClass = {
  id: HeroClassId;
  title: string;
  bonus: string;
  icon: IconId;
};

export const heroClasses: HeroClass[] = [
  { id: 'knight', title: 'Рыцарь', bonus: '+1 сердце', icon: 'hero_knight' },
  { id: 'mage', title: 'Маг', bonus: '1 подсказка за бой', icon: 'hero_mage' },
  { id: 'archer', title: 'Лучник', bonus: '+5% шанс критического удара', icon: 'hero_archer' },
  { id: 'rogue', title: 'Разбойник', bonus: '+10% монет', icon: 'hero_rogue' },
];

export const cloakColors: Array<{ id: CloakColor; title: string; color: string }> = [
  { id: 'red', title: 'красный', color: '#fb7185' },
  { id: 'blue', title: 'синий', color: '#60a5fa' },
  { id: 'green', title: 'зелёный', color: '#4ade80' },
  { id: 'purple', title: 'фиолетовый', color: '#a78bfa' },
  { id: 'gold', title: 'золотой', color: '#facc15' },
];

export const defaultAvatar: CharacterAvatar = {
  name: 'Ари',
  classId: 'knight',
  cloakColor: 'red',
};

export const getAvatarIcon = (classId: HeroClassId): IconId => heroClasses.find((heroClass) => heroClass.id === classId)?.icon ?? 'hero_knight';
