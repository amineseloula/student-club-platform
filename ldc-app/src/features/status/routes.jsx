import StatusLayout from "./StatusLayout.jsx";
import ApplicationPending from "./pages/ApplicationPending.jsx";
import ApplicationRejected from "./pages/ApplicationRejected.jsx";
import Forbidden from "./pages/Forbidden.jsx";
import NotFound from "./pages/NotFound.jsx";

export const statusRoutes = [
  {
    element: <StatusLayout />,
    children: [
      { path: "/application/pending", element: <ApplicationPending /> },
      { path: "/application/rejected", element: <ApplicationRejected /> },
      { path: "/403", element: <Forbidden /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
