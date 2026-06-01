type ProgressBarProps = {
  value: number;
  max: number;
  tone?: 'hero' | 'monster' | 'xp';
};

export function ProgressBar({ value, max, tone = 'hero' }: ProgressBarProps) {
  const width = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={`progress progress--${tone}`} aria-label={`${value} из ${max}`}>
      <span style={{ width: `${width}%` }} />
    </div>
  );
}
