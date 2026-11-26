import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Scene from "../Scene.jsx";
import { useAuth } from "../../../shared/auth/AuthContext.jsx";
import { homeFor } from "../../../shared/auth/roles.js";
import { SITE_URL } from "../../../shared/config.js";

export default function NotFound() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <>
      <Scene variant="lost" code="404" />

      <h1 className="status__title">Oups, mauvais sentier.</h1>
      <p className="status__text">La page que tu cherches semble être partie en randonnée sans laisser d’itinéraire.</p>
      <code className="status__path">{pathname}</code>

      <div className="status__actions">
        <a href={SITE_URL} className="btn">Retourner à l’accueil <ArrowRight size={18} /></a>
        <button type="button" className="btn btn--ghost" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Page précédente</button>
      </div>
      <Link to={homeFor(user)} className="status__alt">
        <Home size={13} style={{ verticalAlign: "-2px" }} /> {user ? "Retourner à mon espace" : "Aller à la connexion"}
      </Link>
    </>
  );
}

