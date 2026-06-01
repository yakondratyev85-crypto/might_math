import { IconBadge } from '../components/IconBadge';
import { ScreenHeader } from '../components/ScreenHeader';
import type { Enemy } from '../data/enemies';

type VictoryScreenProps = {
  enemy?: Enemy;
  coins: number;
  xp: number;
  isDefeat: boolean;
  onHome: () => void;
  onMap: () => void;
};

export function VictoryScreen({ enemy, coins, xp, isDefeat, onHome, onMap }: VictoryScreenProps) {
  return (
    <section className="screen victory-screen">
      <ScreenHeader
        title={isDefeat ? 'Герою нужен отдых' : 'Победа!'}
        subtitle={isDefeat ? 'Ошибки — часть обучения. Попробуй еще раз!' : 'Монстр побежден, награды уже в рюкзаке.'}
      />
      <div className="reward-card">
        <IconBadge icon={isDefeat ? 'heart' : enemy?.icon ?? 'chest'} label="Результат" size="lg" />
        <h2>{isDefeat ? 'Тренировка завершена' : enemy?.name}</h2>
        <div className="reward-row">
          <span>🪙 +{coins}</span>
          <span>⭐ +{xp}</span>
        </div>
      </div>
      <div className="primary-actions">
        <button className="big-button" type="button" onClick={onMap}>Продолжить</button>
        <button className="big-button big-button--secondary" type="button" onClick={onHome}>Домой</button>
      </div>
    </section>
  );
}
