import { useEffect, useState } from 'react';
import { BattleScreen } from './screens/BattleScreen';
import { ChestsScreen } from './screens/ChestsScreen';
import { CollectionScreen } from './screens/CollectionScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ShopScreen } from './screens/ShopScreen';
import { SublevelScreen } from './screens/SublevelScreen';
import { TopicsScreen } from './screens/TopicsScreen';
import { VictoryScreen } from './screens/VictoryScreen';
import { chapters, type Chapter } from './data/chapters';
import type { Enemy } from './data/enemies';
import type { Item } from './data/items';
import { rewards } from './data/rewards';
import { sublevels, type Sublevel } from './data/sublevels';
import { getTopicsByChapter, type Topic } from './data/topics';
import { getNextChapterUnlocks, makeProgressKey } from './game/progression';
import { playSound } from './game/sound';
import { loadPlayerState, resetPlayerState, savePlayerState, type PlayerSettings, type PlayerState } from './storage/playerStorage';

export type Screen = 'home' | 'chapters' | 'topics' | 'sublevel' | 'battle' | 'victory' | 'chests' | 'shop' | 'collection' | 'progress' | 'settings';

type BattleResult = {
  enemy?: Enemy;
  coins: number;
  xp: number;
  isDefeat: boolean;
};

const levelFromXp = (xp: number) => Math.max(1, Math.floor(xp / 100) + 1);

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [player, setPlayer] = useState<PlayerState>(() => loadPlayerState());
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0]);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(() => getTopicsByChapter(chapters[0].id)[0]);
  const [selectedSublevel, setSelectedSublevel] = useState<Sublevel>(sublevels[0]);
  const [battleResult, setBattleResult] = useState<BattleResult>({ coins: 0, xp: 0, isDefeat: false });

  useEffect(() => {
    savePlayerState(player);
  }, [player]);

  const navigate = (nextScreen: Screen) => {
    setScreen(nextScreen);
  };

  const pickChapter = (chapter: Chapter) => {
    playSound('click', player.settings.sound);
    setSelectedChapter(chapter);
    setSelectedTopic(getTopicsByChapter(chapter.id)[0]);
    setScreen('topics');
  };

  const pickTopic = (topic: Topic) => {
    playSound('click', player.settings.sound);
    setSelectedTopic(topic);
    setSelectedSublevel(sublevels[0]);
    setScreen('sublevel');
  };

  const startSublevel = (sublevel: Sublevel) => {
    playSound('click', player.settings.sound);
    setSelectedSublevel(sublevel);
    setScreen('battle');
  };

  const applyVictory = (enemy: Enemy, correct: number, wrong: number) => {
    const perfect = wrong === 0;
    const coins = Math.round((enemy.rewardCoins + selectedTopic.reward.coins + rewards.baseCoins + (perfect ? rewards.perfectBonusCoins : 0)) * selectedSublevel.rewardMultiplier);
    const xp = Math.round((enemy.rewardXp + selectedTopic.reward.xp + rewards.baseXp + (perfect ? rewards.perfectBonusXp : 0)) * selectedSublevel.rewardMultiplier);
    const progressKey = makeProgressKey(selectedTopic.id, selectedSublevel.id);

    setPlayer((current) => {
      const nextXp = current.xp + xp;
      const nextLevel = levelFromXp(nextXp);
      const nextWins = current.stats.wins + 1;
      const earnedChest = nextWins % rewards.chestEveryWins === 0 || selectedSublevel.id === 'challenge';
      const completedSublevels = Array.from(new Set([...current.completedSublevels, progressKey]));
      const unlockedChapters = Array.from(new Set([...current.unlockedChapters, ...getNextChapterUnlocks({ ...current, heroLevel: nextLevel, completedSublevels })]));
      if (nextLevel > current.heroLevel) {
        playSound('levelUp', current.settings.sound);
      }
      playSound('coin', current.settings.sound);
      if (earnedChest) {
        playSound('chest', current.settings.sound);
      }
      return {
        ...current,
        coins: current.coins + coins,
        xp: nextXp,
        heroLevel: nextLevel,
        chests: current.chests + (earnedChest ? 1 : 0),
        unlockedChapters,
        unlockedLocations: Array.from(new Set([...current.unlockedLocations, ...unlockedChapters.map((chapterId) => chapters.find((chapter) => chapter.id === chapterId)?.locationId).filter(Boolean) as string[]])),
        completedSublevels,
        collection: {
          ...current.collection,
          enemies: Array.from(new Set([...current.collection.enemies, enemy.id])),
          chests: earnedChest ? Array.from(new Set([...current.collection.chests, 'victory-chest'])) : current.collection.chests,
          achievements: perfect
            ? Array.from(new Set([...current.collection.achievements, 'Безошибочная победа']))
            : current.collection.achievements,
        },
        stats: {
          ...current.stats,
          correctAnswers: current.stats.correctAnswers + correct,
          wrongAnswers: current.stats.wrongAnswers + wrong,
          wins: nextWins,
          battles: current.stats.battles + 1,
        },
      };
    });

    setBattleResult({ enemy, coins, xp, isDefeat: false });
    setScreen('victory');
  };

  const applyDefeat = (correct: number, wrong: number) => {
    const coins = 3;
    const xp = 5;
    setPlayer((current) => {
      const nextXp = current.xp + xp;
      return {
        ...current,
        coins: current.coins + coins,
        xp: nextXp,
        heroLevel: levelFromXp(nextXp),
        hearts: Math.max(1, current.hearts - 1),
        stats: {
          ...current.stats,
          correctAnswers: current.stats.correctAnswers + correct,
          wrongAnswers: current.stats.wrongAnswers + wrong,
          battles: current.stats.battles + 1,
        },
      };
    });
    setBattleResult({ coins, xp, isDefeat: true });
    setScreen('victory');
  };

  const buyItem = (item: Item) => {
    playSound('click', player.settings.sound);
    setPlayer((current) => {
      if (current.coins < item.price || current.purchasedItems.includes(item.id)) {
        return current;
      }
      playSound('coin', current.settings.sound);
      return {
        ...current,
        coins: current.coins - item.price,
        purchasedItems: [...current.purchasedItems, item.id],
        collection: {
          ...current.collection,
          items: Array.from(new Set([...current.collection.items, item.id])),
        },
      };
    });
  };

  const equipItem = (item: Item) => {
    playSound('click', player.settings.sound);
    setPlayer((current) => ({
      ...current,
      equippedItems: {
        ...current.equippedItems,
        [item.slot]: item.id,
      },
    }));
  };

  const openChest = () => {
    playSound('click', player.settings.sound);
    setPlayer((current) => {
      if (current.chests <= 0) {
        return current;
      }
      playSound('chest', current.settings.sound);
      playSound('coin', current.settings.sound);
      return {
        ...current,
        chests: current.chests - 1,
        coins: current.coins + 25,
        collection: {
          ...current.collection,
          achievements: Array.from(new Set([...current.collection.achievements, 'Охотник за сундуками'])),
        },
      };
    });
  };

  const updateSettings = (settings: PlayerSettings) => {
    playSound('click', player.settings.sound);
    setPlayer((current) => ({ ...current, settings }));
  };

  const resetProgress = () => {
    playSound('click', player.settings.sound);
    const fresh = resetPlayerState();
    setPlayer(fresh);
    setSelectedChapter(chapters[0]);
    setSelectedTopic(getTopicsByChapter(chapters[0].id)[0]);
    setSelectedSublevel(sublevels[0]);
    setScreen('home');
  };

  return (
    <main className={`app-shell app-shell--${player.settings.interfaceMode} text-${player.settings.textSize}`}>
      {screen === 'home' && <HomeScreen player={player} navigate={navigate} />}
      {screen === 'chapters' && <MapScreen player={player} onBack={() => setScreen('home')} onPickChapter={pickChapter} />}
      {screen === 'topics' && <TopicsScreen player={player} chapter={selectedChapter} onBack={() => setScreen('chapters')} onPickTopic={pickTopic} />}
      {screen === 'sublevel' && <SublevelScreen player={player} chapter={selectedChapter} topic={selectedTopic} onBack={() => setScreen('topics')} onStart={startSublevel} />}
      {screen === 'battle' && (
        <BattleScreen
          player={player}
          chapter={selectedChapter}
          topic={selectedTopic}
          sublevel={selectedSublevel}
          chapterId={selectedChapter.id}
          topicId={selectedTopic.id}
          sublevelId={selectedSublevel.id}
          taskIndex={0}
          onBack={() => setScreen('sublevel')}
          onVictory={applyVictory}
          onDefeat={applyDefeat}
        />
      )}
      {screen === 'victory' && <VictoryScreen {...battleResult} onHome={() => setScreen('home')} onMap={() => setScreen('chapters')} />}
      {screen === 'chests' && <ChestsScreen player={player} onBack={() => setScreen('home')} onOpenChest={openChest} />}
      {screen === 'shop' && <ShopScreen player={player} onBack={() => setScreen('home')} onBuy={buyItem} onEquip={equipItem} />}
      {screen === 'collection' && <CollectionScreen player={player} onBack={() => setScreen('home')} />}
      {screen === 'progress' && <ProgressScreen player={player} onBack={() => setScreen('home')} />}
      {screen === 'settings' && <SettingsScreen settings={player.settings} onBack={() => setScreen('home')} onChange={updateSettings} onResetProgress={resetProgress} />}
    </main>
  );
}

export default App;
