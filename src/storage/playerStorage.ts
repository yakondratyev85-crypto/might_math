import { chapters } from '../data/chapters';
import { items } from '../data/items';
import type { CharacterAvatar } from '../game/avatar';
import type { SoundSettings } from '../game/sound';

export const SAVE_VERSION = 3;
const STORAGE_KEY = 'math-knight-player-v3';
const LEGACY_KEYS = ['math-knight-player-v1', 'math-knight-player-v2'];

export type PlayerSettings = {
  sound: SoundSettings;
  interfaceMode: 'soft' | 'contrast';
  textSize: 'normal' | 'large';
};

export type PlayerStats = {
  correctAnswers: number;
  wrongAnswers: number;
  wins: number;
  battles: number;
};

export type PlayerState = {
  saveVersion: number;
  coins: number;
  xp: number;
  heroLevel: number;
  hearts: number;
  chests: number;
  unlockedLocations: string[];
  unlockedChapters: string[];
  completedSublevels: string[];
  bestMarathonScore: number;
  avatar: CharacterAvatar;
  purchasedItems: string[];
  equippedItems: Partial<Record<'weapon' | 'shield' | 'helmet', string>>;
  settings: PlayerSettings;
  collection: {
    heroes: string[];
    enemies: string[];
    items: string[];
    chests: string[];
    achievements: string[];
  };
  stats: PlayerStats;
};

export const defaultPlayerState: PlayerState = {
  saveVersion: SAVE_VERSION,
  coins: 35,
  xp: 0,
  heroLevel: 1,
  hearts: 5,
  chests: 0,
  unlockedLocations: [chapters[0].locationId],
  unlockedChapters: [chapters[0].id],
  completedSublevels: [],
  bestMarathonScore: 0,
  avatar: { name: 'Ари', classId: 'knight', cloakColor: 'green' },
  purchasedItems: [items[0].id, items[4].id],
  equippedItems: {
    weapon: items[0].id,
    shield: items[4].id,
  },
  settings: {
    sound: { enabled: true, volume: 75 },
    interfaceMode: 'soft',
    textSize: 'normal',
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
};

const cloneDefaultState = (): PlayerState => JSON.parse(JSON.stringify(defaultPlayerState));

const clearLegacySaves = () => {
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
};

const normalizeState = (state: Partial<PlayerState>): PlayerState => ({
  ...cloneDefaultState(),
  ...state,
  saveVersion: SAVE_VERSION,
  settings: {
    ...defaultPlayerState.settings,
    ...state.settings,
    sound: {
      ...defaultPlayerState.settings.sound,
      ...state.settings?.sound,
    },
  },
  collection: {
    ...defaultPlayerState.collection,
    ...state.collection,
  },
  stats: {
    ...defaultPlayerState.stats,
    ...state.stats,
  },
});

export const loadPlayerState = (): PlayerState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const legacySaveExists = LEGACY_KEYS.some((key) => localStorage.getItem(key));

    if (!saved) {
      if (legacySaveExists) {
        clearLegacySaves();
        const fresh = cloneDefaultState();
        savePlayerState(fresh);
        return fresh;
      }
      return cloneDefaultState();
    }

    const parsed = JSON.parse(saved) as Partial<PlayerState>;
    if ((parsed.saveVersion ?? 0) < SAVE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      clearLegacySaves();
      const fresh = cloneDefaultState();
      savePlayerState(fresh);
      return fresh;
    }

    return normalizeState(parsed);
  } catch {
    clearLegacySaves();
    return cloneDefaultState();
  }
};

export const savePlayerState = (state: PlayerState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, saveVersion: SAVE_VERSION }));
};

export const resetPlayerState = (): PlayerState => {
  localStorage.removeItem(STORAGE_KEY);
  clearLegacySaves();
  const fresh = cloneDefaultState();
  savePlayerState(fresh);
  return fresh;
};
