import type { IconName } from './iconRegistry';

export type Enemy = {
  id: string;
  name: string;
  icon: IconName;
  hp: number;
  rewardCoins: number;
  rewardXp: number;
};

export const enemies: Enemy[] = [
  { id: 'green-slime', name: 'Зеленый Слизняк', icon: 'slime', hp: 24, rewardCoins: 8, rewardXp: 12 },
  { id: 'wild-wolf', name: 'Дикий Волк', icon: 'wolf', hp: 30, rewardCoins: 10, rewardXp: 16 },
  { id: 'forest-goblin', name: 'Лесной Гоблин', icon: 'goblin', hp: 34, rewardCoins: 12, rewardXp: 18 },
  { id: 'ancient-skeleton', name: 'Древний Скелет', icon: 'skeleton', hp: 38, rewardCoins: 14, rewardXp: 22 },
  { id: 'stone-golem', name: 'Каменный Голем', icon: 'golem', hp: 46, rewardCoins: 18, rewardXp: 26 },
  { id: 'night-bat', name: 'Ночная Мышь', icon: 'bat', hp: 28, rewardCoins: 10, rewardXp: 15 },
  { id: 'cave-thief', name: 'Пещерный Вор', icon: 'thief', hp: 36, rewardCoins: 16, rewardXp: 22 },
  { id: 'ruins-ghost', name: 'Призрак Руин', icon: 'ghost', hp: 42, rewardCoins: 18, rewardXp: 26 },
  { id: 'toxic-mushroom', name: 'Токсичный Мухомор', icon: 'mushroom', hp: 40, rewardCoins: 17, rewardXp: 24 },
  { id: 'super-boss', name: 'Супер-Босс', icon: 'boss', hp: 70, rewardCoins: 40, rewardXp: 60 },
];

export const getEnemy = (enemyId: string) => enemies.find((enemy) => enemy.id === enemyId) ?? enemies[0];
