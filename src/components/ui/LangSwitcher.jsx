import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n';
import Icon from './Icon';
import styles from './LangSwitcher.module.css';

export default function LangSwitcher({ className }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const current = i18n.resolvedLanguage;

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (event) => !rootRef.current?.contains(event.target) && setOpen(false);
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={[styles.root, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('header.changeLanguage')}
      >
        <Icon name="language" size={24} />
        <span className={styles.code}>{current}</span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label={t('header.changeLanguage')}>
          {LANGUAGES.map((lang) => (
            <li key={lang}>
              <button
                type="button"
                role="option"
                aria-selected={lang === current}
                className={`${styles.option} ${lang === current ? styles.active : ''}`}
                onClick={() => select(lang)}
              >
                <span className={styles.optionCode}>{lang}</span>
                {t(`languages.${lang}`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
