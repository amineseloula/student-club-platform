import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Download, RotateCcw, Search } from "lucide-react";
import Spinner from "../../../shared/components/Spinner.jsx";
import { useToast } from "../../../shared/components/Toast.jsx";
import { useDebounced } from "../../../shared/hooks/useDebounced.js";
import { activityApi } from "../../../shared/api/activity.js";
import { ACTIVITY_TYPES } from "../../../shared/config.js";
import { downloadBlob } from "../../../shared/utils/download.js";
import { formatWhen } from "../../../shared/utils/format.js";

const PAGE_SIZE = 10;
const NO_FILTERS = { q: "", actorId: "", type: "", from: "", to: "" };
const TYPE_LABEL = Object.fromEntries(ACTIVITY_TYPES.map((t) => [t.value, t.label]));
// Visual tag per activity type (colors defined in dashboard.css).
const TAG = { event: "event", budget: "budget", member: "member", content: "content", report: "report", settings: "member", auth: "content" };

export default function ActivityLog() {
  const toast = useToast();
  const [filters, setFilters] = useState(NO_FILTERS);
  const [page, setPage] = useState(1);
  const [actors, setActors] = useState([]);
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: null });
  const [exporting, setExporting] = useState(false);
  const [tick, setTick] = useState(0); // bump to refetch

  const q = useDebounced(filters.q, 300);
  const query = useMemo(() => ({ ...filters, q }), [filters.actorId, filters.type, filters.from, filters.to, q]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = Object.values(filters).some(Boolean);
  const invalidRange = filters.from && filters.to && filters.to < filters.from;

  useEffect(() => { activityApi.listActors().then(setActors).catch(() => {}); }, []);

  // Any filter change goes back to page 1.
  useEffect(() => { setPage(1); }, [query]);

  useEffect(() => {
    if (invalidRange) return;
    let live = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    activityApi.list({ ...query, page, pageSize: PAGE_SIZE })
      .then((r) => live && setState({ items: r.items, total: r.total, loading: false, error: null }))
      .catch((error) => live && setState((s) => ({ ...s, loading: false, error })));
    return () => { live = false; };
  }, [query, page, invalidRange, tick]);

  const set = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value }));
  const pages = Math.max(1, Math.ceil(state.total / PAGE_SIZE));
  const from = state.total ? (page - 1) * PAGE_SIZE + 1 : 0;
  const to = Math.min(page * PAGE_SIZE, state.total);

  const onExport = async () => {
    setExporting(true);
    try {
      const blob = await activityApi.exportCsv(query);
      downloadBlob(blob, `journal-activite-ldc-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Journal d’activité</h1>
          <p>Traçabilité complète des actions sensibles du club.</p>
        </div>
        <div className="page-head__actions">
          <button className="btn btn--ghost btn--sm" onClick={onExport} disabled={exporting || !state.total}>
            {exporting ? <Spinner inline /> : <Download size={18} />} Exporter le journal
          </button>
        </div>
      </div>

      <div className="filters">
        <label className="search">
          <Search size={20} />
          <input type="search" placeholder="Rechercher une action ou un membre..." value={filters.q} onChange={set("q")} aria-label="Rechercher" />
        </label>
        <select className="filter" value={filters.actorId} onChange={set("actorId")} aria-label="Filtrer par utilisateur">
          <option value="">Utilisateur : tous</option>
          {actors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <select className="filter" value={filters.type} onChange={set("type")} aria-label="Filtrer par type d’action">
          <option value="">Action : toutes</option>
          {ACTIVITY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <label className="filter filter--date">
          <span>Du</span>
          <input type="date" value={filters.from} max={filters.to || undefined} onChange={set("from")} aria-label="Date de début" />
        </label>
        <label className="filter filter--date">
          <span>Au</span>
          <input type="date" value={filters.to} min={filters.from || undefined} onChange={set("to")} aria-label="Date de fin" />
        </label>
        {active && (
          <button type="button" className="btn btn--text" onClick={() => setFilters(NO_FILTERS)}><RotateCcw size={14} /> Réinitialiser</button>
        )}
      </div>
      {invalidRange && <p className="field__error" role="alert" style={{ marginBottom: 14 }}>La date de fin précède la date de début.</p>}

      <div className="card">
        {state.error ? (
          <div className="card__body empty">
            <AlertCircle size={28} />
            <p>{state.error.message}</p>
            <button className="btn btn--ghost btn--sm" onClick={() => setTick((t) => t + 1)}>Réessayer</button>
          </div>
        ) : state.loading && state.items.length === 0 ? (
          <Spinner />
        ) : state.items.length === 0 ? (
          <div className="card__body empty">
            <p>Aucune action ne correspond à ces filtres.</p>
            {active && <button className="btn btn--ghost btn--sm" onClick={() => setFilters(NO_FILTERS)}>Réinitialiser les filtres</button>}
          </div>
        ) : (
          <ul className={state.loading ? "log is-loading" : "log"}>
            {state.items.map((e) => (
              <li key={e.id}>
                <span className={`avatar avatar--${e.actor.color}`}>{e.actor.ini}</span>
                <div className="log__text">
                  <b>{e.actor.name}</b> {e.verb} {e.what && <b>{e.what}</b>}
                  <small><time dateTime={e.at}>{formatWhen(e.at)}</time></small>
                </div>
                <span className={`tag tag--${TAG[e.type]}`}>{TYPE_LABEL[e.type]}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="log__foot">
          <span>{state.total ? `${from}–${to} sur ${state.total} action${state.total > 1 ? "s" : ""}` : "0 action"}</span>
          <div className="log__pager">
            <button disabled={page <= 1 || state.loading} onClick={() => setPage((p) => p - 1)}>Précédent</button>
            <span className="log__page">Page {page} / {pages}</span>
            <button disabled={page >= pages || state.loading} onClick={() => setPage((p) => p + 1)}>Suivant</button>
          </div>
        </div>
      </div>
    </>
  );
}
