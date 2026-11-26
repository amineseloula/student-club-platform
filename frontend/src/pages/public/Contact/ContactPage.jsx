import { useState } from 'react';
import { submitContactMessage } from '../../../services/contactMessagesService';
import styles from './ContactPage.module.css';

const SUBJECT_OPTIONS = [
  'Adhésion au club',
  'Sorties & événements',
  'Partenariat & sponsoring',
  'Suggestion / Idée',
  'Autre',
];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  subject: SUBJECT_OPTIONS[0],
  message: '',
  consentAccepted: false,
};

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', text: string }

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Veuillez indiquer votre nom complet.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Veuillez indiquer votre adresse e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Le format de l'adresse e-mail semble invalide.";
    }
    if (!form.subject) {
      nextErrors.subject = 'Veuillez choisir un objet.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Votre message doit contenir au moins 10 caractères.';
    }
    if (!form.consentAccepted) {
      nextErrors.consentAccepted = 'Veuillez accepter la politique de confidentialité pour envoyer votre message.';
    }
    return nextErrors;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      await submitContactMessage(form);
      setSubmitStatus({
        type: 'success',
        text: 'Merci ! Votre message a bien été transmis au bureau exécutif du LDC. Il apparaît désormais dans notre boîte de réception.',
      });
      setForm(INITIAL_FORM);
      setErrors({});
    } catch {
      setSubmitStatus({
        type: 'error',
        text: "Une erreur est survenue lors de l'envoi du message. Vous pouvez réessayer ou écrire directement à contact@ldc-estin.dz.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* 1. Beige Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>NOUS ÉCRIRE</span>
          <h1 className={styles.heroTitle}>Une question ? Une idée ?</h1>
          <p className={styles.heroSubtitle}>
            Écris directement à l&apos;équipe du LDC. Nous répondons généralement sous 24 à 48 heures ouvrées.
          </p>
        </div>
      </section>

      {/* 2. Two-Column Contact Content */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.mainGrid}>
            {/* Left Info */}
            <div className={styles.infoCol}>
              <h2 className={styles.infoTitle}>Parlons de votre prochain projet ou sortie.</h2>
              <p className={styles.infoDesc}>
                Que tu souhaites rejoindre le club, proposer un partenariat ou poser une question sur la logistique d&apos;une randonnée, notre bureau est à ton écoute.
              </p>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <div>
                    <span className={styles.contactLabel}>E-mail officiel</span>
                    <a href="mailto:contact@ldc-estin.dz" className={styles.contactValue}>
                      contact@ldc-estin.dz
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div>
                    <span className={styles.contactLabel}>Téléphone du bureau</span>
                    <a href="tel:+21334824910" className={styles.contactValue}>
                      +213 34 82 49 10
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <span className={styles.contactLabel}>Adresse campus</span>
                    <span className={styles.contactValue}>
                      Campus ESTIN, Route nationale n°75, Amizour, 06300 Béjaïa
                    </span>
                    <span className={styles.contactHint}>Permanences : Mardi &amp; Jeudi · 12h00 – 14h00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Envoyer un message</h2>

              {submitStatus && (
                <div
                  className={`${styles.alertBox} ${
                    submitStatus.type === 'success' ? styles.alertSuccess : styles.alertError
                  }`}
                  role={submitStatus.type === 'error' ? 'alert' : 'status'}
                >
                  {submitStatus.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>
                    Nom complet <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`${styles.input} ${errors.fullName ? styles.inputInvalid : ''}`}
                    placeholder="Ex. Amine Meziane"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>
                    Adresse e-mail <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputInvalid : ''}`}
                    placeholder="prenom.nom@estin.dz"
                    value={form.email}
                    onChange={handleChange('email')}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.label}>
                    Objet <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    className={styles.input}
                    value={form.subject}
                    onChange={handleChange('subject')}
                  >
                    {SUBJECT_OPTIONS.map((subj) => (
                      <option key={subj} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputInvalid : ''}`}
                    placeholder="Décrivez votre question ou votre idée…"
                    value={form.message}
                    onChange={handleChange('message')}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={form.consentAccepted}
                      onChange={handleChange('consentAccepted')}
                    />
                    <span>
                      J&apos;accepte que mes informations soient traitées pour répondre à ma demande conformément à la{' '}
                      <a href="#/confidentialite">politique de confidentialité</a>.
                    </span>
                  </label>
                  {errors.consentAccepted && <span className={styles.errorText}>{errors.consentAccepted}</span>}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? 'Envoi en cours…' : 'Envoyer le message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Location Map & Social Media */}
      <section className={styles.locationSection}>
        <div className={styles.container}>
          <div className={styles.locationGrid}>
            <div className={styles.mapCard}>
              <div className={styles.mapVisual} aria-hidden="true">
                <div className={styles.mapGridLines} />
                <div className={styles.mapPin}>
                  <span>ESTIN · Amizour</span>
                </div>
              </div>
              <div className={styles.mapCaption}>
                <h3>Nous retrouver sur le campus</h3>
                <p>
                  École Supérieure en Sciences et Technologies de l&apos;Informatique et du Numérique — Foyer étudiant, Amizour (Béjaïa).
                </p>
              </div>
            </div>

            <div className={styles.socialCard}>
              <span className={styles.eyebrow}>RÉSEAUX SOCIAUX</span>
              <h3>Suivre nos aventures en direct</h3>
              <p>
                Retrouve les annonces de dernière minute, les stories de nos randonnées et les photos de chaque sortie sur nos réseaux officiels.
              </p>
              <div className={styles.socialButtons}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                  Instagram · @ldc.estin
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                  Facebook · LDC ESTIN
                </a>
                <a href="mailto:contact@ldc-estin.dz" className={styles.socialBtn}>
                  E-mail · contact@ldc-estin.dz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
