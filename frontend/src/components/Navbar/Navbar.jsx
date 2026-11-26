import { useState } from 'react';
import styles from './Navbar.module.css';
import clubLogo from '../../assets/logo.jpg';

const NAV_LINKS = [
  { href: '#hero',     en: 'Home',    ar: 'الرئيسية' },
  { href: '#about',    en: 'About',   ar: 'عن النادي' },
  { href: '#features', en: 'Tracks',  ar: 'الأنشطة' },
  { href: '#events',   en: 'Events',  ar: 'الفعاليات' },
  { href: '#contact',  en: 'Contact', ar: 'تواصل معنا' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(() => document.documentElement.dir === 'rtl');

  const toggleLanguage = () => {
    const nextRTL = !isRTL;
    setIsRTL(nextRTL);
    document.documentElement.dir = nextRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = nextRTL ? 'ar' : 'en';
  };

  const closeMobileMenu = () => setIsMobileOpen(false);
  const joinLabel = isRTL ? 'انضم إلينا' : 'Join Club';

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <a href="#hero" className={styles.brand}>
          <img src={clubLogo} alt="LDC Club Logo" className={styles.brandLogo} />
          <div className={styles.brandName}>
            <span className={styles.brandTitle}>LDC CLUB</span>
            <span className={styles.brandSubtitle}>Leaders & Developers</span>
          </div>
        </a>

        <nav className={styles.navLinks} aria-label="Main Navigation">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={index === 0 ? `${styles.link} ${styles.linkActive}` : styles.link}
            >
              {isRTL ? link.ar : link.en}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={toggleLanguage}
            className={styles.langBtn}
            title={isRTL ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            🌐 {isRTL ? 'EN' : 'عربي'}
          </button>

          <a href="#join" className={styles.ctaBtn}>
            {joinLabel}
          </a>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.link} onClick={closeMobileMenu}>
              {isRTL ? link.ar : link.en}
            </a>
          ))}
          <a href="#join" className={`${styles.ctaBtn} ${styles.mobileCta}`} onClick={closeMobileMenu}>
            {joinLabel}
          </a>
        </nav>
      )}
    </header>
  );
}
