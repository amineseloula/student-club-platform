import { useState } from 'react';
import styles from './EventDetailsPage.module.css';
import lacBanner from '../../../assets/member/lac-noir-banner.jpg';

export default function EventDetailsPage() {
  const [selectedStatus, setSelectedStatus] = useState('inscrit');

  return (
    <div className={styles.container}>
      {/* ── Back Navigation ── */}
      <a 
        href="#" 
        className={styles.backLink}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        <span>Mes événements</span>
      </a>

      {/* ── Large Hero Banner ── */}
      <section className={styles.heroBannerWrapper}>
        <img src={lacBanner} alt="Sortie Lac Noir" className={styles.heroBannerImage} />
        <div className={styles.heroOverlay}>
          <span className={styles.heroTag}>SORTIE & DÉCOUVERTE</span>
          <h1 className={styles.heroTitle}>Sortie Lac Noir</h1>
          <div className={styles.heroMetaRow}>
            <span className={styles.heroMetaItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Samedi 26 avril 2025 · 06:30</span>
            </span>

            <span className={styles.heroMetaItem}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Akfadou, Béjaïa</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── Status Filter Pills Row ── */}
      <div className={styles.statusRow}>
        <span className={styles.statusLabel}>États :</span>
        <div className={styles.statusPills}>
          {['Inscrit', 'Liste d\'attente', 'Annulé'].map((status) => {
            const val = status.toLowerCase();
            return (
              <button
                key={status}
                type="button"
                className={`${styles.statusPill} ${selectedStatus === val ? styles.statusPillActive : ''}`}
                onClick={() => setSelectedStatus(val)}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Two-Column Content Grid ── */}
      <div className={styles.mainGrid}>
        {/* Left Column: Details, Program & What to Bring */}
        <div className={styles.detailsCard}>
          {/* Section 1: À propos */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>À propos de cette sortie</h2>
            <p className={styles.sectionParagraph}>
              Une journée au cœur de la forêt de l'Akfadou, entre sentiers ombragés et découverte du mystérieux Lac Noir. Le transport, l'encadrement et une collation sont inclus.
            </p>
          </div>

          <div className={styles.sectionDivider} />

          {/* Section 2: Programme */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Programme</h2>
            <div className={styles.timelineList}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>06:30</span>
                <span className={styles.timelineLabel}>Départ du campus ESTIN</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>09:00</span>
                <span className={styles.timelineLabel}>Début de la randonnée</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>12:30</span>
                <span className={styles.timelineLabel}>Pique-nique au lac</span>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineTime}>18:30</span>
                <span className={styles.timelineLabel}>Retour estimé</span>
              </div>
            </div>
          </div>

          <div className={styles.sectionDivider} />

          {/* Section 3: À emporter */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>À emporter</h2>
            <div className={styles.tagsRow}>
              <span className={styles.bringTag}>Chaussures de marche</span>
              <span className={styles.bringTag}>1,5 L d'eau</span>
              <span className={styles.bringTag}>Déjeuner</span>
              <span className={styles.bringTag}>Veste légère</span>
            </div>
          </div>
        </div>

        {/* Right Column: Confirmation Box & Actions */}
        <aside className={styles.sidebarCard}>
          {/* Confirmed Banner */}
          <div className={styles.confirmedBox}>
            <div className={styles.confirmedTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Inscription confirmée</span>
            </div>
            <span className={styles.confirmedSub}>Réservation #LDC-250426-032</span>
          </div>

          {/* Info Rows */}
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Participation</span>
              <span className={styles.infoValue}>1 200 DZD</span>
            </div>

            <div className={styles.infoDivider} />

            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Point de départ</span>
              <span className={styles.infoValue}>Campus ESTIN</span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.sidebarActions}>
            <a
              href="#"
              className={styles.btnShowTicket}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>Afficher mon billet QR</span>
            </a>

            <button
              type="button"
              className={styles.btnCancelBooking}
              onClick={() => alert('Annulation demandée pour cette réservation.')}
            >
              Annuler mon inscription
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
