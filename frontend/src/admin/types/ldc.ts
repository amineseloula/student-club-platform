export type AdminSpace = 'tresorier' | 'bureau';

export type LanguageCode = 'FR' | 'AR' | 'EN';

export type PageId =
  // Espace Trésorier
  | 'vue-financiere'
  | 'transactions'
  | 'transaction-form'
  | 'budgets-evenements'
  | 'historique-budget'
  | 'rapports'
  | 'cotisations'
  // Espace Bureau
  | 'bureau-overview'
  | 'bureau-evenements'
  | 'bureau-annonces'
  | 'bureau-membres'
  | 'bureau-candidatures'
  | 'bureau-budget'
  | 'bureau-messages'
  | 'actualites'
  | 'galerie'
  | 'pages-site'
  | 'parametres-club'
  | 'journal-activite'
  | 'rapport-annuel'
  // Shared
  | 'mon-espace-membre';

export type TransactionType = 'depense' | 'recette';

export type TransactionCategory =
  | 'Transport'
  | 'Matériel'
  | 'Collations'
  | 'Communication'
  | 'Cotisations'
  | 'Partenariat'
  | 'Autres';

export type TransactionStatus = 'validee' | 'brouillon' | 'a_justifier';

export interface Transaction {
  id: string;
  date: string; // ISO YYYY-MM-DD
  dateLabel: string; // e.g., "18 Avr 2025"
  monthKey: string; // e.g., "2025-04"
  description: string;
  category: TransactionCategory;
  event: string; // e.g., "Sortie Lac Noir" or "—"
  type: TransactionType;
  amount: number; // positive integer in DZD
  receiptName?: string;
  receiptType?: 'pdf' | 'image';
  status: TransactionStatus;
}

export interface MonthlyCashFlow {
  month: string;
  recettes: number; // in thousands DZD for chart height & tooltip
  depenses: number;
}

export interface ExpenseCategorySlice {
  name: string;
  percentage: number;
  amount: number;
  color: string;
}

export type EventBudgetStatus = 'dans_le_budget' | 'depassement' | 'non_engage';

export interface EventBudget {
  id: string;
  name: string;
  planned: number;
  actual: number;
  status: EventBudgetStatus;
}

export interface BudgetHistoryEntry {
  id: string;
  type: 'edit' | 'approve';
  timestamp: string;
  target: string;
  user: string;
  previousValue: number;
  newValue: number;
  reason: string;
}

export interface GeneratedReport {
  id: string;
  title: string;
  format: 'PDF' | 'Excel';
  size: string;
  date: string;
  periodType: 'Mensuel' | 'Semestre';
  periodLabel: string;
  transactionCount: number;
  categoryCount: number;
  includeReceipts: boolean;
  includeEventDetails: boolean;
}

export type MembershipStatus = 'payee' | 'en_attente' | 'impayee';

export interface MembershipFee {
  id: string;
  name: string;
  initials: string;
  avatarColor: 'blue' | 'red' | 'green' | 'navy';
  memberNumber: string;
  paymentDate: string;
  amount: number;
  status: MembershipStatus;
}

export type ArticleStatus = 'publie' | 'brouillon';

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  status: ArticleStatus;
  image: string;
  excerpt: string;
  content: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  addedAt: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  coverImage: string;
  updatedAt: string;
  photoCount: number;
  photos: GalleryPhoto[];
}

export type SitePageKey = 'accueil' | 'apropos' | 'bureau' | 'contact';

export interface SiteContentState {
  accueil: {
    surtitre: string;
    titrePrincipal: string;
    introduction: string;
    texteBouton: string;
  };
  apropos: {
    surtitre: string;
    titrePrincipal: string;
    mission: string;
    valeurs: string;
  };
  bureau: {
    surtitre: string;
    titrePrincipal: string;
    description: string;
    mandat: string;
  };
  contact: {
    surtitre: string;
    titrePrincipal: string;
    email: string;
    adresse: string;
    messageAccueil: string;
  };
}

export interface AppNotification {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  targetPage?: PageId;
  targetSpace?: AdminSpace;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export interface ClubCandidate {
  id: string;
  name: string;
  initials: string;
  year: string;
  pole: string;
  submittedAt: string;
  motivation: string;
  status: 'en_attente' | 'acceptee' | 'refusee';
}

export interface ContactMessage {
  id: string;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
}
