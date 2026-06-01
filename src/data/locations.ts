import type { IconName } from './iconRegistry';

export type Location = {
  id: string;
  name: string;
  icon: IconName;
  level: number;
  enemyIds: string[];
};

export const locations: Location[] = [
  { id: 'green-edge', name: 'Зеленая Опушка', icon: 'forest', level: 1, enemyIds: ['green-slime', 'wild-wolf'] },
  { id: 'griffon-edge', name: 'Грифонова Опушка', icon: 'griffon', level: 2, enemyIds: ['forest-goblin', 'night-bat'] },
  { id: 'stone-halls', name: 'Каменные Чертоги', icon: 'halls', level: 3, enemyIds: ['ancient-skeleton', 'stone-golem'] },
  { id: 'fear-cave', name: 'Пещера Страха', icon: 'cave', level: 4, enemyIds: ['cave-thief', 'ruins-ghost'] },
  { id: 'ice-gorge', name: 'Ледяное Ущелье', icon: 'ice', level: 5, enemyIds: ['stone-golem', 'toxic-mushroom'] },
  { id: 'shadow-spire', name: 'Теневой Шпиль', icon: 'spire', level: 6, enemyIds: ['ruins-ghost', 'super-boss'] },
  { id: 'storm-suite', name: 'Грозовая Свита', icon: 'storm', level: 7, enemyIds: ['toxic-mushroom', 'super-boss'] },
];
