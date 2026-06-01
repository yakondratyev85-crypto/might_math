export type AnswerType = 'number' | 'comparison' | 'text';

const comparisonAliases: Record<string, string> = {
  больше: '>',
  'больше чем': '>',
  more: '>',
  greater: '>',
  меньше: '<',
  'меньше чем': '<',
  less: '<',
  равно: '=',
  равны: '=',
  equal: '=',
  equals: '=',
};

export const normalizeAnswer = (value: string | number, answerType: AnswerType = 'number') => {
  const raw = String(value).trim().replace(',', '.').toLowerCase();
  if (answerType === 'comparison') {
    return comparisonAliases[raw] ?? raw;
  }
  if (answerType === 'number') {
    const numeric = Number(raw);
    return Number.isFinite(numeric) ? String(numeric) : raw;
  }
  return raw.replace(/\s+/g, ' ');
};

export const isAnswerCorrect = (userAnswer: string | number, correctAnswer: string | number, answerType: AnswerType = 'number') =>
  normalizeAnswer(userAnswer, answerType) === normalizeAnswer(correctAnswer, answerType);
