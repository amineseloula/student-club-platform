import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Field from "../../../../shared/components/Field.jsx";
import Spinner from "../../../../shared/components/Spinner.jsx";
import { useToast } from "../../../../shared/components/Toast.jsx";
import { useApi } from "../../../../shared/hooks/useApi.js";
import { settingsApi } from "../../../../shared/api/settings.js";
import { formatDate } from "../../../../shared/utils/format.js";
import { Loadable } from "./Shared.jsx";

const newId = () => `n_${Math.random().toString(36).slice(2, 8)}`;

/* Returns a flat map { "year.start": "msg", "terms.0.name": "msg", ... } */
function validate({ year, terms, breaks }) {
  const e = {};
  if (!year.label.trim()) e["year.label"] = "Donne un nom à l’année (ex. 2024–2025).";
  if (!year.start) e["year.start"] = "Date de début requise.";
  if (!year.end) e["year.end"] = "Date de fin requise.";
  if (year.start && year.end && year.end <= year.start) e["year.end"] = "La fin doit être après le début.";
  const yearOk = year.start && year.end && year.end > year.start;

  const rows = (list, key) =>
    list.forEach((r, i) => {
      if (!r.name.trim()) e[`${key}.${i}.name`] = "Nom requis.";
      if (!r.start) e[`${key}.${i}.start`] = "Début requis.";
      if (!r.end) e[`${key}.${i}.end`] = "Fin requise.";
      if (r.start && r.end && r.end < r.start) e[`${key}.${i}.end`] = "La fin précède le début.";
      else if (yearOk && r.start && r.end && (r.start < year.start || r.end > year.end))
        e[`${key}.${i}.start`] = "Hors de l’année académique.";
    });
  rows(terms, "terms");
  rows(breaks, "breaks");

  // Terms must not overlap each other.
  const sorted = terms.map((t, i) => ({ ...t, i })).filter((t) => t.start && t.end).sort((a, b) => a.start.localeCompare(b.start));
  for (let k = 1; k < sorted.length; k++) {
    if (sorted[k].start <= sorted[k - 1].end) e[`terms.${sorted[k].i}.start`] ??= `Chevauche « ${sorted[k - 1].name || "une autre période"} ».`;
  }
  return e;
}

function Timeline({ year, terms, breaks }) {
  const span = useMemo(() => {
    const a = new Date(year.start).getTime(), b = new Date(year.end).getTime();
    return b > a ? { a, b } : null;
  }, [year.start, year.end]);
  if (!span) return null;
  const pos = (d) => Math.min(100, Math.max(0, ((new Date(d).getTime() - span.a) / (span.b - span.a)) * 100));
  const seg = (r, cls) =>
    r.start && r.end && r.end >= r.start ? (
      <i key={r.id} className={`cal__seg ${cls}`} style={{ left: `${pos(r.start)}%`, width: `${Math.max(pos(r.end) - pos(r.start), 0.8)}%` }} title={`${r.name} · ${formatDate(r.start)} → ${formatDate(r.end)}`} />
    ) : null;
  return (
    <div className="cal">
      <div className="cal__bar" aria-hidden="true">
        {terms.map((t) => seg(t, "cal__seg--term"))}
        {breaks.map((b) => seg(b, "cal__seg--break"))}
      </div>
      <div className="cal__legend">
        <span><i className="dot" style={{ background: "var(--green)" }} /> Périodes d’activité</span>
        <span><i className="dot" style={{ background: "var(--yellow)" }} /> Vacances / fermetures</span>
        <span className="cal__range">{formatDate(year.start)} → {formatDate(year.end)}</span>
      </div>
    </div>
  );
}

function PeriodRows({ title, hint, items, onChange, errors, prefix, addLabel, namePlaceholder }) {
  const patch = (i, k, v) => onChange(items.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  return (
    <section className="card">
      <div className="card__head"><h2>{title}</h2><p>{hint}</p></div>
      <div className="card__body stack">
        {items.length === 0 && <p className="muted">Aucune entrée pour l’instant.</p>}
        {items.map((r, i) => (
          <div key={r.id} className="period">
            <Field label="Nom" value={r.name} placeholder={namePlaceholder} error={errors[`${prefix}.${i}.name`]} onChange={(e) => patch(i, "name", e.target.value)} />
            <Field label="Début" type="date" value={r.start} error={errors[`${prefix}.${i}.start`]} onChange={(e) => patch(i, "start", e.target.value)} />
            <Field label="Fin" type="date" value={r.end} error={errors[`${prefix}.${i}.end`]} onChange={(e) => patch(i, "end", e.target.value)} />
            <button type="button" className="icon-btn icon-btn--danger" aria-label={`Supprimer ${r.name || "cette entrée"}`} onClick={() => onChange(items.filter((_, j) => j !== i))}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        <div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => onChange([...items, { id: newId(), name: "", start: "", end: "" }])}>
            <Plus size={16} /> {addLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

export default function CalendarTab() {
  const toast = useToast();
  const { data, loading, error, reload, setData } = useApi(() => settingsApi.getCalendar(), []);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (data) setForm(structuredClone(data)); }, [data]);
  const dirty = form && data && JSON.stringify(form) !== JSON.stringify(data);

  const setYear = (k, v) => { setForm((f) => ({ ...f, year: { ...f.year, [k]: v } })); setErrors({}); };
  const setList = (key) => (list) => { setForm((f) => ({ ...f, [key]: list })); setErrors({}); };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) {
      toast("Corrige les champs signalés avant d’enregistrer.", "error");
      return;
    }
    setBusy(true);
    try {
      setData(await settingsApi.updateCalendar(form));
      toast("Calendrier académique enregistré.");
    } catch (ex) {
      toast(ex.message, "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Loadable loading={loading} error={error} onRetry={reload} hasData={!!form}>
      {form && (
        <form className="stack" onSubmit={onSubmit} noValidate>
          <section className="card">
            <div className="card__head"><h2>Année académique</h2><p>Définit la période couverte par les événements, le budget et le rapport annuel.</p></div>
            <div className="card__body stack">
              <div className="grid-3">
                <Field label="Intitulé" value={form.year.label} placeholder="2024–2025" error={errors["year.label"]} onChange={(e) => setYear("label", e.target.value)} />
                <Field label="Début" type="date" value={form.year.start} error={errors["year.start"]} onChange={(e) => setYear("start", e.target.value)} />
                <Field label="Fin" type="date" value={form.year.end} error={errors["year.end"]} onChange={(e) => setYear("end", e.target.value)} />
              </div>
              <Timeline year={form.year} terms={form.terms} breaks={form.breaks} />
            </div>
          </section>

          <PeriodRows
            title="Semestres & périodes d’activité" hint="Les événements ne peuvent être planifiés que pendant ces périodes."
            items={form.terms} onChange={setList("terms")} errors={errors} prefix="terms"
            addLabel="Ajouter une période" namePlaceholder="Semestre 1"
          />
          <PeriodRows
            title="Vacances & jours de fermeture" hint="Pauses pendant lesquelles le club ne planifie aucune activité."
            items={form.breaks} onChange={setList("breaks")} errors={errors} prefix="breaks"
            addLabel="Ajouter une pause" namePlaceholder="Vacances d’hiver"
          />

          <div className="form-actions">
            <button type="submit" className="btn btn--sm" disabled={busy || !dirty}>
              {busy ? <Spinner inline /> : "Enregistrer le calendrier"}
            </button>
            {dirty && !busy && (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setForm(structuredClone(data)); setErrors({}); }}>Annuler</button>
            )}
          </div>
        </form>
      )}
    </Loadable>
  );
}
