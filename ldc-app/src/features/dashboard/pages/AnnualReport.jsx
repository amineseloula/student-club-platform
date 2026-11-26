import { useState } from "react";
import { AlertCircle, Download } from "lucide-react";
import Logo from "../../../shared/components/Logo.jsx";
import Spinner from "../../../shared/components/Spinner.jsx";
import { BarChart, DonutChart, HBars, LineChart } from "../../../shared/components/charts.jsx";
import { useToast } from "../../../shared/components/Toast.jsx";
import { useApi } from "../../../shared/hooks/useApi.js";
import { reportsApi } from "../../../shared/api/reports.js";
import { downloadBlob } from "../../../shared/utils/download.js";
import { CLUB_EMAIL } from "../../../shared/config.js";
import { formatCompactDZD, formatDZD, formatNumber, percentDelta } from "../../../shared/utils/format.js";

const KPI_DEFS = [
  { key: "members", label: "membres actifs", fmt: formatNumber },
  { key: "events", label: "événements organisés", fmt: formatNumber, abs: true },
  { key: "attendance", label: "taux de présence", fmt: (n) => `${n}%`, points: true },
  { key: "budget", label: "budget mobilisé", fmt: formatCompactDZD },
];

function delta(def, { value, previous }, prevYear) {
  if (previous == null) return null;
  const label = prevYear ? `vs ${prevYear}` : "vs année précédente";
  if (def.abs) return `${value - previous >= 0 ? "+" : ""}${value - previous} ${label}`;
  if (def.points) return `${value - previous >= 0 ? "+" : ""}${value - previous} pts ${label}`;
  const p = percentDelta(value, previous);
  return `${p >= 0 ? "+" : ""}${p}% ${label}`;
}

