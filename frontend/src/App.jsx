import { useState } from 'react';
import AuthModal from './components/AuthModal/AuthModal';
import BoardLayout from './components/BoardLayout/BoardLayout';
import PublicLayout from './components/PublicLayout/PublicLayout';
import RequireBoardAuth from './components/RequireBoardAuth/RequireBoardAuth';
import { AuthProvider } from './context/AuthContext';
import { matchRoute, useHashPath } from './router/hashRouter';

// Public Pages (Pages 1–9)
import LandingPage from './pages/LandingPage/LandingPage';
import AboutPage from './pages/public/About/AboutPage';
import PublicEventsPage from './pages/public/Events/PublicEventsPage';
import PublicEventDetailsPage from './pages/public/EventDetails/PublicEventDetailsPage';
import NewsListPage from './pages/public/News/NewsListPage';
import NewsDetailPage from './pages/public/NewsDetail/NewsDetailPage';
import GalleryPage from './pages/public/Gallery/GalleryPage';
import ContactPage from './pages/public/Contact/ContactPage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicy/PrivacyPolicyPage';

// Board Pages (including Page 52 – Contact Messages Inbox)
import BoardDashboard from './pages/board/Dashboard/BoardDashboard';
import EventsListPage from './pages/board/EventsList/EventsListPage';
import EventFormPage from './pages/board/EventForm/EventFormPage';
import EventManagePage from './pages/board/EventManage/EventManagePage';
import AnnouncementsListPage from './pages/board/AnnouncementsList/AnnouncementsListPage';
import AnnouncementFormPage from './pages/board/AnnouncementForm/AnnouncementFormPage';
import MembersListPage from './pages/board/MembersList/MembersListPage';
import MemberDetailPage from './pages/board/MemberDetail/MemberDetailPage';
import ApplicationsPage from './pages/board/Applications/ApplicationsPage';
import BudgetPage from './pages/board/Budget/BudgetPage';
import ContactMessagesPage from './pages/board/ContactMessages/ContactMessagesPage';
import NotAvailablePage from './pages/board/NotAvailable/NotAvailablePage';

const ROUTES = [
  // Public Website
  { path: '/', type: 'home' },
  { path: '/accueil', type: 'home' },
  { path: '/a-propos', type: 'public', component: AboutPage },
  { path: '/evenements', type: 'public', component: PublicEventsPage },
  { path: '/evenements/:id', type: 'public', component: PublicEventDetailsPage },
  { path: '/actualites', type: 'public', component: NewsListPage },
  { path: '/actualites/:id', type: 'public', component: NewsDetailPage },
  { path: '/galerie', type: 'public', component: GalleryPage },
  { path: '/contact', type: 'public', component: ContactPage },
  { path: '/confidentialite', type: 'public', component: PrivacyPolicyPage },

  // Board Administration (Protected)
  { path: '/bureau', type: 'board', activePage: 'overview', breadcrumbTitle: 'Overview', component: BoardDashboard },
  { path: '/bureau/evenements', type: 'board', activePage: 'events', breadcrumbTitle: 'Events', component: EventsListPage },
  { path: '/bureau/evenements/nouveau', type: 'board', activePage: 'events', breadcrumbTitle: 'New event', component: EventFormPage },
  { path: '/bureau/evenements/:id', type: 'board', activePage: 'events', breadcrumbTitle: 'Manage event', component: EventManagePage },
  { path: '/bureau/evenements/:id/modifier', type: 'board', activePage: 'events', breadcrumbTitle: 'Edit event', component: EventFormPage },
  { path: '/bureau/annonces', type: 'board', activePage: 'announcements', breadcrumbTitle: 'Announcements', component: AnnouncementsListPage },
  { path: '/bureau/annonces/nouvelle', type: 'board', activePage: 'announcements', breadcrumbTitle: 'New announcement', component: AnnouncementFormPage },
  { path: '/bureau/annonces/:id/modifier', type: 'board', activePage: 'announcements', breadcrumbTitle: 'Edit announcement', component: AnnouncementFormPage },
  { path: '/bureau/membres', type: 'board', activePage: 'members', breadcrumbTitle: 'Members', component: MembersListPage },
  { path: '/bureau/membres/:id', type: 'board', activePage: 'members', breadcrumbTitle: 'Member profile', component: MemberDetailPage },
  { path: '/bureau/candidatures', type: 'board', activePage: 'applications', breadcrumbTitle: 'Applications', component: ApplicationsPage },
  { path: '/bureau/budget', type: 'board', activePage: 'budget', breadcrumbTitle: 'Budget', component: BudgetPage },
  { path: '/bureau/messages', type: 'board', activePage: 'messages', breadcrumbTitle: 'Contact messages', component: ContactMessagesPage },
  { path: '/bureau/actualites', type: 'board', activePage: 'news', breadcrumbTitle: 'Site news', component: NotAvailablePage },
  { path: '/bureau/galerie', type: 'board', activePage: 'gallery', breadcrumbTitle: 'Site gallery', component: NotAvailablePage },
  { path: '/bureau/pages', type: 'board', activePage: 'pages', breadcrumbTitle: 'Site pages', component: NotAvailablePage },
  { path: '/bureau/activite', type: 'board', activePage: 'overview', breadcrumbTitle: 'Activity', component: NotAvailablePage },
];

