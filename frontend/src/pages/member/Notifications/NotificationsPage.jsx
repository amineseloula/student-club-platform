import { useState } from 'react';
import MemberLayout from '../../../components/MemberLayout/MemberLayout';
import styles from './NotificationsPage.module.css';

const initialNotifications = [
  { id: 1, type: 'event', title: 'Ton inscription est confirmée', text: 'Ta place pour la Sortie Lac Noir est bien réservée.', time: 'Il y a 2 heures', unread: true },
  { id: 2, type: 'announcement', title: 'Départ avancé pour le Lac Noir', text: 'Le rendez-vous est fixé à 06:15 devant le campus ESTIN.', time: 'Il y a 3 heures', unread: true },
  { id: 3, type: 'reminder', title: "N'oublie pas ton billet QR", text: 'Présente-le à l’équipe lors de l’embarquement.', time: 'Hier à 18:20', unread: true },
  { id: 4, type: 'success', title: 'Certificat disponible', text: 'Ton certificat de participation est prêt à télécharger.', time: '12 avril 2025', unread: false },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('Toutes');
  const unreadCount = notifications.filter((item) => item.unread).length;
  const visible = filter === 'Non lues' ? notifications.filter((item) => item.unread) : notifications;
  const markAllRead = () => setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
  const markRead = (id) => setNotifications((items) => items.map((item) => item.id === id ? { ...item, unread: false } : item));

  return <MemberLayout activePage="notifications" breadcrumbTitle="Notifications"><div className={styles.container}>
    <header className={styles.headerSection}><div><h1 className={styles.pageTitle}>Notifications</h1><p className={styles.pageSub}>Reste au courant de la vie de ton club.</p></div><button type="button" className={styles.markAll} onClick={markAllRead}>Tout marquer comme lu</button></header>
    <div className={styles.toolbar}><div className={styles.tabs}>{['Toutes', 'Non lues'].map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`${styles.tab} ${filter === item ? styles.tabActive : ''}`}>{item}{item === 'Non lues' && <span className={styles.count}>{unreadCount}</span>}</button>)}</div><span className={styles.today}>Aujourd'hui</span></div>
    <div className={styles.list}>{visible.map((item) => <button type="button" key={item.id} className={`${styles.notification} ${item.unread ? styles.unread : ''}`} onClick={() => markRead(item.id)}><span className={`${styles.icon} ${styles[item.type]}`} aria-hidden="true">{item.type === 'event' ? '✓' : item.type === 'announcement' ? '!' : item.type === 'reminder' ? '◷' : '★'}</span><span className={styles.content}><strong>{item.title}</strong><span>{item.text}</span><time>{item.time}</time></span>{item.unread && <span className={styles.dot} aria-label="Non lue" />}</button>)}</div>
  </div></MemberLayout>;
}
