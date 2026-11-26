// Authentication & Role-Based Access Control service aligned with mocks/members.js.
// TODO: replace demo credential checks with backend JWT/session authentication when API is ready.
import { getMembers } from '../mocks/members';

const AUTH_STORAGE_KEY = 'ldc_auth_session_v1';
export const BOARD_ROLES = ['president', 'board', 'treasurer'];

export function isBoardRole(role) {
  return BOARD_ROLES.includes(role);
}

export function getStoredUser() {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.email && parsed.role) return parsed;
  } catch {
    // Ignore malformed storage
  }
  return null;
}

export function persistUser(user) {
  try {
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

export function loginWithEmail(email) {
  const normalized = email.trim().toLowerCase();
  const matched = getMembers().find((m) => m.email.toLowerCase() === normalized);
  if (!matched) {
    return { ok: false, error: "Aucun compte trouvé avec cette adresse e-mail ESTIN." };
  }
  if (matched.status !== 'active') {
    return { ok: false, error: 'Ce compte membre est actuellement inactif.' };
  }
  const sessionUser = {
    id: matched.id,
    name: matched.name,
    email: matched.email,
    role: matched.role,
    tone: matched.tone,
    studentId: matched.studentId,
  };
  persistUser(sessionUser);
  return { ok: true, user: sessionUser };
}

export function registerVisitorAccount({ name, email, studentId }) {
  const sessionUser = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: 'member',
    tone: 'green',
    studentId: studentId?.trim() || '2025/NEW',
  };
  persistUser(sessionUser);
  return { ok: true, user: sessionUser };
}

export function logoutUser() {
  persistUser(null);
}
