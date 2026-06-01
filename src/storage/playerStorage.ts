import { items } from '../data/items';
import { locations } from '../data/locations';

const STORAGE_KEY = 'math-knight-player-v1';

export type PlayerStats = {
  correctAnswers: number;
  wrongAnswers: number;
  wins: number;
  battles: number;
};

export type PlayerState = {
  coins: number;
  xp: number;
  heroLevel: number;
  hearts: number;
  chests: number;
  unlockedLocations: string[];
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
};

export const defaultPlayerState: PlayerState = {
  coins: 35,
  xp: 0,
  heroLevel: 1,
  hearts: 5,
  chests: 0,
  unlockedLocations: [locations[0].id],
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
};

export const loadPlayerState = (): PlayerState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return defaultPlayerState;
    }

    return {
      ...defaultPlayerState,
      ...JSON.parse(saved),
      collection: {
        ...defaultPlayerState.collection,
        ...JSON.parse(saved).collection,
      },
      stats: {
        ...defaultPlayerState.stats,
        ...JSON.parse(saved).stats,
      },
    };
  } catch {
    return defaultPlayerState;
  }
};

export const savePlayerState = (state: PlayerState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const resetPlayerState = () => {
  localStorage.removeItem(STORAGE_KEY);
};
