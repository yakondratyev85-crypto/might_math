import type { IconId } from './iconRegistry';

export type Location = {
  id: string;
  name: string;
  icon: IconId;
  level: number;
  enemyIds: string[];
};

export const locations: Location[] = [
  { id: 'green-edge', name: 'Зеленая Опушка', icon: 'location_green_meadow', level: 1, enemyIds: ['green-slime', 'wild-wolf'] },
  { id: 'griffon-edge', name: 'Грифонова Опушка', icon: 'location_griffin_meadow', level: 2, enemyIds: ['forest-goblin', 'night-bat'] },
  { id: 'stone-halls', name: 'Каменные Чертоги', icon: 'location_stone_halls', level: 3, enemyIds: ['ancient-skeleton', 'stone-golem'] },
  { id: 'fear-cave', name: 'Пещера Страха', icon: 'location_cave', level: 4, enemyIds: ['cave-thief', 'ruins-ghost'] },
  { id: 'ice-gorge', name: 'Ледяное Ущелье', icon: 'location_ice_rift', level: 5, enemyIds: ['stone-golem', 'toxic-mushroom'] },
  { id: 'shadow-spire', name: 'Теневой Шпиль', icon: 'location_shadow_spire', level: 6, enemyIds: ['ruins-ghost', 'super-boss'] },
  { id: 'storm-suite', name: 'Грозовая Свита', icon: 'location_storm_court', level: 7, enemyIds: ['toxic-mushroom', 'super-boss'] },
  { id: 'tournament', name: 'Турнир Рыцарей', icon: 'location_tournament', level: 8, enemyIds: ['wild-wolf', 'forest-goblin'] },
  { id: 'academy', name: 'Магическая Академия', icon: 'location_academy', level: 9, enemyIds: ['ruins-ghost', 'ancient-skeleton'] },
  { id: 'final-castle', name: 'Финальный Замок', icon: 'location_final_castle', level: 10, enemyIds: ['super-boss'] },
];
