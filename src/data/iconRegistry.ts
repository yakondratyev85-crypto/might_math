export type IconType = 'hero' | 'enemy' | 'item' | 'location' | 'reward' | 'ui';

export type IconId =
  | 'hero_knight'
  | 'hero_mage'
  | 'hero_archer'
  | 'hero_rogue'
  | 'hero_paladin'
  | 'hero_dark_knight'
  | 'enemy_slime'
  | 'enemy_wolf'
  | 'enemy_goblin'
  | 'enemy_skeleton'
  | 'enemy_golem'
  | 'enemy_bat'
  | 'enemy_thief'
  | 'enemy_ghost'
  | 'enemy_mushroom'
  | 'enemy_boss'
  | 'location_green_meadow'
  | 'location_griffin_meadow'
  | 'location_stone_halls'
  | 'location_cave'
  | 'location_ice_rift'
  | 'location_shadow_spire'
  | 'location_storm_court'
  | 'location_tournament'
  | 'location_academy'
  | 'location_final_castle'
  | 'item_wood_sword'
  | 'item_iron_sword'
  | 'item_crystal_sword'
  | 'item_fire_staff'
  | 'item_wood_shield'
  | 'item_knight_shield'
  | 'item_paladin_shield'
  | 'item_leather_helmet'
  | 'item_steel_helmet'
  | 'item_dragon_helmet'
  | 'ui_coin'
  | 'ui_xp'
  | 'ui_heart'
  | 'ui_star'
  | 'ui_lock'
  | 'ui_key'
  | 'ui_timer'
  | 'ui_settings'
  | 'ui_sound'
  | 'ui_hint'
  | 'ui_attack'
  | 'ui_damage'
  | 'ui_chest'
  | 'ui_collection'
  | 'ui_map'
  | 'ui_shop'
  | 'ui_progress'
  | 'ui_marathon'
  | 'ui_home';

export type IconDefinition = {
  id: IconId;
  label: string;
  type: IconType;
  emojiFallback: string;
  svgPath?: string;
  colorA: string;
  colorB: string;
};

