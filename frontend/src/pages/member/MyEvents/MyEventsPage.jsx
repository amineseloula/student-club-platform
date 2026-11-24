import { useState } from 'react';
import styles from './MyEventsPage.module.css';
import lacLg from '../../../assets/member/lac-lg.jpg';
import volleyLg from '../../../assets/member/volleyball-lg.jpg';
import soireeThumb from '../../../assets/member/soiree-thumb.jpg';

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState('inscrits');

  const events = [
    {
      id: 'lac-noir',
      title: 'Sortie Lac Noir',
      day: '26',
      month: 'AVR',
      date: '26 avril 2025',
      location: 'Akfadou, Béjaïa',
      image: lacLg,
      status: 'CONFIRMÉ',
      statusType: 'confirm',
      hasQr: true
    },
    {
      id: 'volleyball',
      title: 'Tournoi de Volleyball',
      day: '3',
      month: 'MAI',
      date: '3 mai 2025',
      location: 'Campus ESTIN',
      image: volleyLg,
      status: 'LISTE D\'ATTENTE',
      statusType: 'waitlist',
      hasQr: false
    },
    {
      id: 'soiree-musique',
      title: 'Soirée musique',
      day: '10',
      month: 'MAI',
      date: '10 mai 2025',
      location: 'Cap Carbon',
      image: soireeThumb,
      status: 'CONFIRMÉ',
      statusType: 'confirm',
      hasQr: false
    }
  ];

  return (
    <div className={styles.container}>
      {/* ── Page Header ── */}
      <section className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Mes événements</h1>
        <p className={styles.pageSub}>Retrouve tes inscriptions, billets et souvenirs.</p>
      </section>

      {/* ── Tabs ── */}
      <nav className={styles.tabsContainer} aria-label="Filtres événements">
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'inscrits' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('inscrits')}
        >
          <span>Inscrits</span>
          <span className={styles.tabCountBadge}>3</span>
          {activeTab === 'inscrits' && <div className={styles.tabIndicator} />}
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'participes' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('participes')}
        >
          <span>Participés</span>
          <span className={styles.tabCountBadge}>8</span>
          {activeTab === 'participes' && <div className={styles.tabIndicator} />}
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'passes' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('passes')}
        >
          <span>Passés</span>
          <span className={styles.tabCountBadge}>11</span>
          {activeTab === 'passes' && <div className={styles.tabIndicator} />}
        </button>
      </nav>

      {/* ── Events List ── */}
      <div className={styles.eventsList}>
        {events.map((evt) => (
          <article key={evt.id} className={styles.eventCard}>
            {/* Event Photo */}
            <div className={styles.eventPhotoWrapper}>
              <img src={evt.image} alt={evt.title} className={styles.eventPhoto} />
            </div>

            {/* Date Box */}
            <div className={styles.dateBox}>
              <span className={styles.dateDay}>{evt.day}</span>
              <span className={styles.dateMonth}>{evt.month}</span>
            </div>

            {/* Details */}
            <div className={styles.eventInfo}>
              <span className={`${styles.statusBadge} ${evt.statusType === 'confirm' ? styles.statusConfirm : styles.statusWaitlist}`}>
                {evt.status}
              </span>
              <h2 className={styles.eventCardTitle}>{evt.title}</h2>
              <div className={styles.eventMetaList}>
                <span className={styles.eventMetaItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{evt.date}</span>
                </span>

                <span className={styles.eventMetaItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{evt.location}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.eventActions}>
              {evt.hasQr && (
                <a
                  href="#"
                  className={styles.btnQr}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  <span>Mon QR</span>
                </a>
              )}

              <a
                href="#"
                className={styles.btnDetails}
              >
                Détails
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
