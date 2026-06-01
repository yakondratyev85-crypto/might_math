export type MathModeId = 'add10' | 'add20' | 'subtract' | 'missing' | 'compare' | 'multiply' | 'divide' | 'boss';

export type MathMode = {
  id: MathModeId;
  name: string;
  action: string;
  difficulty: number;
  rounds: number;
};

export const mathModes: MathMode[] = [
  { id: 'add10', name: 'Сложение до 10', action: 'удар мечом', difficulty: 1, rounds: 1 },
  { id: 'add20', name: 'Сложение до 20', action: 'сильный удар мечом', difficulty: 2, rounds: 1 },
  { id: 'subtract', name: 'Вычитание', action: 'блок щитом', difficulty: 2, rounds: 1 },
  { id: 'missing', name: 'Пропущенное число', action: 'магическая руна', difficulty: 3, rounds: 1 },
  { id: 'compare', name: 'Сравнение чисел', action: 'дуэль силы', difficulty: 2, rounds: 1 },
  { id: 'multiply', name: 'Умножение', action: 'комбо-удар', difficulty: 4, rounds: 1 },
  { id: 'divide', name: 'Деление', action: 'разделить добычу', difficulty: 4, rounds: 1 },
  { id: 'boss', name: 'Босс-бой', action: 'серия из 5 задач', difficulty: 5, rounds: 5 },
];
