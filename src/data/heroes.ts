import type { IconId } from './iconRegistry';

export type Hero = {
  id: string;
  name: string;
  role: string;
  icon: IconId;
  power: number;
};

export const heroes: Hero[] = [
  { id: 'arithmetic-knight', name: 'Рыцарь Арифметики', role: 'Меч сложения', icon: 'hero_knight', power: 8 },
  { id: 'noble-knight', name: 'Благородный Рыцарь', role: 'Защитник чисел', icon: 'hero_paladin', power: 9 },
  { id: 'dark-knight', name: 'Темный Рыцарь', role: 'Мастер вычитания', icon: 'hero_dark_knight', power: 10 },
  { id: 'archmage', name: 'Верховный Маг', role: 'Руны пропусков', icon: 'hero_mage', power: 11 },
  { id: 'rogue', name: 'Разбойник', role: 'Быстрый счет', icon: 'hero_rogue', power: 7 },
  { id: 'ranger', name: 'Рейнджер', role: 'Проводник карты', icon: 'hero_archer', power: 8 },
  { id: 'balance-archer', name: 'Лучник Равновесия', role: 'Сравнение чисел', icon: 'hero_archer', power: 9 },
  { id: 'wise-wizard', name: 'Мудрый Волшебник', role: 'Деление добычи', icon: 'hero_mage', power: 10 },
  { id: 'assassin', name: 'Ассасин', role: 'Комбо-удары', icon: 'hero_rogue', power: 11 },
];
