import React, { useEffect, useRef, useState } from 'react';
import { Bell, Check, ChevronRight, LogOut, Menu, RefreshCw, User } from 'lucide-react';
import { AdminSpace, AppNotification, LanguageCode, PageId } from '../../types/ldc';

interface TopbarProps {
  breadcrumbLabel: string;
  activeSpace: AdminSpace;
  language: LanguageCode;
  notifications: AppNotification[];
  onToggleMobileMenu: () => void;
  onSwitchSpace: (space: AdminSpace) => void;
  onChangeLanguage: (lang: LanguageCode) => void;
  onNavigate: (page: PageId, space?: AdminSpace) => void;
  onMarkAllRead: () => void;
  onMarkNotificationRead: (id: string) => void;
  onLogout: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  breadcrumbLabel,
  activeSpace,
  language,
  notifications,
  onToggleMobileMenu,
  onSwitchSpace,
  onChangeLanguage,
  onNavigate,
  onMarkAllRead,
  onMarkNotificationRead,
  onLogout,
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-[#E6D9C4] px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: mobile menu + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl border border-[#E6D9C4] text-[#203F52] hover:bg-[#F7F3E9]"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs sm:text-[13px] truncate">
          <span className="text-[#7C8F9B] font-medium">LDC</span>
          <span className="text-[#C5D0D7]">/</span>
          <span className="font-bold text-[#203F52] truncate">{breadcrumbLabel}</span>
        </nav>
      </div>

      {/* Right: space pill, language switcher, bell, profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Role pill (clickable to switch space) */}
        <button
          type="button"
          onClick={() => onSwitchSpace(activeSpace === 'tresorier' ? 'bureau' : 'tresorier')}
          title="Cliquer pour basculer entre Espace Trésorier et Espace Bureau"
          className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.07em] uppercase transition cursor-pointer ${
            activeSpace === 'tresorier'
              ? 'bg-[#FAEBE0] text-[#C46A34] hover:bg-[#f5decb]'
              : 'bg-[#E6F2FA] text-[#2E7EB8] hover:bg-[#d7eaf7]'
          }`}
        >
          <span>{activeSpace === 'tresorier' ? 'TRÉSORIER' : 'BUREAU'}</span>
          <RefreshCw className="w-3 h-3 opacity-70" />
        </button>

        {/* Language selector FR / AR / EN */}
        <div className="hidden md:flex items-center rounded-xl border border-[#E6D9C4] bg-white p-0.5">
          {(['FR', 'AR', 'EN'] as LanguageCode[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => onChangeLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                language === lang
                  ? 'bg-[#F4ECDD] text-[#203F52]'
                  : 'text-[#7C8F9B] hover:text-[#203F52]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-xl border border-[#E6D9C4] bg-white hover:bg-[#FBF8F2] flex items-center justify-center text-[#203F52] transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E74732] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E6D9C4] rounded-2xl shadow-elevated overflow-hidden z-40 animate-fade-slide">
              <div className="px-4 py-3 border-b border-[#E6D9C4]/70 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#203F52]">Notifications</h3>
                  <p className="text-[11px] text-[#6D818E]">
                    {unreadCount > 0 ? `${unreadCount} non lues` : 'Tout est à jour'}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllRead}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A9BD5] hover:underline cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Tout marquer lu
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-[#E6D9C4]/50">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onMarkNotificationRead(item.id);
                      if (item.targetPage) {
                        onNavigate(item.targetPage, item.targetSpace);
                      }
                      setNotifOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-[#FBF8F2] transition cursor-pointer ${
                      item.read ? 'opacity-70' : 'bg-[#FFFDF8]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-[#203F52]">{item.title}</span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-[#E74732] mt-1 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#6D818E] mt-0.5">{item.detail}</p>
                    <span className="text-[10px] text-[#8DA0AC] mt-1 block">{item.time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 pl-1 pr-1.5 py-1 rounded-xl hover:bg-[#FBF8F2] transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#3D9563] text-white text-xs font-bold flex items-center justify-center shrink-0">
              AM
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-bold text-[#203F52]">Amine Meziane</div>
              <div className="text-[11px] text-[#6D818E]">
                {activeSpace === 'tresorier' ? 'Trésorier' : 'Bureau'}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7C8F9B] hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E6D9C4] rounded-2xl shadow-elevated overflow-hidden z-40 animate-fade-slide">
              <div className="px-4 py-3 border-b border-[#E6D9C4]/70 bg-[#FBF8F2]">
                <div className="text-sm font-bold text-[#203F52]">Amine Meziane</div>
                <div className="text-xs text-[#6D818E]">a.meziane@estin.dz · Mandat 2024–2025</div>
              </div>

              <div className="p-2 space-y-1">
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7C8F9B]">
                  Changer d'espace
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSwitchSpace('tresorier');
                    setProfileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeSpace === 'tresorier'
                      ? 'bg-[#FAEBE0] text-[#C46A34]'
                      : 'text-[#203F52] hover:bg-[#F7F3E9]'
                  }`}
                >
                  <span>Espace Trésorier</span>
                  {activeSpace === 'tresorier' && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSwitchSpace('bureau');
                    setProfileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeSpace === 'bureau'
                      ? 'bg-[#E6F2FA] text-[#2E7EB8]'
                      : 'text-[#203F52] hover:bg-[#F7F3E9]'
                  }`}
                >
                  <span>Espace Bureau</span>
                  {activeSpace === 'bureau' && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="border-t border-[#E6D9C4]/70 p-2 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('mon-espace-membre');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#203F52] hover:bg-[#F7F3E9] cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#6D818E]" />
                  <span>Mon espace membre</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#E74732] hover:bg-[#FDECE9]/50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
