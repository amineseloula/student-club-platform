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
import MemberLayout from './components/MemberLayout/MemberLayout';
import MemberDashboard from './pages/member/Dashboard/MemberDashboard';
import MyEventsPage from './pages/member/MyEvents/MyEventsPage';
import EventDetailsPage from './pages/member/EventDetails/EventDetailsPage';
import MyQrCodePage from './pages/member/MyQrCode/MyQrCodePage';
import EventFeedbackPage from './pages/member/EventFeedback/EventFeedbackPage';
import AttendanceCertificatePage from './pages/member/AttendanceCertificate/AttendanceCertificatePage';
import AnnouncementsPage from './pages/member/Announcements/AnnouncementsPage';
import AnnouncementDetailPage from './pages/member/AnnouncementDetail/AnnouncementDetailPage';
import NotificationsPage from './pages/member/Notifications/NotificationsPage';
import ProfilePage from './pages/member/Profile/ProfilePage';
import SettingsPage from './pages/member/Settings/SettingsPage';
import RegistrationConfirmedPage from './pages/member/RegistrationConfirmed/RegistrationConfirmedPage';
import AdminApp from './admin/App';
import AuthPage from './pages/Auth/AuthPage';
import StatusPage from './pages/Status/StatusPage';

const ROUTES = [
  // Authentication and status pages (Pages 10–17)
  { path: '/connexion', type: 'auth', mode: 'login' },
  { path: '/inscription', type: 'auth', mode: 'signup' },
  { path: '/mot-de-passe-oublie', type: 'auth', mode: 'forgot' },
  { path: '/reinitialiser-mot-de-passe', type: 'auth', mode: 'reset' },
  { path: '/candidature/en-attente', type: 'status', kind: 'pending' },
  { path: '/candidature/refusee', type: 'status', kind: 'rejected' },
  { path: '/403', type: 'status', kind: '403' },

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

  // Member area (Pages 18–28 and 53)
  { path: '/membre', type: 'member', activePage: 'dashboard', breadcrumbTitle: 'Tableau de bord', component: MemberDashboard },
  { path: '/membre/evenements', type: 'member', activePage: 'events', breadcrumbTitle: 'Mes événements', component: MyEventsPage },
  { path: '/membre/evenements/:id', type: 'member', activePage: 'events', breadcrumbTitle: 'Détails de l’événement', component: EventDetailsPage },
  { path: '/membre/evenements/:id/qr', type: 'member', activePage: 'events', breadcrumbTitle: 'Mon billet', component: MyQrCodePage },
  { path: '/membre/evenements/:id/avis', type: 'member', activePage: 'events', breadcrumbTitle: 'Avis sur l’événement', component: EventFeedbackPage },
  { path: '/membre/evenements/:id/attestation', type: 'member', activePage: 'events', breadcrumbTitle: 'Attestation de présence', component: AttendanceCertificatePage },
  { path: '/membre/inscription-confirme', type: 'member', activePage: 'events', breadcrumbTitle: 'Inscription confirmée', component: RegistrationConfirmedPage },
  { path: '/membre/annonces', type: 'member', activePage: 'announcements', breadcrumbTitle: 'Annonces', component: AnnouncementsPage },
  { path: '/membre/annonces/:id', type: 'member', activePage: 'announcements', breadcrumbTitle: 'Annonce', component: AnnouncementDetailPage },
  { path: '/membre/notifications', type: 'member', activePage: 'notifications', breadcrumbTitle: 'Notifications', component: NotificationsPage },
  { path: '/membre/profil', type: 'member', activePage: 'profile', breadcrumbTitle: 'Mon profil', component: ProfilePage },
  { path: '/membre/parametres', type: 'member', activePage: 'settings', breadcrumbTitle: 'Paramètres', component: SettingsPage },

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
  { path: '/bureau/actualites', type: 'admin', adminPage: 'actualites', breadcrumbTitle: 'Actualités du site' },
  { path: '/bureau/galerie', type: 'admin', adminPage: 'galerie', breadcrumbTitle: 'Galerie du site' },
  { path: '/bureau/pages', type: 'admin', adminPage: 'pages-site', breadcrumbTitle: 'Pages du site' },
  { path: '/bureau/activite', type: 'admin', adminPage: 'journal-activite', breadcrumbTitle: 'Journal d’activité' },
  { path: '/bureau/rapport', type: 'admin', adminPage: 'rapport-annuel', breadcrumbTitle: 'Rapport annuel' },
  { path: '/bureau/parametres', type: 'admin', adminPage: 'parametres-club', breadcrumbTitle: 'Paramètres du club' },

  // Treasurer area (Pages 42–48)
  { path: '/administration', type: 'admin', adminPage: 'vue-financiere', breadcrumbTitle: 'Vue financière' },
  { path: '/administration/transactions', type: 'admin', adminPage: 'transactions', breadcrumbTitle: 'Transactions' },
  { path: '/administration/transactions/nouveau', type: 'admin', adminPage: 'transaction-form', breadcrumbTitle: 'Ajouter une transaction' },
  { path: '/administration/budgets-evenements', type: 'admin', adminPage: 'budgets-evenements', breadcrumbTitle: 'Budgets événements' },
  { path: '/administration/historique', type: 'admin', adminPage: 'historique-budget', breadcrumbTitle: 'Historique budget' },
  { path: '/administration/rapports', type: 'admin', adminPage: 'rapports', breadcrumbTitle: 'Rapports' },
  { path: '/administration/cotisations', type: 'admin', adminPage: 'cotisations', breadcrumbTitle: 'Cotisations' },
];

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
    screen = <StatusPage kind="404" />;
  } else if (matched.route.type === 'auth') {
    screen = <AuthPage mode={matched.route.mode} />;
  } else if (matched.route.type === 'status') {
    screen = <StatusPage kind={matched.route.kind} />;
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
  } else if (matched.route.type === 'member') {
    const MemberPageComponent = matched.route.component;
    screen = (
      <MemberLayout
        activePage={matched.route.activePage}
        breadcrumbTitle={matched.route.breadcrumbTitle}
        sidebarProps={{
          memberSpaceLabel: 'Mon espace membre',
        }}
        headerProps={{
          roleBadge: 'Membre',
          roleBadgeTone: 'success',
          userRole: 'Membre actif',
        }}
      >
        <MemberPageComponent params={matched.params} />
      </MemberLayout>
    );
  } else if (matched.route.type === 'admin') {
    const adminPageMap = {};
    screen = <AdminApp key={matched.route.adminPage} initialPage={adminPageMap[matched.route.adminPage] || matched.route.adminPage} />;
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
