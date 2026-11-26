/* Where the session (token + user) is stored in the browser.
   "Remember me" -> localStorage, otherwise sessionStorage. */
const KEY = "ldc.session";
const stores = () => [window.localStorage, window.sessionStorage];

export function loadSession() {
  for (const s of stores()) {
    try {
      const raw = s.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch { /* storage unavailable */ }
  }
  return null;
}

export function saveSession(session, remember = true) {
  clearSession();
  try {
    (remember ? window.localStorage : window.sessionStorage).setItem(KEY, JSON.stringify(session));
  } catch { /* ignore */ }
}

/* Replace the stored user but keep the token and the storage location. */
export function updateSessionUser(user) {
  for (const s of stores()) {
    try {
      const raw = s.getItem(KEY);
      if (raw) {
        s.setItem(KEY, JSON.stringify({ ...JSON.parse(raw), user }));
        return;
      }
    } catch { /* ignore */ }
  }
}

export function clearSession() {
  for (const s of stores()) {
    try { s.removeItem(KEY); } catch { /* ignore */ }
  }
}

export const getToken = () => loadSession()?.token ?? null;
