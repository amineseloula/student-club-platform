import { useState } from 'react';
import MemberSidebar from '../MemberSidebar/MemberSidebar';
import MemberHeader from '../MemberHeader/MemberHeader';
import styles from './MemberLayout.module.css';

export default function MemberLayout({ activePage = 'dashboard', breadcrumbTitle = 'Tableau de bord', children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Mobile Drawer Backdrop */}
      <div 
        className={`${styles.backdrop} ${isMobileOpen ? styles.backdropVisible : ''}`} 
        onClick={() => setIsMobileOpen(false)} 
      />

      {/* Sidebar */}
      <MemberSidebar 
        activePage={activePage} 
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className={styles.contentWrapper}>
        <MemberHeader 
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

