import { useTranslation } from 'react-i18next';
import { getImage } from '../../utils/images';
import SectionHeader from '../ui/SectionHeader';
import MobileAction from '../ui/MobileAction';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import styles from './Industries.module.css';

export default function Industries({ data }) {
  const { t } = useTranslation();
  const action = { to: '/solutions', label: t('common.viewAll') };

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tagline={data.tagline} title={data.title} action={action} />
        <div className={styles.grid}>
          {data.items.map((item) => (
            <article key={item.title} className={styles.card}>
              <span className={styles.iconWrap}>
                <Icon name={item.icon} size={32} />
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.description}</p>
              <Button to={item.link} variant="primary" shape="rounded" size="lg" icon="arrowUpRight" block className={styles.button}>
                {t('common.more')}
              </Button>
            </article>
          ))}
          <div className={styles.imageWrap}>
            <img src={getImage(data.image)} alt="" loading="lazy" className={styles.image} />
          </div>
        </div>
        <MobileAction {...action} />
      </div>
    </section>
  );
}
