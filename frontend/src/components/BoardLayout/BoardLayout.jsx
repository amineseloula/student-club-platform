import MemberLayout from '../MemberLayout/MemberLayout';
import Icon from '../Icon/Icon';

/*
 * Board area menu.
 * The hrefs are temporary hash links until the team adds a router.
 * TODO: replace the hard-coded Applications badge with the real count from the API.
 */
const BOARD_NAV_ITEMS = [
  { id: 'overview',      label: 'Overview',         href: '#/bureau',               icon: <Icon name="home" /> },
  { id: 'events',        label: 'Events',           href: '#/bureau/evenements',    icon: <Icon name="calendar" /> },
  { id: 'announcements', label: 'Announcements',    href: '#/bureau/annonces',      icon: <Icon name="megaphone" /> },
  { id: 'members',       label: 'Members',          href: '#/bureau/membres',       icon: <Icon name="users" /> },
  { id: 'applications',  label: 'Applications',     href: '#/bureau/candidatures',  icon: <Icon name="file" />, badge: '7' },
  { id: 'budget',        label: 'Budget',           href: '#/bureau/budget',        icon: <Icon name="wallet" /> },
  { id: 'messages',      label: 'Contact messages', href: '#/bureau/messages',      icon: <Icon name="bell" /> },
  { id: 'news',          label: 'Site news',        href: '#/bureau/actualites',    icon: <Icon name="pencil" /> },
  { id: 'gallery',       label: 'Site gallery',     href: '#/bureau/galerie',       icon: <Icon name="upload" /> },
  { id: 'pages',         label: 'Site pages',       href: '#/bureau/pages',         icon: <Icon name="file" /> },
];

const BOARD_SIDEBAR = {
  navItems: BOARD_NAV_ITEMS,
  sectionTitle: 'Board Space',
  statusCard: {
    title: 'Term 2024–2025',
    status: 'Board · access granted',
    progress: 85,
  },
  memberSpaceLabel: 'My member space',
  logoutLabel: 'Log out',
};

const BOARD_HEADER = {
  roleBadge: 'Board',
  roleBadgeTone: 'info',
  userRole: 'Board',
  defaultLang: 'EN',
};

export default function BoardLayout({ activePage = 'overview', breadcrumbTitle = 'Overview', children }) {
  return (
    <MemberLayout
      activePage={activePage}
      breadcrumbTitle={breadcrumbTitle}
      sidebarProps={BOARD_SIDEBAR}
      headerProps={BOARD_HEADER}
    >
      {children}
    </MemberLayout>
  );
}
