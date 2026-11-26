import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import styles from './AuthModal.module.css';

const DEMO_ACCOUNTS = [
  { email: 'amine@estin.dz', label: 'Amine M.', role: 'Président (Bureau)' },
  { email: 'yasmine@estin.dz', label: 'Yasmine A.', role: 'Bureau' },
  { email: 'nadia@estin.dz', label: 'Nadia M.', role: 'Membre' },
];

export default function AuthModal({ isOpen, initialTab = 'login', subtitle, onClose, onSuccess }) {
  const { login, registerVisitor } = useAuth();
  const [tab, setTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Veuillez saisir votre adresse e-mail ESTIN.');
      return;
    }
    const res = login(email);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    onSuccess?.(res.user);
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!fullName.trim() || !email.trim()) {
      setError('Veuillez renseigner votre nom complet et votre e-mail.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Veuillez saisir une adresse e-mail valide.');
      return;
    }
    const res = registerVisitor({ name: fullName, email, studentId });
    if (res.ok) {
      onSuccess?.(res.user);
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Fermer la fenêtre">
          ×
        </button>

        <div className={styles.tabs} role="tablist" aria-label="Connexion ou adhésion">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'login'}
            className={`${styles.tab} ${tab === 'login' ? styles.tabActive : ''}`}
            onClick={() => {
              setTab('login');
              setError('');
            }}
          >
            Se connecter
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'register'}
            className={`${styles.tab} ${tab === 'register' ? styles.tabActive : ''}`}
            onClick={() => {
              setTab('register');
              setError('');
            }}
          >
            Rejoindre le club
          </button>
        </div>

        <h2 id="auth-modal-title" className={styles.title}>
          {tab === 'login' ? 'Accéder à votre espace LDC' : 'Rejoindre la communauté LDC'}
        </h2>
        <p className={styles.subtitle}>
          {subtitle ||
            (tab === 'login'
              ? 'Connectez-vous avec votre adresse e-mail étudiante pour vous inscrire aux sorties.'
              : 'Créez votre profil visiteur pour réserver votre place aux prochains événements.')}
        </p>

        {error && (
          <div className={styles.errorBox} role="alert">
            {error}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className={styles.form} noValidate>
            <label className={styles.field}>
              <span className={styles.label}>Adresse e-mail ESTIN</span>
              <input
                type="email"
                className={styles.input}
                placeholder="ex. amine@estin.dz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </label>

            <div className={styles.demoBox}>
              <span className={styles.demoTitle}>Comptes de démonstration :</span>
              <div className={styles.demoChips}>
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    className={styles.demoChip}
                    onClick={() => {
                      setEmail(acc.email);
                      setError('');
                    }}
                  >
                    <strong>{acc.label}</strong>
                    <span>{acc.role}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Se connecter →
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className={styles.form} noValidate>
            <label className={styles.field}>
              <span className={styles.label}>Nom complet</span>
              <input
                type="text"
                className={styles.input}
                placeholder="Ex. Samy Benkaci"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Adresse e-mail</span>
              <input
                type="email"
                className={styles.input}
                placeholder="prenom.nom@estin.dz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Matricule étudiant (optionnel)</span>
              <input
                type="text"
                className={styles.input}
                placeholder="Ex. 2024/118"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </label>

            <button type="submit" className={styles.submitBtn}>
              Créer mon accès membre →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
