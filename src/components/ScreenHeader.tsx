import { PrimaryButton } from './ui/PrimaryButton';

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
  onBack?: () => void;
};

export function ScreenHeader({ title, subtitle, onBack }: ScreenHeaderProps) {
  return (
    <header className="screen-header glass-card">
      {onBack && <PrimaryButton variant="ghost" onClick={onBack}>Назад</PrimaryButton>}
      <div>
        <p className="eyebrow">Math Knight</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
}
