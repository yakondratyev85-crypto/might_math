import type { IconName } from './iconRegistry';

export type ItemSlot = 'weapon' | 'shield' | 'helmet';

export type Item = {
  id: string;
  name: string;
  icon: IconName;
  slot: ItemSlot;
  price: number;
  bonus: number;
};

export const items: Item[] = [
  { id: 'wooden-sword', name: 'деревянный меч', icon: 'sword', slot: 'weapon', price: 15, bonus: 1 },
  { id: 'iron-sword', name: 'железный меч', icon: 'sword', slot: 'weapon', price: 45, bonus: 3 },
  { id: 'diamond-blade', name: 'алмазный клинок', icon: 'sword', slot: 'weapon', price: 120, bonus: 7 },
  { id: 'fire-staff', name: 'огненный посох', icon: 'staff', slot: 'weapon', price: 95, bonus: 6 },
  { id: 'wooden-shield', name: 'деревянный щит', icon: 'shield', slot: 'shield', price: 18, bonus: 1 },
  { id: 'round-shield', name: 'круглый щит', icon: 'shield', slot: 'shield', price: 35, bonus: 2 },
  { id: 'knight-shield', name: 'рыцарский щит', icon: 'shield', slot: 'shield', price: 70, bonus: 4 },
  { id: 'paladin-shield', name: 'щит паладина', icon: 'shield', slot: 'shield', price: 110, bonus: 6 },
  { id: 'leather-helmet', name: 'кожаный шлем', icon: 'helmet', slot: 'helmet', price: 20, bonus: 1 },
  { id: 'steel-helmet', name: 'стальной шлем', icon: 'helmet', slot: 'helmet', price: 55, bonus: 3 },
  { id: 'dragon-helmet', name: 'драконий шлем', icon: 'helmet', slot: 'helmet', price: 130, bonus: 7 },
];
