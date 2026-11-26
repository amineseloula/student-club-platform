import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import styles from './Navbar.module.css';
import clubLogo from '../../assets/logo.jpg';

const NAV_LINKS = [
  { id: 'accueil', label: 'Accueil', href: '#/', match: (p) => p === '' || p === '/' || p === '/accueil' },
  { id: 'a-propos', label: 'À propos', href: '#/a-propos', match: (p) => p === '/a-propos' },
  { id: 'evenements', label: 'Événements', href: '#/evenements', match: (p) => p.startsWith('/evenements') },
  { id: 'actualites', label: 'Actualités', href: '#/actualites', match: (p) => p.startsWith('/actualites') },
  { id: 'galerie', label: 'Galerie', href: '#/galerie', match: (p) => p === '/galerie' },
  { id: 'contact', label: 'Contact', href: '#/contact', match: (p) => p === '/contact' },
];

export default function Navbar({ activePath = '/', onLoginClick, onJoinClick }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, isBoardMember, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand */}
        <a href="#/" className={styles.brand} onClick={closeMobile}>
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
          {NAV_LINKS.map((item) => {
            const isActive = item.match(activePath);
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMobile}
                aria-current={isActive ? 'page' : undefined}
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              {isBoardMember && (
                <a href="#/bureau/messages" className={styles.boardBadgeLink}>
                  Espace bureau
                </a>
              )}
              <span className={styles.userPill}>{user.name.split(' ')[0]}</span>
              <button type="button" className={styles.loginLinkBtn} onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
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
            </>
          )}

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

      {isMobileOpen && (
        <nav className={styles.mobileMenu} aria-label="Navigation mobile">
          {NAV_LINKS.map((item) => {
            const isActive = item.match(activePath);
            return (
              <a
                key={item.id}
                href={item.href}
                className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                onClick={closeMobile}
              >
                {item.label}
              </a>
            );
          })}
          <div className={styles.mobileDivider} />
          {isAuthenticated ? (
            <>
              {isBoardMember && (
                <a href="#/bureau/messages" className={styles.mobileLoginLink} onClick={closeMobile}>
                  Espace bureau ({user.name.split(' ')[0]})
                </a>
              )}
              <button
                type="button"
                className={styles.mobileCtaBtn}
                onClick={() => {
                  closeMobile();
                  logout();
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <a
                href="#connexion"
                className={styles.mobileLoginLink}
                onClick={(e) => {
                  closeMobile();
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
                  closeMobile();
                  if (onJoinClick) {
                    e.preventDefault();
                    onJoinClick();
                  }
                }}
              >
                Rejoindre le club
              </a>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
