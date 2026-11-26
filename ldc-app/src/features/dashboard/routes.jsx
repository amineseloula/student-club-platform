import { Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout.jsx";
import ClubSettings from "./pages/ClubSettings.jsx";
import ActivityLog from "./pages/ActivityLog.jsx";
import AnnualReport from "./pages/AnnualReport.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import { NAV, MEMBER_ITEM, navFor } from "./nav.js";
import { RequireRole } from "../../shared/auth/guards.jsx";
import { useAuth } from "../../shared/auth/AuthContext.jsx";

const PAGES = { settings: <ClubSettings />, journal: <ActivityLog />, report: <AnnualReport /> };

/* /dashboard -> first page the current role may open */
function DashboardIndex() {
  const { user } = useAuth();
  return <Navigate to={navFor(user)[0]?.path ?? "member"} replace />;
}

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <RequireRole><DashboardLayout /></RequireRole>,
    children: [
      { index: true, element: <DashboardIndex /> },
      ...[...NAV, MEMBER_ITEM].map((n) => ({
        path: n.path,
        element: (
          <RequireRole roles={n.roles}>
            {PAGES[n.path] ?? <Placeholder title={n.label} />}
          </RequireRole>
        ),
      })),
    ],
  },
];
