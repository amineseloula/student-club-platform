import styles from './MemberDashboard.module.css';
import lacDashboard from '../../../assets/member/lac-noir-dashboard.jpg';
import lacThumb from '../../../assets/member/lac-noir-thumb.jpg';
import volleyThumb from '../../../assets/member/volleyball-thumb.jpg';

export default function MemberDashboard() {
  return (
    <div className={styles.container}>
      {/* ── Page Greeting ── */}
      <section className={styles.greetingSection}>
        <h1 className={styles.greetingTitle}>Bonjour Amine !</h1>
        <p className={styles.greetingSub}>Prêt pour une nouvelle aventure avec le LDC ?</p>
      </section>

      {/* ── Hero Banner ── */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>MEMBRE ACTIF · 2025</span>
          <h2 className={styles.heroTitle}>Ton prochain départ approche.</h2>
          <p className={styles.heroSubtitle}>Sortie Lac Noir · Samedi 26 avril à 06:30</p>
          
          <div className={styles.heroActions}>
            <a href="#" className={styles.btnPrimaryAction}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                <path d="M13 5v2"/>
                <path d="M13 17v2"/>
                <path d="M13 11v2"/>
              </svg>
              <span>Voir mon inscription</span>
            </a>

            <a href="#" className={styles.btnSecondaryAction}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>Afficher mon QR</span>
            </a>
          </div>
        </div>

        <div className={styles.heroImageWrapper}>
          <img src={lacDashboard} alt="Sortie Lac Noir" className={styles.heroImage} />
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Événements inscrits</span>
          <span className={styles.statValue}>3</span>
          <span className={styles.statSub}>Cette saison</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Événements vécus</span>
          <span className={styles.statValue}>8</span>
          <span className={styles.statSub}>Depuis ton adhésion</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Heures d'aventure</span>
          <span className={styles.statValue}>42h</span>
          <span className={styles.statSub}>Et beaucoup de souvenirs</span>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>Statut cotisation</span>
          <span className={`${styles.statValue} ${styles.statValueSuccess}`}>Payée</span>
          <span className={styles.statSub}>1 500 DZD · 2025</span>
        </div>
      </section>

      {/* ── Bottom Section: Events & Announcements ── */}
      <section className={styles.bottomGrid}>
        {/* Left: Mes prochains événements */}
        <div className={styles.cardBox}>
          <div className={styles.cardBoxHeader}>
            <div>
              <h3 className={styles.cardBoxTitle}>Mes prochains événements</h3>
              <p className={styles.cardBoxSubtitle}>Tes inscriptions confirmées</p>
            </div>
            <a href="#" className={styles.seeAllLink}>
              Tout voir →
            </a>
          </div>

          <div className={styles.eventsList}>
            {/* Event 1 */}
            <div className={styles.eventRow}>
              <div className={styles.eventThumbWrapper}>
                <img src={lacThumb} alt="Sortie Lac Noir" className={styles.eventThumb} />
                <span className={`${styles.eventThumbBadge} ${styles.badgeConfirm}`}>
                  CONFIRMÉ
                </span>
              </div>
              <div className={styles.eventDetails}>
                <span className={styles.eventDateTime}>26 AVR · 06:30</span>
                <h4 className={styles.eventTitle}>Sortie Lac Noir</h4>
                <span className={styles.eventLocation}>📍 Akfadou</span>
                <a href="#" className={styles.eventActionLink}>
                  Voir les détails ›
                </a>
              </div>
            </div>

            <div className={styles.eventDivider} />

            {/* Event 2 */}
            <div className={styles.eventRow}>
              <div className={styles.eventThumbWrapper}>
                <img src={volleyThumb} alt="Tournoi de Volleyball" className={styles.eventThumb} />
                <span className={`${styles.eventThumbBadge} ${styles.badgeWaitlist}`}>
                  LISTE D'ATTENTE
                </span>
              </div>
              <div className={styles.eventDetails}>
                <span className={styles.eventDateTime}>03 MAI · 09:00</span>
                <h4 className={styles.eventTitle}>Tournoi de Volleyball</h4>
                <span className={styles.eventLocation}>📍 Campus ESTIN</span>
                <a href="#" className={styles.eventActionLink}>
                  Voir les détails ›
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Annonces épinglées */}
        <div className={styles.cardBox}>
          <div className={styles.cardBoxHeader}>
            <div>
              <h3 className={styles.cardBoxTitle}>Annonces épinglées</h3>
              <p className={styles.cardBoxSubtitle}>À ne pas manquer</p>
            </div>
            <a href="#" className={styles.seeAllLink}>
              Tout voir →
            </a>
          </div>

          <div className={styles.announcementsList}>
            {/* Announcement 1 */}
            <div className={styles.announcementItem}>
              <div className={`${styles.announcementIconBox} ${styles.iconBoxImportant}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 11 18-5v12L3 13v-2z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </div>
              <div className={styles.announcementBody}>
                <span className={`${styles.announcementBadge} ${styles.badgeImportant}`}>
                  IMPORTANT
                </span>
                <h4 className={styles.announcementTitle}>Départ avancé pour le Lac Noir</h4>
                <span className={styles.announcementTime}>Il y a 2 heures</span>
              </div>
            </div>

            {/* Announcement 2 */}
            <div className={styles.announcementItem}>
              <div className={`${styles.announcementIconBox} ${styles.iconBoxReminder}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div className={styles.announcementBody}>
                <span className={`${styles.announcementBadge} ${styles.badgeReminder}`}>
                  RAPPEL
                </span>
                <h4 className={styles.announcementTitle}>Cotisations saison 2025</h4>
                <span className={styles.announcementTime}>Hier à 18:20</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
