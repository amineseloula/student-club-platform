import { useState } from 'react';
import MemberLayout from '../../../components/MemberLayout/MemberLayout';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Amine Meziane');
  const [bio, setBio] = useState('Étudiant passionné par la technologie, les aventures et la vie associative.');

  const handleSave = (event) => { event.preventDefault(); setEditing(false); setSaved(true); window.setTimeout(() => setSaved(false), 2500); };

  return <MemberLayout activePage="profile" breadcrumbTitle="Mon profil"><div className={styles.container}>
    <header className={styles.headerSection}><h1 className={styles.pageTitle}>Mon profil</h1><p className={styles.pageSub}>Gère tes informations personnelles et ton identité LDC.</p></header>
    <div className={styles.profileGrid}><section className={styles.profileCard}><div className={styles.cover} /><div className={styles.identity}><div className={styles.avatar}>AM</div><div><h2>{name}</h2><p>Membre actif · Depuis septembre 2024</p></div><button type="button" className={styles.editButton} onClick={() => setEditing((value) => !value)}>{editing ? 'Annuler' : 'Modifier le profil'}</button></div>{editing ? <form className={styles.form} onSubmit={handleSave}><label>Nom complet<input value={name} onChange={(event) => setName(event.target.value)} /></label><label>Bio<textarea value={bio} onChange={(event) => setBio(event.target.value)} rows="3" /></label><button type="submit" className={styles.primaryButton}>Enregistrer</button></form> : <div className={styles.details}><div><span>Adresse e-mail</span><strong>amine.meziane@estin.dz</strong></div><div><span>Téléphone</span><strong>+213 555 12 34 56</strong></div><div><span>Filière</span><strong>Génie logiciel · 3e année</strong></div><div><span>Bio</span><strong>{bio}</strong></div></div>}</section><aside className={styles.sideColumn}><div className={styles.memberCard}><span className={styles.cardLabel}>CARTE MEMBRE</span><div className={styles.cardLogo}>LDC</div><strong>Amine Meziane</strong><span>LDC-2025-084</span><small>Active jusqu'au 30 juin 2025</small></div><div className={styles.statCard}><strong>8</strong><span>événements vécus</span><strong>42h</strong><span>d'aventure</span></div></aside></div>{saved && <div className={styles.toast} role="status">✓ Profil mis à jour</div>}</div></MemberLayout>;
}
