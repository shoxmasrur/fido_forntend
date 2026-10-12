import { Link } from 'react-router-dom';
import Icon from './Icon';
import styles from './Button.module.css';

const cx = (...names) => names.filter(Boolean).join(' ');

/**
 * variant: primary | light | ghost
 * shape: pill | rounded
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  shape = 'pill',
  size = 'md',
  icon,
  iconStart,
  block,
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[shape],
    styles[size],
    block && styles.block,
    className,
  );

  const content = (
    <>
      {iconStart && <Icon name={iconStart} size={20} className={styles.icon} />}
      <span>{children}</span>
      {icon && <Icon name={icon} size={icon === 'arrowUpRight' ? 18 : 16} className={styles.icon} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
