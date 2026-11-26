import { Outlet } from "react-router-dom";
import "./status.css";

/* Centered, full-page layout for application-status and error pages */
export default function StatusLayout() {
  return (
    <main className="status">
      <div className="status__inner">
        <Outlet />
      </div>
    </main>
  );
}
