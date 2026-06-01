import { chapters } from '../data/chapters';
import { items } from '../data/items';
import { defaultAvatar, type CharacterAvatar } from '../game/avatar';
import type { SoundSettings } from '../game/sound';

const STORAGE_KEY = 'math-knight-player-v2';
const LEGACY_STORAGE_KEY = 'math-knight-player-v1';

export type InterfaceMode = 'soft' | 'contrast';
export type TextSize = 'normal' | 'large';

export type PlayerStats = {
  correctAnswers: number;
  wrongAnswers: number;
  wins: number;
  battles: number;
};

export type PlayerSettings = {
  sound: SoundSettings;
  interfaceMode: InterfaceMode;
  textSize: TextSize;
};

export type PlayerState = {
  coins: number;
  xp: number;
  heroLevel: number;
  hearts: number;
  chests: number;
  currentChapter: string;
  unlockedChapters: string[];
  unlockedLocations: string[];
  completedTopics: string[];
  completedSublevels: string[];
  sublevelResults: Record<string, { correct: number; wrong: number; stars: number }>;
  stars: Record<string, number>;
  correctStreak: number;
  bestMarathonScore: number;
  avatar: CharacterAvatar;
  purchasedItems: string[];
  equippedItems: Partial<Record<'weapon' | 'shield' | 'helmet', string>>;
  collection: {
    heroes: string[];
    enemies: string[];
    items: string[];
    chests: string[];
    achievements: string[];
  };
  stats: PlayerStats;
  settings: PlayerSettings;
};

export const defaultPlayerState: PlayerState = {
  coins: 35,
  xp: 0,
  heroLevel: 1,
  hearts: 5,
  chests: 0,
  currentChapter: chapters[0].id,
  unlockedChapters: [chapters[0].id],
  unlockedLocations: ['green-edge'],
  completedTopics: [],
  completedSublevels: [],
  sublevelResults: {},
  stars: {},
  correctStreak: 0,
  bestMarathonScore: 0,
  avatar: defaultAvatar,
  purchasedItems: [items[0].id, items[4].id],
  equippedItems: {
    weapon: items[0].id,
    shield: items[4].id,
  },
  collection: {
    heroes: ['arithmetic-knight'],
    enemies: [],
    items: [items[0].id, items[4].id],
    chests: [],
    achievements: ['Первый шаг рыцаря'],
  },
  stats: {
    correctAnswers: 0,
    wrongAnswers: 0,
    wins: 0,
    battles: 0,
  },
  settings: {
    sound: { enabled: true, volume: 55 },
    interfaceMode: 'soft',
    textSize: 'normal',
  },
};

const mergeState = (parsed: Partial<PlayerState>): PlayerState => ({
  ...defaultPlayerState,
  ...parsed,
  avatar: { ...defaultPlayerState.avatar, ...parsed.avatar },
  collection: { ...defaultPlayerState.collection, ...parsed.collection },
  stats: { ...defaultPlayerState.stats, ...parsed.stats },
  settings: {
    ...defaultPlayerState.settings,
    ...parsed.settings,
    sound: { ...defaultPlayerState.settings.sound, ...parsed.settings?.sound },
  },
});

export const loadPlayerState = (): PlayerState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!saved) {
      return defaultPlayerState;
    }
    return mergeState(JSON.parse(saved));
  } catch {
    return defaultPlayerState;
  }
};

export const savePlayerState = (state: PlayerState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const resetPlayerState = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
};
