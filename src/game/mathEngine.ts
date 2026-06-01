import type { MathModeId } from '../data/mathModes';

export type MathQuestion = {
  prompt: string;
  answer: number | string;
  options: Array<number | string>;
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const withOptions = (prompt: string, answer: number | string, pool: Array<number | string>): MathQuestion => {
  const unique = Array.from(new Set([answer, ...pool])).slice(0, 4);
  while (unique.length < 4) {
    const next = typeof answer === 'number' ? answer + randomInt(-8, 8) : randomInt(1, 20);
    if (!unique.includes(next)) {
      unique.push(next);
    }
  }

  return { prompt, answer, options: shuffle(unique) };
};

export const createQuestion = (mode: MathModeId): MathQuestion => {
  if (mode === 'add10') {
    const a = randomInt(1, 9);
    const b = randomInt(1, 10 - a);
    const answer = a + b;
    return withOptions(`${a} + ${b} = ?`, answer, [answer - 1, answer + 1, answer + 2]);
  }

  if (mode === 'add20') {
    const a = randomInt(3, 12);
    const b = randomInt(2, 20 - a);
    const answer = a + b;
    return withOptions(`${a} + ${b} = ?`, answer, [answer - 2, answer + 1, answer + 3]);
  }

  if (mode === 'subtract') {
    const a = randomInt(6, 20);
    const b = randomInt(1, a - 1);
    const answer = a - b;
    return withOptions(`${a} − ${b} = ?`, answer, [answer - 1, answer + 2, b]);
  }

  if (mode === 'missing') {
    const a = randomInt(2, 12);
    const answer = randomInt(1, 10);
    const sum = a + Number(answer);
    return withOptions(`${a} + □ = ${sum}`, answer, [Number(answer) - 1, Number(answer) + 1, a]);
  }

  if (mode === 'compare') {
    const a = randomInt(1, 30);
    const b = randomInt(1, 30);
    const answer = a === b ? '=' : a > b ? '>' : '<';
    return withOptions(`${a} □ ${b}`, answer, ['>', '<', '=']);
  }

  if (mode === 'multiply') {
    const a = randomInt(2, 9);
    const b = randomInt(2, 9);
    const answer = a * b;
    return withOptions(`${a} × ${b} = ?`, answer, [answer - a, answer + b, answer + a]);
  }

  if (mode === 'divide') {
    const b = randomInt(2, 9);
    const answer = randomInt(2, 9);
    const a = b * answer;
    return withOptions(`${a} ÷ ${b} = ?`, answer, [answer - 1, answer + 1, b]);
  }

  const modes: MathModeId[] = ['add20', 'subtract', 'missing', 'compare', 'multiply', 'divide'];
  return createQuestion(modes[randomInt(0, modes.length - 1)]);
};
