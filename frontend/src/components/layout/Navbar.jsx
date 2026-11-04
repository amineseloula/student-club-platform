import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import clubLogo from '../../assets/logo.jpg';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check initial dir attribute on html tag
    setIsRTL(document.documentElement.dir === 'rtl');
  }, []);

  const toggleLanguage = () => {
    const nextRTL = !isRTL;
    setIsRTL(nextRTL);
    document.documentElement.dir = nextRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = nextRTL ? 'ar' : 'en';
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Brand */}
        <a href="#hero" className={styles.brand}>
          <img src={clubLogo} alt="LDC Club Logo" className={styles.brandLogo} />
          <div className={styles.brandName}>
            <span className={styles.brandTitle}>LDC CLUB</span>
            <span className={styles.brandSubtitle}>Leaders & Developers</span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          <a href="#hero" className={`${styles.link} ${styles.linkActive}`}>
            {isRTL ? 'الرئيسية' : 'Home'}
          </a>
          <a href="#about" className={styles.link}>
            {isRTL ? 'عن النادي' : 'About'}
          </a>
          <a href="#features" className={styles.link}>
            {isRTL ? 'الأنشطة' : 'Tracks'}
          </a>
          <a href="#events" className={styles.link}>
            {isRTL ? 'الفعاليات' : 'Events'}
          </a>
          <a href="#contact" className={styles.link}>
            {isRTL ? 'تواصل معنا' : 'Contact'}
          </a>
        </nav>

        {/* Right side CTAs */}
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
            {isRTL ? 'انضم إلينا' : 'Join Club'}
          </a>

          {/* Hamburger for mobile */}
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

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile Navigation">
          <a href="#hero" className={styles.link} onClick={() => setIsMobileOpen(false)}>
            {isRTL ? 'الرئيسية' : 'Home'}
          </a>
          <a href="#about" className={styles.link} onClick={() => setIsMobileOpen(false)}>
            {isRTL ? 'عن النادي' : 'About'}
          </a>
          <a href="#features" className={styles.link} onClick={() => setIsMobileOpen(false)}>
            {isRTL ? 'الأنشطة' : 'Tracks'}
          </a>
          <a href="#events" className={styles.link} onClick={() => setIsMobileOpen(false)}>
            {isRTL ? 'الفعاليات' : 'Events'}
          </a>
          <a href="#contact" className={styles.link} onClick={() => setIsMobileOpen(false)}>
            {isRTL ? 'تواصل معنا' : 'Contact'}
          </a>
          <a 
            href="#join" 
            className={`${styles.ctaBtn} ${styles.mobileCta}`} 
            onClick={() => setIsMobileOpen(false)}
          >
            {isRTL ? 'انضم إلينا' : 'Join Club'}
          </a>
        </nav>
      )}
    </header>
  );
}

