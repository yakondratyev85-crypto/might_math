import { IconBadge } from './IconBadge';
import type { IconId } from '../data/iconRegistry';

type StatPillProps = {
  icon: IconId;
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
