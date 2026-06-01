import { ScreenHeader } from '../components/ScreenHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { IconBadge } from '../components/ui/IconBadge';
import { PrimaryButton } from '../components/ui/PrimaryButton';

type VictoryScreenProps = {
  coins: number;
  xp: number;
  stars: number;
  isDefeat: boolean;
  onHome: () => void;
  onContinue: () => void;
};

export function VictoryScreen({ coins, xp, stars, isDefeat, onHome, onContinue }: VictoryScreenProps) {
  return (
    <section className="screen victory-screen">
      <ScreenHeader title={isDefeat ? 'Герою нужен отдых' : 'Победа!'} subtitle={isDefeat ? 'Ошибки помогают учиться. Попробуй еще раз.' : 'Сундук наград открыт, прогресс сохранён.'} />
      <GlassCard className="reward-card" tone={isDefeat ? 'danger' : 'gold'}>
        <IconBadge icon="ui_chest" size="xl" />
        <h2>{isDefeat ? 'Маленькая награда за тренировку' : 'Сундук победителя'}</h2>
        <div className="reward-row">
          <span><IconBadge icon="ui_coin" size="xs" /> +{coins}</span>
          <span><IconBadge icon="ui_xp" size="xs" /> +{xp}</span>
          <span><IconBadge icon="ui_star" size="xs" /> {stars}</span>
        </div>
      </GlassCard>
      <div className="home-actions two">
        <PrimaryButton onClick={onContinue}>Продолжить</PrimaryButton>
        <PrimaryButton variant="secondary" onClick={onHome}>Домой</PrimaryButton>
      </div>
    </section>
  );
}
