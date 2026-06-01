import type { IconId } from './iconRegistry';

export type ItemSlot = 'weapon' | 'shield' | 'helmet';
export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type Item = {
  id: string;
  name: string;
  icon: IconId;
  slot: ItemSlot;
  price: number;
  bonus: number;
  rarity: ItemRarity;
};

export const items: Item[] = [
  { id: 'wooden-sword', name: 'деревянный меч', icon: 'item_wood_sword', slot: 'weapon', price: 15, bonus: 1, rarity: 'common' },
  { id: 'iron-sword', name: 'железный меч', icon: 'item_iron_sword', slot: 'weapon', price: 45, bonus: 3, rarity: 'rare' },
  { id: 'diamond-blade', name: 'алмазный клинок', icon: 'item_crystal_sword', slot: 'weapon', price: 120, bonus: 7, rarity: 'epic' },
  { id: 'fire-staff', name: 'огненный посох', icon: 'item_fire_staff', slot: 'weapon', price: 95, bonus: 6, rarity: 'epic' },
  { id: 'wooden-shield', name: 'деревянный щит', icon: 'item_wood_shield', slot: 'shield', price: 18, bonus: 1, rarity: 'common' },
  { id: 'round-shield', name: 'круглый щит', icon: 'item_knight_shield', slot: 'shield', price: 35, bonus: 2, rarity: 'rare' },
  { id: 'knight-shield', name: 'рыцарский щит', icon: 'item_knight_shield', slot: 'shield', price: 70, bonus: 4, rarity: 'epic' },
  { id: 'paladin-shield', name: 'щит паладина', icon: 'item_paladin_shield', slot: 'shield', price: 110, bonus: 6, rarity: 'legendary' },
  { id: 'leather-helmet', name: 'кожаный шлем', icon: 'item_leather_helmet', slot: 'helmet', price: 20, bonus: 1, rarity: 'common' },
  { id: 'steel-helmet', name: 'стальной шлем', icon: 'item_steel_helmet', slot: 'helmet', price: 55, bonus: 3, rarity: 'rare' },
  { id: 'dragon-helmet', name: 'драконий шлем', icon: 'item_dragon_helmet', slot: 'helmet', price: 130, bonus: 7, rarity: 'legendary' },
];
