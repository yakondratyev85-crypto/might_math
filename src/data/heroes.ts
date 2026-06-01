import type { IconName } from './iconRegistry';

export type Hero = {
  id: string;
  name: string;
  role: string;
  icon: IconName;
  power: number;
};

export const heroes: Hero[] = [
  { id: 'arithmetic-knight', name: 'Рыцарь Арифметики', role: 'Меч сложения', icon: 'knight', power: 8 },
  { id: 'noble-knight', name: 'Благородный Рыцарь', role: 'Защитник чисел', icon: 'nobleKnight', power: 9 },
  { id: 'dark-knight', name: 'Темный Рыцарь', role: 'Мастер вычитания', icon: 'darkKnight', power: 10 },
  { id: 'archmage', name: 'Верховный Маг', role: 'Руны пропусков', icon: 'mage', power: 11 },
  { id: 'rogue', name: 'Разбойник', role: 'Быстрый счет', icon: 'rogue', power: 7 },
  { id: 'ranger', name: 'Рейнджер', role: 'Проводник карты', icon: 'ranger', power: 8 },
  { id: 'balance-archer', name: 'Лучник Равновесия', role: 'Сравнение чисел', icon: 'archer', power: 9 },
  { id: 'wise-wizard', name: 'Мудрый Волшебник', role: 'Деление добычи', icon: 'wizard', power: 10 },
  { id: 'assassin', name: 'Ассасин', role: 'Комбо-удары', icon: 'assassin', power: 11 },
];
