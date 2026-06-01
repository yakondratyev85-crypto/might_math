import { getIcon, type IconId } from '../data/iconRegistry';

type IconBadgeProps = {
  icon: IconId;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function IconBadge({ icon, label, size = 'md' }: IconBadgeProps) {
  return (
    <span className={`icon-badge icon-badge--${size}`} aria-label={label} role="img">
      {getIcon(icon).emojiFallback}
    </span>
  );
}
