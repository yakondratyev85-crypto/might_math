type ScreenHeaderProps = {
  title: string;
  subtitle: string;
  onBack?: () => void;
};

export function ScreenHeader({ title, subtitle, onBack }: ScreenHeaderProps) {
  return (
    <header className="screen-header">
      {onBack && (
        <button className="small-button" type="button" onClick={onBack}>
          ← Назад
        </button>
      )}
      <div>
        <p className="eyebrow">Math Knight</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
}
