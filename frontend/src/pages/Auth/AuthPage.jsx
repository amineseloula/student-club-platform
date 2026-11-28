import { useState } from 'react';
import logo from '../../assets/logo.jpg';
import styles from './AuthPage.module.css';

export default function AuthPage({ mode = 'login' }) {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const copy = {
    login: {
      eyebrow: 'Espace membre',
      title: 'Heureux de te revoir.',
      subtitle: 'Connecte-toi pour retrouver tes événements.',
      submit: 'Se connecter',
    },
    signup: {
      eyebrow: 'Rejoindre le club',
      title: 'Bienvenue parmi nous.',
      subtitle: 'Crée ton compte pour rejoindre la communauté LDC.',
      submit: 'Créer mon compte',
    },
    forgot: {
      eyebrow: 'Mot de passe',
      title: 'Tu as oublié ton mot de passe ?',
      subtitle: 'Nous t’enverrons un lien pour en choisir un nouveau.',
      submit: 'Envoyer le lien',
    },
    reset: {
      eyebrow: 'Nouveau mot de passe',
      title: 'Définis ton nouveau mot de passe.',
      subtitle: 'Choisis un mot de passe robuste pour sécuriser ton compte.',
      submit: 'Mettre à jour',
    },
  }[mode];

  const handleSubmit = (event) => {
    event.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <main className={styles.page}>
      <aside className={styles.visual}>
        <a href="#/" className={styles.brand} aria-label="Retour à l’accueil">
          <img src={logo} alt="" />
          <div><strong>LDC</strong><span>BY ESTIN · BÉJAÏA</span></div>
        </a>
        <div className={styles.quote}>
          <span>EXPLORE · LEARN · CONNECT</span>
          <blockquote>“Les meilleurs souvenirs commencent souvent par un simple oui.”</blockquote>
          <cite>— LDC</cite>
        </div>
      </aside>
      <section className={styles.panel}>
        <header><a href="#/">← Retour au site</a></header>
        <div className={styles.formWrap}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p className={styles.subtitle}>{copy.subtitle}</p>
          {submitted ? (
            <div className={styles.success} role="status">
              <strong>Demande enregistrée</strong>
              <p>Cette démonstration confirme l’action côté interface. Un service réel peut ensuite prendre le relais.</p>
              <a href={mode === 'login' ? '#/membre' : '#/connexion'}>{mode === 'login' ? 'Continuer vers mon espace' : 'Retour à la connexion'} →</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              {mode === 'signup' && (
                <label>Nom complet<input name="name" required autoComplete="name" /></label>
              )}
              {mode !== 'reset' && (
                <label>E-mail<input name="email" type="email" required autoComplete="email" placeholder="amine@estin.dz" /></label>
              )}
              {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
                <label>{mode === 'reset' ? 'Nouveau mot de passe' : 'Mot de passe'}<input name="password" type="password" required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
              )}
              {mode === 'signup' && (
                <label>Confirmer le mot de passe<input name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" /></label>
              )}
              {mode === 'login' && (
                <div className={styles.meta}>
                  <label><input type="checkbox" /> Rester connecté</label>
                  <a href="#/mot-de-passe-oublie">Mot de passe oublié ?</a>
                </div>
              )}
              <button type="submit" disabled={busy}>{busy ? 'Traitement…' : copy.submit}</button>
              {mode === 'login' && <p className={styles.alt}>Pas encore membre ? <a href="#/inscription">Rejoindre le club</a></p>}
              {mode === 'signup' && <p className={styles.alt}>Déjà membre ? <a href="#/connexion">Se connecter</a></p>}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
