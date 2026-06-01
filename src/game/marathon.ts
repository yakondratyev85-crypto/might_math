import { chapters } from '../data/chapters';
import { sublevels } from '../data/sublevels';
import { topics } from '../data/topics';
import { generateQuestion } from './questionGenerators';

export type MarathonDifficulty = 'easy' | 'medium' | 'hard';

export const marathonDifficulties: Array<{ id: MarathonDifficulty; title: string; description: string }> = [
  { id: 'easy', title: 'Лёгкий', description: '+/− до 10' },
  { id: 'medium', title: 'Средний', description: '+/− до 20, сравнения, пропуски' },
  { id: 'hard', title: 'Сложный', description: 'умножение, деление, смешанные задания' },
];

export const generateMarathonQuestion = (difficulty: MarathonDifficulty) => {
  const chapter = difficulty === 'easy' ? chapters[1] : difficulty === 'medium' ? chapters[2] : chapters[4];
  const allowed = difficulty === 'easy'
    ? ['addition', 'subtraction']
    : difficulty === 'medium'
      ? ['addition', 'subtraction', 'comparison', 'missing']
      : ['multiplication', 'division', 'mixedBoss'];
  const topic = topics.find((item) => item.chapterId === chapter.id && allowed.includes(item.generatorConfig.kind)) ?? topics[0];
  return generateQuestion({ topic, sublevel: sublevels[0], taskIndex: Math.floor(Math.random() * 1000), answerMode: 'input' });
};

export const getMarathonReward = (score: number) => ({ coins: Math.max(2, Math.floor(score / 2)), xp: score * 2 });
