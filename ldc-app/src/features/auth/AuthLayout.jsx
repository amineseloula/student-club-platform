import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SITE_URL } from "../../shared/config.js";
import Logo from "../../shared/components/Logo.jsx";
import { IMAGES } from "../../shared/images.js";
import "./auth.css";

/* Shared shell for every auth page: login, signup, forgot / reset password.
   Photo and logo come from src/shared/images.js (placeholders until set). */
export default function AuthLayout() {
  return (
    <div className="auth">
      <aside
        className={IMAGES.hero ? "auth__hero" : "auth__hero auth__hero--empty"}
        style={IMAGES.hero ? { backgroundImage: `linear-gradient(180deg, rgba(22,41,60,0) 35%, rgba(22,41,60,0.92) 100%), url(${IMAGES.hero})` } : undefined}
      >
        <div className="auth__brand">
          <Logo className="auth__logo" />
          <div>
            <strong>LDC</strong>
            <span>BY ESTIN · BÉJAÏA</span>
          </div>
        </div>

        <div className="auth__quote">
          <p className="auth__tag">EXPLORE · LEARN · CONNECT</p>
          <blockquote>“Les meilleurs souvenirs commencent souvent par un simple oui.”</blockquote>
          <cite>— LDC</cite>
        </div>
      </aside>

      <main className="auth__panel">
        <header className="auth__top">
          <a href={SITE_URL} className="auth__back">
            <ArrowLeft size={14} /> Retour au site
          </a>
        </header>

        <div className="auth__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
