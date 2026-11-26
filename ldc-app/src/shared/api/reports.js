import { request, USE_MOCK } from "./client.js";
import { reportsMock } from "./mock/reports.mock.js";

/* Annual report. PRESIDENT-ONLY (403 otherwise).
   GET /reports/annual/years      -> ["2024–2025", "2023–2024", ...]
   GET /reports/annual/:year      -> AnnualReport (shape: see mock/reports.mock.js)
   POST /reports/annual/:year/pdf -> the generated PDF (blob). The page downloads it.
   While the backend has no PDF generator, keep USE_MOCK for this call only or return
   { mode: "print" } and the page will open the browser print dialog (print CSS is ready). */
const real = {
  listYears: () => request("/reports/annual/years"),
  getAnnual: (year) => request(`/reports/annual/${encodeURIComponent(year)}`),
  exportPdf: async (year) => ({
    blob: await request(`/reports/annual/${encodeURIComponent(year)}/pdf`, { method: "POST", blob: true }),
    filename: `Rapport-annuel-LDC-${year}.pdf`,
  }),
};

export const reportsApi = USE_MOCK ? reportsMock : real;
