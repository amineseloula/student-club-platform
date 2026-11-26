import { useEffect, useState } from "react";
import Field from "../../../../shared/components/Field.jsx";
import Spinner from "../../../../shared/components/Spinner.jsx";
import { useToast } from "../../../../shared/components/Toast.jsx";
import { useApi } from "../../../../shared/hooks/useApi.js";
import { settingsApi } from "../../../../shared/api/settings.js";
import { Loadable } from "./Shared.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = "Le nom complet est obligatoire.";
  if (!v.shortName.trim()) e.shortName = "Le nom court est obligatoire.";
  if (!v.school.trim()) e.school = "L’établissement est obligatoire.";
  if (!/^\d{4}$/.test(String(v.founded).trim())) e.founded = "Entre une année à 4 chiffres.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Entre une adresse e-mail valide.";
  if (v.phone.trim() && !/^[+\d][\d\s().-]{6,}$/.test(v.phone.trim())) e.phone = "Numéro de téléphone invalide.";
  return e;
}

export default function InfoTab() {
  const toast = useToast();
  const { data, loading, error, reload, setData } = useApi(() => settingsApi.getClub(), []);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (data) setForm(data); }, [data]);

  const dirty = form && data && JSON.stringify(form) !== JSON.stringify(data);
  const bind = (k) => ({
    name: k,
    value: form?.[k] ?? "",
    error: errors[k],
    onChange: (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: undefined })); },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      const saved = await settingsApi.updateClub(form);
      setData(saved);
      toast("Informations du club enregistrées.");
    } catch (ex) {
      setErrors(ex.fields ?? {});
      toast(ex.message, "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Loadable loading={loading} error={error} onRetry={reload} hasData={!!form}>
      {form && (
        <form className="card" onSubmit={onSubmit} noValidate>
          <div className="card__head">
            <h2>Informations du club</h2>
            <p>Affichées sur le site public et les documents officiels.</p>
          </div>
          <div className="card__body stack">
            <div className="grid-2">
              <Field label="Nom complet" {...bind("fullName")} />
              <Field label="Nom court" {...bind("shortName")} />
            </div>
            <div className="grid-2">
              <Field label="Établissement" {...bind("school")} />
              <Field label="Année de création" inputMode="numeric" {...bind("founded")} />
            </div>
            <Field label="Slogan" {...bind("slogan")} />
            <Field label="Tagline" {...bind("tagline")} />
            <div className="grid-2">
              <Field label="E-mail officiel" type="email" {...bind("email")} />
              <Field label="Téléphone" {...bind("phone")} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn--sm" disabled={busy || !dirty}>
                {busy ? <Spinner inline /> : "Enregistrer les modifications"}
              </button>
              {dirty && !busy && (
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setForm(data); setErrors({}); }}>Annuler</button>
              )}
            </div>
          </div>
        </form>
      )}
    </Loadable>
  );
}
