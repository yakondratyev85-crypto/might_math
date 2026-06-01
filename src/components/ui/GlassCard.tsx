type GlassCardProps = {
  children: unknown;
  className?: string;
  tone?: 'default' | 'strong' | 'success' | 'danger' | 'gold';
  asButton?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  key?: unknown;
};

export function GlassCard({ children, className = '', tone = 'default', asButton = false, disabled = false, onClick }: GlassCardProps) {
  const classes = `glass-card glass-card--${tone} ${className}`;
  if (asButton) {
    return <button className={classes} type="button" disabled={disabled} onClick={onClick}>{children}</button>;
  }
  return <article className={classes}>{children}</article>;
}
