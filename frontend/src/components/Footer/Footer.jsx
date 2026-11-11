import styles from './Footer.module.css';
import clubLogo from '../../assets/logo.jpg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.brandHeader}>
              <img src={clubLogo} alt="LDC Logo" className={styles.brandLogo} />
              <span className={styles.brandTitle}>LDC CLUB</span>
            </div>
            <p className={styles.description}>
              Leaders & Developers Club empowers passionate students to build impactful software, develop leadership qualities, and collaborate on real-world industry challenges.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="GitHub">
                GH
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                IN
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Discord">
                DC
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Instagram">
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><a href="#hero">Home</a></li>
              <li className={styles.linkItem}><a href="#about">About the Club</a></li>
              <li className={styles.linkItem}><a href="#features">Club Tracks</a></li>
              <li className={styles.linkItem}><a href="#events">Upcoming Events</a></li>
              <li className={styles.linkItem}><a href="#join">Membership Application</a></li>
            </ul>
          </div>

          {/* Programs / Tracks */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Club Tracks</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><a href="#features">Full-Stack Web Dev</a></li>
              <li className={styles.linkItem}><a href="#features">AI & Machine Learning</a></li>
              <li className={styles.linkItem}><a href="#features">Mobile Development</a></li>
              <li className={styles.linkItem}><a href="#features">UI / UX Product Design</a></li>
              <li className={styles.linkItem}><a href="#features">Leadership & Public Speaking</a></li>
            </ul>
          </div>

          {/* Contact / Office */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact & Location</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}><span>📍 Student Union Building, Room 204</span></li>
              <li className={styles.linkItem}><span>✉️ contact@ldc-club.org</span></li>
              <li className={styles.linkItem}><span>🕒 Sun - Thu: 9:00 AM - 5:00 PM</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className={styles.bottomBar}>
          <p>© {currentYear} LDC Club Platform. Built with passion & pure CSS.</p>
          <p>
            <button 
              type="button" 
              onClick={scrollToTop} 
              className={styles.backToTopBtn}
              aria-label="Scroll back to top of the page"
            >
              Back to Top ↑
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}

