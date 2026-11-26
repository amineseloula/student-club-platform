import { getToken } from "./session.js";

/* ------------------------------------------------------------------
   Backend switch.
   - VITE_USE_MOCK=true  (default): every service uses the in-browser mock.
   - VITE_USE_MOCK=false          : every service calls the real API below.
   - VITE_API_URL                 : base URL of the API (default "/api").
   See .env.example and README.md.
------------------------------------------------------------------- */
export const API_URL = (import.meta.env.VITE_API_URL ?? "/api").replace(/\/$/, "");
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

/* Error shape expected from the backend (any 4xx/5xx):
   { "message": "Texte lisible", "code": "OPTIONAL_CODE", "fields": { "email": "déjà utilisé" } } */
export class ApiError extends Error {
  constructor(message, { status = 0, code = null, fields = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

let onUnauthorized = null;
/* AuthContext registers a handler here to log the user out on any 401. */
export function setUnauthorizedHandler(fn) {
  onUnauthorized = fn;
}

export async function request(path, { method = "GET", body, params, signal, blob = false } = {}) {
  const url = new URL(`${API_URL}${path}`, window.location.origin);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
    }
  }

  const headers = { Accept: blob ? "*/*" : "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new ApiError("Impossible de joindre le serveur. Vérifie ta connexion.", { code: "NETWORK" });
  }

  if (!res.ok) {
    let data = null;
    try { data = await res.json(); } catch { /* no JSON body */ }
    if (res.status === 401 && onUnauthorized && !path.startsWith("/auth/login")) onUnauthorized();
    throw new ApiError(data?.message ?? "Une erreur est survenue.", {
      status: res.status,
      code: data?.code ?? null,
      fields: data?.fields ?? null,
    });
  }

  if (res.status === 204) return null;
  return blob ? res.blob() : res.json();
}
