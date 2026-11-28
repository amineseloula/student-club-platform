import styles from './StatusPage.module.css';

export default function StatusPage({ kind = '404' }) {
  const copy = {
    pending: { code: 'EN ATTENTE', title: 'Ta candidature est en attente', text: 'Notre bureau examine ta demande. Tu recevras bientôt une réponse.', action: 'Se reconnecter', href: '#/connexion' },
    rejected: { code: 'CANDIDATURE REFUSÉE', title: 'Ta candidature n’a pas été retenue', text: 'Tu peux contacter le bureau pour obtenir plus d’informations.', action: 'Contacter le club', href: '#/contact' },
    403: { code: '403', title: 'Accès refusé', text: 'Tu n’as pas les permissions nécessaires pour accéder à cette section.', action: 'Retour à l’accueil', href: '#/' },
    404: { code: '404', title: 'Page introuvable', text: 'Le lien suivi semble incomplet ou expiré.', action: 'Retour à l’accueil', href: '#/' },
  }[kind];
  return (
    <main className={styles.page}>
      <span className={styles.code}>{copy.code}</span>
      <h1>{copy.title}</h1>
      <p>{copy.text}</p>
      <a href={copy.href}>{copy.action} →</a>
    </main>
  );
}
