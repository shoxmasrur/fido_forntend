import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { LeadModalProvider } from '../../context/LeadModalContext';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <LeadModalProvider>
      <div className={styles.page}>
        <div className={styles.background} aria-hidden="true">
          <span className={`${styles.ellipse} ${styles.e1}`} />
          <span className={`${styles.ellipse} ${styles.e2}`} />
          <span className={`${styles.ellipse} ${styles.e3}`} />
          <span className={`${styles.ellipse} ${styles.e4}`} />
        </div>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LeadModalProvider>
  );
}
