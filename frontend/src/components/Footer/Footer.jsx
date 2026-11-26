import styles from './Footer.module.css';
import clubLogo from '../../assets/logo.jpg';

export default function Footer({ onLoginClick, onJoinClick }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brandHeader}>
              <span className={styles.logoTile}>
                <img src={clubLogo} alt="Logo LDC" className={styles.brandLogo} />
              </span>
              <div>
                <span className={styles.brandTitle}>LDC</span>
                <span className={styles.brandSub}>BY ESTIN</span>
              </div>
            </div>
            <p className={styles.description}>
              Le club étudiant de l&apos;ESTIN dédié aux sorties en pleine nature, au sport et aux rencontres humaines depuis 2020.
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="mailto:contact@ldc-estin.dz"
                className={styles.socialIcon}
                aria-label="Email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Découvrir */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Découvrir</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><a href="#accueil">Accueil</a></li>
              <li className={styles.linkItem}><a href="#a-propos">À propos du club</a></li>
              <li className={styles.linkItem}><a href="#evenements">Prochains événements</a></li>
              <li className={styles.linkItem}><a href="#actualites">Actualités</a></li>
              <li className={styles.linkItem}><a href="#galerie">Galerie souvenirs</a></li>
            </ul>
          </div>

          {/* Column 2: Votre espace */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Votre espace</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a
                  href="#connexion"
                  onClick={(e) => {
                    if (onLoginClick) {
                      e.preventDefault();
                      onLoginClick();
                    }
                  }}
                >
                  Se connecter
                </a>
              </li>
              <li className={styles.linkItem}>
                <a
                  href="#rejoindre"
                  onClick={(e) => {
                    if (onJoinClick) {
                      e.preventDefault();
                      onJoinClick();
                    }
                  }}
                >
                  Rejoindre le club
                </a>
              </li>
              <li className={styles.linkItem}><a href="#equipe">Le bureau exécutif</a></li>
              <li className={styles.linkItem}><a href="#evenements">Calendrier des sorties</a></li>
            </ul>
          </div>

          {/* Column 3: Nous trouver */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Nous trouver</h4>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>Campus ESTIN, Amizour</li>
              <li className={styles.infoItem}>06300 Béjaïa, Algérie</li>
              <li className={styles.infoItem}>
                <a href="mailto:contact@ldc-estin.dz">contact@ldc-estin.dz</a>
              </li>
              <li className={styles.infoItem}>Permanences : Mar &amp; Jeu · 12h – 14h</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal bar */}
        <div className={styles.bottomBar}>
          <p>© {currentYear} LDC — Club Étudiant ESTIN. Tous droits réservés.</p>
          <div className={styles.legalLinks}>
            <a href="#confidentialite">Politique de confidentialité</a>
            <span aria-hidden="true">·</span>
            <a href="#mentions-legales">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
