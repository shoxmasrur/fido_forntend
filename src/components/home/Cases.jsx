import { useTranslation } from 'react-i18next';
import { getImage } from '../../utils/images';
import SectionHeader from '../ui/SectionHeader';
import MobileAction from '../ui/MobileAction';
import Icon from '../ui/Icon';
import styles from './Cases.module.css';

function FeaturedCase({ data }) {
  return (
    <article className={styles.featured}>
      <img src={getImage(data.image)} alt="" loading="lazy" className={styles.featuredImage} />
      <div className={styles.featuredBody}>
        <ul className={styles.featuredMetrics}>
          {data.metrics.map((metric) => (
            <li key={metric.label}>
              <p className={styles.metricValue}>{metric.value}</p>
              <p className={styles.metricLabel}>{metric.label}</p>
            </li>
          ))}
        </ul>
        <div className={styles.featuredText}>
          <h3 className={styles.featuredTitle}>{data.title}</h3>
          <blockquote className={styles.quote}>{data.quote}</blockquote>
        </div>
      </div>
    </article>
  );
}

function CaseCard({ item }) {
  const { t } = useTranslation();

  return (
    <article className={styles.card}>
      <span className={styles.category}>{item.category}</span>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardText}>{item.description}</p>
      <div className={styles.media}>
        <img src={getImage(item.image)} alt="" loading="lazy" className={styles.mediaImage} />
        <div className={styles.mediaOverlay}>
          <p className={styles.metricValue}>{item.metric.value}</p>
          <p className={styles.metricLabel}>{item.metric.label}</p>
          <span className={styles.chip}>
            <Icon name="swapVertical" size={22} />
            {t('common.project')}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Cases({ data }) {
  const { t } = useTranslation();
  const action = { to: '/cases', label: t('common.viewAll') };

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tagline={data.tagline} title={data.title} action={action} />
        <FeaturedCase data={data.featured} />
        <div className={styles.grid}>
          {data.items.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
        <MobileAction {...action} />
      </div>
    </section>
  );
}