export default function AnnualReport() {
  const toast = useToast();
  const years = useApi(() => reportsApi.listYears(), []);
  const [year, setYear] = useState(null);
  const selected = year ?? years.data?.[0];
  const report = useApi(() => (selected ? reportsApi.getAnnual(selected) : Promise.resolve(null)), [selected]);
  const [exporting, setExporting] = useState(false);

  const idx = years.data?.indexOf(selected) ?? -1;
  const prevYear = idx >= 0 ? years.data[idx + 1] : undefined;

  const onExport = async () => {
    setExporting(true);
    try {
      const res = await reportsApi.exportPdf(selected);
      if (res.blob) {
        downloadBlob(res.blob, res.filename);
      } else {
        // No server-side PDF yet: use the browser print dialog ("Save as PDF"). Print CSS is in dashboard.css.
        const title = document.title;
        document.title = `Rapport-annuel-LDC-${selected}`;
        setTimeout(() => { window.print(); document.title = title; }, 60);
      }
    } catch (e) {
      toast(e.message || "La génération du PDF a échoué.", "error");
    } finally {
      setExporting(false);
    }
  };

  const r = report.data;
  const [y1, y2] = (selected ?? "").split("–");

  const header = (
    <div className="page-head">
      <div>
        <h1>Rapport annuel {selected ?? ""}</h1>
        <p>Vue consolidée des activités et de l’impact du club.</p>
      </div>
      <div className="page-head__actions no-print">
        <select className="filter" value={selected ?? ""} onChange={(e) => setYear(e.target.value)} aria-label="Année du rapport" disabled={!years.data}>
          {(years.data ?? []).map((y) => <option key={y} value={y}>Année {y}</option>)}
        </select>
        <button className="btn btn--dark btn--sm" onClick={onExport} disabled={exporting || !r}>
          {exporting ? <Spinner inline /> : <Download size={18} />} Exporter en PDF
        </button>
      </div>
    </div>
  );

  if (years.error || report.error) {
    const e = years.error ?? report.error;
    return (
      <>
        {header}
        <div className="card card__body empty">
          <AlertCircle size={28} />
          <p>{e.message}</p>
          <button className="btn btn--ghost btn--sm" onClick={years.error ? years.reload : report.reload}>Réessayer</button>
        </div>
      </>
    );
  }

  if (!r || report.loading) {
    return <>{header}<div className="card"><Spinner label="Chargement du rapport…" /></div></>;
  }

  const participations = r.participation.reduce((s, p) => s + p.count, 0);
  const income = r.finance.income.reduce((s, x) => s + x.amount, 0);
  const expenses = r.finance.expenses.reduce((s, x) => s + x.amount, 0);
  const balance = income - expenses;

  return (
    <>
      {header}

      <div className="hero-card">
        <div>
          <Logo />
          <small>Rapport d’activité</small>
          <h2>Une année à explorer, apprendre et connecter.</h2>
          <p>Leisure &amp; Discovery Club · ESTIN Béjaïa</p>
        </div>
        <div className="hero-card__years">{y1}<i />{y2}</div>
      </div>

      <div className="stats">
        {KPI_DEFS.map((d) => (
          <div key={d.key} className="card stat">
            <strong>{d.fmt(r.kpis[d.key].value)}</strong>
            <span>{d.label}</span>
            <em>{delta(d, r.kpis[d.key], prevYear)}</em>
          </div>
        ))}
      </div>

      <div className="report-grid">
        <section className="card">
          <div className="card__head"><h2>Participation par type d’activité</h2></div>
          <div className="donut-wrap">
            <DonutChart data={r.participation.map((p) => ({ name: p.name, value: p.count, color: p.color }))} centerValue={formatNumber(participations)} centerLabel="participations" />
            <ul className="legend">
              {r.participation.map((p) => (
                <li key={p.name}>
                  <span className="dot" style={{ background: `var(--${p.color})` }} />
                  {p.name}
                  <b>{Math.round((p.count / participations) * 100)}%</b>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="card">
          <div className="card__head"><h2>Synthèse financière</h2></div>
          <div className="finance">
            <div><span>Recettes</span><b>{formatDZD(income)}</b></div>
            <div><span>Dépenses</span><b>{formatDZD(expenses)}</b></div>
            <div className="finance__total"><span>Solde</span><b>{balance < 0 ? "−" : ""}{formatDZD(Math.abs(balance))}</b></div>
          </div>
        </section>
      </div>

      <div className="report-grid">
        <section className="card">
          <div className="card__head"><h2>Événements par mois</h2><p>Nombre d’événements organisés</p></div>
          <div className="chart-box">
            <BarChart data={r.monthly.map((m) => ({ label: m.month, value: m.events }))} fill="green" unit=" événement(s)" label="Événements par mois" />
          </div>
        </section>
        <section className="card">
          <div className="card__head"><h2>Évolution des membres</h2><p>Effectif cumulé en fin de mois</p></div>
          <div className="chart-box">
            <LineChart data={r.members.map((m) => ({ label: m.month, value: m.total }))} stroke="blue" unit=" membres" label="Évolution des membres" />
          </div>
        </section>
      </div>

      <div className="report-grid">
        <section className="card">
          <div className="card__head"><h2>Participants par mois</h2><p>Total des participations enregistrées</p></div>
          <div className="chart-box">
            <BarChart data={r.monthly.map((m) => ({ label: m.month, value: m.participants }))} fill="yellow" unit=" participants" label="Participants par mois" />
          </div>
        </section>
        <section className="card">
          <div className="card__head"><h2>Recettes & dépenses par classe</h2></div>
          <div className="card__body stack">
            <div><h3 className="mini-title">Recettes</h3><HBars rows={r.finance.income} fill="green" format={formatDZD} /></div>
            <div><h3 className="mini-title">Dépenses</h3><HBars rows={r.finance.expenses} fill="red" format={formatDZD} /></div>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="card__head"><h2>Temps forts de l’année</h2></div>
        <div className="timeline">
          {r.highlights.map((h) => (
            <div key={h.title} className="timeline__item">
              <small>{h.month}</small>
              <i />
              <strong>{h.title}</strong>
              <span>{h.note}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="print-foot">Rapport généré le {new Date().toLocaleDateString("fr-FR")} · {CLUB_EMAIL}</p>
    </>
  );
}
