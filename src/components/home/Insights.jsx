import { useTranslation } from 'react-i18next';
import { getImage } from '../../utils/images';
import { formatDate } from '../../utils/format';
import SectionHeader from '../ui/SectionHeader';
import MobileAction from '../ui/MobileAction';
import Button from '../ui/Button';
import styles from './Insights.module.css';

export default function Insights({ data, lang }) {
  const { t } = useTranslation();
  const action = { to: '/press', label: t('common.viewAll') };

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader tagline={data.tagline} title={data.title} action={action} />
        <div className={styles.grid}>
          {data.posts.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <img src={getImage(post.image)} alt="" loading="lazy" className={styles.image} />
              </div>
              <div className={styles.body}>
                <time dateTime={post.date} className={styles.date}>
                  {formatDate(post.date, lang)}
                </time>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <Button to="/press" variant="primary" shape="rounded" size="lg" icon="arrowUpRight" block className={styles.button}>
                  {t('common.read')}
                </Button>
              </div>
            </article>
          ))}
        </div>
        <MobileAction {...action} />
      </div>
    </section>
  );
}
