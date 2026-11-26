import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronRight, LogOut, User } from "lucide-react";
import { MEMBER_ITEM, NAV, navFor } from "./nav.js";
import { useAuth } from "../../shared/auth/AuthContext.jsx";
import { CURRENT_MANDATE, ROLES } from "../../shared/config.js";
import { initials } from "../../shared/utils/format.js";
import Logo from "../../shared/components/Logo.jsx";
import "./dashboard.css";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const slug = pathname.split("/")[2];
  const current = [...NAV, MEMBER_ITEM].find((n) => n.path === slug)?.label ?? "Mon espace membre";
  const items = navFor(user);
  const isMember = user.role === "member";
  const section = { president: "Espace président", board: "Espace bureau", member: "Espace membre" }[user.role];

  const onLogout = async () => {
    setAccountMenuOpen(false);
    await logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!accountMenuOpen && !notificationsOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) setAccountMenuOpen(false);
      if (!notificationsRef.current?.contains(event.target)) setNotificationsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountMenuOpen, notificationsOpen]);

  return (
    <div className="dash">
      <aside className="dash__side">
        <div className="dash__brand">
          <Logo />
          <div>
            <strong>LDC</strong>
            <span>BY ESTIN</span>
          </div>
        </div>

        <p className="dash__section">{section}</p>
        <nav className="dash__nav">
          {items.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={`/dashboard/${path}`} className={({ isActive }) => (isActive ? "is-active" : "")}>
              <Icon size={20} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>

        {!isMember && (
          <div className="dash__mandate">
            <small>Mandat {CURRENT_MANDATE}</small>
            <strong>{ROLES[user.role]} · accès autorisé</strong>
            <div className="dash__bar"><span /></div>
          </div>
        )}

        <div className="dash__foot">
          {!isMember && <Link to="/dashboard/member"><User size={20} strokeWidth={1.8} /> Mon espace membre</Link>}
          <button type="button" onClick={onLogout}><LogOut size={20} strokeWidth={1.8} /> Déconnexion</button>
        </div>
      </aside>

      <div className="dash__main">
        <header className="dash__top">
          <div className="crumbs">
            <span>LDC</span> <i>/</i> <strong>{current}</strong>
          </div>

          <div className="dash__tools">
            <span className="pill">{ROLES[user.role]}</span>
            <div className="notification-menu" ref={notificationsRef}>
              <button
                type="button"
                className="bell"
                aria-label="Notifications"
                aria-haspopup="dialog"
                aria-expanded={notificationsOpen}
                onClick={() => {
                  setNotificationsOpen((open) => !open);
                  setAccountMenuOpen(false);
                }}
              >
                <Bell size={20} />
              </button>
              {notificationsOpen && (
                <section className="notification-menu__panel" role="dialog" aria-label="Notifications">
                  <strong>Notifications</strong>
                  <p>Aucune nouvelle notification.</p>
                  <small>Les alertes du club apparaîtront ici lorsqu’elles seront connectées au système.</small>
                </section>
              )}
            </div>
            <div className="account-menu" ref={accountMenuRef}>
              <button
                type="button"
                className="me account-menu__trigger"
                aria-haspopup="menu"
                aria-expanded={accountMenuOpen}
                aria-label="Ouvrir le menu du compte"
                onClick={() => {
                  setAccountMenuOpen((open) => !open);
                  setNotificationsOpen(false);
                }}
              >
                <span className="avatar avatar--green">{initials(user)}</span>
                <span className="me__details">
                  <strong>{user.firstName} {user.lastName}</strong>
                  <small>{ROLES[user.role]}</small>
                </span>
                <ChevronRight className={accountMenuOpen ? "account-menu__chevron is-open" : "account-menu__chevron"} size={18} />
              </button>

              {accountMenuOpen && (
                <div className="account-menu__dropdown" role="menu">
                  <div className="account-menu__identity">
                    <strong>{user.firstName} {user.lastName}</strong>
                    <small>{user.email}</small>
                  </div>
                  <button type="button" role="menuitem" onClick={onLogout}>
                    <LogOut size={17} />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="dash__page">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
