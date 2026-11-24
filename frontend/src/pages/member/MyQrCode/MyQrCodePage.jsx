import styles from './MyQrCodePage.module.css';
import busBadge from '../../../assets/member/bus-badge.png';
import qrCodeImg from '../../../assets/member/qr-code.png';

export default function MyQrCodePage() {
  const handleDownload = () => {
    alert('Téléchargement du billet PDF initié.');
  };

  return (
    <div className={styles.container}>
      {/* ── Page Header ── */}
      <section className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Mon billet</h1>
        <p className={styles.pageSub}>Présente ce QR code à l'équipe lors de l'embarquement.</p>
      </section>

      {/* ── Two-Column Layout ── */}
      <div className={styles.ticketLayout}>
        {/* ── Left: The Ticket Card ── */}
        <div className={styles.ticketCard}>
          {/* Header */}
          <div className={styles.ticketHeader}>
            <div className={styles.ticketEventMeta}>
              <img src={busBadge} alt="Bus badge" className={styles.busBadge} />
              <div className={styles.eventTitleBlock}>
                <h2 className={styles.ticketEventTitle}>Sortie Lac Noir</h2>
                <span className={styles.ticketEventSub}>Billet membre</span>
              </div>
            </div>
            <span className={styles.ticketBadge}>CONFIRMÉ</span>
          </div>

          <div className={styles.dashedDivider} />

          {/* QR Code Graphic */}
          <div className={styles.qrContainer}>
            <img src={qrCodeImg} alt="QR Code d'embarquement" className={styles.qrImage} />
            <span className={styles.qrScanInstruction}>
              Place le code dans le cadre du scanner
            </span>
          </div>

          <div className={styles.dashedDivider} />

          {/* Details 2x2 Grid */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailField}>
              <span className={styles.fieldLabel}>Participant</span>
              <span className={styles.fieldValue}>Amine Meziane</span>
            </div>

            <div className={styles.detailField}>
              <span className={styles.fieldLabel}>N° membre</span>
              <span className={styles.fieldValue}>LDC-2025-084</span>
            </div>

            <div className={styles.detailField}>
              <span className={styles.fieldLabel}>Date</span>
              <span className={styles.fieldValue}>26 AVR 2025</span>
            </div>

            <div className={styles.detailField}>
              <span className={styles.fieldLabel}>Départ</span>
              <span className={styles.fieldValue}>06:30 · ESTIN</span>
            </div>
          </div>

          {/* Ticket Code Strip */}
          <div className={styles.ticketCodeStrip}>
            LDC-250426-032
          </div>
        </div>

        {/* ── Right: Departure Day Instructions ── */}
        <aside className={styles.guidancePanel}>
          <h2 className={styles.guidanceTitle}>Le jour du départ</h2>

          <div className={styles.stepsList}>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>1</div>
              <p className={styles.stepText}>Arrive 15 minutes avant l'heure prévue.</p>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>2</div>
              <p className={styles.stepText}>Augmente la luminosité de ton écran.</p>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>3</div>
              <p className={styles.stepText}>Présente ce code au membre du bureau.</p>
            </div>
          </div>

          <button
            type="button"
            className={styles.btnDownload}
            onClick={handleDownload}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Télécharger le billet</span>
          </button>

          <a
            href="#"
            className={styles.returnLink}
          >
            ← Retour à l'événement
          </a>
        </aside>
      </div>
    </div>
  );
}
