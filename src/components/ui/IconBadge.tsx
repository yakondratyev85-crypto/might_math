import { getIcon, type IconId } from '../../data/iconRegistry';

type IconBadgeProps = {
  icon: IconId;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  muted?: boolean;
};

export function IconBadge({ icon, label, size = 'md', muted = false }: IconBadgeProps) {
  const definition = getIcon(icon);
  const style = {
    '--icon-a': definition.colorA,
    '--icon-b': definition.colorB,
  };

  return (
    <span className={`ui-icon-badge ui-icon-badge--${size} ui-icon-badge--${definition.type} ${muted ? 'is-muted' : ''}`} style={style} aria-label={label ?? definition.label} role="img">
      {definition.svgPath ? <img src={definition.svgPath} alt="" /> : <span>{definition.emojiFallback}</span>}
    </span>
  );
}
