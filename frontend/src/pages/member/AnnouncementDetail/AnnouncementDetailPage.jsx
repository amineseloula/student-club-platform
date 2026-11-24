import { useState } from 'react';
import MemberLayout from '../../../components/MemberLayout/MemberLayout';
import styles from './AnnouncementDetailPage.module.css';

export default function AnnouncementDetailPage() {
  const [liked, setLiked] = useState(false);

  return <MemberLayout activePage="announcements" breadcrumbTitle="Détail de l'annonce"><div className={styles.container}>
    <a href="#" className={styles.backLink}><span aria-hidden="true">←</span> Toutes les annonces</a>
    <article className={styles.article}><header className={styles.articleHeader}><div className={styles.iconBox} aria-hidden="true">!</div><div><span className={styles.badge}>IMPORTANT</span><h1>Départ avancé pour le Lac Noir</h1><time>Publié le 24 avril 2025 · Il y a 2 heures</time></div></header><div className={styles.rule} /><div className={styles.articleBody}><p className={styles.lead}>Petit changement de dernière minute pour notre sortie au Lac Noir.</p><p>Pour profiter pleinement de la journée et éviter les fortes chaleurs, le départ est avancé. Merci de bien noter la nouvelle heure et de prévenir les personnes avec qui tu viens.</p><div className={styles.highlight}><strong>Nouvelle heure de départ</strong><span>Samedi 26 avril 2025 · 06:30</span><small>Rendez-vous devant le campus ESTIN à 06:15.</small></div><h2>À ne pas oublier</h2><ul><li>Ton billet QR visible sur ton téléphone</li><li>Des chaussures de marche et au moins 1,5 L d'eau</li><li>Une arrivée 15 minutes avant le départ</li></ul><p>Si tu as la moindre question, le bureau LDC reste disponible. À samedi pour une belle aventure !</p></div><footer className={styles.articleFooter}><button type="button" className={`${styles.reactionButton} ${liked ? styles.reactionActive : ''}`} onClick={() => setLiked((value) => !value)}>{liked ? '✓ Lu' : '♡ Marquer comme lu'}</button><a href="#" className={styles.shareLink}>Partager <span aria-hidden="true">↗</span></a></footer></article>
  </div></MemberLayout>;
}
