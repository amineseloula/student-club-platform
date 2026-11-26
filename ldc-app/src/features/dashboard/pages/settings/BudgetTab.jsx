import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Field from "../../../../shared/components/Field.jsx";
import Modal from "../../../../shared/components/Modal.jsx";
import Spinner from "../../../../shared/components/Spinner.jsx";
import { useToast } from "../../../../shared/components/Toast.jsx";
import { useApi } from "../../../../shared/hooks/useApi.js";
import { settingsApi } from "../../../../shared/api/settings.js";
import { formatDZD } from "../../../../shared/utils/format.js";
import { Loadable } from "./Shared.jsx";

const api = settingsApi.budgetClasses;
const EMPTY = { code: "", name: "", type: "expense", ceiling: "", active: true };
const TYPES = { income: "Recette", expense: "Dépense" };
const FILTERS = [["all", "Toutes"], ["income", "Recettes"], ["expense", "Dépenses"]];

export default function BudgetTab() {
  const toast = useToast();
  const { data, loading, error, reload, setData } = useApi(() => api.list(), []);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const rows = useMemo(() => (data ?? []).filter((r) => filter === "all" || r.type === filter), [data, filter]);
  const totals = useMemo(() => {
    const sum = (t) => (data ?? []).filter((r) => r.type === t && r.active).reduce((s, r) => s + (r.ceiling || 0), 0);
    return { income: sum("income"), expense: sum("expense") };
  }, [data]);

  const open = (row) => {
    setForm(row === "new" ? EMPTY : { code: row.code, name: row.name, type: row.type, ceiling: row.ceiling ?? "", active: row.active });
    setErrors({});
    setEditing(row);
  };

  const save = async (e) => {
    e.preventDefault();
    const next = {};
    if (!/^[A-Z]-?[A-Z0-9]{2,6}$/i.test(form.code.trim())) next.code = "Code attendu : ex. D-TRA ou R-COT.";
    if (!form.name.trim()) next.name = "Le libellé est obligatoire.";
    if (form.ceiling !== "" && (Number(form.ceiling) < 0 || Number.isNaN(Number(form.ceiling)))) next.ceiling = "Entre un montant positif.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const payload = { ...form, code: form.code.trim().toUpperCase(), name: form.name.trim(), ceiling: form.ceiling === "" ? null : Number(form.ceiling) };
    setBusy(true);
    try {
      if (editing === "new") {
        const created = await api.create(payload);
        setData((l) => [...l, created]);
        toast("Classe budgétaire ajoutée.");
      } else {
        const updated = await api.update(editing.id, payload);
        setData((l) => l.map((r) => (r.id === updated.id ? updated : r)));
        toast("Classe budgétaire mise à jour.");
      }
      setEditing(null);
    } catch (ex) {
      setErrors(ex.fields ?? {});
      if (!ex.fields) toast(ex.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await api.remove(removing.id);
      setData((l) => l.filter((r) => r.id !== removing.id));
      toast("Classe budgétaire supprimée.");
      setRemoving(null);
    } catch (ex) {
      toast(ex.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); setErrors((x) => ({ ...x, [k]: undefined })); };

  return (
    <Loadable loading={loading} error={error} onRetry={reload} hasData={!!data}>
      {data && (
        <>
          <div className="stats stats--3">
            <div className="card stat"><strong>{formatDZD(totals.income)}</strong><span>Plafond total des recettes (actives)</span></div>
            <div className="card stat"><strong>{formatDZD(totals.expense)}</strong><span>Plafond total des dépenses (actives)</span></div>
            <div className="card stat"><strong>{formatDZD(totals.income - totals.expense)}</strong><span>Marge prévisionnelle</span></div>
          </div>

          <section className="card">
            <div className="card__head head-row">
              <div><h2>Classifications budgétaires</h2><p>Chaque recette et chaque dépense du club est rattachée à une classe.</p></div>
              <button type="button" className="btn btn--sm" onClick={() => open("new")}><Plus size={16} /> Nouvelle classe</button>
            </div>
            <div className="seg" role="group" aria-label="Filtrer par type">
              {FILTERS.map(([v, l]) => (
                <button key={v} type="button" className={filter === v ? "is-active" : ""} onClick={() => setFilter(v)}>{l}</button>
              ))}
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr><th>Code</th><th>Libellé</th><th>Type</th><th className="num">Plafond annuel</th><th>Statut</th><th /></tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className={r.active ? "" : "is-off"}>
                      <td><code className="code">{r.code}</code></td>
                      <td>{r.name}</td>
                      <td><span className={`tag tag--${r.type === "income" ? "event" : "budget"}`}>{TYPES[r.type]}</span></td>
                      <td className="num">{r.ceiling != null ? formatDZD(r.ceiling) : "—"}</td>
                      <td>{r.active ? "Active" : "Désactivée"}</td>
                      <td className="actions">
                        <button type="button" className="icon-btn" aria-label={`Modifier ${r.name}`} onClick={() => open(r)}><Pencil size={18} /></button>
                        <button type="button" className="icon-btn icon-btn--danger" aria-label={`Supprimer ${r.name}`} onClick={() => setRemoving(r)}><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && <tr><td colSpan={6} className="empty-cell">Aucune classe dans cette vue.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      <Modal
        open={!!editing}
        title={editing === "new" ? "Nouvelle classe budgétaire" : "Modifier la classe"}
        onClose={() => setEditing(null)}
        footer={
          <>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setEditing(null)}>Annuler</button>
            <button type="submit" form="bud-form" className="btn btn--sm" disabled={busy}>{busy ? <Spinner inline /> : "Enregistrer"}</button>
          </>
        }
      >
        <form id="bud-form" className="stack" onSubmit={save} noValidate>
          <div className="grid-2">
            <Field label="Code" value={form.code} placeholder="D-TRA" error={errors.code} onChange={set("code")} />
            <Field label="Type" as="select" value={form.type} onChange={set("type")}>
              <option value="expense">Dépense</option>
              <option value="income">Recette</option>
            </Field>
          </div>
          <Field label="Libellé" value={form.name} placeholder="Transport" error={errors.name} onChange={set("name")} />
          <Field label="Plafond annuel (DZD)" type="number" min="0" step="1000" value={form.ceiling} placeholder="Optionnel" error={errors.ceiling} hint="Laisse vide pour ne fixer aucun plafond." onChange={set("ceiling")} />
          <label className="check"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Classe active</label>
        </form>
      </Modal>

      <Modal
        open={!!removing}
        title="Supprimer la classe ?"
        width={460}
        onClose={() => setRemoving(null)}
        footer={
          <>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setRemoving(null)}>Annuler</button>
            <button type="button" className="btn btn--danger btn--sm" onClick={remove} disabled={busy}>{busy ? <Spinner inline /> : "Supprimer"}</button>
          </>
        }
      >
        <p>La classe « {removing?.code} · {removing?.name} » sera supprimée. Désactive-la plutôt si des opérations passées y sont rattachées.</p>
      </Modal>
    </Loadable>
  );
}
