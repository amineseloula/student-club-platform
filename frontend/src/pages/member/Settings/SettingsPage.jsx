import { useState } from 'react';
import MemberLayout from '../../../components/MemberLayout/MemberLayout';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({ announcements: true, events: true, reminders: true, email: false });
  const [saved, setSaved] = useState(false);
  const toggle = (key) => setSettings((value) => ({ ...value, [key]: !value[key] }));
  const handleSubmit = (event) => { event.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 2500); };

  return <MemberLayout activePage="settings" breadcrumbTitle="Paramètres"><div className={styles.container}>
    <header className={styles.headerSection}><h1 className={styles.pageTitle}>Paramètres</h1><p className={styles.pageSub}>Personnalise ton expérience au sein du LDC.</p></header>
    <form className={styles.settingsCard} onSubmit={handleSubmit}><section className={styles.section}><h2>Préférences de notification</h2><p className={styles.sectionSub}>Choisis les informations que tu souhaites recevoir.</p>{[['announcements','Annonces du club','Les nouvelles et communications importantes.'],['events','Événements et inscriptions','Les ouvertures, changements et confirmations.'],['reminders','Rappels','Un rappel avant tes événements et échéances.'],['email','Recevoir aussi par e-mail','Une copie des notifications dans ta boîte mail.']].map(([key,title,description]) => <div className={styles.settingRow} key={key}><div><strong>{title}</strong><span>{description}</span></div><button type="button" aria-pressed={settings[key]} onClick={() => toggle(key)} className={`${styles.switch} ${settings[key] ? styles.switchOn : ''}`}><span /></button></div>)}</section><div className={styles.divider} /><section className={styles.section}><h2>Langue et apparence</h2><div className={styles.selectRow}><label htmlFor="language">Langue de l'interface<select id="language" defaultValue="fr"><option value="fr">Français</option><option value="en">English</option><option value="ar">العربية</option></select></label><label htmlFor="theme">Thème<select id="theme" defaultValue="light"><option value="light">Clair</option><option value="system">Système</option></select></label></div></section><div className={styles.actions}><button type="submit" className={styles.saveButton}>Enregistrer les préférences</button><a href="#" className={styles.deleteLink}>Se déconnecter</a></div></form>{saved && <div className={styles.toast} role="status">✓ Préférences enregistrées</div>}
  </div></MemberLayout>;
}
