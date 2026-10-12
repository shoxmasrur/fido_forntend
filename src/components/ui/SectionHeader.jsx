import Tagline from './Tagline';
import Button from './Button';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ tagline, title, align = 'start', action, aside }) {
  return (
    <div className={`${styles.header} ${styles[align]}`}>
      <div className={styles.main}>
        <Tagline>{tagline}</Tagline>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {aside && <p className={styles.aside}>{aside}</p>}
      {action && (
        <Button to={action.to} variant="primary" shape="rounded" size="lg" icon="arrowUpRight" className={styles.action}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
