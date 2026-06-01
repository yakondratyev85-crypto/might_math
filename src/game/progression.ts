import { chapters } from '../data/chapters';
import { sublevels, type SublevelId } from '../data/sublevels';
import { getTopicsByChapter, topics } from '../data/topics';
import type { PlayerState } from '../storage/playerStorage';

export const makeProgressKey = (topicId: string, sublevelId: SublevelId) => `${topicId}:${sublevelId}`;

export const getTopicStars = (player: PlayerState, topicId: string) =>
  sublevels.filter((sublevel) => player.completedSublevels.includes(makeProgressKey(topicId, sublevel.id))).length;

export const getChapterStats = (player: PlayerState, chapterId: string) => {
  const chapterTopics = getTopicsByChapter(chapterId);
  const totalSublevels = chapterTopics.length * sublevels.length;
  const completedSublevels = chapterTopics.reduce((sum, topic) => sum + getTopicStars(player, topic.id), 0);
  const completedTopics = chapterTopics.filter((topic) => getTopicStars(player, topic.id) === 3).length;
  const percent = Math.round((completedSublevels / totalSublevels) * 100);
  const stars = completedSublevels;
  return { totalSublevels, completedSublevels, completedTopics, percent, stars };
};

export const isChapterUnlocked = (player: PlayerState, chapterId: string) => player.unlockedChapters.includes(chapterId);

export const getNextChapterUnlocks = (player: PlayerState) =>
  chapters.filter((chapter) => chapter.order <= player.heroLevel + 1 && !player.unlockedChapters.includes(chapter.id)).map((chapter) => chapter.id);

export const getTotalMiniTasks = () => chapters.length * 10 * 3 * 10;

export const getGlobalProgress = (player: PlayerState) => {
  const completedMiniTasks = player.completedSublevels.length * 10;
  return Math.round((completedMiniTasks / getTotalMiniTasks()) * 100);
};

export const getNextTopic = () => topics[0];
