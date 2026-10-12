import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../../assets/icons/logo.svg';
import { PAGE_ROUTES } from '../../router/routes';
import { useLeadModal } from '../../context/LeadModalContext';
import LangSwitcher from '../ui/LangSwitcher';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import styles from './Header.module.css';

export default function Header() {
  const { t } = useTranslation();
  const { open: openLead } = useLeadModal();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const requestDemo = () => {
    setMenuOpen(false);
    openLead();
  };

  return (
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="Fido Biznes">
          <img src={logo} alt="Fido Biznes" width="191" height="36" />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Main">
          <ul className={styles.links}>
            {PAGE_ROUTES.map(({ key, path }) => (
              <li key={key}>
                <NavLink to={path} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                  {t(`nav.${key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button className={styles.drawerCta} variant="primary" size="lg" block onClick={requestDemo}>
            {t('header.requestDemo')}
          </Button>
        </nav>

        <div className={styles.actions}>
          <LangSwitcher />
          <Button className={styles.demo} variant="primary" size="lg" onClick={requestDemo}>
            {t('header.requestDemo')}
          </Button>
          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
