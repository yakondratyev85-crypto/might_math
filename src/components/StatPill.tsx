import type { IconId } from '../data/iconRegistry';
import { IconBadge } from './ui/IconBadge';

type StatPillProps = {
  icon: IconId;
  label: string;
  value: string | number;
};

export function StatPill({ icon, label, value }: StatPillProps) {
  return (
    <div className="stat-pill">
      <IconBadge icon={icon} label={label} size="xs" />
      <span>{value}</span>
    </div>
  );
}
