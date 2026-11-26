import { useState } from 'react';
import styles from './MemberHeader.module.css';

// Arabic is written right-to-left, so the whole page direction changes with the language.
function applyPageLanguage(lang) {
  const page = document.documentElement;
  page.dir = lang === 'AR' ? 'rtl' : 'ltr';
  page.lang = lang.toLowerCase();
}

export default function MemberHeader({
  breadcrumbTitle = 'Tableau de bord',
  onOpenMobile,
  roleBadge = 'Membre',
  roleBadgeTone = 'success', // 'success' (green) or 'info' (blue)
  userRole = 'Membre',
  defaultLang = 'FR',
}) {
  const [activeLang, setActiveLang] = useState(defaultLang);

  const handleLangChange = (lang) => {
    setActiveLang(lang);
    applyPageLanguage(lang);
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
        <span
          className={`${styles.memberBadge} ${roleBadgeTone === 'info' ? styles.memberBadgeInfo : ''}`}
        >
          {roleBadge}
        </span>

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

        <a
          href="#"
          className={styles.profileBtn}
        >
          <div className={styles.avatar}>AM</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Amine Meziane</span>
            <span className={styles.userRole}>{userRole}</span>
          </div>
          <span className={styles.chevron}>›</span>
        </a>
      </div>
    </header>
  );
}
