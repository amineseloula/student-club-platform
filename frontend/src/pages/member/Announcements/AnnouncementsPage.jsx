import { useMemo, useState } from 'react';
import MemberLayout from '../../../components/MemberLayout/MemberLayout';
import styles from './AnnouncementsPage.module.css';

const announcements = [
  { id: 1, type: 'important', label: 'IMPORTANT', title: 'Départ avancé pour le Lac Noir', excerpt: 'Le départ est avancé à 06:30. Rendez-vous devant le campus ESTIN avec ton billet QR.', time: 'Il y a 2 heures', pinned: true },
  { id: 2, type: 'reminder', label: 'RAPPEL', title: 'Cotisations saison 2025', excerpt: 'Pense à régulariser ta cotisation avant la fin du mois pour conserver ton statut de membre actif.', time: 'Hier à 18:20', pinned: true },
  { id: 3, type: 'event', label: 'ÉVÉNEMENT', title: 'Les inscriptions au tournoi de volleyball sont ouvertes', excerpt: 'Rejoins-nous le 3 mai au campus ESTIN pour une matinée sportive et conviviale.', time: '12 avril 2025', pinned: false },
  { id: 4, type: 'info', label: 'INFO', title: 'Nouveaux créneaux pour les permanences LDC', excerpt: 'Le bureau est disponible chaque mardi et jeudi de 12:00 à 14:00.', time: '9 avril 2025', pinned: false },
];

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState('Toutes');
  const visibleAnnouncements = useMemo(() => filter === 'Toutes' ? announcements : announcements.filter((item) => item.label === filter.toUpperCase()), [filter]);

  return <MemberLayout activePage="announcements" breadcrumbTitle="Annonces"><div className={styles.container}>
    <header className={styles.headerSection}><h1 className={styles.pageTitle}>Annonces</h1><p className={styles.pageSub}>Les dernières nouvelles de ta communauté LDC.</p></header>
    <nav className={styles.filters} aria-label="Filtrer les annonces">{['Toutes', 'Important', 'Rappel', 'Événement', 'Info'].map((item) => <button type="button" key={item} className={`${styles.filterButton} ${filter === item ? styles.filterActive : ''}`} onClick={() => setFilter(item)}>{item}</button>)}</nav>
    <div className={styles.feed}>{visibleAnnouncements.map((item) => <article key={item.id} className={`${styles.announcementCard} ${item.pinned ? styles.pinned : ''}`}><div className={`${styles.iconBox} ${styles[`icon${item.type}`]}`} aria-hidden="true">{item.type === 'important' ? '!' : item.type === 'reminder' ? '✓' : item.type === 'event' ? '◈' : 'i'}</div><div className={styles.body}><div className={styles.meta}><span className={`${styles.badge} ${styles[`badge${item.type}`]}`}>{item.label}</span>{item.pinned && <span className={styles.pin}>ÉPINGLÉE</span>}<time>{item.time}</time></div><h2>{item.title}</h2><p>{item.excerpt}</p><a href="#" className={styles.readLink}>Lire l'annonce <span aria-hidden="true">→</span></a></div></article>)}</div>
  </div></MemberLayout>;
}
