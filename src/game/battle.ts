import type { Enemy } from '../data/enemies';
import type { MathMode } from '../data/mathModes';
import type { PlayerState } from '../storage/playerStorage';

export const heroMaxHp = (player: PlayerState) => 70 + player.heroLevel * 8 + player.hearts * 2;

export const monsterMaxHp = (enemy: Enemy, mode: MathMode) => enemy.hp + mode.difficulty * 4;

export const heroDamage = (player: PlayerState, mode: MathMode) => 12 + player.heroLevel * 2 + mode.difficulty;

export const monsterDamage = (enemy: Enemy, mode: MathMode) => 7 + Math.floor(enemy.hp / 12) + mode.difficulty;
