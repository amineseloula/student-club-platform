import { ApiError } from "../client.js";
import { delay, persisted, uid } from "./db.js";

const CLUB = {
  fullName: "Leisure & Discovery Club",
  shortName: "LDC",
  school: "ESTIN Béjaïa",
  founded: "2020",
  slogan: "Human first, Student second",
  tagline: "Explore | Learn | Connect",
  email: "ldc@estin.dz",
  phone: "+213 555 20 20 20",
};

const CALENDAR = {
  year: { label: "2024–2025", start: "2024-09-15", end: "2025-06-30" },
  terms: [
    { id: "t1", name: "Semestre 1", start: "2024-09-15", end: "2025-01-23" },
    { id: "t2", name: "Semestre 2", start: "2025-02-09", end: "2025-06-30" },
  ],
  breaks: [
    { id: "b1", name: "Vacances d’hiver", start: "2025-01-24", end: "2025-02-08" },
    { id: "b2", name: "Ramadan & Aïd (pause activités)", start: "2025-03-01", end: "2025-04-02" },
  ],
};

const CATEGORIES = [
  { id: "c1", name: "Sorties & randonnées", color: "#4a8c5c", description: "Randonnées, camps et excursions d’une journée.", active: true },
  { id: "c2", name: "Sports", color: "#ecba3d", description: "Tournois, entraînements et défis sportifs.", active: true },
  { id: "c3", name: "Culture", color: "#5b8fc5", description: "Conférences, ciné-clubs, visites culturelles.", active: true },
  { id: "c4", name: "Créatif", color: "#cf5238", description: "Dessin, photo, ateliers manuels.", active: true },
  { id: "c5", name: "Networking", color: "#233a52", description: "Rencontres avec des professionnels et alumni.", active: false },
];

const BUDGET_CLASSES = [
  { id: "k1", code: "R-COT", name: "Cotisations", type: "income", ceiling: 450000, active: true },
  { id: "k2", code: "R-SUB", name: "Subvention ESTIN", type: "income", ceiling: 600000, active: true },
  { id: "k3", code: "R-SPO", name: "Sponsoring", type: "income", ceiling: 300000, active: true },
  { id: "k4", code: "D-TRA", name: "Transport", type: "expense", ceiling: 450000, active: true },
  { id: "k5", code: "D-RES", name: "Restauration", type: "expense", ceiling: 300000, active: true },
  { id: "k6", code: "D-MAT", name: "Matériel", type: "expense", ceiling: 200000, active: true },
  { id: "k7", code: "D-COM", name: "Communication", type: "expense", ceiling: 100000, active: true },
];

const club = persisted("club", CLUB);
const calendar = persisted("calendar", CALENDAR);

/* Generic CRUD with a uniqueness rule, so the UI can show server-side field errors. */
function crud(key, seed, uniqueField, uniqueMessage) {
  const table = persisted(key, seed);
  const check = (list, data, id) => {
    const dup = list.some((x) => x.id !== id && String(x[uniqueField]).toLowerCase() === String(data[uniqueField]).trim().toLowerCase());
    if (dup) throw new ApiError(uniqueMessage, { status: 409, fields: { [uniqueField]: uniqueMessage } });
  };
  return {
    async list() { await delay(); return table.get(); },
    async create(data) {
      await delay();
      const list = table.get();
      check(list, data);
      const item = { ...data, id: uid(key) };
      table.set([...list, item]);
      return item;
    },
    async update(id, data) {
      await delay(250);
      const list = table.get();
      check(list, data, id);
      const next = list.map((x) => (x.id === id ? { ...x, ...data, id } : x));
      table.set(next);
      return next.find((x) => x.id === id);
    },
    async remove(id) {
      await delay(250);
      table.set(table.get().filter((x) => x.id !== id));
      return null;
    },
  };
}

export const settingsMock = {
  async getClub() { await delay(); return club.get(); },
  async updateClub(data) { await delay(500); return club.set({ ...club.get(), ...data }); },
  async getCalendar() { await delay(); return calendar.get(); },
  async updateCalendar(data) { await delay(500); return calendar.set(data); },
  categories: crud("categories", CATEGORIES, "name", "Une catégorie porte déjà ce nom."),
  budgetClasses: crud("budget", BUDGET_CLASSES, "code", "Ce code est déjà utilisé."),
};
