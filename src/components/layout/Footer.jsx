import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../assets/icons/logo.svg';
import { contentService } from '../../services/contentService';
import { useContent } from '../../hooks/useContent';
import Icon from '../ui/Icon';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const { data } = useContent(contentService.getLayout);

  if (!data) return <footer className={styles.footer} />;
  const { footer, socials, contacts } = data;

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <h2 className={styles.title}>{footer.title}</h2>
          <p className={styles.text}>{footer.text}</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.brand}>
            <Link to="/" aria-label="Fido Biznes">
              <img src={logo} alt="Fido Biznes" width="212" height="40" className={styles.logo} />
            </Link>
            <div className={styles.contacts}>
              <a href={`tel:${contacts.phone.replace(/\s/g, '')}`}>{contacts.phone}</a>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </div>
            <div>
              <p className={styles.follow}>{t('footer.follow')}</p>
              <ul className={styles.socials}>
                {socials.map((social) => (
                  <li key={social.id}>
                    <a href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} className={styles.social}>
                      <Icon name={social.icon} size={24} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.columns}>
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <ul className={styles.links}>
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className={styles.link}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className={styles.copyright}>{footer.copyright}</p>
      </div>
    </footer>
  );
}
