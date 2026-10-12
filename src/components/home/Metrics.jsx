import SectionHeader from '../ui/SectionHeader';
import Icon from '../ui/Icon';
import styles from './Metrics.module.css';

export default function Metrics({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <SectionHeader tagline={data.tagline} title={data.title} aside={data.description} />
        <ul className={styles.grid}>
          {data.items.map((item) => (
            <li key={item.label} className={styles.card}>
              <Icon name={item.icon} size={32} className={styles.icon} />
              <div>
                <p className={styles.value}>{item.value}</p>
                <p className={styles.label}>{item.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
