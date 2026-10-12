import { getImage } from '../../utils/images';
import SectionHeader from '../ui/SectionHeader';
import styles from './Clients.module.css';

function MarqueeRow({ logos, reverse }) {
  // Uzluksiz aylanish uchun ro'yxat ikki marta takrorlanadi
  const items = [...logos, ...logos];
  return (
    <div className={styles.row}>
      <ul className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
        {items.map((logo, index) => (
          <li key={`${logo.id}-${index}`} className={styles.logo} aria-hidden={index >= logos.length}>
            <img src={getImage(logo.image)} alt={logo.name} loading="lazy" width="120" height="120" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Clients({ data }) {
  const half = Math.ceil(data.logos.length / 2);
  const shifted = [...data.logos.slice(half), ...data.logos.slice(0, half)];

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tagline={data.tagline} title={data.title} align="center" />
      </div>
      <div className={styles.marquee}>
        <MarqueeRow logos={data.logos} />
        <MarqueeRow logos={shifted} reverse />
      </div>
    </section>
  );
}
