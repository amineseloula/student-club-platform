import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Eyebrow from "../../../shared/components/Eyebrow.jsx";
import Field from "../../../shared/components/Field.jsx";
import PasswordField from "../../../shared/components/PasswordField.jsx";
import Spinner from "../../../shared/components/Spinner.jsx";
import { useAuth } from "../../../shared/auth/AuthContext.jsx";
import { canAccess, homeFor } from "../../../shared/auth/roles.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email")).trim();
    const password = String(data.get("password"));

    const next = {};
    if (!EMAIL_RE.test(email)) next.email = "Entre une adresse e-mail valide.";
    if (!password) next.password = "Entre ton mot de passe.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      const user = await login({ email, password, remember: data.get("remember") === "on" });
      // Redirect engine: status first (pending / rejected), then role.
      // If a protected page sent the user here, go back to it only if their role allows it.
      const from = location.state?.from;
      const back = user.status === "approved" && from && from !== "/403" && canAccess(user, roleGuess(from)) ? from : null;
      navigate(back ?? homeFor(user), { replace: true });
    } catch (err) {
      setFormError(err.message);
      setBusy(false);
    }
  };

  return (
    <>
      <Eyebrow>Espace membre</Eyebrow>
      <h1 className="auth__title">Heureux de te revoir.</h1>
      <p className="auth__sub">Connecte-toi pour retrouver tes événements.</p>

      <form className="auth__form" onSubmit={onSubmit} noValidate>
        {formError && (
          <div className="alert alert--error" role="alert"><AlertCircle size={18} /> {formError}</div>
        )}
        <Field label="E-mail" type="email" name="email" placeholder="amine@estin.dz" autoComplete="email" error={errors.email} />
        <PasswordField label="Mot de passe" name="password" placeholder="••••••••" autoComplete="current-password" error={errors.password} />

        <div className="auth__meta">
          <label className="check"><input type="checkbox" name="remember" defaultChecked /> Rester connecté</label>
          <Link to="/forgot-password" className="auth__forgot">Mot de passe oublié ?</Link>
        </div>

        <button type="submit" className="btn btn--block" disabled={busy}>
          {busy ? <Spinner inline /> : "Se connecter"}
        </button>
        <p className="auth__alt">
          Pas encore membre ? <Link to="/signup" className="link-green">Rejoindre le club</Link>
        </p>

        {import.meta.env.DEV && import.meta.env.VITE_USE_MOCK !== "false" && (
          <div className="alert alert--info">
            <div>
              <strong>Mode démo (sans serveur)</strong>
              Mot de passe : <code>Password1!</code><br />
              <code>president@estin.dz</code> · <code>board@estin.dz</code> · <code>member@estin.dz</code><br />
              <code>pending@estin.dz</code> · <code>rejected@estin.dz</code>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

/* Roles needed by a given path, so we never bounce a user into a 403 right after login. */
function roleGuess(path) {
  if (/^\/dashboard\/(settings|journal|report)(?:[\/?]|$)/.test(path)) return ["president"];
  if (/^\/dashboard\/(events|announcements|members|messages|news|gallery|content)(?:[\/?]|$)/.test(path)) {
    return ["president", "board"];
  }
  if (/^\/dashboard\/member(?:[\/?]|$)/.test(path)) return ["president", "board", "member"];
  return undefined;
}
