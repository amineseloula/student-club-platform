import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { canAccess, homeFor } from "./roles.js";

/* <RequireRole roles={["president"]}> ... </RequireRole>
   - not logged in            -> /login (and comes back after login)
   - application pending/rejected -> the matching status page
   - wrong role               -> /403
   `roles` omitted = any approved user. */
export function RequireRole({ roles, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  if (user.status !== "approved") return <Navigate to={homeFor(user)} replace />;
  if (!canAccess(user, roles)) return <Navigate to="/403" replace state={{ from: location.pathname }} />;
  return children;
}

/* Login / signup / forgot password: a logged-in user is sent to their own space. */
export function GuestOnly({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to={homeFor(user)} replace />;
  return children;
}
