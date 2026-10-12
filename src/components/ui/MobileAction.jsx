import Button from './Button';
import styles from './MobileAction.module.css';

// Mobil versiyada "Barchasini ko'rish" tugmasi bo'lim oxirida chiqadi
export default function MobileAction({ to, label }) {
  return (
    <div className={styles.wrap}>
      <Button to={to} variant="primary" shape="rounded" size="lg" icon="arrowUpRight" block>
        {label}
      </Button>
    </div>
  );
}
