export type IconDefinition = {
  label: string;
  emojiFallback: string;
  colorA: string;
  colorB: string;
  type?: 'emoji' | 'image';
  svgPath?: string;
};

const icon = (emojiFallback: string, label: string, colorA = '#fff7d6', colorB = '#f59e0b'): IconDefinition => ({
  emojiFallback,
  label,
  colorA,
  colorB,
  type: 'emoji',
});

export const iconRegistry = {
  knight: icon('🛡️', 'Рыцарь'),
  nobleKnight: icon('🤴', 'Благородный рыцарь'),
  darkKnight: icon('♞', 'Темный рыцарь'),
  mage: icon('🧙‍♂️', 'Маг'),
  rogue: icon('🗡️', 'Разбойник'),
  ranger: icon('🥾', 'Рейнджер'),
  archer: icon('🏹', 'Лучник'),
  wizard: icon('🔮', 'Волшебник'),
  assassin: icon('🥷', 'Ассасин'),
  hero_knight: icon('🛡️', 'Рыцарь', '#dbeafe', '#60a5fa'),
  hero_mage: icon('🧙‍♂️', 'Маг', '#ede9fe', '#8b5cf6'),
  hero_archer: icon('🏹', 'Лучник', '#dcfce7', '#22c55e'),
  hero_rogue: icon('🗡️', 'Разбойник', '#fee2e2', '#ef4444'),
  slime: icon('🟢', 'Слизняк', '#dcfce7', '#22c55e'),
  wolf: icon('🐺', 'Волк', '#e5e7eb', '#64748b'),
  goblin: icon('👺', 'Гоблин', '#fecaca', '#ef4444'),
  skeleton: icon('💀', 'Скелет', '#f8fafc', '#94a3b8'),
  golem: icon('🪨', 'Голем', '#e2e8f0', '#64748b'),
  bat: icon('🦇', 'Мышь', '#ddd6fe', '#6d28d9'),
  thief: icon('🦝', 'Вор', '#fed7aa', '#ea580c'),
  ghost: icon('👻', 'Призрак', '#f5f3ff', '#a78bfa'),
  mushroom: icon('🍄', 'Мухомор', '#fecdd3', '#e11d48'),
  boss: icon('🐲', 'Босс', '#fee2e2', '#991b1b'),
  forest: icon('🌳', 'Лес', '#dcfce7', '#16a34a'),
  griffon: icon('🦅', 'Грифон', '#fef3c7', '#d97706'),
  halls: icon('🏛️', 'Чертоги', '#f1f5f9', '#64748b'),
  cave: icon('⛰️', 'Пещера', '#ede9fe', '#7c3aed'),
  ice: icon('❄️', 'Лед', '#cffafe', '#0891b2'),
  spire: icon('🗼', 'Шпиль', '#ddd6fe', '#4c1d95'),
  storm: icon('⛈️', 'Гроза', '#dbeafe', '#2563eb'),
  location_green_meadow: icon('🌿', 'Зеленая Опушка', '#bbf7d0', '#22c55e'),
  location_griffin_meadow: icon('🦅', 'Грифонова Опушка', '#fde68a', '#f59e0b'),
  location_stone_halls: icon('🏛️', 'Каменные Чертоги', '#e2e8f0', '#64748b'),
  location_cave: icon('⛰️', 'Пещера Страха', '#ddd6fe', '#7c3aed'),
  location_ice_rift: icon('❄️', 'Ледяное Ущелье', '#cffafe', '#06b6d4'),
  location_shadow_spire: icon('🗼', 'Теневой Шпиль', '#c4b5fd', '#4c1d95'),
  location_storm_court: icon('⛈️', 'Грозовая Свита', '#bfdbfe', '#2563eb'),
  location_tournament: icon('🏆', 'Турнир Рыцарей', '#fef3c7', '#d97706'),
  location_academy: icon('🏰', 'Магическая Академия', '#ede9fe', '#8b5cf6'),
  location_final_castle: icon('🏯', 'Финальный Замок', '#fecdd3', '#be123c'),
  sword: icon('⚔️', 'Меч'),
  staff: icon('🔥', 'Посох'),
  shield: icon('🛡️', 'Щит'),
  helmet: icon('⛑️', 'Шлем'),
  chest: icon('🎁', 'Сундук'),
  coin: icon('🪙', 'Монета'),
  heart: icon('❤️', 'Сердце'),
  xp: icon('⭐', 'Опыт'),
  map: icon('🗺️', 'Карта'),
  shop: icon('🏪', 'Магазин'),
  collection: icon('📚', 'Коллекция'),
  progress: icon('📈', 'Прогресс'),
  spark: icon('✨', 'Искра'),
  settings: icon('⚙️', 'Настройки'),
  ui_sound: icon('🔊', 'Звук'),
  ui_star: icon('⭐', 'Звезда'),
  ui_attack: icon('⚔️', 'Атака'),
  ui_timer: icon('⏱️', 'Таймер'),
  ui_xp: icon('⭐', 'Опыт'),
  ui_marathon: icon('🏃', 'Марафон'),
  ui_chest: icon('🎁', 'Сундук'),
} as const;

export type IconId = keyof typeof iconRegistry;
export type IconName = IconId;

export const getIcon = (name: IconId): IconDefinition => iconRegistry[name] ?? iconRegistry.spark;
export const getIconEmoji = (name: IconId) => getIcon(name).emojiFallback;
