import { useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import {
  getPublicEventByIdOrSlug,
  toggleEventRegistration,
} from '../../../mocks/publicData';
import styles from './PublicEventDetailsPage.module.css';

const STATUS_META = {
  open: { label: 'Inscriptions ouvertes', tone: 'open', message: 'Des places sont encore disponibles.' },
  full: { label: 'Complet', tone: 'full', message: 'Toutes les places ont été réservées.' },
  cancelled: { label: 'Événement annulé', tone: 'cancelled', message: 'Cette sortie a été annulée.' },
  past: { label: 'Événement passé', tone: 'past', message: 'Cet événement a déjà eu lieu.' },
};

export default function PublicEventDetailsPage({ params = {}, onRequireAuth }) {
  const [refreshTick, setRefreshTick] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const { isAuthenticated, user } = useAuth();

  // Re-evaluate event on registration toggle
  const event = getPublicEventByIdOrSlug(params.id);
  void refreshTick;

  if (!event) {
    return (
      <div className={styles.notFoundWrap}>
        <div className={styles.notFoundCard}>
          <span className={styles.eyebrow}>ÉVÉNEMENT INTROUVABLE</span>
          <h1>Cet événement n&apos;existe pas</h1>
          <p>Il a peut-être été déplacé ou supprimé du calendrier du club.</p>
          <a href="#/evenements" className={styles.backBtn}>
            ← Retour aux événements
          </a>
        </div>
      </div>
    );
  }

  const statusMeta = STATUS_META[event.status] || STATUS_META.open;
  const capacityPercent = event.capacity > 0 ? Math.min(100, Math.round((event.registered / event.capacity) * 100)) : 0;
  const canRegister = event.status === 'open' || event.isUserRegistered;

  const performToggle = () => {
    const result = toggleEventRegistration(event.id);
    setRefreshTick((n) => n + 1);
    setFeedback(
      result.isRegistered
        ? `Ta place est réservée pour ${event.title} ! Un récapitulatif est lié à ton compte (${user?.email || 'membre'}).`
        : `Ton inscription à ${event.title} a bien été annulée.`
    );
  };

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      onRequireAuth?.({
        subtitle: `Connecte-toi ou crée un accès visiteur pour réserver ta place à « ${event.title} ».`,
        onSuccess: () => {
          performToggle();
        },
      });
      return;
    }
    performToggle();
  };

  return (
    <div className={styles.page}>
      {/* 1. Full-width Hero Image with Dark Overlay */}
      <section className={styles.heroBanner}>
        <img src={event.bannerImage} alt={event.title} className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <a href="#/evenements" className={styles.backLink}>
            ← Tous les événements
          </a>
          <span className={styles.categoryBadge}>{event.categoryLabel}</span>
          <h1 className={styles.heroTitle}>{event.title}</h1>
          <div className={styles.heroMeta}>
            <span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {event.dateLabel} · {event.timeLabel}
            </span>
            <span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Content */}
      <section className={styles.bodySection}>
        <div className={styles.container}>
          {feedback && (
            <div className={styles.feedbackBanner} role="status">
              <span>{feedback}</span>
              <button type="button" onClick={() => setFeedback(null)} aria-label="Fermer le message">
                ×
              </button>
            </div>
          )}

          <div className={styles.mainGrid}>
            {/* Left Column: Description & Schedule */}
            <div className={styles.detailsCol}>
              <div className={styles.contentBlock}>
                <span className={styles.sectionEyebrow}>À PROPOS DE L&apos;ÉVÉNEMENT</span>
                <h2 className={styles.blockTitle}>Présentation</h2>
                <div className={styles.paragraphs}>
                  {event.fullDescription.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className={styles.contentBlock}>
                <span className={styles.sectionEyebrow}>DÉROULEMENT</span>
                <h2 className={styles.blockTitle}>Programme de la journée</h2>
                <ol className={styles.timeline}>
                  {event.schedule.map((item) => (
                    <li key={`${item.time}-${item.label}`} className={styles.timelineItem}>
                      <span className={styles.timelineTime}>{item.time}</span>
                      <span className={styles.timelineText}>{item.label}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.contentBlock}>
                <span className={styles.sectionEyebrow}>PRÉPARATIFS</span>
                <h2 className={styles.blockTitle}>À prévoir</h2>
                <div className={styles.reqList}>
                  {event.requirements.map((req) => (
                    <span key={req} className={styles.reqPill}>
                      ✓ {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Registration Card */}
            <aside className={styles.sidebarCard}>
              <span className={`${styles.statusTag} ${styles[`tag_${statusMeta.tone}`]}`}>
                {statusMeta.label}
              </span>
              <p className={styles.availabilityMsg}>
                {event.isUserRegistered
                  ? 'Tu es actuellement inscrit(e) à cet événement.'
                  : statusMeta.message}
              </p>

              <dl className={styles.infoRows}>
                <div className={styles.infoRow}>
                  <dt>Participation</dt>
                  <dd className={styles.priceVal}>{event.priceLabel}</dd>
                </div>
                <div className={styles.infoRow}>
                  <dt>Point de départ</dt>
                  <dd>{event.meetingPoint}</dd>
                </div>
                <div className={styles.infoRow}>
                  <dt>Participants</dt>
                  <dd>
                    <strong>
                      {event.registered}/{event.capacity}
                    </strong>{' '}
                    participants
                  </dd>
                </div>
              </dl>

              <div className={styles.progressWrap}>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={event.registered}
                  aria-valuemin={0}
                  aria-valuemax={event.capacity}
                  aria-label="Places occupées"
                >
                  <div className={styles.progressFill} style={{ width: `${capacityPercent}%` }} />
                </div>
                <span className={styles.progressHint}>{capacityPercent}% des places réservées</span>
              </div>

              {canRegister ? (
                <button
                  type="button"
                  className={`${styles.registerBtn} ${event.isUserRegistered ? styles.cancelBtn : ''}`}
                  onClick={handleRegisterClick}
                >
                  {event.isUserRegistered
                    ? 'Annuler mon inscription'
                    : isAuthenticated
                    ? "Confirmer mon inscription →"
                    : "S'inscrire à l'événement →"}
                </button>
              ) : (
                <button type="button" className={styles.disabledBtn} disabled>
                  Inscriptions fermées
                </button>
              )}

              {!isAuthenticated && canRegister && (
                <p className={styles.authNote}>
                  Connexion requise pour finaliser ta réservation (un compte visiteur peut être créé en 10 secondes).
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
