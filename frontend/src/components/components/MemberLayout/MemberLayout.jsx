import { useState } from 'react';
import MemberSidebar from '../MemberSidebar/MemberSidebar';
import MemberHeader from '../MemberHeader/MemberHeader';
import styles from './MemberLayout.module.css';

export default function MemberLayout({
  activePage = 'dashboard',
  breadcrumbTitle = 'Tableau de bord',
  sidebarProps = {},
  headerProps = {},
  children,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <div
        className={`${styles.backdrop} ${isMobileOpen ? styles.backdropVisible : ''}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <MemberSidebar
        {...sidebarProps}
        activePage={activePage}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className={styles.contentWrapper}>
        <MemberHeader
          {...headerProps}
          breadcrumbTitle={breadcrumbTitle}
          onOpenMobile={() => setIsMobileOpen(true)}
        />

        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
