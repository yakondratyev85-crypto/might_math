import type { IconId } from '../../data/iconRegistry';
import { IconBadge } from './IconBadge';

type PrimaryButtonProps = {
  children: unknown;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  icon?: IconId;
  type?: 'button' | 'submit';
  className?: string;
};

export function PrimaryButton({ children, onClick, disabled = false, variant = 'primary', icon, type = 'button', className = '' }: PrimaryButtonProps) {
  return (
    <button className={`primary-button primary-button--${variant} ${className}`} type={type} onClick={onClick} disabled={disabled}>
      {icon && <IconBadge icon={icon} size="sm" />}
      <span>{children}</span>
    </button>
  );
}
