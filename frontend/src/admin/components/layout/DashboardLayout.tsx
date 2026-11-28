import React, { useState } from 'react';
import { AdminSpace, AppNotification, LanguageCode, PageId } from '../../types/ldc';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface DashboardLayoutProps {
  activeSpace: AdminSpace;
  activePage: PageId;
  breadcrumbLabel: string;
  language: LanguageCode;
  pendingCandidatesCount: number;
  notifications: AppNotification[];
  onSwitchSpace: (space: AdminSpace) => void;
  onNavigate: (page: PageId, space?: AdminSpace) => void;
  onChangeLanguage: (lang: LanguageCode) => void;
  onMarkAllRead: () => void;
  onMarkNotificationRead: (id: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeSpace,
  activePage,
  breadcrumbLabel,
  language,
  pendingCandidatesCount,
  notifications,
  onSwitchSpace,
  onNavigate,
  onChangeLanguage,
  onMarkAllRead,
  onMarkNotificationRead,
  onLogout,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex bg-[#F7F3E9] text-[#203F52]"
      dir={language === 'AR' ? 'rtl' : 'ltr'}
    >
      <Sidebar
        activeSpace={activeSpace}
        activePage={activePage}
        pendingCandidatesCount={pendingCandidatesCount}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onNavigate={(page) => onNavigate(page)}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          breadcrumbLabel={breadcrumbLabel}
          activeSpace={activeSpace}
          language={language}
          notifications={notifications}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          onSwitchSpace={onSwitchSpace}
          onChangeLanguage={onChangeLanguage}
          onNavigate={onNavigate}
          onMarkAllRead={onMarkAllRead}
          onMarkNotificationRead={onMarkNotificationRead}
          onLogout={onLogout}
        />

        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
