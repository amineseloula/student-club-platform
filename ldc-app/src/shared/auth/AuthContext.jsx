import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.js";
import { setUnauthorizedHandler } from "../api/client.js";
import { clearSession, loadSession, saveSession, updateSessionUser } from "../api/session.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession()?.user ?? null);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { /* ignore, we clear locally anyway */ }
    clearSession();
    setUser(null);
  }, []);

  const login = useCallback(async ({ email, password, remember }) => {
    const session = await authApi.login({ email, password, remember });
    saveSession(session, remember);
    setUser(session.user);
    return session.user;
  }, []);

  const register = useCallback(async (data) => {
    const session = await authApi.register(data);
    saveSession(session, true);
    setUser(session.user);
    return session.user;
  }, []);

  /* Re-fetch the current user (role / application status may have changed server-side). */
  const refresh = useCallback(async () => {
    const fresh = await authApi.me();
    updateSessionUser(fresh);
    setUser(fresh);
    return fresh;
  }, []);

  // Any 401 from the API logs the user out; guards then send them to /login.
  useEffect(() => {
    setUnauthorizedHandler(() => { clearSession(); setUser(null); });
    return () => setUnauthorizedHandler(null);
  }, []);

  // Silent sync on first load so a stale stored user can't linger.
  useEffect(() => {
    if (loadSession()) refresh().catch(() => {});
  }, [refresh]);

  const value = useMemo(() => ({ user, login, register, logout, refresh }), [user, login, register, logout, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
