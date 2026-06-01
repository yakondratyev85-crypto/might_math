import { chapters, type AnswerMode } from './chapters';

type GeneratorKind =
  | 'counting'
  | 'addition'
  | 'subtraction'
  | 'comparison'
  | 'missing'
  | 'twoDigit'
  | 'multiplication'
  | 'division'
  | 'money'
  | 'time'
  | 'perimeter'
  | 'area'
  | 'fractions'
  | 'equation'
  | 'mixedBoss';

export type TopicReward = {
  coins: number;
  xp: number;
  stars: number;
};

export type Topic = {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  ageRange: string;
  mathSkill: string;
  difficulty: number;
  enemyId: string;
  locationId: string;
  reward: TopicReward;
  generatorConfig: {
    kind: GeneratorKind;
    maxNumber: number;
    allowNegative?: boolean;
    allowDecimal?: boolean;
  };
  answerMode: AnswerMode;
};

const enemyCycle = ['green-slime', 'wild-wolf', 'forest-goblin', 'ancient-skeleton', 'stone-golem', 'night-bat', 'cave-thief', 'ruins-ghost', 'toxic-mushroom', 'super-boss'];

const chapterTopics: Record<string, Array<{ title: string; skill: string; kind: GeneratorKind; max: number }>> = {
  green_meadow: [
    { title: 'счёт предметов до 5', skill: 'счет', kind: 'counting', max: 5 },
    { title: 'счёт предметов до 10', skill: 'счет', kind: 'counting', max: 10 },
    { title: 'больше / меньше', skill: 'сравнение', kind: 'comparison', max: 10 },
    { title: 'равно / не равно', skill: 'сравнение', kind: 'comparison', max: 10 },
    { title: 'сложение до 5', skill: 'сложение', kind: 'addition', max: 5 },
    { title: 'вычитание до 5', skill: 'вычитание', kind: 'subtraction', max: 5 },
    { title: 'фигуры', skill: 'геометрия', kind: 'counting', max: 6 },
    { title: 'соседи числа', skill: 'числовой ряд', kind: 'missing', max: 10 },
    { title: 'числовой ряд', skill: 'последовательность', kind: 'missing', max: 10 },
    { title: 'мини-босс опушки', skill: 'повторение', kind: 'mixedBoss', max: 10 },
  ],
  griffin_meadow: [
    { title: 'сложение до 10', skill: 'сложение', kind: 'addition', max: 10 },
    { title: 'вычитание до 10', skill: 'вычитание', kind: 'subtraction', max: 10 },
    { title: 'состав числа 10', skill: 'состав числа', kind: 'missing', max: 10 },
    { title: 'сложение до 20', skill: 'сложение', kind: 'addition', max: 20 },
    { title: 'вычитание до 20', skill: 'вычитание', kind: 'subtraction', max: 20 },
    { title: 'пропущенное число', skill: 'уравнение', kind: 'missing', max: 20 },
    { title: 'сравнение выражений', skill: 'сравнение', kind: 'comparison', max: 20 },
    { title: 'задачи в 1 действие', skill: 'текстовые задачи', kind: 'addition', max: 20 },
    { title: 'путь по числам', skill: 'маршрут', kind: 'missing', max: 20 },
    { title: 'мини-босс моста', skill: 'повторение', kind: 'mixedBoss', max: 20 },
  ],
  stone_halls: [
    { title: 'десятки и единицы', skill: 'разряды', kind: 'twoDigit', max: 100 },
    { title: 'числа до 100', skill: 'числа', kind: 'twoDigit', max: 100 },
    { title: 'сложение двузначных', skill: 'сложение', kind: 'twoDigit', max: 100 },
    { title: 'вычитание двузначных', skill: 'вычитание', kind: 'twoDigit', max: 100 },
    { title: 'задачи в 2 действия', skill: 'текстовые задачи', kind: 'mixedBoss', max: 100 },
    { title: 'чётные и нечётные', skill: 'четность', kind: 'comparison', max: 100 },
    { title: 'округление до десятков', skill: 'округление', kind: 'twoDigit', max: 100 },
    { title: 'таблицы с числами', skill: 'таблицы', kind: 'missing', max: 100 },
    { title: 'найди ошибку', skill: 'проверка', kind: 'comparison', max: 100 },
    { title: 'мини-босс библиотеки', skill: 'повторение', kind: 'mixedBoss', max: 100 },
  ],
  fear_cave: [
    { title: 'деление поровну', skill: 'деление', kind: 'division', max: 40 },
    { title: 'деление по содержанию', skill: 'деление', kind: 'division', max: 50 },
    { title: 'деление с остатком', skill: 'деление', kind: 'division', max: 60 },
    { title: 'деньги', skill: 'деньги', kind: 'money', max: 100 },
    { title: 'цена', skill: 'стоимость', kind: 'money', max: 100 },
    { title: 'количество', skill: 'стоимость', kind: 'money', max: 100 },
    { title: 'стоимость', skill: 'стоимость', kind: 'money', max: 100 },
    { title: 'задачи на остаток', skill: 'остаток', kind: 'money', max: 100 },
    { title: 'логические ловушки', skill: 'логика', kind: 'mixedBoss', max: 100 },
    { title: 'мини-босс пещеры', skill: 'повторение', kind: 'mixedBoss', max: 100 },
  ],
  ice_rift: [
    { title: 'умножение как повторение', skill: 'умножение', kind: 'multiplication', max: 5 },
    { title: 'таблица умножения на 2', skill: 'умножение', kind: 'multiplication', max: 2 },
    { title: 'таблица умножения на 3', skill: 'умножение', kind: 'multiplication', max: 3 },
    { title: 'таблица умножения на 4', skill: 'умножение', kind: 'multiplication', max: 4 },
    { title: 'таблица умножения на 5', skill: 'умножение', kind: 'multiplication', max: 5 },
    { title: 'таблица умножения на 6', skill: 'умножение', kind: 'multiplication', max: 6 },
    { title: 'таблица умножения на 7', skill: 'умножение', kind: 'multiplication', max: 7 },
    { title: 'таблица умножения на 8–9', skill: 'умножение', kind: 'multiplication', max: 9 },
    { title: 'умножение на 10', skill: 'умножение', kind: 'multiplication', max: 10 },
    { title: 'мини-босс льда', skill: 'повторение', kind: 'mixedBoss', max: 100 },
  ],
  shadow_spire: [
    { title: 'порядок действий', skill: 'порядок действий', kind: 'equation', max: 50 },
    { title: 'скобки', skill: 'скобки', kind: 'equation', max: 50 },
    { title: 'неизвестное слагаемое', skill: 'уравнения', kind: 'equation', max: 50 },
    { title: 'неизвестное уменьшаемое', skill: 'уравнения', kind: 'equation', max: 50 },
    { title: 'неизвестный множитель', skill: 'уравнения', kind: 'equation', max: 50 },
    { title: 'простые уравнения', skill: 'уравнения', kind: 'equation', max: 70 },
    { title: 'магические руны', skill: 'пропуски', kind: 'missing', max: 70 },
    { title: 'цепочки примеров', skill: 'цепочки', kind: 'mixedBoss', max: 70 },
    { title: 'задачи с лишними данными', skill: 'логика', kind: 'mixedBoss', max: 70 },
    { title: 'мини-босс теней', skill: 'повторение', kind: 'mixedBoss', max: 80 },
  ],
  storm_court: [
    { title: 'многозначные числа', skill: 'числа', kind: 'twoDigit', max: 1000 },
    { title: 'величины', skill: 'величины', kind: 'time', max: 100 },
    { title: 'время', skill: 'время', kind: 'time', max: 60 },
    { title: 'длина', skill: 'длина', kind: 'perimeter', max: 40 },
    { title: 'масса', skill: 'величины', kind: 'money', max: 100 },
    { title: 'периметр', skill: 'периметр', kind: 'perimeter', max: 40 },
    { title: 'площадь', skill: 'площадь', kind: 'area', max: 20 },
    { title: 'простые дроби', skill: 'дроби', kind: 'fractions', max: 12 },
    { title: 'смешанные задачи', skill: 'смешанные', kind: 'mixedBoss', max: 100 },
    { title: 'супер-босс', skill: 'повторение', kind: 'mixedBoss', max: 120 },
  ],
  knights_tournament: [
    { title: 'дуэль чисел', skill: 'сравнение', kind: 'comparison', max: 100 },
    { title: 'быстрые ответы', skill: 'скорость', kind: 'addition', max: 50 },
    { title: 'сравнение выражений', skill: 'сравнение', kind: 'comparison', max: 80 },
    { title: 'атака по таймеру', skill: 'скорость', kind: 'mixedBoss', max: 80 },
    { title: 'серия без ошибок', skill: 'комбо', kind: 'mixedBoss', max: 80 },
    { title: 'защита щитом', skill: 'вычитание', kind: 'subtraction', max: 80 },
    { title: 'случайные враги', skill: 'случайное', kind: 'mixedBoss', max: 90 },
    { title: 'турнирная сетка', skill: 'логика', kind: 'mixedBoss', max: 90 },
    { title: 'награда кубком', skill: 'смешанные', kind: 'money', max: 100 },
    { title: 'чемпион турнира', skill: 'повторение', kind: 'mixedBoss', max: 120 },
  ],
  magic_academy: [
    { title: 'пропуски', skill: 'пропуски', kind: 'missing', max: 100 },
    { title: 'закономерности', skill: 'логика', kind: 'missing', max: 100 },
    { title: 'логика', skill: 'логика', kind: 'mixedBoss', max: 100 },
    { title: 'маршруты', skill: 'маршруты', kind: 'time', max: 100 },
    { title: 'координаты', skill: 'координаты', kind: 'comparison', max: 100 },
    { title: 'комбинаторика', skill: 'комбинаторика', kind: 'multiplication', max: 10 },
    { title: 'коды дверей', skill: 'коды', kind: 'equation', max: 100 },
    { title: 'обратные задачи', skill: 'обратные задачи', kind: 'equation', max: 100 },
    { title: 'задачи с недостающими данными', skill: 'логика', kind: 'mixedBoss', max: 100 },
    { title: 'экзамен мага', skill: 'повторение', kind: 'mixedBoss', max: 120 },
  ],
  final_castle: [
    { title: 'смешанные примеры', skill: 'смешанные', kind: 'mixedBoss', max: 150 },
    { title: 'задачи в 2 действия', skill: 'текстовые', kind: 'mixedBoss', max: 150 },
    { title: 'задачи в 3 действия', skill: 'текстовые', kind: 'mixedBoss', max: 150 },
    { title: 'деньги + остаток', skill: 'деньги', kind: 'money', max: 150 },
    { title: 'время + маршрут', skill: 'время', kind: 'time', max: 120 },
    { title: 'периметр + площадь', skill: 'геометрия', kind: 'area', max: 60 },
    { title: 'дроби + сравнение', skill: 'дроби', kind: 'fractions', max: 12 },
    { title: 'уравнения + скобки', skill: 'уравнения', kind: 'equation', max: 150 },
    { title: 'босс-серия', skill: 'серия', kind: 'mixedBoss', max: 180 },
    { title: 'финальный экзамен', skill: 'экзамен', kind: 'mixedBoss', max: 200 },
  ],
};

export const topics: Topic[] = chapters.flatMap((chapter) =>
  chapterTopics[chapter.id].map((topic, index) => ({
    id: `${chapter.id}_topic_${index + 1}`,
    chapterId: chapter.id,
    title: topic.title,
    description: `${topic.title}: 3 подуровня по 10 мини-заданий, задания создаются генератором.`,
    ageRange: chapter.ageRange,
    mathSkill: topic.skill,
    difficulty: chapter.order + Math.floor(index / 3),
    enemyId: enemyCycle[index],
    locationId: chapter.locationId,
    reward: { coins: 12 + chapter.order * 3 + index, xp: 18 + chapter.order * 5 + index * 2, stars: 3 },
    generatorConfig: { kind: topic.kind, maxNumber: topic.max, allowNegative: chapter.order >= 6, allowDecimal: chapter.order >= 7 },
    answerMode: chapter.id === 'green_meadow' ? 'choice' : 'input',
  })),
);

export const getTopicsByChapter = (chapterId: string) => topics.filter((topic) => topic.chapterId === chapterId);

export const getTopic = (topicId: string) => topics.find((topic) => topic.id === topicId) ?? topics[0];
