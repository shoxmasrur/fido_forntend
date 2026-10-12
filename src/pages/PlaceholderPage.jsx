import { useTranslation } from 'react-i18next';
import Tagline from '../components/ui/Tagline';
import Button from '../components/ui/Button';
import styles from './PlaceholderPage.module.css';

export default function PlaceholderPage({ pageKey }) {
  const { t } = useTranslation();

  return (
    <section className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
          <Button to="/" variant="ghost" size="md">
            {t('nav.home')}
          </Button>
          <span aria-hidden="true">/</span>
          <span className={styles.current}>{t(`nav.${pageKey}`)}</span>
        </nav>
        <h1 className={styles.title}>{t(`nav.${pageKey}`)}</h1>
        <div className={styles.card}>
          <Tagline>{t('placeholder.badge')}</Tagline>
          <h2 className={styles.subtitle}>{t('placeholder.title')}</h2>
          <p className={styles.text}>{t('placeholder.text')}</p>
          <Button to="/" variant="primary" size="lg" iconStart="home">
            {t('placeholder.back')}
          </Button>
        </div>
      </div>
    </section>
  );
}
