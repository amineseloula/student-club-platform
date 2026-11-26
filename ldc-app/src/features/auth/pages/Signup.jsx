import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Eyebrow from "../../../shared/components/Eyebrow.jsx";
import Field from "../../../shared/components/Field.jsx";
import PasswordField from "../../../shared/components/PasswordField.jsx";
import PasswordStrength from "../../../shared/components/PasswordStrength.jsx";
import Spinner from "../../../shared/components/Spinner.jsx";
import { useAuth } from "../../../shared/auth/AuthContext.jsx";
import { evaluatePassword } from "../../../shared/utils/password.js";
import {
  FIELDS_OF_STUDY, STUDENT_EMAIL_DOMAIN, STUDENT_ID_EXAMPLE, STUDENT_ID_PATTERN, STUDY_YEARS,
} from "../../../shared/config.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { firstName: "", lastName: "", email: "", studentId: "", studyYear: "3", fieldOfStudy: "", password: "", confirm: "", terms: false };

function validate(v) {
  const e = {};
  if (v.firstName.trim().length < 2) e.firstName = "Entre ton prénom.";
  if (v.lastName.trim().length < 2) e.lastName = "Entre ton nom.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Entre une adresse e-mail valide.";
  else if (STUDENT_EMAIL_DOMAIN && !v.email.trim().toLowerCase().endsWith(`@${STUDENT_EMAIL_DOMAIN}`))
    e.email = `Utilise ton e-mail étudiant (@${STUDENT_EMAIL_DOMAIN}).`;
  if (!STUDENT_ID_PATTERN.test(v.studentId.trim())) e.studentId = `Format attendu : ${STUDENT_ID_EXAMPLE}`;
  if (!v.fieldOfStudy) e.fieldOfStudy = "Sélectionne ta filière.";
  if (!v.studyYear) e.studyYear = "Sélectionne ton année.";
  if (!evaluatePassword(v.password).acceptable) e.password = "Le mot de passe ne respecte pas les critères ci-dessous.";
  if (v.confirm !== v.password) e.confirm = "Les deux mots de passe ne correspondent pas.";
  if (!v.terms) e.terms = "Tu dois accepter le règlement du club.";
  return e;
}

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const clientErrors = validate(values);
  // A field shows its error once touched (or after a submit attempt); server errors show until edited.
  const err = (k) => (touched[k] ? clientErrors[k] : undefined) ?? serverErrors[k];

  const bind = (k) => ({
    name: k,
    value: values[k],
    error: err(k),
    onChange: (e) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      setServerErrors((s) => ({ ...s, [k]: undefined }));
    },
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));
    setFormError("");
    if (Object.keys(clientErrors).length) return;

    setBusy(true);
    try {
      const { confirm, terms, ...payload } = values;
      await register(payload);
      navigate("/application/pending", { replace: true });
    } catch (ex) {
      setServerErrors(ex.fields ?? {});
      setFormError(ex.fields ? "Corrige les champs signalés." : ex.message);
      setBusy(false);
    }
  };

  return (
    <>
      <Eyebrow>Espace membre</Eyebrow>
      <h1 className="auth__title">Monte à bord.</h1>
      <p className="auth__sub">Crée ton compte et rejoins la communauté LDC.</p>

      <form className="auth__form" onSubmit={onSubmit} noValidate>
        {formError && <div className="alert alert--error" role="alert"><AlertCircle size={18} /> {formError}</div>}

        <div className="auth__row">
          <Field label="Prénom" placeholder="Amine" autoComplete="given-name" {...bind("firstName")} />
          <Field label="Nom" placeholder="Meziane" autoComplete="family-name" {...bind("lastName")} />
        </div>

        <Field label="E-mail étudiant" type="email" placeholder={`a.meziane@${STUDENT_EMAIL_DOMAIN ?? "estin.dz"}`} autoComplete="email" {...bind("email")} />

        <div className="auth__row">
          <Field label="Matricule" placeholder={STUDENT_ID_EXAMPLE} inputMode="numeric" {...bind("studentId")} />
          <Field label="Année d’étude" as="select" {...bind("studyYear")}>
            {STUDY_YEARS.map((y) => <option key={y.value} value={y.value}>{y.label}</option>)}
          </Field>
        </div>

        <Field label="Filière" as="select" {...bind("fieldOfStudy")}>
          <option value="" disabled>Sélectionner ta filière</option>
          {FIELDS_OF_STUDY.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
        </Field>

        <PasswordField label="Mot de passe" placeholder="••••••••" autoComplete="new-password" {...bind("password")} />
        <PasswordStrength value={values.password} />
        <PasswordField label="Confirmer le mot de passe" placeholder="••••••••" autoComplete="new-password" {...bind("confirm")} />

        <div>
          <label className={`check ${err("terms") ? "check--error" : ""}`}>
            <input
              type="checkbox"
              checked={values.terms}
              onChange={(e) => { setValues((v) => ({ ...v, terms: e.target.checked })); setTouched((t) => ({ ...t, terms: true })); }}
            />
            <span>J’accepte le règlement intérieur du club et le traitement de mes données pour la gestion de mon adhésion.</span>
          </label>
          {err("terms") && <p className="field__error" role="alert" style={{ marginTop: 6 }}>{err("terms")}</p>}
        </div>

        <button type="submit" className="btn btn--block" disabled={busy}>
          {busy ? <Spinner inline /> : "Envoyer ma candidature"}
        </button>
        <p className="auth__alt">
          Déjà un compte ? <Link to="/login" className="link-green">Se connecter</Link>
        </p>
      </form>
    </>
  );
}
