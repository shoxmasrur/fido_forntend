import { useTranslation } from 'react-i18next';
import Button from './Button';
import styles from './PageState.module.css';

export default function PageState({ error, onRetry }) {
  const { t } = useTranslation();

  return (
    <div className={styles.state} role={error ? 'alert' : 'status'}>
      {error ? (
        <>
          <p>{t('common.error')}</p>
          <Button variant="primary" onClick={onRetry}>
            {t('common.retry')}
          </Button>
        </>
      ) : (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span className="visually-hidden">{t('common.loading')}</span>
        </>
      )}
    </div>
  );
}
