import { useTranslation } from 'react-i18next';
import graphic404 from '../assets/icons/404.svg';
import Button from '../components/ui/Button';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <img src={graphic404} alt="404" className={styles.graphic} width="965" height="259" />
        <h1 className={styles.title}>{t('notFound.title')}</h1>
        <p className={styles.text}>{t('notFound.text')}</p>
        <div className={styles.actions}>
          <Button to="/" variant="primary" iconStart="home">
            {t('notFound.home')}
          </Button>
          <Button to="/solutions" variant="light" icon="arrowForward">
            {t('notFound.solutions')}
          </Button>
        </div>
      </div>
    </section>
  );
}
