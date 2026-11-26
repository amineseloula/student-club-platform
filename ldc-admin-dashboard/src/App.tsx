import { useCallback, useMemo, useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ConfirmationDialog } from './components/ui/ConfirmationDialog';
import { LdcLogo } from './components/ui/LdcLogo';
import { PrimaryButton } from './components/ui/Buttons';
import { ReceiptModal, ReceiptModalData } from './components/ui/ReceiptModal';
import { ToastContainer } from './components/ui/ToastContainer';
import {
  INITIAL_BUDGET_HISTORY,
  INITIAL_CANDIDATES,
  INITIAL_CONTACT_MESSAGES,
  INITIAL_EVENT_BUDGETS,
  INITIAL_GALLERY_ALBUMS,
  INITIAL_MEMBERSHIP_FEES,
  INITIAL_NEWS_ARTICLES,
  INITIAL_NOTIFICATIONS,
  INITIAL_REPORTS,
  INITIAL_SITE_CONTENT,
  INITIAL_TRANSACTIONS,
} from './data/mockData';
import { BureauExtraPages } from './pages/bureau/BureauExtraPages';
import { GalleryManagementPage } from './pages/bureau/GalleryManagementPage';
import { NewsManagementPage } from './pages/bureau/NewsManagementPage';
import { SiteContentEditorPage } from './pages/bureau/SiteContentEditorPage';
import { BudgetHistoryPage } from './pages/treasurer/BudgetHistoryPage';
import { EventBudgetsPage } from './pages/treasurer/EventBudgetsPage';
import { FinancialDashboardPage } from './pages/treasurer/FinancialDashboardPage';
import { MembershipFeesPage } from './pages/treasurer/MembershipFeesPage';
import { ReportsPage } from './pages/treasurer/ReportsPage';
import { TransactionFormPage } from './pages/treasurer/TransactionFormPage';
import { TransactionsPage } from './pages/treasurer/TransactionsPage';
import {
  AdminSpace,
  AppNotification,
  ClubCandidate,
  ContactMessage,
  GalleryAlbum,
  GalleryPhoto,
  GeneratedReport,
  LanguageCode,
  MembershipFee,
  NewsArticle,
  PageId,
  SiteContentState,
  ToastMessage,
  Transaction,
} from './types/ldc';

const BREADCRUMBS: Record<PageId, string> = {
  'vue-financiere': 'Vue financière',
  transactions: 'Transactions',
  'transaction-form': 'Transactions',
  'budgets-evenements': 'Budgets événements',
  'historique-budget': 'Historique budget',
  rapports: 'Rapports',
  cotisations: 'Cotisations',
  'bureau-overview': "Vue d'ensemble",
  'bureau-evenements': 'Événements',
  'bureau-annonces': 'Annonces',
  'bureau-membres': 'Membres',
  'bureau-candidatures': 'Candidatures',
  'bureau-budget': 'Budget',
  'bureau-messages': 'Messages contact',
  actualites: 'Actualités du site',
  galerie: 'Galerie du site',
  'pages-site': 'Pages du site',
  'mon-espace-membre': 'Mon espace membre',
};

