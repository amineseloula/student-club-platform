import { AlertCircle } from "lucide-react";
import Spinner from "../../../../shared/components/Spinner.jsx";

/* Loading / error wrapper used by every settings tab. */
export function Loadable({ loading, error, onRetry, hasData, children }) {
  if (loading && !hasData) return <div className="card"><Spinner /></div>;
  if (error && !hasData) {
    return (
      <div className="card">
        <div className="card__body empty">
          <AlertCircle size={28} />
          <p>{error.message}</p>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onRetry}>Réessayer</button>
        </div>
      </div>
    );
  }
  return children;
}

export const SWATCHES = ["#4a8c5c", "#ecba3d", "#5b8fc5", "#cf5238", "#233a52", "#8e6bb0", "#e08a35", "#2f9e9e"];
