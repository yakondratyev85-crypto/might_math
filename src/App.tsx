import { useEffect, useState } from 'react';
import { BattleScreen } from './screens/BattleScreen';
import { CharacterCreatorScreen } from './screens/CharacterCreatorScreen';
import { ChestsScreen } from './screens/ChestsScreen';
import { CollectionScreen } from './screens/CollectionScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { MarathonScreen } from './screens/MarathonScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ShopScreen } from './screens/ShopScreen';
import { SublevelScreen } from './screens/SublevelScreen';
import { TopicsScreen } from './screens/TopicsScreen';
import { VictoryScreen } from './screens/VictoryScreen';
import { chapters, type Chapter } from './data/chapters';
import type { Item } from './data/items';
import { sublevels, type Sublevel } from './data/sublevels';
import { getTopicsByChapter, type Topic } from './data/topics';
import { getMarathonReward } from './game/marathon';
import { getNextChapterUnlocks, makeProgressKey } from './game/progression';
import { playSound } from './game/sound';
import { loadPlayerState, savePlayerState, type PlayerSettings, type PlayerState } from './storage/playerStorage';

export type Screen = 'home' | 'character' | 'chapters' | 'topics' | 'sublevel' | 'battle' | 'victory' | 'chests' | 'marathon' | 'shop' | 'collection' | 'progress' | 'settings';

type BattleResult = {
  coins: number;
  xp: number;
  stars: number;
  isDefeat: boolean;
};

