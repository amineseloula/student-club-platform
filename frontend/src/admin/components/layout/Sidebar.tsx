import React from 'react';
import {
  Bell,
  Calendar,
  Clock,
  File,
  FileText,
  Home,
  LogOut,
  Megaphone,
  PenLine,
  Upload,
  User,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { AdminSpace, PageId } from '../../types/ldc';
import { LdcLogo } from '../ui/LdcLogo';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  activeWhen?: PageId[];
}

interface SidebarProps {
  activeSpace: AdminSpace;
  activePage: PageId;
  pendingCandidatesCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onNavigate: (page: PageId) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSpace,
  activePage,
  pendingCandidatesCount,
  isOpenMobile,
  onCloseMobile,
  onNavigate,
  onLogout,
}) => {
  const treasurerItems: NavItem[] = [
    { id: 'vue-financiere', label: 'Vue financière', icon: Home },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: Wallet,
      activeWhen: ['transactions', 'transaction-form'],
    },
    { id: 'budgets-evenements', label: 'Budgets événements', icon: Calendar },
    { id: 'historique-budget', label: 'Historique budget', icon: Clock },
    { id: 'rapports', label: 'Rapports', icon: FileText },
    { id: 'cotisations', label: 'Cotisations', icon: Users },
  ];

  const bureauItems: NavItem[] = [
    { id: 'bureau-overview', label: "Vue d'ensemble", icon: Home },
    { id: 'bureau-evenements', label: 'Événements', icon: Calendar },
    { id: 'bureau-annonces', label: 'Annonces', icon: Megaphone },
    { id: 'bureau-membres', label: 'Membres', icon: Users },
    {
      id: 'bureau-candidatures',
      label: 'Candidatures',
      icon: FileText,
      badge: pendingCandidatesCount,
    },
    { id: 'bureau-budget', label: 'Budget', icon: Wallet },
    { id: 'bureau-messages', label: 'Messages contact', icon: Bell },
    { id: 'actualites', label: 'Actualités du site', icon: PenLine },
    { id: 'galerie', label: 'Galerie du site', icon: Upload },
    { id: 'pages-site', label: 'Pages du site', icon: File },
    { id: 'parametres-club', label: 'Paramètres du club', icon: Clock },
    { id: 'journal-activite', label: 'Journal d’activité', icon: Bell },
    { id: 'rapport-annuel', label: 'Rapport annuel', icon: FileText },
  ];

  const items = activeSpace === 'tresorier' ? treasurerItems : bureauItems;

  const content = (
    <aside className="w-[248px] bg-[#203F52] text-white flex flex-col h-full select-none">
      {/* Brand header */}
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            onNavigate(activeSpace === 'tresorier' ? 'vue-financiere' : 'bureau-overview');
            onCloseMobile();
          }}
          className="flex items-center gap-3 text-left cursor-pointer"
        >
          <LdcLogo size="md" />
          <div>
            <div className="font-editorial text-[22px] font-extrabold leading-none tracking-tight text-white">
              LDC
            </div>
            <div className="text-[9px] font-bold tracking-[0.2em] text-[#9BB0BE] uppercase mt-1">
              BY ESTIN
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-[#B8CAD6] hover:text-white hover:bg-white/10"
          aria-label="Fermer le menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Space section label */}
      <div className="px-5 pt-3 pb-2">
        <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#7E99A9]">
          {activeSpace === 'tresorier' ? 'ESPACE TRÉSORIER' : 'ESPACE BUREAU'}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.activeWhen
            ? item.activeWhen.includes(activePage)
            : activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
              }}
              className={`relative w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#2C4E63] text-white font-semibold'
                  : 'text-[#B8CAD6] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#F5B400] rounded-r-full" />
              )}
              <span className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-[17px] h-[17px] shrink-0 ${
                    isActive ? 'text-white' : 'text-[#92ABBA]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </span>
              {typeof item.badge === 'number' && item.badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#F5B400] text-[#203F52] text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Mandate Card & Member Links */}
      <div className="px-4 pt-3 pb-4 mt-auto space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
          <div className="text-[10px] text-[#8DA5B5] font-medium">Mandat 2024–2025</div>
          <div className="text-xs font-bold text-white mt-0.5">
            {activeSpace === 'tresorier'
              ? 'Trésorier · accès autorisé'
              : 'Bureau · accès autorisé'}
          </div>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[78%] rounded-full bg-[#F5B400]" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-2.5 space-y-1">
          <button
            type="button"
            onClick={() => {
              onNavigate('mon-espace-membre');
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-[13px] transition cursor-pointer ${
              activePage === 'mon-espace-membre'
                ? 'bg-[#2C4E63] text-white font-semibold'
                : 'text-[#B8CAD6] hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-[#92ABBA]" />
            <span>Mon espace membre</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-[13px] text-[#B8CAD6] hover:bg-white/[0.06] hover:text-white transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#92ABBA]" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0 z-30">{content}</div>

      {/* Mobile drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#203F52]/55 backdrop-blur-[1px]"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full shadow-2xl">{content}</div>
        </div>
      )}
    </>
  );
};
