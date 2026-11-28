import { useState } from 'react';
import MemberLayout from '../../../components/MemberLayout/MemberLayout';
import styles from './EventFeedbackPage.module.css';

const EVENTS_PATH = '#/membre/evenements';

const ratingLabels = ['Très déçu', 'Déçu', 'Moyen', 'Satisfait', 'Très satisfait'];

export default function EventFeedbackPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState('oui');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <MemberLayout activePage="events" breadcrumbTitle="Donner mon avis">
      <div className={styles.container}>
        <header className={styles.headerSection}>
          <a href={EVENTS_PATH} className={styles.backLink}><span aria-hidden="true">←</span> Mes événements</a>
          <h1 className={styles.pageTitle}>Ton avis compte</h1>
          <p className={styles.pageSub}>Partage ton expérience de la sortie Lac Noir avec nous.</p>
        </header>

        {submitted ? (
          <section className={styles.successCard} role="status">
            <div className={styles.successIcon} aria-hidden="true">✓</div>
            <h2>Merci pour ton retour !</h2>
            <p>Ton avis nous aide à rendre les prochaines aventures encore meilleures.</p>
            <a href={EVENTS_PATH} className={styles.primaryButton}>Retour à mes événements</a>
          </section>
        ) : (
          <form className={styles.feedbackLayout} onSubmit={handleSubmit}>
            <section className={styles.formCard}>
              <div className={styles.eventSummary}>
                <div className={styles.eventMark} aria-hidden="true">L</div>
                <div><span className={styles.eyebrow}>ÉVÉNEMENT PARTICIPÉ</span><h2>Sortie Lac Noir</h2><p>26 avril 2025 · Akfadou, Béjaïa</p></div>
              </div>
              <div className={styles.formDivider} />
              <fieldset className={styles.fieldset}>
                <legend>Comment évalues-tu cette sortie ?</legend>
                <div className={styles.ratingRow}>
                  {ratingLabels.map((label, index) => {
                    const value = index + 1;
                    return <button key={label} type="button" className={`${styles.ratingButton} ${rating === value ? styles.ratingButtonActive : ''}`} onClick={() => setRating(value)} aria-label={`${value} sur 5 : ${label}`} aria-pressed={rating === value}><span aria-hidden="true">★</span><small>{label}</small></button>;
                  })}
                </div>
              </fieldset>
              <label className={styles.label} htmlFor="feedback-comment">Qu'as-tu préféré ? <span>(facultatif)</span></label>
              <textarea id="feedback-comment" className={styles.textarea} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Ton retour, une idée ou un souvenir à partager..." rows="5" />
              <fieldset className={styles.fieldset}><legend>Recommanderais-tu cette sortie à un ami ?</legend><div className={styles.choiceRow}>{['oui', 'non'].map((choice) => <label key={choice} className={`${styles.choice} ${wouldRecommend === choice ? styles.choiceActive : ''}`}><input type="radio" name="recommend" value={choice} checked={wouldRecommend === choice} onChange={(event) => setWouldRecommend(event.target.value)} /><span>{choice === 'oui' ? 'Oui, carrément !' : 'Pas pour le moment'}</span></label>)}</div></fieldset>
              <button type="submit" className={styles.primaryButton} disabled={!rating}>Envoyer mon avis</button>
            </section>
            <aside className={styles.sideNote}><div className={styles.noteIcon} aria-hidden="true">✦</div><h2>Merci de faire vivre le LDC</h2><p>Quelques secondes suffisent pour nous aider à améliorer chaque événement et à imaginer les prochaines aventures.</p></aside>
          </form>
        )}
      </div>
    </MemberLayout>
  );
}
