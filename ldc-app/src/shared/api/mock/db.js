/* Tiny helpers shared by every mock. Mock data is kept in localStorage
   (key "ldc.mock.*") so edits survive a page refresh during demos. */
export const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms + Math.random() * 150));
export const uid = (p = "id") => `${p}_${Math.random().toString(36).slice(2, 9)}`;

export function persisted(key, seed) {
  const k = `ldc.mock.${key}`;
  return {
    get() {
      try {
        const raw = window.localStorage.getItem(k);
        if (raw) return JSON.parse(raw);
      } catch { /* ignore */ }
      return structuredClone(seed);
    },
    set(value) {
      try { window.localStorage.setItem(k, JSON.stringify(value)); } catch { /* ignore */ }
      return value;
    },
  };
}

export function resetMock() {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith("ldc.mock."))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch { /* ignore */ }
}