function NotFoundPublic() {
  return (
    <div style={{ padding: '96px 24px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
      <p style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.14em', color: '#398F60', marginBottom: '8px' }}>
        PAGE INTROUVABLE
      </p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#203D50', marginBottom: '12px' }}>
        Cette page n&apos;existe pas
      </h1>
      <p style={{ color: '#7C8990', marginBottom: '24px' }}>
        Le lien suivi semble incomplet ou expiré.
      </p>
      <a
        href="#/"
        style={{
          display: 'inline-block',
          backgroundColor: '#F7B900',
          color: '#203D50',
          fontWeight: 700,
          padding: '12px 22px',
          borderRadius: '10px',
          textDecoration: 'none',
        }}
      >
        Retour à l&apos;accueil →
      </a>
    </div>
  );
}

function AppContent() {
  const rawPath = useHashPath();
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    initialTab: 'login',
    subtitle: '',
    onSuccess: null,
  });

  const openLoginModal = (options = {}) => {
    setAuthModal({
      isOpen: true,
      initialTab: 'login',
      subtitle: options.subtitle || '',
      onSuccess: options.onSuccess || null,
    });
  };

  const openJoinModal = (options = {}) => {
    setAuthModal({
      isOpen: true,
      initialTab: 'register',
      subtitle: options.subtitle || '',
      onSuccess: options.onSuccess || null,
    });
  };

  const closeAuthModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, onSuccess: null }));
  };

  // Support empty hash or in-page section anchors (#equipe, #rejoindre, etc.) on the Home Page
  const normalizedPath = !rawPath || !rawPath.startsWith('/') ? '/' : rawPath;
  const matched = matchRoute(ROUTES, normalizedPath);

  let screen = null;

  if (!matched) {
    screen = (
      <PublicLayout
        activePath={normalizedPath}
        onLoginClick={() => openLoginModal()}
        onJoinClick={() => openJoinModal()}
      >
        <NotFoundPublic />
      </PublicLayout>
    );
  } else if (matched.route.type === 'home') {
    screen = (
      <LandingPage
        onLoginClick={() => openLoginModal()}
        onJoinClick={() => openJoinModal()}
      />
    );
  } else if (matched.route.type === 'public') {
    const PageComponent = matched.route.component;
    screen = (
      <PublicLayout
        activePath={normalizedPath}
        onLoginClick={() => openLoginModal()}
        onJoinClick={() => openJoinModal()}
      >
        <PageComponent params={matched.params} onRequireAuth={openLoginModal} />
      </PublicLayout>
    );
  } else if (matched.route.type === 'board') {
    const BoardPageComponent = matched.route.component;
    screen = (
      <RequireBoardAuth onOpenLogin={() => openLoginModal({ subtitle: 'Connectez-vous avec un compte du bureau (ex. amine@estin.dz).' })}>
        <BoardLayout
          activePage={matched.route.activePage}
          breadcrumbTitle={matched.route.breadcrumbTitle}
        >
          <BoardPageComponent params={matched.params} />
        </BoardLayout>
      </RequireBoardAuth>
    );
  }

  return (
    <>
      {screen}
      <AuthModal
        key={`${authModal.isOpen}-${authModal.initialTab}`}
        isOpen={authModal.isOpen}
        initialTab={authModal.initialTab}
        subtitle={authModal.subtitle}
        onClose={closeAuthModal}
        onSuccess={authModal.onSuccess}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