export function App() {
  const [activeSpace, setActiveSpace] = useState<AdminSpace>('tresorier');
  const [activePage, setActivePage] = useState<PageId>('vue-financiere');
  const [language, setLanguage] = useState<LanguageCode>('FR');
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // Domain state
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [txEventFilter, setTxEventFilter] = useState<string>('');
  const [reports, setReports] = useState<GeneratedReport[]>(INITIAL_REPORTS);
  const [members, setMembers] = useState<MembershipFee[]>(INITIAL_MEMBERSHIP_FEES);
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS_ARTICLES);
  const [albums, setAlbums] = useState<GalleryAlbum[]>(INITIAL_GALLERY_ALBUMS);
  const [siteContent, setSiteContent] = useState<SiteContentState>(INITIAL_SITE_CONTENT);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [candidates, setCandidates] = useState<ClubCandidate[]>(INITIAL_CANDIDATES);
  const [messages, setMessages] = useState<ContactMessage[]>(INITIAL_CONTACT_MESSAGES);

  // UI overlays
  const [receiptModal, setReceiptModal] = useState<ReceiptModalData | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback(
    (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    []
  );

  const handleDismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleSwitchSpace = (space: AdminSpace) => {
    setActiveSpace(space);
    setActivePage(space === 'tresorier' ? 'vue-financiere' : 'actualites');
    pushToast(
      space === 'tresorier' ? 'Espace Trésorier activé' : 'Espace Bureau activé',
      space === 'tresorier'
        ? 'Gestion financière et cotisations LDC.'
        : 'Administration générale et contenu du site public.',
      'info'
    );
  };

  const handleNavigate = (page: PageId, space?: AdminSpace) => {
    if (space && space !== activeSpace) {
      setActiveSpace(space);
    }
    if (page !== 'transaction-form') {
      setEditingTransaction(null);
    }
    if (page !== 'transactions') {
      setTxEventFilter('');
    }
    setActivePage(page);
  };

  const handleSaveTransaction = (tx: Transaction, isDraft: boolean) => {
    setTransactions((prev) => {
      const exists = prev.some((item) => item.id === tx.id);
      if (exists) {
        return prev.map((item) => (item.id === tx.id ? tx : item));
      }
      return [tx, ...prev];
    });
    setEditingTransaction(null);
    setActivePage('transactions');
    pushToast(
      isDraft ? 'Brouillon enregistré' : 'Transaction enregistrée',
      `${tx.description} (${tx.amount.toLocaleString('fr-FR').replace(/\u202f/g, ' ')} DZD)`
    );
  };

  const handleMarkMemberPaid = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, status: 'payee', paymentDate: '21 avr. 2025' }
          : m
      )
    );
    const target = members.find((m) => m.id === memberId);
    pushToast(
      'Cotisation validée',
      target ? `${target.name} est désormais à jour.` : undefined
    );
  };

  const handleSaveArticle = (article: NewsArticle) => {
    setArticles((prev) => {
      const exists = prev.some((a) => a.id === article.id);
      if (exists) {
        return prev.map((a) => (a.id === article.id ? article : a));
      }
      return [article, ...prev];
    });
    pushToast(
      article.status === 'publie' ? 'Article publié' : 'Brouillon enregistré',
      article.title
    );
  };

  const handleDeleteArticle = (id: string) => {
    const removed = articles.find((a) => a.id === id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
    pushToast('Article supprimé', removed?.title, 'info');
  };

  const handleCreateAlbum = (album: GalleryAlbum) => {
    setAlbums((prev) => [album, ...prev]);
    pushToast('Album créé', album.title);
  };

  const handleUpdateAlbum = (updated: GalleryAlbum) => {
    setAlbums((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    pushToast('Album mis à jour', updated.title);
  };

  const handleAddPhotosToAlbum = (albumId: string, newPhotos: GalleryPhoto[]) => {
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === albumId
          ? {
              ...a,
              photoCount: a.photoCount + newPhotos.length,
              updatedAt: 'Mis à jour aujourd’hui',
              photos: [...newPhotos, ...a.photos],
            }
          : a
      )
    );
    pushToast(
      'Photos importées',
      `${newPhotos.length} photo(s) ajoutée(s) à l’album.`
    );
  };

  const handleDeletePhoto = (albumId: string, photoId: string) => {
    setAlbums((prev) =>
      prev.map((a) => {
        if (a.id !== albumId) return a;
        const remaining = a.photos.filter((p) => p.id !== photoId);
        return {
          ...a,
          photoCount: Math.max(0, a.photoCount - 1),
          coverImage:
            remaining.length > 0 && a.photos.find((p) => p.id === photoId)?.url === a.coverImage
              ? remaining[0].url
              : a.coverImage,
          photos: remaining,
        };
      })
    );
    pushToast('Photo retirée', 'L’album a été mis à jour.', 'info');
  };

  const pendingCandidatesCount = useMemo(
    () => candidates.filter((c) => c.status === 'en_attente').length + 3,
    [candidates]
  );

  if (isLoggedOut) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-[#E6D9C4] rounded-2xl p-8 text-center shadow-elevated animate-fade-slide">
          <div className="flex justify-center mb-4">
            <LdcLogo size="lg" />
          </div>
          <h1 className="font-editorial text-2xl font-bold text-[#203F52]">
            Session déconnectée
          </h1>
          <p className="text-sm text-[#6D818E] mt-2">
            Vous avez quitté l'espace d'administration Club LDC by ESTIN.
          </p>
          <div className="mt-6">
            <PrimaryButton
              className="w-full"
              onClick={() => {
                setIsLoggedOut(false);
                pushToast('Reconnecté', 'Bienvenue, Amine Meziane.');
              }}
            >
              Se reconnecter en tant qu'Amine Meziane
            </PrimaryButton>
          </div>
        </div>
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

  return (
    <>
      <DashboardLayout
        activeSpace={activeSpace}
        activePage={activePage}
        breadcrumbLabel={BREADCRUMBS[activePage]}
        language={language}
        pendingCandidatesCount={pendingCandidatesCount}
        notifications={notifications}
        onSwitchSpace={handleSwitchSpace}
        onNavigate={handleNavigate}
        onChangeLanguage={(lang) => {
          setLanguage(lang);
          pushToast(
            `Langue : ${lang}`,
            lang === 'FR'
              ? 'Interface affichée en français.'
              : lang === 'AR'
                ? 'Aperçu RTL activé (libellés FR conservés en démonstration).'
                : 'English selector active (FR reference copy preserved).',
            'info'
          );
        }}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          pushToast('Notifications lues', 'Toutes les alertes ont été marquées comme lues.', 'info');
        }}
        onMarkNotificationRead={(id) =>
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          )
        }
        onLogout={() => setLogoutConfirmOpen(true)}
      >
        {/* Treasurer Space Pages */}
        {activePage === 'vue-financiere' && (
          <FinancialDashboardPage
            transactions={transactions}
            baseCountDelta={0}
            onNavigate={(page) => handleNavigate(page)}
            onAddTransaction={() => {
              setEditingTransaction(null);
              setActivePage('transaction-form');
            }}
            onEditTransaction={(tx) => {
              setEditingTransaction(tx);
              setActivePage('transaction-form');
            }}
            onOpenReceipt={setReceiptModal}
          />
        )}

        {activePage === 'transactions' && (
          <TransactionsPage
            transactions={transactions}
            initialEventFilter={txEventFilter}
            onClearInitialEventFilter={() => setTxEventFilter('')}
            onAddTransaction={() => {
              setEditingTransaction(null);
              setActivePage('transaction-form');
            }}
            onEditTransaction={(tx) => {
              setEditingTransaction(tx);
              setActivePage('transaction-form');
            }}
            onOpenReceipt={setReceiptModal}
            onNotify={(title, desc) => pushToast(title, desc)}
          />
        )}

        {activePage === 'transaction-form' && (
          <TransactionFormPage
            editingTransaction={editingTransaction}
            onCancel={() => {
              setEditingTransaction(null);
              setActivePage('transactions');
            }}
            onSave={handleSaveTransaction}
          />
        )}

        {activePage === 'budgets-evenements' && (
          <EventBudgetsPage
            budgets={INITIAL_EVENT_BUDGETS}
            onViewEventTransactions={(eventName) => {
              setTxEventFilter(eventName);
              setActivePage('transactions');
            }}
            onNotify={(title, desc) => pushToast(title, desc)}
          />
        )}

        {activePage === 'historique-budget' && (
          <BudgetHistoryPage
            entries={INITIAL_BUDGET_HISTORY}
            onNotify={(title, desc) => pushToast(title, desc)}
          />
        )}

        {activePage === 'rapports' && (
          <ReportsPage
            reports={reports}
            transactions={transactions}
            onGenerateReport={(rep) => setReports((prev) => [rep, ...prev])}
            onNotify={(title, desc) => pushToast(title, desc)}
          />
        )}

        {activePage === 'cotisations' && (
          <MembershipFeesPage
            members={members}
            onMarkPaid={handleMarkMemberPaid}
            onOpenReceipt={setReceiptModal}
            onNotify={(title, desc) => pushToast(title, desc)}
          />
        )}

        {/* Bureau Space CMS Pages */}
        {activePage === 'actualites' && (
          <NewsManagementPage
            articles={articles}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
          />
        )}

        {activePage === 'galerie' && (
          <GalleryManagementPage
            albums={albums}
            onCreateAlbum={handleCreateAlbum}
            onUpdateAlbum={handleUpdateAlbum}
            onAddPhotosToAlbum={handleAddPhotosToAlbum}
            onDeletePhoto={handleDeletePhoto}
          />
        )}

        {activePage === 'pages-site' && (
          <SiteContentEditorPage
            publishedContent={siteContent}
            onPublish={(next) => {
              setSiteContent(next);
              pushToast(
                'Modifications publiées',
                'Le contenu du site public LDC est désormais à jour.'
              );
            }}
            onSaveDraft={() =>
              pushToast('Brouillon sauvegardé', 'Vos modifications locales sont conservées.', 'info')
            }
          />
        )}

        {/* Other Bureau & Member Views */}
        {(activePage === 'bureau-overview' ||
          activePage === 'bureau-evenements' ||
          activePage === 'bureau-annonces' ||
          activePage === 'bureau-membres' ||
          activePage === 'bureau-candidatures' ||
          activePage === 'bureau-budget' ||
          activePage === 'bureau-messages' ||
          activePage === 'mon-espace-membre') && (
          <BureauExtraPages
            page={activePage}
            articles={articles}
            albums={albums}
            events={INITIAL_EVENT_BUDGETS}
            members={members}
            candidates={candidates}
            messages={messages}
            onNavigate={handleNavigate}
            onUpdateCandidate={(id, status) => {
              setCandidates((prev) =>
                prev.map((c) => (c.id === id ? { ...c, status } : c))
              );
              pushToast(
                status === 'acceptee' ? 'Candidature acceptée' : 'Candidature refusée',
                undefined,
                status === 'acceptee' ? 'success' : 'info'
              );
            }}
            onMarkMessageRead={(id) =>
              setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, unread: false } : m))
              )
            }
            onNotify={(title, desc) => pushToast(title, desc)}
          />
        )}
      </DashboardLayout>

      <ReceiptModal
        receipt={receiptModal}
        onClose={() => setReceiptModal(null)}
        onDownloaded={() =>
          pushToast('Justificatif téléchargé', receiptModal?.filename)
        }
      />

      <ConfirmationDialog
        isOpen={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={() => setIsLoggedOut(true)}
        title="Déconnexion"
        message="Voulez-vous fermer votre session administrateur LDC ?"
        confirmLabel="Se déconnecter"
        tone="navy"
      />

      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </>
  );
}

export default App;