export const iconRegistry: Record<IconId, IconDefinition> = {
  hero_knight: { id: 'hero_knight', label: 'Рыцарь', type: 'hero', emojiFallback: '🛡️', colorA: '#ffd36a', colorB: '#ff7a59' },
  hero_mage: { id: 'hero_mage', label: 'Маг', type: 'hero', emojiFallback: '🧙', colorA: '#9bf6ff', colorB: '#7b61ff' },
  hero_archer: { id: 'hero_archer', label: 'Лучник', type: 'hero', emojiFallback: '🏹', colorA: '#b8ff7a', colorB: '#28c76f' },
  hero_rogue: { id: 'hero_rogue', label: 'Разбойник', type: 'hero', emojiFallback: '🗡️', colorA: '#c7b9ff', colorB: '#5e4bff' },
  hero_paladin: { id: 'hero_paladin', label: 'Паладин', type: 'hero', emojiFallback: '👑', colorA: '#fff0a8', colorB: '#f7b733' },
  hero_dark_knight: { id: 'hero_dark_knight', label: 'Темный рыцарь', type: 'hero', emojiFallback: '♞', colorA: '#9aa4ff', colorB: '#322c68' },
  enemy_slime: { id: 'enemy_slime', label: 'Слизняк', type: 'enemy', emojiFallback: '🟢', colorA: '#7dffb2', colorB: '#14a76c' },
  enemy_wolf: { id: 'enemy_wolf', label: 'Волк', type: 'enemy', emojiFallback: '🐺', colorA: '#d7e1ff', colorB: '#566987' },
  enemy_goblin: { id: 'enemy_goblin', label: 'Гоблин', type: 'enemy', emojiFallback: '👺', colorA: '#ffd166', colorB: '#ef476f' },
  enemy_skeleton: { id: 'enemy_skeleton', label: 'Скелет', type: 'enemy', emojiFallback: '💀', colorA: '#ffffff', colorB: '#98a2b3' },
  enemy_golem: { id: 'enemy_golem', label: 'Голем', type: 'enemy', emojiFallback: '🪨', colorA: '#d6d3d1', colorB: '#78716c' },
  enemy_bat: { id: 'enemy_bat', label: 'Мышь', type: 'enemy', emojiFallback: '🦇', colorA: '#c4b5fd', colorB: '#4c1d95' },
  enemy_thief: { id: 'enemy_thief', label: 'Вор', type: 'enemy', emojiFallback: '🦝', colorA: '#fde68a', colorB: '#92400e' },
  enemy_ghost: { id: 'enemy_ghost', label: 'Призрак', type: 'enemy', emojiFallback: '👻', colorA: '#e0f2fe', colorB: '#38bdf8' },
  enemy_mushroom: { id: 'enemy_mushroom', label: 'Мухомор', type: 'enemy', emojiFallback: '🍄', colorA: '#fecaca', colorB: '#dc2626' },
  enemy_boss: { id: 'enemy_boss', label: 'Босс', type: 'enemy', emojiFallback: '🐲', colorA: '#fda4af', colorB: '#7f1d1d' },
  location_green_meadow: { id: 'location_green_meadow', label: 'Зеленая Опушка', type: 'location', emojiFallback: '🌿', colorA: '#bbf7d0', colorB: '#22c55e' },
  location_griffin_meadow: { id: 'location_griffin_meadow', label: 'Грифонова Опушка', type: 'location', emojiFallback: '🦅', colorA: '#fde68a', colorB: '#f59e0b' },
  location_stone_halls: { id: 'location_stone_halls', label: 'Каменные Чертоги', type: 'location', emojiFallback: '🏛️', colorA: '#e5e7eb', colorB: '#64748b' },
  location_cave: { id: 'location_cave', label: 'Пещера Страха', type: 'location', emojiFallback: '⛰️', colorA: '#c4b5fd', colorB: '#6d28d9' },
  location_ice_rift: { id: 'location_ice_rift', label: 'Ледяное Ущелье', type: 'location', emojiFallback: '❄️', colorA: '#cffafe', colorB: '#06b6d4' },
  location_shadow_spire: { id: 'location_shadow_spire', label: 'Теневой Шпиль', type: 'location', emojiFallback: '🗼', colorA: '#a78bfa', colorB: '#312e81' },
  location_storm_court: { id: 'location_storm_court', label: 'Грозовая Свита', type: 'location', emojiFallback: '⛈️', colorA: '#bae6fd', colorB: '#2563eb' },
  location_tournament: { id: 'location_tournament', label: 'Турнир Рыцарей', type: 'location', emojiFallback: '🏆', colorA: '#fef3c7', colorB: '#d97706' },
  location_academy: { id: 'location_academy', label: 'Магическая Академия', type: 'location', emojiFallback: '🔮', colorA: '#ddd6fe', colorB: '#8b5cf6' },
  location_final_castle: { id: 'location_final_castle', label: 'Финальный Замок', type: 'location', emojiFallback: '🏰', colorA: '#fecdd3', colorB: '#be123c' },
  item_wood_sword: { id: 'item_wood_sword', label: 'Деревянный меч', type: 'item', emojiFallback: '🪵', colorA: '#fed7aa', colorB: '#92400e' },
  item_iron_sword: { id: 'item_iron_sword', label: 'Железный меч', type: 'item', emojiFallback: '⚔️', colorA: '#e5e7eb', colorB: '#64748b' },
  item_crystal_sword: { id: 'item_crystal_sword', label: 'Кристальный клинок', type: 'item', emojiFallback: '💎', colorA: '#cffafe', colorB: '#0891b2' },
  item_fire_staff: { id: 'item_fire_staff', label: 'Огненный посох', type: 'item', emojiFallback: '🔥', colorA: '#fed7aa', colorB: '#ef4444' },
  item_wood_shield: { id: 'item_wood_shield', label: 'Деревянный щит', type: 'item', emojiFallback: '🛡️', colorA: '#fde68a', colorB: '#a16207' },
  item_knight_shield: { id: 'item_knight_shield', label: 'Рыцарский щит', type: 'item', emojiFallback: '🛡️', colorA: '#bfdbfe', colorB: '#2563eb' },
  item_paladin_shield: { id: 'item_paladin_shield', label: 'Щит паладина', type: 'item', emojiFallback: '🛡️', colorA: '#fef08a', colorB: '#eab308' },
  item_leather_helmet: { id: 'item_leather_helmet', label: 'Кожаный шлем', type: 'item', emojiFallback: '⛑️', colorA: '#fed7aa', colorB: '#b45309' },
  item_steel_helmet: { id: 'item_steel_helmet', label: 'Стальной шлем', type: 'item', emojiFallback: '⛑️', colorA: '#e2e8f0', colorB: '#475569' },
  item_dragon_helmet: { id: 'item_dragon_helmet', label: 'Драконий шлем', type: 'item', emojiFallback: '🐉', colorA: '#fecaca', colorB: '#991b1b' },
  ui_coin: { id: 'ui_coin', label: 'Монеты', type: 'reward', emojiFallback: '🪙', colorA: '#fde68a', colorB: '#d97706' },
  ui_xp: { id: 'ui_xp', label: 'Опыт', type: 'reward', emojiFallback: '⭐', colorA: '#fef3c7', colorB: '#f59e0b' },
  ui_heart: { id: 'ui_heart', label: 'Сердца', type: 'reward', emojiFallback: '❤️', colorA: '#fecdd3', colorB: '#e11d48' },
  ui_star: { id: 'ui_star', label: 'Звезда', type: 'reward', emojiFallback: '★', colorA: '#fff7ed', colorB: '#f97316' },
  ui_lock: { id: 'ui_lock', label: 'Замок', type: 'ui', emojiFallback: '🔒', colorA: '#cbd5e1', colorB: '#475569' },
  ui_key: { id: 'ui_key', label: 'Ключ', type: 'ui', emojiFallback: '🗝️', colorA: '#fde68a', colorB: '#b45309' },
  ui_timer: { id: 'ui_timer', label: 'Таймер', type: 'ui', emojiFallback: '⏱️', colorA: '#bae6fd', colorB: '#0284c7' },
  ui_settings: { id: 'ui_settings', label: 'Настройки', type: 'ui', emojiFallback: '⚙️', colorA: '#ddd6fe', colorB: '#7c3aed' },
  ui_sound: { id: 'ui_sound', label: 'Звук', type: 'ui', emojiFallback: '🔊', colorA: '#cffafe', colorB: '#06b6d4' },
  ui_hint: { id: 'ui_hint', label: 'Подсказка', type: 'ui', emojiFallback: '💡', colorA: '#fef08a', colorB: '#eab308' },
  ui_attack: { id: 'ui_attack', label: 'Атака', type: 'ui', emojiFallback: '⚡', colorA: '#fef3c7', colorB: '#f97316' },
  ui_damage: { id: 'ui_damage', label: 'Урон', type: 'ui', emojiFallback: '💥', colorA: '#fecaca', colorB: '#ef4444' },
  ui_chest: { id: 'ui_chest', label: 'Сундук', type: 'reward', emojiFallback: '🎁', colorA: '#fde68a', colorB: '#b45309' },
  ui_collection: { id: 'ui_collection', label: 'Коллекция', type: 'ui', emojiFallback: '📚', colorA: '#ddd6fe', colorB: '#8b5cf6' },
  ui_map: { id: 'ui_map', label: 'Карта', type: 'ui', emojiFallback: '🗺️', colorA: '#bbf7d0', colorB: '#16a34a' },
  ui_shop: { id: 'ui_shop', label: 'Магазин', type: 'ui', emojiFallback: '🏪', colorA: '#fed7aa', colorB: '#ea580c' },
  ui_progress: { id: 'ui_progress', label: 'Прогресс', type: 'ui', emojiFallback: '📈', colorA: '#bfdbfe', colorB: '#2563eb' },
  ui_marathon: { id: 'ui_marathon', label: 'Марафон', type: 'ui', emojiFallback: '🏃', colorA: '#fecdd3', colorB: '#db2777' },
  ui_home: { id: 'ui_home', label: 'Домой', type: 'ui', emojiFallback: '🏠', colorA: '#e0f2fe', colorB: '#0284c7' },
};

export const getIcon = (id: IconId) => iconRegistry[id];
