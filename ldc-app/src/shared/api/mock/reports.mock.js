import { ApiError } from "../client.js";
import { delay } from "./db.js";

const MONTHS = ["Sep", "Oct", "Nov", "Déc", "Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];

const Y2425 = {
  year: "2024–2025",
  kpis: {
    members: { value: 284, previous: 229 },
    events: { value: 31, previous: 24 },
    attendance: { value: 87, previous: 83 },
    budget: { value: 1324500, previous: 1141000 },
  },
  participation: [
    { name: "Sorties", count: 428, color: "green" },
    { name: "Sports", count: 327, color: "yellow" },
    { name: "Culture", count: 236, color: "blue" },
    { name: "Créatif", count: 135, color: "red" },
  ],
  monthly: [4, 3, 4, 2, 2, 4, 3, 5, 3, 1].map((events, i) => ({
    month: MONTHS[i],
    events,
    participants: [220, 110, 170, 60, 50, 150, 120, 170, 50, 26][i],
  })),
  members: [120, 168, 190, 201, 215, 238, 259, 276, 281, 284].map((total, i) => ({ month: MONTHS[i], total })),
  finance: {
    income: [
      { name: "Subvention ESTIN", amount: 600000 },
      { name: "Cotisations", amount: 424500 },
      { name: "Sponsoring", amount: 250000 },
      { name: "Autres", amount: 50000 },
    ],
    expenses: [
      { name: "Transport", amount: 420000 },
      { name: "Restauration", amount: 285250 },
      { name: "Matériel", amount: 190000 },
      { name: "Divers", amount: 150000 },
      { name: "Communication", amount: 95000 },
    ],
  },
  highlights: [
    { month: "SEP", title: "Welcome Day", note: "126 participants" },
    { month: "NOV", title: "Sortie Tikjda", note: "48 participants" },
    { month: "FÉV", title: "SmashIT", note: "12 équipes" },
    { month: "AVR", title: "Lac Noir", note: "50 participants" },
  ],
};

/* Older years are derived from the main one so the year switcher has something to show. */
function scaled(year, f, prevF) {
  const s = (n, k) => Math.round(n * k);
  return {
    ...Y2425,
    year,
    kpis: Object.fromEntries(
      Object.entries(Y2425.kpis).map(([key, v]) => [key, { value: key === "attendance" ? v.value - (f < 1 ? 5 : 0) : s(v.value, f), previous: key === "attendance" ? v.previous - 4 : s(v.value, prevF) }]),
    ),
    participation: Y2425.participation.map((p) => ({ ...p, count: s(p.count, f) })),
    monthly: Y2425.monthly.map((m) => ({ ...m, events: Math.max(1, s(m.events, f)), participants: s(m.participants, f) })),
    members: Y2425.members.map((m) => ({ ...m, total: s(m.total, f) })),
    finance: {
      income: Y2425.finance.income.map((x) => ({ ...x, amount: s(x.amount, f) })),
      expenses: Y2425.finance.expenses.map((x) => ({ ...x, amount: s(x.amount, f) })),
    },
  };
}

const REPORTS = {
  "2024–2025": Y2425,
  "2023–2024": scaled("2023–2024", 0.8, 0.62),
  "2022–2023": scaled("2022–2023", 0.62, 0.45),
};

export const reportsMock = {
  async listYears() {
    await delay(150);
    return Object.keys(REPORTS);
  },
  async getAnnual(year) {
    await delay(500);
    const r = REPORTS[year];
    if (!r) throw new ApiError("Aucun rapport pour cette année.", { status: 404 });
    return r;
  },
  /* No server to render a PDF in mock mode: tell the page to use the browser's print dialog. */
  async exportPdf() {
    await delay(400);
    return { mode: "print" };
  },
};
