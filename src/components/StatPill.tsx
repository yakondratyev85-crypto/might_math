import { IconBadge } from './IconBadge';
import type { IconName } from '../data/iconRegistry';

type StatPillProps = {
  icon: IconName;
  label: string;
  value: string | number;
};

export function StatPill({ icon, label, value }: StatPillProps) {
  return (
    <div className="stat-pill">
      <IconBadge icon={icon} label={label} size="sm" />
      <span>{value}</span>
    </div>
  );
}
