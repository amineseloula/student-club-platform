import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Clock, LogOut, RefreshCw } from "lucide-react";
import Eyebrow from "../../../shared/components/Eyebrow.jsx";
import Spinner from "../../../shared/components/Spinner.jsx";
import { useAuth } from "../../../shared/auth/AuthContext.jsx";
import { homeFor } from "../../../shared/auth/roles.js";
import { REVIEW_DELAY_LABEL, SITE_URL, FIELDS_OF_STUDY, STUDY_YEARS } from "../../../shared/config.js";
import { formatDate } from "../../../shared/utils/format.js";

const NEXT_STEPS = [
  { title: "Vérification du profil", text: "Le bureau contrôle ton matricule et ton e-mail étudiant.", state: "current" },
  { title: "Validation par le bureau", text: "Un membre du bureau approuve ton adhésion.", state: "todo" },
  { title: "E-mail de confirmation", text: "Tu reçois un message dès que ton compte est activé.", state: "todo" },
  { title: "Première connexion", text: "Connecte-toi et découvre les prochains événements.", state: "todo" },
];

export default function ApplicationPending() {
  const navigate = useNavigate();
  const { user, refresh, logout } = useAuth();
  const [checking, setChecking] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, text }

  // A visitor whose application is not pending belongs elsewhere.
  if (user && user.status !== "pending") return <Navigate to={homeFor(user)} replace />;

  const recheck = async () => {
    setChecking(true);
    setFeedback(null);
    try {
      const fresh = await refresh();
      if (fresh.status !== "pending") {
        navigate(homeFor(fresh), { replace: true });
        return;
      }
      const time = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      setFeedback({ type: "info", text: `Vérifié à ${time} : ta candidature est toujours en cours d’examen.` });
    } catch (e) {
      setFeedback({ type: "error", text: e.message });
    } finally {
      setChecking(false);
    }
  };

  const field = FIELDS_OF_STUDY.find((f) => f.value === user?.fieldOfStudy)?.label;
  const year = STUDY_YEARS.find((y) => y.value === String(user?.studyYear))?.label;

  return (
    <>
      <div className="badge-ring badge-ring--ok">
        <div className="badge-ring__core"><Clock size={34} strokeWidth={2.4} /></div>
      </div>
      <Eyebrow>Candidature LDC</Eyebrow>
      <h1 className="status__title">Ta candidature est en route.</h1>
      <p className="status__text">
        Merci {user?.firstName ?? ""} ! Le bureau vérifie actuellement ton profil.
        Tu recevras un e-mail dès que ton adhésion sera approuvée (en général sous {REVIEW_DELAY_LABEL}).
      </p>

      <div className="steps">
        <span className="steps__item is-done"><Check size={18} /> Demande envoyée</span>
        <span className="steps__line" />
        <span className="steps__item is-current"><span className="steps__dot" /> Vérification en cours</span>
        <span className="steps__line" />
        <span className="steps__item">Bienvenue au club</span>
      </div>

      <div className="status-grid">
        <section className="status-card">
          <h2>Prochaines étapes</h2>
          <ol className="next">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className={s.state === "current" ? "is-current" : ""}>
                <span className="next__num">{i + 1}</span>
                <div><strong>{s.title}</strong><p>{s.text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        {user && (
          <section className="status-card">
            <h2>Ta demande</h2>
            <dl className="recap">
              <div><dt>Nom</dt><dd>{user.firstName} {user.lastName}</dd></div>
              <div><dt>E-mail</dt><dd>{user.email}</dd></div>
              <div><dt>Matricule</dt><dd>{user.studentId}</dd></div>
              {field && <div><dt>Filière</dt><dd>{field}</dd></div>}
              {year && <div><dt>Année</dt><dd>{year}</dd></div>}
              <div><dt>Envoyée le</dt><dd>{formatDate(user.submittedAt?.slice(0, 10))}</dd></div>
            </dl>
          </section>
        )}
      </div>

      {feedback && (
        <div className={`alert alert--${feedback.type} status__feedback`} role="status">{feedback.text}</div>
      )}

      <div className="status__actions">
        {user ? (
          <button type="button" className="btn" onClick={recheck} disabled={checking}>
            {checking ? <Spinner inline /> : <RefreshCw size={18} />} Vérifier mon statut
          </button>
        ) : (
          <Link to="/login" className="btn">Se connecter pour vérifier <ArrowRight size={18} /></Link>
        )}
        <a href={SITE_URL} className="btn btn--ghost">Retour à l’accueil</a>
      </div>
      {user && (
        <button type="button" className="status__alt status__alt--btn" onClick={async () => { await logout(); navigate("/login"); }}>
          <LogOut size={13} /> Se déconnecter
        </button>
      )}
    </>
  );
}
