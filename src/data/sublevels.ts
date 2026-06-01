export type SublevelId = 'training' | 'battle' | 'challenge';

export type Sublevel = {
  id: SublevelId;
  title: string;
  description: string;
  miniTasks: number;
  difficultyBonus: number;
  rewardMultiplier: number;
  timerSeconds?: number;
};

export const sublevels: Sublevel[] = [
  { id: 'training', title: 'Тренировка', description: '10 простых заданий без таймера и с мягкими подсказками.', miniTasks: 10, difficultyBonus: 0, rewardMultiplier: 1 },
  { id: 'battle', title: 'Бой', description: '10 заданий средней сложности: правильный ответ атакует врага.', miniTasks: 10, difficultyBonus: 1, rewardMultiplier: 1.35 },
  { id: 'challenge', title: 'Испытание', description: '10 сложных заданий, больше награда и выше шанс сундука.', miniTasks: 10, difficultyBonus: 2, rewardMultiplier: 1.8, timerSeconds: 90 },
];

export const getSublevel = (sublevelId: SublevelId) => sublevels.find((item) => item.id === sublevelId) ?? sublevels[0];
