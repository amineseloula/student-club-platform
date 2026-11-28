import { useState } from 'react';
import MemberLayout from '../../../components/MemberLayout/MemberLayout';
import styles from './AttendanceCertificatePage.module.css';

const EVENTS_PATH = '#/membre/evenements';

export default function AttendanceCertificatePage() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <MemberLayout activePage="events" breadcrumbTitle="Certificat de participation">
      <div className={styles.container}>
        <header className={styles.headerSection}>
          <a href={EVENTS_PATH} className={styles.backLink}><span aria-hidden="true">←</span> Mes événements</a>
          <h1 className={styles.pageTitle}>Ton certificat de participation</h1>
          <p className={styles.pageSub}>Garde une trace de tes aventures avec le LDC.</p>
        </header>

        <div className={styles.certificateLayout}>
          <section className={styles.certificateCard} aria-label="Certificat de participation">
            <div className={styles.certificateInner}>
              <div className={styles.certificateTop}><span className={styles.logoText}>LDC</span><span className={styles.certificateLabel}>CERTIFICAT DE PARTICIPATION</span></div>
              <div className={styles.certificateRule} />
              <p className={styles.presented}>Le LDC certifie que</p>
              <h2 className={styles.memberName}>Amine Meziane</h2>
              <p className={styles.certificateCopy}>a participé à l'événement</p>
              <h3 className={styles.eventName}>Sortie Lac Noir</h3>
              <p className={styles.eventDate}>26 avril 2025 · Akfadou, Béjaïa</p>
              <div className={styles.seal} aria-hidden="true"><span>✓</span><small>LDC<br />MEMBRE</small></div>
              <div className={styles.signatureRow}><div><span className={styles.signature}>Bureau LDC</span><span className={styles.signatureLine} /> <small>Responsable des activités</small></div><span className={styles.certificateId}>N° LDC-250426-032</span></div>
            </div>
          </section>

          <aside className={styles.actionPanel}>
            <div className={styles.actionIcon} aria-hidden="true">✦</div>
            <h2>Félicitations !</h2>
            <p>Tu as participé à cette aventure. Télécharge ton certificat pour le conserver ou le partager.</p>
            <button type="button" className={styles.downloadButton} onClick={handleDownload}>{downloaded ? '✓ Certificat prêt' : '↓ Télécharger le certificat'}</button>
            <a href={EVENTS_PATH} className={styles.returnLink}>← Retour à mes événements</a>
          </aside>
        </div>
      </div>
    </MemberLayout>
  );
}
