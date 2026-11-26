import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, MailCheck } from "lucide-react";
import Eyebrow from "../../../shared/components/Eyebrow.jsx";
import Field from "../../../shared/components/Field.jsx";
import Spinner from "../../../shared/components/Spinner.jsx";
import { authApi } from "../../../shared/api/auth.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COOLDOWN = 30;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [dev, setDev] = useState(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const send = async () => {
    setBusy(true);
    setError("");
    try {
      // The backend answers OK even if the e-mail is unknown (no account enumeration).
      // It e-mails a link to /reset-password?token=...
      const res = await authApi.requestPasswordReset({ email: email.trim() });
      setDev(res?._dev ?? null);
      setSent(true);
      setCooldown(COOLDOWN);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setFieldError("Entre une adresse e-mail valide.");
      return;
    }
    send();
  };

  if (sent) {
    return (
      <>
        <div className="sent-icon"><MailCheck size={32} /></div>
        <Eyebrow>Vérifie ta boîte mail</Eyebrow>
        <h1 className="auth__title">C’est envoyé.</h1>
        <p className="auth__sub">
          Si un compte existe pour <strong>{email.trim()}</strong>, tu recevras un lien de réinitialisation dans quelques minutes.
          Pense à vérifier tes courriers indésirables.
        </p>

        <div className="auth__form">
          {import.meta.env.DEV && dev && (
            <div className="alert alert--info">
              <div><strong>Mode démo</strong>Aucun e-mail réel n’est envoyé. Lien : <Link to={dev.resetUrl} className="link-green">{dev.resetUrl}</Link></div>
            </div>
          )}
          {error && <div className="alert alert--error" role="alert"><AlertCircle size={18} /> {error}</div>}

          <button type="button" className="btn btn--ghost btn--block" onClick={send} disabled={busy || cooldown > 0}>
            {busy ? <Spinner inline /> : cooldown > 0 ? `Renvoyer le lien (${cooldown} s)` : "Renvoyer le lien"}
          </button>
          <button type="button" className="btn btn--text auth__center" onClick={() => { setSent(false); setError(""); }}>
            Changer d’adresse e-mail
          </button>
          <Link to="/login" className="auth__alt link-green"><ArrowLeft size={14} style={{ verticalAlign: "-2px" }} /> Retour à la connexion</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Eyebrow>Espace membre</Eyebrow>
      <h1 className="auth__title">Mot de passe oublié ?</h1>
      <p className="auth__sub">Entre ton e-mail et nous t’enverrons un lien.</p>

      <form className="auth__form" onSubmit={onSubmit} noValidate>
        {error && <div className="alert alert--error" role="alert"><AlertCircle size={18} /> {error}</div>}
        <Field
          label="E-mail étudiant" type="email" name="email" placeholder="amine@estin.dz" autoComplete="email"
          value={email} error={fieldError} onChange={(e) => { setEmail(e.target.value); setError(""); setFieldError(""); }}
        />
        <button type="submit" className="btn btn--block" disabled={busy}>
          {busy ? <Spinner inline /> : "Envoyer le lien"}
        </button>
        <p className="auth__alt"><Link to="/login" className="link-green">Retour à la connexion</Link></p>
      </form>
    </>
  );
}
