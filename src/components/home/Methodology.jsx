import { getImage } from '../../utils/images';
import SectionHeader from '../ui/SectionHeader';
import styles from './Methodology.module.css';

export default function Methodology({ data }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tagline={data.tagline} title={data.title} align="center" />
        <div className={styles.grid}>
          {data.items.map((item) => (
            <article key={item.id} className={`${styles.card} ${styles[item.id]}`}>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.description}</p>
              </div>
              <img src={getImage(item.image)} alt="" loading="lazy" className={styles.image} />
              <span className={styles.duration}>{item.duration}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
