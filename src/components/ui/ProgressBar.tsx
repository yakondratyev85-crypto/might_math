type ProgressBarProps = {
  value: number;
  max: number;
  tone?: 'hp' | 'monster' | 'xp' | 'chapter' | 'topic';
  label?: string;
};

export function ProgressBar({ value, max, tone = 'chapter', label }: ProgressBarProps) {
  const safeMax = Math.max(1, max);
  const width = Math.max(0, Math.min(100, (value / safeMax) * 100));
  return (
    <div className="ui-progress-wrap">
      {label && <span className="ui-progress-label">{label}</span>}
      <div className={`ui-progress ui-progress--${tone}`} aria-label={label ?? `${value} из ${max}`}>
        <span style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
