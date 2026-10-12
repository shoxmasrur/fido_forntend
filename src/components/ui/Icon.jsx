import icons from './icons';

export default function Icon({ name, size = 24, className, ...rest }) {
  const icon = icons[name];
  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      dangerouslySetInnerHTML={{ __html: icon.body }}
      {...rest}
    />
  );
}
