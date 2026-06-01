import { defaultAvatar, type CharacterAvatar } from '../game/avatar';
import { items } from '../data/items';
import { locations } from '../data/locations';
import { chapters } from '../data/chapters';
import type { SoundSettings } from '../game/sound';

export const SAVE_VERSION = 4;
const STORAGE_KEY = 'math-knight-player-v1';

export type PlayerStats = {
  correctAnswers: number;
  wrongAnswers: number;
  wins: number;
  battles: number;
};

export type PlayerSettings = {
  sound: SoundSettings;
  interfaceMode: 'soft' | 'contrast';
  textSize: 'normal' | 'large';
};

export type PlayerProgress = {
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

export type PlayerState = PlayerProgress;

type SaveFile = {
  version: typeof SAVE_VERSION;
  savedAt: string;
  progress: PlayerProgress;
};

export const defaultPlayerState: PlayerProgress = {
  coins: 35,
  xp: 0,
  heroLevel: 1,
  hearts: 5,
  chests: 0,
  unlockedLocations: [locations[0].id],
  unlockedChapters: [chapters[0].id],
  completedSublevels: [],
  bestMarathonScore: 0,
  avatar: defaultAvatar,
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

const cloneDefaultProgress = (): PlayerProgress => JSON.parse(JSON.stringify(defaultPlayerState));

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string');
const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const isPlayerProgress = (value: unknown): value is PlayerProgress => {
  if (!isRecord(value) || !isRecord(value.collection) || !isRecord(value.stats) || !isRecord(value.settings)) {
    return false;
  }

  const settings = value.settings;
  return (
    isNumber(value.coins) &&
    isNumber(value.xp) &&
    isNumber(value.heroLevel) &&
    isNumber(value.hearts) &&
    isNumber(value.chests) &&
    isStringArray(value.unlockedLocations) &&
    isStringArray(value.unlockedChapters) &&
    isStringArray(value.completedSublevels) &&
    isNumber(value.bestMarathonScore) &&
    isRecord(value.avatar) &&
    isStringArray(value.purchasedItems) &&
    isRecord(value.equippedItems) &&
    isRecord(settings.sound) &&
    typeof settings.sound.enabled === 'boolean' &&
    isNumber(settings.sound.volume) &&
    (settings.interfaceMode === 'soft' || settings.interfaceMode === 'contrast') &&
    (settings.textSize === 'normal' || settings.textSize === 'large') &&
    isStringArray(value.collection.heroes) &&
    isStringArray(value.collection.enemies) &&
    isStringArray(value.collection.items) &&
    isStringArray(value.collection.chests) &&
    isStringArray(value.collection.achievements) &&
    isNumber(value.stats.correctAnswers) &&
    isNumber(value.stats.wrongAnswers) &&
    isNumber(value.stats.wins) &&
    isNumber(value.stats.battles)
  );
};

const writeProgress = (progress: PlayerProgress) => {
  const saveFile: SaveFile = {
    version: SAVE_VERSION,
    savedAt: new Date().toISOString(),
    progress,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveFile));
};

const clearSavedProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const createNewProgress = () => {
  const progress = cloneDefaultProgress();
  writeProgress(progress);
  return progress;
};

export const loadPlayerState = (): PlayerState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return createNewProgress();
  }

  try {
    const parsed = JSON.parse(saved) as unknown;
    if (!isRecord(parsed) || parsed.version !== SAVE_VERSION || !isPlayerProgress(parsed.progress)) {
      clearSavedProgress();
      return createNewProgress();
    }

    return parsed.progress;
  } catch {
    clearSavedProgress();
    return createNewProgress();
  }
};

export const savePlayerState = (progress: PlayerState) => {
  writeProgress(progress);
};

export const resetProgress = (): PlayerState => {
  clearSavedProgress();
  return createNewProgress();
};

export const resetPlayerState = resetProgress;
