import { useSearchParams } from "react-router-dom";
import InfoTab from "./settings/InfoTab.jsx";
import CalendarTab from "./settings/CalendarTab.jsx";
import CategoriesTab from "./settings/CategoriesTab.jsx";
import BudgetTab from "./settings/BudgetTab.jsx";

const TABS = [
  { id: "info", label: "Informations", Panel: InfoTab },
  { id: "calendar", label: "Année académique", Panel: CalendarTab },
  { id: "events", label: "Événements", Panel: CategoriesTab },
  { id: "budget", label: "Budget", Panel: BudgetTab },
];

/* PRESIDENT only (enforced by the route guard AND by the backend). The tab is kept in the URL (?tab=budget). */
export default function ClubSettings() {
  const [params, setParams] = useSearchParams();
  const active = TABS.find((t) => t.id === params.get("tab")) ?? TABS[0];
  const { Panel } = active;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Paramètres du club</h1>
          <p>Configuration générale réservée à la présidence.</p>
        </div>
        <span className="pill">Président</span>
      </div>

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active.id}
            className={t.id === active.id ? "is-active" : ""}
            onClick={() => setParams({ tab: t.id }, { replace: true })}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Panel key={active.id} />
    </>
  );
}
