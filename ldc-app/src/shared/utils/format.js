const nf = new Intl.NumberFormat("fr-FR");
export const formatNumber = (n) => nf.format(n).replace(/[  ]/g, " ");
export const formatDZD = (n) => `${formatNumber(n)} DZD`;
export function formatCompactDZD(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace(".", ",")} M DZD`;
  return formatDZD(n);
}

const time = (d) => d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
const sameDay = (a, b) => a.toDateString() === b.toDateString();

/* "Aujourd’hui, 10:42" / "Hier, 17:06" / "20 avr., 18:45" */
export function formatWhen(iso) {
  const d = new Date(iso);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay(d, now)) return `Aujourd’hui, ${time(d)}`;
  if (sameDay(d, yesterday)) return `Hier, ${time(d)}`;
  return `${d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}, ${time(d)}`;
}

export const formatDate = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "—";

export const initials = (u) => `${u?.firstName?.[0] ?? ""}${u?.lastName?.[0] ?? ""}`.toUpperCase() || "?";

export const percentDelta = (value, previous) =>
  previous ? Math.round(((value - previous) / previous) * 100) : null;
