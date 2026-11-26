import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Field from "../../../../shared/components/Field.jsx";
import Modal from "../../../../shared/components/Modal.jsx";
import Spinner from "../../../../shared/components/Spinner.jsx";
import { useToast } from "../../../../shared/components/Toast.jsx";
import { useApi } from "../../../../shared/hooks/useApi.js";
import { settingsApi } from "../../../../shared/api/settings.js";
import { Loadable, SWATCHES } from "./Shared.jsx";

const EMPTY = { name: "", description: "", color: SWATCHES[0], active: true };
const api = settingsApi.categories;

export default function CategoriesTab() {
  const toast = useToast();
  const { data, loading, error, reload, setData } = useApi(() => api.list(), []);
  const [editing, setEditing] = useState(null); // null | category | "new"
  const [removing, setRemoving] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const open = (cat) => {
    setForm(cat === "new" ? EMPTY : { name: cat.name, description: cat.description ?? "", color: cat.color, active: cat.active });
    setErrors({});
    setEditing(cat);
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setErrors({ name: "Le nom est obligatoire." }); return; }
    setBusy(true);
    try {
      const payload = { ...form, name: form.name.trim() };
      if (editing === "new") {
        const created = await api.create(payload);
        setData((l) => [...l, created]);
        toast("Catégorie ajoutée.");
      } else {
        const updated = await api.update(editing.id, payload);
        setData((l) => l.map((c) => (c.id === updated.id ? updated : c)));
        toast("Catégorie mise à jour.");
      }
      setEditing(null);
    } catch (ex) {
      setErrors(ex.fields ?? {});
      if (!ex.fields) toast(ex.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (cat) => {
    const prev = data;
    setData((l) => l.map((c) => (c.id === cat.id ? { ...c, active: !c.active } : c)));
    try {
      await api.update(cat.id, { ...cat, active: !cat.active });
    } catch (ex) {
      setData(prev);
      toast(ex.message, "error");
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await api.remove(removing.id);
      setData((l) => l.filter((c) => c.id !== removing.id));
      toast("Catégorie supprimée.");
      setRemoving(null);
    } catch (ex) {
      toast(ex.message, "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Loadable loading={loading} error={error} onRetry={reload} hasData={!!data}>
      {data && (
        <section className="card">
          <div className="card__head head-row">
            <div><h2>Catégories d’événements</h2><p>Utilisées pour classer les événements et calculer la participation dans le rapport annuel.</p></div>
            <button type="button" className="btn btn--sm" onClick={() => open("new")}><Plus size={16} /> Nouvelle catégorie</button>
          </div>
          {data.length === 0 ? (
            <div className="card__body empty"><p>Aucune catégorie. Ajoute la première.</p></div>
          ) : (
            <ul className="cats">
              {data.map((c) => (
                <li key={c.id} className={c.active ? "" : "is-off"}>
                  <span className="cats__color" style={{ background: c.color }} />
                  <div className="cats__text">
                    <strong>{c.name}</strong>
                    <small>{c.description || "Aucune description"}</small>
                  </div>
                  <label className="switch" title={c.active ? "Active" : "Désactivée"}>
                    <input type="checkbox" checked={c.active} onChange={() => toggle(c)} aria-label={`Activer ${c.name}`} />
                    <span />
                  </label>
                  <button type="button" className="icon-btn" aria-label={`Modifier ${c.name}`} onClick={() => open(c)}><Pencil size={18} /></button>
                  <button type="button" className="icon-btn icon-btn--danger" aria-label={`Supprimer ${c.name}`} onClick={() => setRemoving(c)}><Trash2 size={18} /></button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <Modal
        open={!!editing}
        title={editing === "new" ? "Nouvelle catégorie" : "Modifier la catégorie"}
        onClose={() => setEditing(null)}
        footer={
          <>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setEditing(null)}>Annuler</button>
            <button type="submit" form="cat-form" className="btn btn--sm" disabled={busy}>{busy ? <Spinner inline /> : "Enregistrer"}</button>
          </>
        }
      >
        <form id="cat-form" className="stack" onSubmit={save} noValidate>
          <Field label="Nom" value={form.name} error={errors.name} placeholder="Sorties & randonnées" onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({}); }} />
          <Field label="Description" as="textarea" rows={3} value={form.description} placeholder="Optionnel" onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <fieldset className="swatches">
            <legend className="field__label">Couleur</legend>
            <div>
              {SWATCHES.map((c) => (
                <label key={c} className={form.color === c ? "is-on" : ""} style={{ background: c }} title={c}>
                  <input type="radio" name="color" value={c} checked={form.color === c} onChange={() => setForm({ ...form, color: c })} className="sr-only" />
                </label>
              ))}
            </div>
          </fieldset>
          <label className="check"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Catégorie active (proposée lors de la création d’un événement)</label>
        </form>
      </Modal>

      <Modal
        open={!!removing}
        title="Supprimer la catégorie ?"
        width={460}
        onClose={() => setRemoving(null)}
        footer={
          <>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setRemoving(null)}>Annuler</button>
            <button type="button" className="btn btn--danger btn--sm" onClick={remove} disabled={busy}>{busy ? <Spinner inline /> : "Supprimer"}</button>
          </>
        }
      >
        <p>« {removing?.name} » sera supprimée. Les événements déjà classés dans cette catégorie ne seront pas supprimés. Pour la masquer simplement, désactive-la plutôt.</p>
      </Modal>
    </Loadable>
  );
}
