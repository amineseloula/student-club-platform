// ---------- Site ----------
// Public website URL. "Retour au site" and "Retour à l'accueil" point here.
// Replace with your real site (e.g. "https://ldc.estin.dz") when it exists.
export const SITE_URL = "/";
export const CLUB_EMAIL = "ldc@estin.dz";

// Board contact links shown on the "application rejected" page.
// Replace the placeholder values with the real ones.
export const CLUB_CONTACTS = {
  email: CLUB_EMAIL,
  phone: "+213 555 20 20 20",
  instagram: "https://instagram.com/ldc.estin",
  facebook: "https://facebook.com/ldc.estin",
};

export const CURRENT_MANDATE = "2024–2025";
export const REVIEW_DELAY_LABEL = "48 heures";

// ---------- Sign-up rules ----------
// Only e-mails ending with this domain can apply. Set to null to accept any e-mail.
export const STUDENT_EMAIL_DOMAIN = "estin.dz";
// Student ID format, e.g. 2021/0421
export const STUDENT_ID_PATTERN = /^\d{4}\/\d{4}$/;
export const STUDENT_ID_EXAMPLE = "2021/0421";

export const STUDY_YEARS = [
  { value: "1", label: "1re année" },
  { value: "2", label: "2e année" },
  { value: "3", label: "3e année" },
  { value: "4", label: "4e année" },
  { value: "5", label: "5e année" },
];

export const FIELDS_OF_STUDY = [
  { value: "info", label: "Informatique" },
  { value: "telecom", label: "Télécommunications" },
  { value: "elec", label: "Électronique" },
];

// ---------- Roles ----------
// Must match the role values your backend returns.
export const ROLES = {
  president: "Président",
  board: "Bureau",
  member: "Membre",
  guest: "Invité",
};

// ---------- Activity log ----------
export const ACTIVITY_TYPES = [
  { value: "event", label: "Événement" },
  { value: "budget", label: "Budget" },
  { value: "member", label: "Membre" },
  { value: "content", label: "Contenu" },
  { value: "report", label: "Rapport" },
  { value: "settings", label: "Paramètres" },
  { value: "auth", label: "Connexion" },
];
