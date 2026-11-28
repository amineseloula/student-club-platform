import { useState } from 'react';
import MemberLayout from '../../../components/MemberLayout/MemberLayout';
import styles from './RegistrationConfirmedPage.module.css';

const EVENTS_PATH = '#/membre/evenements';
const QR_PATH = '#/membre/evenements/lac-noir/qr';

export default function RegistrationConfirmedPage() {
  const [copied, setCopied] = useState(false);
  const copyCode = async () => { try { await navigator.clipboard.writeText('LDC-250426-032'); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(true); } };

  return <MemberLayout activePage="events" breadcrumbTitle="Inscription confirmée"><div className={styles.container}><section className={styles.confirmationCard}><div className={styles.checkmark} aria-hidden="true">✓</div><span className={styles.eyebrow}>INSCRIPTION VALIDÉE</span><h1>Tu es officiellement inscrit !</h1><p className={styles.intro}>Ta place pour la Sortie Lac Noir est confirmée. Prépare-toi pour une belle aventure.</p><div className={styles.eventSummary}><div className={styles.eventDate}><strong>26</strong><span>AVR</span></div><div><h2>Sortie Lac Noir</h2><p>Samedi 26 avril 2025 · 06:30</p><p>Akfadou, Béjaïa</p></div></div><div className={styles.reference}><span>Référence de réservation</span><div><strong>LDC-250426-032</strong><button type="button" onClick={copyCode}>{copied ? '✓ Copié' : 'Copier'}</button></div></div><div className={styles.actions}><a href={QR_PATH} className={styles.primaryButton}>Afficher mon billet QR</a><a href={EVENTS_PATH} className={styles.secondaryButton}>Retour à mes événements</a></div></section><aside className={styles.nextSteps}><h2>Et maintenant ?</h2><div><span>1</span><p>Retrouve ton billet QR dans <a href={EVENTS_PATH}>Mes événements</a>.</p></div><div><span>2</span><p>Prépare tes chaussures de marche et 1,5 L d'eau.</p></div><div><span>3</span><p>Rendez-vous devant le campus à 06:15.</p></div><p className={styles.help}>Une question ? Écris au bureau LDC.</p></aside></div></MemberLayout>;
}
