import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Scene from "../Scene.jsx";
import { useAuth } from "../../../shared/auth/AuthContext.jsx";
import { homeFor } from "../../../shared/auth/roles.js";
import { ROLES } from "../../../shared/config.js";

export default function Forbidden() {
  const { user } = useAuth();
  const { state } = useLocation();
  const role = user?.role ?? "guest";
  const back = homeFor(user);

  return (
    <>
      <Scene variant="locked" code="403" />

      <span className={`role-badge role-badge--${role}`}>
        <i /> {user ? `Connecté en tant que ${ROLES[role] ?? role}` : "Non connecté"}
      </span>
      <h1 className="status__title">Accès réservé.</h1>
      <p className="status__text">
        {user
          ? "Ton rôle actuel ne te permet pas d’ouvrir cette page. Si tu penses qu’il s’agit d’une erreur, contacte le bureau du club."
          : "Cette page est réservée aux membres approuvés du club. Connecte-toi pour continuer."}
      </p>
      {state?.from && <code className="status__path">{state.from}</code>}

      <Link to={back} className="btn">
        {user ? "Retourner à mon espace" : "Me connecter"} <ArrowRight size={18} />
      </Link>
    </>
  );
}
