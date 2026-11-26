import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Facebook, Instagram, LogOut, Mail, Phone, X } from "lucide-react";
import Eyebrow from "../../../shared/components/Eyebrow.jsx";
import { useAuth } from "../../../shared/auth/AuthContext.jsx";
import { homeFor } from "../../../shared/auth/roles.js";
import { CLUB_CONTACTS } from "../../../shared/config.js";

export default function ApplicationRejected() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (user && user.status !== "rejected") return <Navigate to={homeFor(user)} replace />;

  const subject = encodeURIComponent(`Candidature LDC${user?.studentId ? ` – ${user.studentId}` : ""}`);
  const body = encodeURIComponent(`Bonjour,\n\nJe souhaite avoir plus d’informations sur ma candidature.\n\n${user ? `${user.firstName} ${user.lastName}\n${user.email}` : ""}`);

  const contacts = [
    { icon: Mail, label: "Écrire au bureau", value: CLUB_CONTACTS.email, href: `mailto:${CLUB_CONTACTS.email}?subject=${subject}&body=${body}` },
    CLUB_CONTACTS.phone && { icon: Phone, label: "Appeler", value: CLUB_CONTACTS.phone, href: `tel:${CLUB_CONTACTS.phone.replace(/\s/g, "")}` },
    CLUB_CONTACTS.instagram && { icon: Instagram, label: "Instagram", value: "@ldc.estin", href: CLUB_CONTACTS.instagram, external: true },
    CLUB_CONTACTS.facebook && { icon: Facebook, label: "Facebook", value: "LDC ESTIN", href: CLUB_CONTACTS.facebook, external: true },
  ].filter(Boolean);

  return (
    <>
      <div className="badge-ring badge-ring--no">
        <div className="badge-ring__core"><X size={36} strokeWidth={2.2} /></div>
      </div>
      <Eyebrow>Candidature LDC</Eyebrow>
      <h1 className="status__title">Ta demande n’a pas été retenue.</h1>
      <p className="status__text">
        Merci pour l’intérêt que tu portes au club. Nous n’avons pas pu valider ta candidature pour le moment.
        Vérifie ton e-mail étudiant et ton matricule, puis contacte-nous si besoin : nous serons ravis d’en discuter.
      </p>

      <div className="steps">
        <span className="steps__item is-done"><Check size={18} /> Demande envoyée</span>
        <span className="steps__line" />
        <span className="steps__item is-failed"><X size={18} /> Non validée</span>
        <span className="steps__line" />
        <span className="steps__item">Bienvenue au club</span>
      </div>

      {user?.rejectionReason && (
        <blockquote className="reason">
          <small>Message du bureau</small>
          {user.rejectionReason}
        </blockquote>
      )}

      <ul className="contacts">
        {contacts.map(({ icon: Icon, label, value, href, external }) => (
          <li key={label}>
            <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
              <Icon size={20} />
              <span><strong>{label}</strong><small>{value}</small></span>
            </a>
          </li>
        ))}
      </ul>

      <a href={contacts[0].href} className="btn">Contacter le club <ArrowRight size={18} /></a>
      {user && (
        <button type="button" className="status__alt status__alt--btn" onClick={async () => { await logout(); navigate("/login"); }}>
          <LogOut size={13} /> Se déconnecter
        </button>
      )}
    </>
  );
}
