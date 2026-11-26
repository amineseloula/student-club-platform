import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, CheckCircle2, LinkIcon } from "lucide-react";
import Eyebrow from "../../../shared/components/Eyebrow.jsx";
import PasswordField from "../../../shared/components/PasswordField.jsx";
import PasswordStrength from "../../../shared/components/PasswordStrength.jsx";
import Spinner from "../../../shared/components/Spinner.jsx";
import { authApi } from "../../../shared/api/auth.js";
import { evaluatePassword } from "../../../shared/utils/password.js";

/* States: checking -> valid | invalid | expired -> done */
export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [phase, setPhase] = useState(token ? "checking" : "invalid");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  // Validate the token as soon as the page opens, before showing the form.
  useEffect(() => {
    if (!token) return;
    let live = true;
    authApi.validateResetToken({ token })
      .then((r) => { if (live) { setEmail(r.email ?? ""); setPhase("valid"); } })
      .catch((e) => { if (live) setPhase(e.code === "TOKEN_EXPIRED" ? "expired" : "invalid"); });
    return () => { live = false; };
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!evaluatePassword(password).acceptable) next.password = "Le mot de passe ne respecte pas les critères ci-dessous.";
    if (confirm !== password) next.confirm = "Les deux mots de passe ne correspondent pas.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      await authApi.resetPassword({ token, password });
      setPhase("done");
    } catch (ex) {
      if (ex.code === "TOKEN_EXPIRED") setPhase("expired");
      else if (ex.code === "TOKEN_INVALID") setPhase("invalid");
      else { setFormError(ex.message); setErrors(ex.fields ?? {}); }
      setBusy(false);
    }
  };

  if (phase === "checking") {
    return <Spinner label="Vérification du lien…" />;
  }

  if (phase === "invalid" || phase === "expired") {
    const expired = phase === "expired";
    return (
      <>
        <div className="sent-icon sent-icon--bad"><LinkIcon size={30} /></div>
        <Eyebrow>Espace membre</Eyebrow>
        <h1 className="auth__title">{expired ? "Ce lien a expiré." : "Lien invalide."}</h1>
        <p className="auth__sub">
          {expired
            ? "Pour ta sécurité, les liens de réinitialisation ne sont valables qu’un temps limité."
            : "Ce lien est incorrect ou a déjà été utilisé."}{" "}
          Demande-en un nouveau pour continuer.
        </p>
        <div className="auth__form">
          <Link to="/forgot-password" className="btn btn--block">Demander un nouveau lien</Link>
          <p className="auth__alt"><Link to="/login" className="link-green">Retour à la connexion</Link></p>
        </div>
      </>
    );
  }

  if (phase === "done") {
    return (
      <>
        <div className="sent-icon"><CheckCircle2 size={32} /></div>
        <Eyebrow>Espace membre</Eyebrow>
        <h1 className="auth__title">Mot de passe mis à jour.</h1>
        <p className="auth__sub">Tu peux maintenant te connecter avec ton nouveau mot de passe.</p>
        <div className="auth__form">
          <Link to="/login" className="btn btn--block">Se connecter</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Eyebrow>Espace membre</Eyebrow>
      <h1 className="auth__title">Nouveau départ.</h1>
      <p className="auth__sub">
        Choisis un nouveau mot de passe sécurisé{email && <> pour <strong>{email}</strong></>}.
      </p>

      <form className="auth__form" onSubmit={onSubmit} noValidate>
        {formError && <div className="alert alert--error" role="alert"><AlertCircle size={18} /> {formError}</div>}
        <PasswordField
          label="Nouveau mot de passe" name="password" placeholder="••••••••" autoComplete="new-password"
          value={password} error={errors.password} onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrength value={password} />
        <PasswordField
          label="Confirmer le mot de passe" name="confirm" placeholder="••••••••" autoComplete="new-password"
          value={confirm} error={errors.confirm} onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit" className="btn btn--block" disabled={busy}>
          {busy ? <Spinner inline /> : "Réinitialiser"}
        </button>
      </form>
    </>
  );
}
