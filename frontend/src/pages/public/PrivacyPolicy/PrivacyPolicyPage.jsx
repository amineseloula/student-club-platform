import { useState } from 'react';
import { PRIVACY_SECTIONS } from '../../../mocks/publicData';
import styles from './PrivacyPolicyPage.module.css';

export default function PrivacyPolicyPage() {
  const [openIds, setOpenIds] = useState(() => ['collecte', 'types']);

  const toggleSection = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.page}>
      {/* 1. Beige Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>TRANSPARENCE &amp; CONFIANCE</span>
          <h1 className={styles.heroTitle}>Politique de confidentialité.</h1>
          <p className={styles.heroSubtitle}>
            Comment le LDC (Leisure &amp; Discovery Club) recueille, protège et utilise les informations confiées par les étudiants de l&apos;ESTIN.
          </p>
        </div>
      </section>

      {/* 2. Readable Centered Content */}
      <section className={styles.bodySection}>
        <div className={styles.contentWrap}>
          <div className={styles.metaBar}>
            <span>Dernière mise à jour : Avril 2025</span>
            <span aria-hidden="true">·</span>
            <span>ESTIN Amizour, Béjaïa</span>
          </div>

          <p className={styles.lead}>
            La protection de vos données personnelles fait partie intégrante de nos engagements associatifs. Cette page décrit de manière claire et accessible les règles appliquées sur la plateforme LDC.
          </p>

          <div className={styles.accordionList}>
            {PRIVACY_SECTIONS.map((section) => {
              const isOpen = openIds.includes(section.id);
              return (
                <article key={section.id} className={styles.sectionCard}>
                  <button
                    type="button"
                    className={styles.accordionTrigger}
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isOpen}
                    aria-controls={`privacy-panel-${section.id}`}
                  >
                    <div className={styles.triggerLeft}>
                      <span className={styles.sectionNum}>{section.number}</span>
                      <h2 className={styles.sectionHeading}>{section.title}</h2>
                    </div>
                    <span className={styles.chevron} aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <p className={styles.summary}>{section.summary}</p>

                  {isOpen && (
                    <div id={`privacy-panel-${section.id}`} className={styles.detailsPanel}>
                      <ul className={styles.detailList}>
                        {section.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className={styles.footerNote}>
            <h3>Une question sur vos données ?</h3>
            <p>
              Vous pouvez exercer vos droits d&apos;accès, de rectification ou de suppression à tout moment via notre{' '}
              <a href="#/contact">formulaire de contact</a> ou par e-mail à{' '}
              <a href="mailto:contact@ldc-estin.dz">contact@ldc-estin.dz</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
