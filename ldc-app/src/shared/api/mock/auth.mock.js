import { ApiError } from "../client.js";
import { getToken } from "../session.js";
import { delay, persisted, uid, resetMock } from "./db.js";

/* Demo accounts (password for all: Password1!)
   president@estin.dz  -> president, approved
   board@estin.dz      -> board, approved
   member@estin.dz     -> member, approved
   pending@estin.dz    -> member, application pending
   rejected@estin.dz   -> member, application rejected (with a reason) */
const PASSWORD = "Password1!";
const base = { password: PASSWORD, fieldOfStudy: "info", studyYear: "3", submittedAt: "2025-04-02T09:30:00.000Z", rejectionReason: null };

const SEED = [
  { ...base, id: "u_pres", firstName: "Amine", lastName: "Meziane", email: "president@estin.dz", studentId: "2021/0421", role: "president", status: "approved" },
  { ...base, id: "u_board", firstName: "Lina", lastName: "Nait", email: "board@estin.dz", studentId: "2021/0188", role: "board", status: "approved" },
  { ...base, id: "u_member", firstName: "Yasmine", lastName: "Amrane", email: "member@estin.dz", studentId: "2022/0310", role: "member", status: "approved" },
  { ...base, id: "u_pending", firstName: "Karim", lastName: "Haddad", email: "pending@estin.dz", studentId: "2023/0977", role: "member", status: "pending" },
  {
    ...base, id: "u_rejected", firstName: "Sofia", lastName: "Benali", email: "rejected@estin.dz", studentId: "2020/0054",
    role: "member", status: "rejected",
    rejectionReason: "Le matricule fourni ne correspond à aucun étudiant inscrit cette année.",
  },
];

const users = persisted("users", SEED);
const resets = persisted("resets", {});

const publicUser = ({ password, ...u }) => u;
const userFromToken = (token) => {
  if (!token?.startsWith("mock-")) return null;
  return users.get().find((u) => u.id === token.slice(5)) ?? null;
};
const session = (u) => ({ token: `mock-${u.id}`, user: publicUser(u) });
const mask = (email) => email.replace(/^(.).*(@.*)$/, "$1•••$2");

export const authMock = {
  async login({ email, password }) {
    await delay();
    const u = users.get().find((x) => x.email.toLowerCase() === email.trim().toLowerCase());
    if (!u || u.password !== password) {
      throw new ApiError("E-mail ou mot de passe incorrect.", { status: 401, code: "INVALID_CREDENTIALS" });
    }
    return session(u);
  },

  async register(data) {
    await delay(600);
    const list = users.get();
    const fields = {};
    if (list.some((u) => u.email.toLowerCase() === data.email.trim().toLowerCase())) fields.email = "Cet e-mail est déjà utilisé.";
    if (list.some((u) => u.studentId === data.studentId.trim())) fields.studentId = "Ce matricule est déjà enregistré.";
    if (Object.keys(fields).length) throw new ApiError("Certaines informations sont déjà utilisées.", { status: 409, fields });

    const u = {
      id: uid("u"),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      studentId: data.studentId.trim(),
      fieldOfStudy: data.fieldOfStudy,
      studyYear: data.studyYear,
      password: data.password,
      role: "member",
      status: "pending",
      rejectionReason: null,
      submittedAt: new Date().toISOString(),
    };
    users.set([...list, u]);
    return session(u);
  },

  /* Returns the current user (also used to "re-check" an application status). */
  async me() {
    await delay(300);
    const u = userFromToken(getToken());
    if (!u) throw new ApiError("Session expirée.", { status: 401 });
    return publicUser(u);
  },

  async logout() {
    await delay(100);
  },

  /* Always answers OK, whether or not the e-mail exists (do the same in the real backend). */
  async requestPasswordReset({ email }) {
    await delay(600);
    const normalizedEmail = email.trim().toLowerCase();
    const accountExists = users.get().some((u) => u.email.toLowerCase() === normalizedEmail);
    // Keep the public response identical for known and unknown e-mails.
    if (!accountExists) return { ok: true };

    const token = `mock-${uid("rst")}`;
    resets.set({ ...resets.get(), [token]: { email: normalizedEmail, expires: Date.now() + 3600_000 } });
    return { ok: true, _dev: { resetUrl: `/reset-password?token=${token}` } };
  },

  /* "demo-valid" is always valid, "expired" is always expired, anything else is invalid. */
  async validateResetToken({ token }) {
    await delay(400);
    if (token === "demo-valid") return { valid: true, email: "a•••@estin.dz" };
    if (token === "expired") throw new ApiError("Ce lien a expiré.", { status: 410, code: "TOKEN_EXPIRED" });
    const entry = token && resets.get()[token];
    if (!entry) throw new ApiError("Ce lien est invalide.", { status: 400, code: "TOKEN_INVALID" });
    if (entry.expires < Date.now()) throw new ApiError("Ce lien a expiré.", { status: 410, code: "TOKEN_EXPIRED" });
    return { valid: true, email: mask(entry.email) };
  },

  async resetPassword({ token, password }) {
    await authMock.validateResetToken({ token });
    const entry = resets.get()[token];
    if (entry) {
      users.set(users.get().map((u) => (u.email === entry.email ? { ...u, password } : u)));
      const { [token]: _used, ...rest } = resets.get();
      resets.set(rest);
    }
    return { ok: true };
  },
};

/* Demo helpers, available in the browser console during `npm run dev`:
     __ldcMock.setStatus("pending@estin.dz", "approved")
     __ldcMock.setStatus("pending@estin.dz", "rejected", "Raison…")
     __ldcMock.reset()   // wipes every mock table */
if (import.meta.env.DEV && typeof window !== "undefined") {
  window.__ldcMock = {
    setStatus(email, status, reason = null) {
      users.set(users.get().map((u) => (u.email === email ? { ...u, status, rejectionReason: reason } : u)));
    },
    reset() { resetMock(); location.reload(); },
  };
}
