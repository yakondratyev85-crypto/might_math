import type { AnswerMode } from '../data/chapters';
import type { Sublevel } from '../data/sublevels';
import type { Topic } from '../data/topics';
import type { AnswerType } from './answerValidation';

export type MathQuestion = {
  id: string;
  prompt: string;
  correctAnswer: string | number;
  options?: Array<string | number>;
  explanation: string;
  skill: string;
  difficulty: number;
  visualHint?: string;
  rpgAction: string;
  answerType?: AnswerType;
};

type QuestionContext = {
  topic: Topic;
  sublevel: Sublevel;
  taskIndex: number;
  answerMode: AnswerMode;
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const qid = (prefix: string, context: QuestionContext) => `${prefix}-${context.topic.id}-${context.sublevel.id}-${context.taskIndex}-${Date.now()}-${randomInt(1, 999)}`;

const withOptions = (question: MathQuestion, answerMode: AnswerMode): MathQuestion => {
  if (answerMode !== 'choice') {
    return question;
  }

  const answer = question.correctAnswer;
  const wrongs: Array<string | number> = [];
  if (question.answerType === 'comparison') {
    wrongs.push(...['>', '<', '=', '≠'].filter((item) => item !== answer));
  } else {
    const numeric = Number(answer);
    const deltas = [-2, -1, 1, 2, 3, -3, 4];
    deltas.forEach((delta) => {
      const candidate = Math.max(0, numeric + delta);
      if (candidate !== numeric && !wrongs.includes(candidate)) {
        wrongs.push(candidate);
      }
    });
  }

  return { ...question, options: shuffle([answer, ...wrongs].slice(0, 4)) };
};

const difficulty = (context: QuestionContext) => context.topic.difficulty + context.sublevel.difficultyBonus;
const maxByContext = (context: QuestionContext, fallback: number) => Math.max(3, context.topic.generatorConfig.maxNumber || fallback);

export const generateCountingQuestion = (context: QuestionContext): MathQuestion => {
  const count = randomInt(1, Math.min(maxByContext(context, 10), 10 + context.sublevel.difficultyBonus));
  const items = ['яблоко', 'кристалл', 'щит', 'гриб'];
  const item = items[randomInt(0, items.length - 1)];
  return withOptions({
    id: qid('count', context),
    prompt: `Сколько предметов у феи? ${'● '.repeat(count)}`,
    correctAnswer: count,
    explanation: `Нужно посчитать каждый ${item} по одному. Получается ${count}.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Посчитай предметы по одному, не спеши.',
    rpgAction: 'герой собирает светлячков',
    answerType: 'number',
  }, context.answerMode);
};

export const generateAdditionQuestion = (context: QuestionContext): MathQuestion => {
  const max = maxByContext(context, 20);
  const a = randomInt(1, Math.max(2, Math.floor(max / 2)));
  const b = randomInt(1, Math.max(2, max - a));
  return withOptions({
    id: qid('add', context),
    prompt: `${a} + ${b} = ?`,
    correctAnswer: a + b,
    explanation: `Сложи ${a} и ${b}: получится ${a + b}.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: max <= 10 ? 'Можно досчитать на пальцах.' : 'Разбей числа на удобные части.',
    rpgAction: 'удар мечом сложения',
    answerType: 'number',
  }, context.answerMode);
};

export const generateSubtractionQuestion = (context: QuestionContext): MathQuestion => {
  const max = maxByContext(context, 20);
  const a = randomInt(2, max);
  const b = randomInt(1, a - 1);
  return withOptions({
    id: qid('sub', context),
    prompt: `${a} − ${b} = ?`,
    correctAnswer: a - b,
    explanation: `Если из ${a} убрать ${b}, останется ${a - b}.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Представь, что щит закрывает часть предметов.',
    rpgAction: 'блок щитом',
    answerType: 'number',
  }, context.answerMode);
};

export const generateComparisonQuestion = (context: QuestionContext): MathQuestion => {
  const max = maxByContext(context, 30);
  const a = randomInt(1, max);
  const b = randomInt(1, max);
  const correctAnswer = a === b ? '=' : a > b ? '>' : '<';
  return withOptions({
    id: qid('compare', context),
    prompt: `${a} □ ${b}`,
    correctAnswer,
    explanation: `${a} ${correctAnswer} ${b}, потому что сравниваем левое и правое число.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: max <= 10 ? 'Сравни, где больше яблок.' : 'Сначала оцени левую сторону, потом правую.',
    rpgAction: 'дуэль силы',
    answerType: 'comparison',
  }, context.answerMode);
};

export const generateMissingNumberQuestion = (context: QuestionContext): MathQuestion => {
  const max = maxByContext(context, 20);
  const a = randomInt(1, Math.max(2, Math.floor(max / 2)));
  const answer = randomInt(1, Math.max(2, Math.floor(max / 2)));
  return withOptions({
    id: qid('missing', context),
    prompt: `${a} + □ = ${a + answer}`,
    correctAnswer: answer,
    explanation: `Нужно найти, сколько добавить к ${a}, чтобы получить ${a + answer}.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Магическая руна — это недостающее число.',
    rpgAction: 'магическая руна',
    answerType: 'number',
  }, context.answerMode);
};

export const generateTwoDigitQuestion = (context: QuestionContext): MathQuestion => {
  const a = randomInt(10, Math.min(99, maxByContext(context, 100)));
  const b = randomInt(10, Math.min(99, maxByContext(context, 100)));
  const add = Math.random() > 0.5;
  const left = add ? a : Math.max(a, b);
  const right = add ? b : Math.min(a, b);
  const answer = add ? left + right : left - right;
  return withOptions({
    id: qid('two', context),
    prompt: `${left} ${add ? '+' : '−'} ${right} = ?`,
    correctAnswer: answer,
    explanation: 'Разбей число на десятки и единицы, затем посчитай.',
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Разбей число на десятки и единицы.',
    rpgAction: 'каменный удар',
    answerType: 'number',
  }, context.answerMode);
};

export const generateMultiplicationQuestion = (context: QuestionContext): MathQuestion => {
  const max = Math.min(10, maxByContext(context, 10));
  const fixedTable = context.topic.title.match(/на (\d+)/)?.[1];
  const a = fixedTable ? Number(fixedTable) : randomInt(2, max);
  const b = randomInt(2, 10);
  return withOptions({
    id: qid('mul', context),
    prompt: `${a} × ${b} = ?`,
    correctAnswer: a * b,
    explanation: `${a} × ${b} — это ${b} одинаковых групп по ${a}.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Умножение — это несколько одинаковых групп.',
    rpgAction: 'комбо-удар',
    answerType: 'number',
  }, context.answerMode);
};

export const generateDivisionQuestion = (context: QuestionContext): MathQuestion => {
  const divisor = randomInt(2, 9);
  const answer = randomInt(2, Math.max(3, Math.min(10, Math.floor(maxByContext(context, 50) / divisor))));
  const total = divisor * answer;
  return withOptions({
    id: qid('div', context),
    prompt: `${total} ÷ ${divisor} = ?`,
    correctAnswer: answer,
    explanation: `Раздели ${total} на ${divisor} равных частей. В каждой будет ${answer}.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Раздели добычу поровну между героями.',
    rpgAction: 'разделить добычу',
    answerType: 'number',
  }, context.answerMode);
};

export const generateMoneyQuestion = (context: QuestionContext): MathQuestion => {
  const price = randomInt(3, 25);
  const count = randomInt(2, 5);
  const paid = price * count + randomInt(1, 20);
  return withOptions({
    id: qid('money', context),
    prompt: `Зелье стоит ${price} монет. Купили ${count}. Сколько сдачи с ${paid}?`,
    correctAnswer: paid - price * count,
    explanation: `Сначала ${price} × ${count}, потом вычти стоимость из ${paid}.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Подумай, сколько останется после покупки.',
    rpgAction: 'торг в лавке',
    answerType: 'number',
  }, context.answerMode);
};

export const generateTimeQuestion = (context: QuestionContext): MathQuestion => {
  const start = randomInt(1, 10);
  const duration = randomInt(1, 8);
  return withOptions({
    id: qid('time', context),
    prompt: `Поход начался в ${start}:00 и длился ${duration} ч. Во сколько закончился?`,
    correctAnswer: start + duration,
    explanation: `К ${start} прибавляем ${duration}.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Передвинь стрелку часов вперед.',
    rpgAction: 'маршрут по карте',
    answerType: 'number',
  }, context.answerMode);
};

export const generatePerimeterQuestion = (context: QuestionContext): MathQuestion => {
  const a = randomInt(2, 20);
  const b = randomInt(2, 20);
  return withOptions({
    id: qid('perimeter', context),
    prompt: `Периметр прямоугольника со сторонами ${a} и ${b}?`,
    correctAnswer: 2 * (a + b),
    explanation: 'Периметр — сумма всех сторон: a + b + a + b.',
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Сложи все стороны стены замка.',
    rpgAction: 'строительство стены',
    answerType: 'number',
  }, context.answerMode);
};

export const generateAreaQuestion = (context: QuestionContext): MathQuestion => {
  const a = randomInt(2, 12);
  const b = randomInt(2, 12);
  return withOptions({
    id: qid('area', context),
    prompt: `Площадь поля ${a} × ${b}?`,
    correctAnswer: a * b,
    explanation: 'Площадь прямоугольника — длина умножить на ширину.',
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Посчитай клетки поля рядами.',
    rpgAction: 'магическая печать',
    answerType: 'number',
  }, context.answerMode);
};

export const generateFractionsQuestion = (context: QuestionContext): MathQuestion => {
  const a = randomInt(1, 8);
  const b = randomInt(1, 8);
  return withOptions({
    id: qid('fraction', context),
    prompt: `Что больше: ${a}/10 или ${b}/10? Введи >, < или =`,
    correctAnswer: a === b ? '=' : a > b ? '>' : '<',
    explanation: 'Если знаменатели одинаковые, сравниваем числители.',
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'У одинаковых долей сравни верхние числа.',
    rpgAction: 'сравнение кристаллов',
    answerType: 'comparison',
  }, context.answerMode);
};

export const generateEquationQuestion = (context: QuestionContext): MathQuestion => {
  const x = randomInt(2, 12);
  const b = randomInt(3, 20);
  return withOptions({
    id: qid('equation', context),
    prompt: `x + ${b} = ${x + b}. Найди x`,
    correctAnswer: x,
    explanation: `Вычти ${b} из ${x + b}, чтобы найти неизвестное.`,
    skill: context.topic.mathSkill,
    difficulty: difficulty(context),
    visualHint: 'Неизвестное число прячется под руной.',
    rpgAction: 'разгадка руны',
    answerType: 'number',
  }, context.answerMode);
};

export const generateMixedBossQuestion = (context: QuestionContext): MathQuestion => {
  const generators = [generateAdditionQuestion, generateSubtractionQuestion, generateComparisonQuestion, generateMissingNumberQuestion, generateMultiplicationQuestion];
  return generators[randomInt(0, generators.length - 1)](context);
};

export const generateQuestion = (context: QuestionContext): MathQuestion => {
  const kind = context.topic.generatorConfig.kind;
  if (kind === 'counting') return generateCountingQuestion(context);
  if (kind === 'addition') return generateAdditionQuestion(context);
  if (kind === 'subtraction') return generateSubtractionQuestion(context);
  if (kind === 'comparison') return generateComparisonQuestion(context);
  if (kind === 'missing') return generateMissingNumberQuestion(context);
  if (kind === 'twoDigit') return generateTwoDigitQuestion(context);
  if (kind === 'multiplication') return generateMultiplicationQuestion(context);
  if (kind === 'division') return generateDivisionQuestion(context);
  if (kind === 'money') return generateMoneyQuestion(context);
  if (kind === 'time') return generateTimeQuestion(context);
  if (kind === 'perimeter') return generatePerimeterQuestion(context);
  if (kind === 'area') return generateAreaQuestion(context);
  if (kind === 'fractions') return generateFractionsQuestion(context);
  if (kind === 'equation') return generateEquationQuestion(context);
  return generateMixedBossQuestion(context);
};
