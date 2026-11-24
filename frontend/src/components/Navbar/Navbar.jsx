import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import clubLogo from '../../assets/logo.jpg';

const NAV_LINKS = [
  { id: 'accueil', label: 'Accueil', href: '#accueil' },
  { id: 'a-propos', label: 'À propos', href: '#a-propos' },
  { id: 'evenements', label: 'Événements', href: '#evenements' },
  { id: 'actualites', label: 'Actualités', href: '#actualites' },
  { id: 'galerie', label: 'Galerie', href: '#galerie' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar({ onLoginClick, onJoinClick }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('accueil');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const scrollPos = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setActiveId(id);
    setIsMobileOpen(false);
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand */}
        <a href="#accueil" className={styles.brand} onClick={() => handleLinkClick('accueil')}>
          <span className={styles.logoFrame}>
            <img src={clubLogo} alt="Logo LDC Club" className={styles.brandLogo} />
          </span>
          <span className={styles.brandName}>
            <span className={styles.brandTitle}>LDC</span>
            <span className={styles.brandSubtitle}>Club Étudiant · ESTIN</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className={styles.navLinks} aria-label="Navigation principale">
          {NAV_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleLinkClick(item.id)}
              className={`${styles.link} ${activeId === item.id ? styles.linkActive : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className={styles.actions}>
          <a
            href="#connexion"
            className={styles.loginLink}
            onClick={(e) => {
              if (onLoginClick) {
                e.preventDefault();
                onLoginClick();
              }
            }}
          >
            Se connecter
          </a>

          <a
            href="#rejoindre"
            className={styles.ctaBtn}
            onClick={(e) => {
              if (onJoinClick) {
                e.preventDefault();
                onJoinClick();
              }
            }}
          >
            Rejoindre le club
          </a>

          {/* Hamburger for mobile */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={isMobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <nav className={styles.mobileMenu} aria-label="Navigation mobile">
          {NAV_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`${styles.mobileLink} ${activeId === item.id ? styles.mobileLinkActive : ''}`}
              onClick={() => handleLinkClick(item.id)}
            >
              {item.label}
            </a>
          ))}
          <div className={styles.mobileDivider} />
          <a
            href="#connexion"
            className={styles.mobileLoginLink}
            onClick={(e) => {
              setIsMobileOpen(false);
              if (onLoginClick) {
                e.preventDefault();
                onLoginClick();
              }
            }}
          >
            Se connecter
          </a>
          <a
            href="#rejoindre"
            className={styles.mobileCta}
            onClick={(e) => {
              setIsMobileOpen(false);
              if (onJoinClick) {
                e.preventDefault();
                onJoinClick();
              }
            }}
          >
            Rejoindre le club
          </a>
        </nav>
      )}
    </header>
  );
}
