import { delay } from "./db.js";

const ACTORS = [
  { id: "u_pres", name: "Amine Meziane", ini: "AM", color: "green" },
  { id: "u_treas", name: "Lina Nait", ini: "LN", color: "blue" },
  { id: "u_sec", name: "Yasmine Amrane", ini: "YA", color: "red" },
  { id: "u_riad", name: "Riad Saadi", ini: "RS", color: "red" },
  { id: "u_karim", name: "Karim Haddad", ini: "KH", color: "blue" },
];

const TEMPLATES = {
  event: [["a publié", "Sortie Lac Noir"], ["a annulé", "Concours de dessin"], ["a modifié", "Welcome Day"], ["a créé", "Tournoi SmashIT"], ["a clôturé les inscriptions de", "Sortie Tikjda"]],
  budget: [["a ajouté une dépense", "Transport · 42 000 DZD"], ["a enregistré une recette", "Cotisations · 85 000 DZD"], ["a modifié le plafond de", "Communication"], ["a validé une dépense", "Restauration · 18 500 DZD"]],
  member: [["a approuvé", "Lydia Bensaid"], ["a refusé", "Sofia Benali"], ["a changé le rôle de", "Karim Haddad"], ["a suspendu", "Nadir Ouali"]],
  content: [["a modifié", "Page À propos"], ["a publié l’actualité", "Bilan du semestre 1"], ["a ajouté 12 photos à", "Galerie Tikjda"], ["a supprimé l’annonce", "Réunion reportée"]],
  report: [["a exporté", "Rapport financier · Mars"], ["a exporté", "Rapport annuel 2023–2024"], ["a exporté le journal d’activité", "Avril 2025"]],
  settings: [["a modifié le calendrier académique", "2024–2025"], ["a ajouté la catégorie", "Networking"], ["a modifié la classe budgétaire", "D-TRA"], ["a mis à jour les informations du club", "Contact"]],
  auth: [["s’est connecté à", "l’espace président"], ["a réinitialisé son mot de passe", ""], ["s’est connecté à", "l’espace bureau"]],
};
const TYPE_KEYS = Object.keys(TEMPLATES);

/* Deterministic pseudo-random generator so the demo data is stable between reloads. */
function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build() {
  const rand = mulberry32(2025);
  const now = Date.now();
  let cursor = now - 20 * 60_000;
  const items = [];
  for (let i = 0; i < 148; i++) {
    const type = TYPE_KEYS[Math.floor(rand() * TYPE_KEYS.length)];
    const [verb, what] = TEMPLATES[type][Math.floor(rand() * TEMPLATES[type].length)];
    const actor = ACTORS[Math.floor(rand() * ACTORS.length)];
    items.push({ id: `a${i}`, actor, verb, what, type, at: new Date(cursor).toISOString() });
    cursor -= (20 + rand() * 600) * 60_000; // 20 min – 10 h between entries
  }
  return items;
}

let CACHE = null;
const all = () => (CACHE ??= build());

function filtered({ q, actorId, type, from, to }) {
  const needle = q?.trim().toLowerCase();
  const fromMs = from ? new Date(`${from}T00:00:00`).getTime() : null;
  const toMs = to ? new Date(`${to}T23:59:59.999`).getTime() : null;
  return all().filter((e) => {
    if (actorId && e.actor.id !== actorId) return false;
    if (type && e.type !== type) return false;
    const t = new Date(e.at).getTime();
    if (fromMs && t < fromMs) return false;
    if (toMs && t > toMs) return false;
    if (needle && !`${e.actor.name} ${e.verb} ${e.what}`.toLowerCase().includes(needle)) return false;
    return true;
  });
}

export const activityMock = {
  async list({ page = 1, pageSize = 10, ...filters } = {}) {
    await delay(300);
    const rows = filtered(filters);
    return { items: rows.slice((page - 1) * pageSize, page * pageSize), total: rows.length, page, pageSize };
  },

  async listActors() {
    await delay(150);
    return ACTORS.map(({ id, name }) => ({ id, name }));
  },

  async exportCsv(filters = {}) {
    await delay(500);
    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const lines = ["Date;Utilisateur;Action;Objet;Type"];
    for (const e of filtered(filters)) lines.push([e.at, e.actor.name, e.verb, e.what, e.type].map(esc).join(";"));
    return new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  },
};
