import { useLeadModal } from '../../context/LeadModalContext';
import { getImage } from '../../utils/images';
import Button from '../ui/Button';
import styles from './Hero.module.css';

export default function Hero({ data }) {
  const { open } = useLeadModal();

  return (
    <section className={styles.hero}>
      <img src={getImage(data.image)} alt="" className={styles.bg} fetchpriority="high" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={styles.badge}>{data.badge}</span>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.actions}>
            <Button variant="primary" onClick={open}>
              {data.primaryCta}
            </Button>
            <Button variant="light" icon="arrowRight" onClick={open}>
              {data.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