const levelFromXp = (xp: number) => Math.max(1, Math.floor(xp / 100) + 1);

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [player, setPlayer] = useState<PlayerState>(() => loadPlayerState());
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0]);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(getTopicsByChapter(chapters[0].id)[0]);
  const [selectedSublevel, setSelectedSublevel] = useState<Sublevel>(sublevels[0]);
  const [battleResult, setBattleResult] = useState<BattleResult>({ coins: 0, xp: 0, stars: 0, isDefeat: false });

  useEffect(() => {
    savePlayerState(player);
  }, [player]);

  useEffect(() => {
    const nextUnlocks = getNextChapterUnlocks(player);
    if (nextUnlocks.length === 0) {
      return;
    }
    setPlayer((current) => ({ ...current, unlockedChapters: Array.from(new Set([...current.unlockedChapters, ...nextUnlocks])) }));
  }, [player.heroLevel, player.unlockedChapters]);

  const navigate = (nextScreen: Screen) => {
    playSound('click', player.settings.sound);
    setScreen(nextScreen);
  };

  const pickChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setSelectedTopic(getTopicsByChapter(chapter.id)[0]);
    setPlayer((current) => ({ ...current, currentChapter: chapter.id }));
    navigate('topics');
  };

  const pickTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    navigate('sublevel');
  };

  const startSublevel = (sublevel: Sublevel) => {
    setSelectedSublevel(sublevel);
    navigate('battle');
  };

  const completeBattle = (result: { won: boolean; correct: number; wrong: number; coins: number; xp: number; enemyId: string; sublevelId: string; topicId: string }) => {
    const stars = result.won ? 1 : 0;
    setPlayer((current) => {
      const nextXp = current.xp + result.xp;
      const progressKey = makeProgressKey(result.topicId, result.sublevelId as any);
      const completedSublevels = result.won ? Array.from(new Set([...current.completedSublevels, progressKey])) : current.completedSublevels;
      const topicStars = Math.max(current.stars[result.topicId] ?? 0, stars ? completedSublevels.filter((key) => key.startsWith(`${result.topicId}:`)).length : 0);
      const completedTopics = topicStars === 3 ? Array.from(new Set([...current.completedTopics, result.topicId])) : current.completedTopics;
      const nextWins = current.stats.wins + (result.won ? 1 : 0);
      const earnedChest = result.won && (result.sublevelId === 'challenge' || nextWins % 3 === 0);
      const nextStreak = result.won ? current.correctStreak + result.correct : 0;
      return {
        ...current,
        coins: current.coins + result.coins,
        xp: nextXp,
        heroLevel: levelFromXp(nextXp),
        hearts: result.won ? current.hearts : Math.max(1, current.hearts - 1),
        chests: current.chests + (earnedChest ? 1 : 0),
        completedSublevels,
        completedTopics,
        stars: { ...current.stars, [result.topicId]: topicStars },
        correctStreak: nextStreak,
        collection: {
          ...current.collection,
          enemies: Array.from(new Set([...current.collection.enemies, result.enemyId])),
          chests: earnedChest ? Array.from(new Set([...current.collection.chests, 'victory-chest'])) : current.collection.chests,
          achievements: result.won && result.wrong === 0 ? Array.from(new Set([...current.collection.achievements, 'Безошибочная победа'])) : current.collection.achievements,
        },
        stats: {
          correctAnswers: current.stats.correctAnswers + result.correct,
          wrongAnswers: current.stats.wrongAnswers + result.wrong,
          wins: nextWins,
          battles: current.stats.battles + 1,
        },
      };
    });
    setBattleResult({ coins: result.coins, xp: result.xp, stars, isDefeat: !result.won });
    setScreen('victory');
  };

  const buyItem = (item: Item) => {
    playSound('coin', player.settings.sound);
    setPlayer((current) => {
      if (current.coins < item.price || current.purchasedItems.includes(item.id)) {
        return current;
      }
      return {
        ...current,
        coins: current.coins - item.price,
        purchasedItems: [...current.purchasedItems, item.id],
        collection: { ...current.collection, items: Array.from(new Set([...current.collection.items, item.id])) },
      };
    });
  };

  const equipItem = (item: Item) => {
    setPlayer((current) => ({ ...current, equippedItems: { ...current.equippedItems, [item.slot]: item.id } }));
  };

  const openChest = () => {
    playSound('chest', player.settings.sound);
    setPlayer((current) => current.chests <= 0 ? current : {
      ...current,
      chests: current.chests - 1,
      coins: current.coins + 25,
      collection: { ...current.collection, achievements: Array.from(new Set([...current.collection.achievements, 'Охотник за сундуками'])) },
    });
  };

  const saveSettings = (settings: PlayerSettings) => {
    setPlayer((current) => ({ ...current, settings }));
  };

  const finishMarathon = (score: number) => {
    const reward = getMarathonReward(score);
    setPlayer((current) => {
      const nextXp = current.xp + reward.xp;
      return {
        ...current,
        coins: current.coins + reward.coins,
        xp: nextXp,
        heroLevel: levelFromXp(nextXp),
        bestMarathonScore: Math.max(current.bestMarathonScore, score),
        collection: { ...current.collection, achievements: score > current.bestMarathonScore ? Array.from(new Set([...current.collection.achievements, 'Рекорд марафона'])) : current.collection.achievements },
      };
    });
  };

  const appClass = `app-shell app-shell--${player.settings.interfaceMode} app-shell--text-${player.settings.textSize}`;

  return (
    <main className={appClass}>
      {screen === 'home' && <HomeScreen player={player} navigate={navigate} />}
      {screen === 'character' && <CharacterCreatorScreen player={player} onBack={() => navigate('home')} onSave={(avatar) => { setPlayer((current) => ({ ...current, avatar, hearts: avatar.classId === 'knight' ? Math.max(current.hearts, 6) : current.hearts })); navigate('home'); }} />}
      {screen === 'chapters' && <MapScreen player={player} onBack={() => navigate('home')} onPickChapter={pickChapter} />}
      {screen === 'topics' && <TopicsScreen player={player} chapter={selectedChapter} onBack={() => navigate('chapters')} onPickTopic={pickTopic} />}
      {screen === 'sublevel' && <SublevelScreen player={player} chapter={selectedChapter} topic={selectedTopic} onBack={() => navigate('topics')} onStart={startSublevel} />}
      {screen === 'battle' && <BattleScreen player={player} chapter={selectedChapter} topic={selectedTopic} sublevel={selectedSublevel} onBack={() => navigate('sublevel')} onComplete={completeBattle} />}
      {screen === 'victory' && <VictoryScreen coins={battleResult.coins} xp={battleResult.xp} stars={battleResult.stars} isDefeat={battleResult.isDefeat} onHome={() => navigate('home')} onContinue={() => navigate('topics')} />}
      {screen === 'chests' && <ChestsScreen player={player} onBack={() => navigate('home')} onOpenChest={openChest} />}
      {screen === 'marathon' && <MarathonScreen player={player} onBack={() => navigate('home')} onFinish={finishMarathon} />}
      {screen === 'shop' && <ShopScreen player={player} onBack={() => navigate('home')} onBuy={buyItem} onEquip={equipItem} />}
      {screen === 'collection' && <CollectionScreen player={player} onBack={() => navigate('home')} />}
      {screen === 'progress' && <ProgressScreen player={player} onBack={() => navigate('home')} />}
      {screen === 'settings' && <SettingsScreen settings={player.settings} onBack={() => navigate('home')} onChange={saveSettings} />}
    </main>
  );
}

export default App;
