import { useEffect, useMemo, useState } from 'react';
import { BattleScreen } from './screens/BattleScreen';
import { ChestsScreen } from './screens/ChestsScreen';
import { CollectionScreen } from './screens/CollectionScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { ModeScreen } from './screens/ModeScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ShopScreen } from './screens/ShopScreen';
import { VictoryScreen } from './screens/VictoryScreen';
import { enemies, type Enemy } from './data/enemies';
import { locations, type Location } from './data/locations';
import type { MathMode } from './data/mathModes';
import type { Item } from './data/items';
import { rewards } from './data/rewards';
import { loadPlayerState, resetProgress, savePlayerState, type PlayerSettings, type PlayerState } from './storage/playerStorage';

export type Screen = 'home' | 'map' | 'mode' | 'battle' | 'victory' | 'chests' | 'shop' | 'collection' | 'progress' | 'settings';

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
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [selectedMode, setSelectedMode] = useState<MathMode | null>(null);
  const [battleResult, setBattleResult] = useState<BattleResult>({ coins: 0, xp: 0, isDefeat: false });

  useEffect(() => {
    savePlayerState(player);
  }, [player]);

  const unlockedNextLocation = useMemo(() => {
    const next = locations.find((location) => location.level <= player.heroLevel && !player.unlockedLocations.includes(location.id));
    return next?.id;
  }, [player.heroLevel, player.unlockedLocations]);

  useEffect(() => {
    if (!unlockedNextLocation) {
      return;
    }
    setPlayer((current) => ({
      ...current,
      unlockedLocations: [...current.unlockedLocations, unlockedNextLocation],
    }));
  }, [unlockedNextLocation]);

  const pickLocation = (location: Location) => {
    setSelectedLocation(location);
    setScreen('mode');
  };

  const pickMode = (mode: MathMode) => {
    setSelectedMode(mode);
    setScreen('battle');
  };

  const applyVictory = (enemy: Enemy, correct: number, wrong: number) => {
    const perfect = wrong === 0;
    const coins = enemy.rewardCoins + rewards.baseCoins + (perfect ? rewards.perfectBonusCoins : 0);
    const xp = enemy.rewardXp + rewards.baseXp + (perfect ? rewards.perfectBonusXp : 0);

    setPlayer((current) => {
      const nextXp = current.xp + xp;
      const nextWins = current.stats.wins + 1;
      const earnedChest = nextWins % rewards.chestEveryWins === 0;
      return {
        ...current,
        coins: current.coins + coins,
        xp: nextXp,
        heroLevel: levelFromXp(nextXp),
        chests: current.chests + (earnedChest ? 1 : 0),
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
    setPlayer((current) => {
      if (current.coins < item.price || current.purchasedItems.includes(item.id)) {
        return current;
      }
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
    setPlayer((current) => ({
      ...current,
      equippedItems: {
        ...current.equippedItems,
        [item.slot]: item.id,
      },
    }));
  };

  const openChest = () => {
    setPlayer((current) => {
      if (current.chests <= 0) {
        return current;
      }
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
    setPlayer((current) => ({ ...current, settings }));
  };

  const resetStoredProgress = () => {
    if (!window.confirm('Удалить весь прогресс и начать заново?')) {
      return;
    }
    setPlayer(resetProgress());
    setSelectedLocation(locations[0]);
    setSelectedMode(null);
    setBattleResult({ coins: 0, xp: 0, isDefeat: false });
    setScreen('home');
  };

  return (
    <main className="app-shell">
      {screen === 'home' && <HomeScreen player={player} navigate={setScreen} />}
      {screen === 'map' && <MapScreen player={player} onBack={() => setScreen('home')} onPickLocation={pickLocation} />}
      {screen === 'mode' && <ModeScreen location={selectedLocation} onBack={() => setScreen('map')} onPickMode={pickMode} />}
      {screen === 'battle' && selectedMode && (
        <BattleScreen
          player={player}
          location={selectedLocation}
          mode={selectedMode}
          onBack={() => setScreen('mode')}
          onVictory={applyVictory}
          onDefeat={applyDefeat}
        />
      )}
      {screen === 'victory' && (
        <VictoryScreen
          enemy={battleResult.enemy ?? enemies[0]}
          coins={battleResult.coins}
          xp={battleResult.xp}
          isDefeat={battleResult.isDefeat}
          onHome={() => setScreen('home')}
          onMap={() => setScreen('map')}
        />
      )}
      {screen === 'chests' && <ChestsScreen player={player} onBack={() => setScreen('home')} onOpenChest={openChest} />}
      {screen === 'shop' && <ShopScreen player={player} onBack={() => setScreen('home')} onBuy={buyItem} onEquip={equipItem} />}
      {screen === 'collection' && <CollectionScreen player={player} onBack={() => setScreen('home')} />}
      {screen === 'progress' && <ProgressScreen player={player} onBack={() => setScreen('home')} />}
      {screen === 'settings' && <SettingsScreen settings={player.settings} onBack={() => setScreen('home')} onChange={updateSettings} onResetProgress={resetStoredProgress} />}
    </main>
  );
}

export default App;
