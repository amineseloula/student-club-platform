import { useState } from 'react';
import styles from './MemberHeader.module.css';

export default function MemberHeader({ breadcrumbTitle = 'Tableau de bord', onOpenMobile }) {
  const [activeLang, setActiveLang] = useState('FR');

  const handleLangChange = (lang) => {
    setActiveLang(lang);
    if (lang === 'AR') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang === 'FR' ? 'fr' : 'en';
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <button 
          type="button" 
          className={styles.mobileMenuBtn} 
          onClick={onOpenMobile}
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>

        <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
          <a href="#" className={styles.breadcrumbPrefix}>
            LDC
          </a>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{breadcrumbTitle}</span>
        </nav>
      </div>

      <div className={styles.rightContainer}>
        {/* Status Pill */}
        <span className={styles.memberBadge}>MEMBRE</span>

        {/* Language Switcher */}
        <div className={styles.langPill}>
          {['FR', 'AR', 'EN'].map((lang) => (
            <button
              key={lang}
              type="button"
              className={`${styles.langBtn} ${activeLang === lang ? styles.langBtnActive : ''}`}
              onClick={() => handleLangChange(lang)}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Notification Bell */}
        <div className={styles.notificationWrapper}>
          <a 
            href="#" 
            className={styles.notificationBtn}
            aria-label="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </a>
          <span className={styles.notificationBadge}>4</span>
        </div>

        {/* User Profile Pill */}
        <a 
          href="#" 
          className={styles.profileBtn}
        >
          <div className={styles.avatar}>AM</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Amine Meziane</span>
            <span className={styles.userRole}>Membre</span>
          </div>
          <span className={styles.chevron}>›</span>
        </a>
      </div>
    </header>
  );
}

