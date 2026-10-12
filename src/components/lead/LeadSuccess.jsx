import { useTranslation } from 'react-i18next';
import { contentService } from '../../services/contentService';
import { useContent } from '../../hooks/useContent';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import styles from './LeadSuccess.module.css';

export default function LeadSuccess({ onClose }) {
  const { t } = useTranslation();
  const { data } = useContent(contentService.getLayout);

  return (
    <div className={styles.success}>
      <Icon name="checkCircle" size={64} className={styles.icon} />
      <h3 className={styles.title}>{t('form.success.title')}</h3>
      <p className={styles.text}>{t('form.success.description')}</p>

      <div className={styles.actions}>
        <Button to="/cases" variant="light" size="lg" block onClick={onClose} className={styles.outline}>
          {t('form.success.cases')}
        </Button>
        <Button to="/" variant="primary" size="lg" block onClick={onClose}>
          {t('form.success.home')}
        </Button>
      </div>

      {data && (
        <div className={styles.contacts}>
          <a href={`tel:${data.contacts.phone.replace(/\s/g, '')}`}>
            <strong>{data.contacts.phone}</strong>
            <span>{t('form.callCenter')}</span>
          </a>
          <a href={`mailto:${data.contacts.email}`}>
            <strong>{data.contacts.email}</strong>
            <span>{t('form.emailLabel')}</span>
          </a>
        </div>
      )}
    </div>
  );
}
