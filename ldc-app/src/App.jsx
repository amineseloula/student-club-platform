import { useRoutes } from "react-router-dom";
import { authRoutes } from "./features/auth/routes.jsx";
import { statusRoutes } from "./features/status/routes.jsx";
import { dashboardRoutes } from "./features/dashboard/routes.jsx";

/* Each section owns its own routes. In the team repo, only these
   spread lines are added to the shared App.jsx. */
export default function App() {
  return useRoutes([...authRoutes, ...dashboardRoutes, ...statusRoutes]);
}
