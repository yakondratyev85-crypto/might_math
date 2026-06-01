import type { IconId } from './iconRegistry';

export type AnswerMode = 'choice' | 'input';

export type Chapter = {
  id: string;
  order: number;
  title: string;
  ageRange: string;
  answerMode: AnswerMode;
  locationId: string;
  icon: IconId;
  colorA: string;
  colorB: string;
  description: string;
};

export const chapters: Chapter[] = [
  { id: 'green_meadow', order: 1, title: 'Зеленая Опушка', ageRange: '5–6', answerMode: 'choice', locationId: 'green-edge', icon: 'location_green_meadow', colorA: '#53e88b', colorB: '#1b9f65', description: 'Учебная глава с большими вариантами ответа.' },
  { id: 'griffin_meadow', order: 2, title: 'Грифонова Опушка', ageRange: '6–7', answerMode: 'input', locationId: 'griffon-edge', icon: 'location_griffin_meadow', colorA: '#ffd36a', colorB: '#f59e0b', description: 'Первые ручные ответы и мост грифона.' },
  { id: 'stone_halls', order: 3, title: 'Каменные Чертоги', ageRange: '7–8', answerMode: 'input', locationId: 'stone-halls', icon: 'location_stone_halls', colorA: '#d7deea', colorB: '#64748b', description: 'Двузначные числа и древняя библиотека.' },
  { id: 'fear_cave', order: 4, title: 'Пещера Страха', ageRange: '8–9', answerMode: 'input', locationId: 'fear-cave', icon: 'location_cave', colorA: '#c4b5fd', colorB: '#7c3aed', description: 'Деление, деньги и логические ловушки.' },
  { id: 'ice_rift', order: 5, title: 'Ледяное Ущелье', ageRange: '8–9', answerMode: 'input', locationId: 'ice-gorge', icon: 'location_ice_rift', colorA: '#b8f5ff', colorB: '#06b6d4', description: 'Таблица умножения в ледяных комбо.' },
  { id: 'shadow_spire', order: 6, title: 'Теневой Шпиль', ageRange: '8–10', answerMode: 'input', locationId: 'shadow-spire', icon: 'location_shadow_spire', colorA: '#a78bfa', colorB: '#4c1d95', description: 'Скобки, уравнения и магические руны.' },
  { id: 'storm_court', order: 7, title: 'Грозовая Свита', ageRange: '9–10', answerMode: 'input', locationId: 'storm-suite', icon: 'location_storm_court', colorA: '#93c5fd', colorB: '#2563eb', description: 'Величины, дроби, площадь и супер-босс.' },
  { id: 'knights_tournament', order: 8, title: 'Турнир Рыцарей', ageRange: '6–10', answerMode: 'input', locationId: 'tournament', icon: 'location_tournament', colorA: '#fde68a', colorB: '#d97706', description: 'Быстрые дуэли, серии и кубки.' },
  { id: 'magic_academy', order: 9, title: 'Магическая Академия', ageRange: '7–10', answerMode: 'input', locationId: 'academy', icon: 'location_academy', colorA: '#ddd6fe', colorB: '#8b5cf6', description: 'Логика, закономерности, маршруты и коды.' },
  { id: 'final_castle', order: 10, title: 'Финальный Замок', ageRange: '9–10', answerMode: 'input', locationId: 'final-castle', icon: 'location_final_castle', colorA: '#fecdd3', colorB: '#be123c', description: 'Смешанные экзамены и финальная серия.' },
];

export const getChapter = (chapterId: string) => chapters.find((chapter) => chapter.id === chapterId) ?? chapters[0];
