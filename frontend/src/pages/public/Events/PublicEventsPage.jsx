import { useMemo, useState } from 'react';
import { getPublicEvents, PUBLIC_EVENT_CATEGORIES } from '../../../mocks/publicData';
import styles from './PublicEventsPage.module.css';

const STATUS_DISPLAY = {
  open: { label: 'Ouvert', tone: 'open' },
  full: { label: 'Complet', tone: 'full' },
  cancelled: { label: 'Annulé', tone: 'cancelled' },
  past: { label: 'Passé', tone: 'past' },
};

const CALENDAR_MONTHS = [
  { year: 2025, month: 1, label: 'Février 2025' },
  { year: 2025, month: 2, label: 'Mars 2025' },
  { year: 2025, month: 3, label: 'Avril 2025' },
  { year: 2025, month: 4, label: 'Mai 2025' },
];

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function PublicEventsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'upcoming' | 'past'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'calendar'
  const [monthIdx, setMonthIdx] = useState(2); // April 2025 default

  const events = useMemo(() => getPublicEvents(), []);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return events.filter((evt) => {
      const matchesQuery =
        !query ||
        evt.title.toLowerCase().includes(query) ||
        evt.location.toLowerCase().includes(query);
      const matchesCat = category === 'all' || evt.category === category;
      const isPast = evt.status === 'past';
      const matchesTime =
        timeFilter === 'all' ||
        (timeFilter === 'upcoming' && !isPast) ||
        (timeFilter === 'past' && isPast);
      return matchesQuery && matchesCat && matchesTime;
    });
  }, [events, search, category, timeFilter]);

  const activeMonth = CALENDAR_MONTHS[monthIdx];

  const calendarCells = useMemo(() => {
    const firstDay = new Date(Date.UTC(activeMonth.year, activeMonth.month, 1));
    const daysInMonth = new Date(Date.UTC(activeMonth.year, activeMonth.month + 1, 0)).getUTCDate();
    // Monday-first offset (0 = Mon ... 6 = Sun)
    const startOffset = (firstDay.getUTCDay() + 6) % 7;

    const cells = [];
    for (let i = 0; i < startOffset; i += 1) {
      cells.push({ key: `empty-${i}`, empty: true });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = `${activeMonth.year}-${String(activeMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = filteredEvents.filter((evt) => evt.date === iso);
      cells.push({ key: iso, day, iso, events: dayEvents });
    }
    return cells;
  }, [activeMonth, filteredEvents]);

  return (
    <div className={styles.page}>
      {/* 1. Beige Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>PROGRAMME DU CLUB</span>
          <h1 className={styles.heroTitle}>Ta prochaine aventure t&apos;attend.</h1>
          <p className={styles.heroSubtitle}>
            Randonnées en forêt, tournois sportifs, soirées musicales : explore toutes les sorties et activités du LDC.
          </p>
        </div>
      </section>

      {/* 2. Search, Filters & Calendar Toggle */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.controlsBar}>
            <div className={styles.searchWrap}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Rechercher un événement par nom ou lieu…"
                aria-label="Rechercher un événement"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className={styles.segmented} role="group" aria-label="Filtrer par période">
              {[
                { value: 'all', label: 'Tous' },
                { value: 'upcoming', label: 'À venir' },
                { value: 'past', label: 'Passés' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.segBtn} ${timeFilter === opt.value ? styles.segBtnActive : ''}`}
                  onClick={() => setTimeFilter(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.calendarToggle} ${viewMode === 'calendar' ? styles.calendarToggleActive : ''}`}
              onClick={() => setViewMode((prev) => (prev === 'grid' ? 'calendar' : 'grid'))}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{viewMode === 'grid' ? 'Vue calendrier' : 'Vue grille'}</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className={styles.categoryRow} role="group" aria-label="Filtrer par catégorie">
            {PUBLIC_EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`${styles.catChip} ${category === cat.value ? styles.catChipActive : ''}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 3. Events Grid OR Calendar View */}
          {viewMode === 'grid' ? (
            filteredEvents.length === 0 ? (
              <div className={styles.emptyBox}>
                <h3>Aucun événement trouvé</h3>
                <p>Essayez de modifier votre recherche ou de réinitialiser les filtres.</p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => {
                    setSearch('');
                    setCategory('all');
                    setTimeFilter('all');
                  }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className={styles.eventsGrid}>
                {filteredEvents.map((evt) => {
                  const statusInfo = STATUS_DISPLAY[evt.status] || STATUS_DISPLAY.open;
                  return (
                    <a
                      key={evt.id}
                      href={`#/evenements/${evt.id}`}
                      className={styles.card}
                    >
                      <div className={styles.cardMedia}>
                        <img src={evt.image} alt={evt.title} className={styles.cardImage} loading="lazy" />

                        <span className={`${styles.statusBadge} ${styles[`status_${statusInfo.tone}`]}`}>
                          {statusInfo.label}
                        </span>

                        <div className={styles.dateBadge}>
                          <span className={styles.dateDay}>{evt.day}</span>
                          <span className={styles.dateMonth}>{evt.month}</span>
                        </div>
                      </div>

                      <div className={styles.cardBody}>
                        <span className={styles.cardCategory}>{evt.categoryLabel}</span>
                        <h2 className={styles.cardTitle}>{evt.title}</h2>
                        <p className={styles.cardDesc}>{evt.shortDescription}</p>
                      </div>

                      <div className={styles.cardFooter}>
                        <span className={styles.cardLocation}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {evt.location}
                        </span>
                        <span className={styles.cardPrice}>{evt.priceLabel}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )
          ) : (
            <div className={styles.calendarCard}>
              <div className={styles.calendarHeader}>
                <button
                  type="button"
                  className={styles.calNavBtn}
                  disabled={monthIdx === 0}
                  onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
                  aria-label="Mois précédent"
                >
                  ← Précédent
                </button>
                <h2 className={styles.calTitle}>{activeMonth.label}</h2>
                <button
                  type="button"
                  className={styles.calNavBtn}
                  disabled={monthIdx === CALENDAR_MONTHS.length - 1}
                  onClick={() => setMonthIdx((i) => Math.min(CALENDAR_MONTHS.length - 1, i + 1))}
                  aria-label="Mois suivant"
                >
                  Suivant →
                </button>
              </div>

              <div className={styles.calendarGrid}>
                {WEEKDAYS.map((dayName) => (
                  <div key={dayName} className={styles.weekdayHeader}>
                    {dayName}
                  </div>
                ))}

                {calendarCells.map((cell) =>
                  cell.empty ? (
                    <div key={cell.key} className={styles.calCellEmpty} />
                  ) : (
                    <div key={cell.key} className={styles.calCell}>
                      <span className={styles.calDayNum}>{cell.day}</span>
                      <div className={styles.calEvents}>
                        {cell.events.map((evt) => {
                          const statusInfo = STATUS_DISPLAY[evt.status] || STATUS_DISPLAY.open;
                          return (
                            <a
                              key={evt.id}
                              href={`#/evenements/${evt.id}`}
                              className={`${styles.calEventPill} ${styles[`pill_${statusInfo.tone}`]}`}
                              title={`${evt.title} (${statusInfo.label})`}
                            >
                              {evt.title}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
