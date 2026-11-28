import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  Download,
  FileText,
  Filter,
  Inbox,
  Pencil,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { Transaction } from '../../types/ldc';
import { downloadCsv, formatDzd } from '../../utils/formatters';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Buttons';
import { ColumnDef, DataTable } from '../../components/ui/DataTable';
import { FilterDropdown } from '../../components/ui/FilterDropdown';
import { PageHeader } from '../../components/ui/PageHeader';
import { Pagination } from '../../components/ui/Pagination';
import { ReceiptModalData } from '../../components/ui/ReceiptModal';
import { SearchBar } from '../../components/ui/SearchBar';
import { getCategoryBadgeVariant, StatusBadge } from '../../components/ui/StatusBadge';

type ViewState = 'data' | 'loading' | 'empty' | 'error';

interface TransactionsPageProps {
  transactions: Transaction[];
  initialEventFilter?: string;
  onClearInitialEventFilter?: () => void;
  onAddTransaction: () => void;
  onEditTransaction: (tx: Transaction) => void;
  onOpenReceipt: (receipt: ReceiptModalData) => void;
  onNotify: (title: string, description?: string) => void;
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Cotisations', label: 'Cotisations' },
  { value: 'Matériel', label: 'Matériel' },
  { value: 'Collations', label: 'Collations' },
  { value: 'Partenariat', label: 'Partenariat' },
  { value: 'Communication', label: 'Communication' },
  { value: 'Autres', label: 'Autres' },
];

const MONTH_OPTIONS = [
  { value: '2025-04', label: 'Avril 2025' },
  { value: 'all', label: 'Tous les mois' },
  { value: '2025-03', label: 'Mars 2025' },
  { value: '2025-02', label: 'Février 2025' },
  { value: '2025-01', label: 'Janvier 2025' },
  { value: '2024-12', label: 'Décembre 2024' },
];

const PAGE_SIZE = 6;

export const TransactionsPage: React.FC<TransactionsPageProps> = ({
  transactions,
  initialEventFilter,
  onClearInitialEventFilter,
  onAddTransaction,
  onEditTransaction,
  onOpenReceipt,
  onNotify,
}) => {
  const [viewState, setViewState] = useState<ViewState>('data');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState(initialEventFilter ? 'all' : '2025-04');
  const [eventFilter, setEventFilter] = useState(initialEventFilter ?? '');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialEventFilter) {
      setEventFilter(initialEventFilter);
      setMonthFilter('all');
      setCurrentPage(1);
    }
  }, [initialEventFilter]);

  const filteredTransactions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return transactions.filter((tx) => {
      if (categoryFilter !== 'all' && tx.category !== categoryFilter) return false;
      if (monthFilter !== 'all' && tx.monthKey !== monthFilter) return false;
      if (eventFilter && !tx.event.toLowerCase().includes(eventFilter.toLowerCase())) {
        return false;
      }
      if (q) {
        const hay = `${tx.description} ${tx.category} ${tx.event} ${tx.dateLabel}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [transactions, search, categoryFilter, monthFilter, eventFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, monthFilter, eventFilter]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTransactions.slice(start, start + PAGE_SIZE);
  }, [filteredTransactions, currentPage]);

  const handleExport = () => {
    downloadCsv(
      `ldc-transactions-${monthFilter}.csv`,
      ['Date', 'Description', 'Catégorie', 'Événement', 'Type', 'Montant (DZD)', 'Statut', 'Reçu'],
      filteredTransactions.map((tx) => [
        tx.dateLabel,
        tx.description,
        tx.category,
        tx.event,
        tx.type === 'recette' ? 'Recette' : 'Dépense',
        tx.type === 'recette' ? tx.amount : -tx.amount,
        tx.status === 'brouillon' ? 'Brouillon' : tx.status === 'a_justifier' ? 'À justifier' : 'Validée',
        tx.receiptName ?? 'Manquant',
      ])
    );
    onNotify('Export CSV généré', `${filteredTransactions.length} transactions exportées.`);
  };

  const resetFilters = () => {
    setSearch('');
    setCategoryFilter('all');
    setMonthFilter('all');
    setEventFilter('');
    onClearInitialEventFilter?.();
    setViewState('data');
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      key: 'date',
      header: 'DATE',
      render: (tx) => <span className="text-xs text-[#6D818E] whitespace-nowrap">{tx.dateLabel}</span>,
    },
    {
      key: 'description',
      header: 'DESCRIPTION',
      render: (tx) => (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[#203F52]">{tx.description}</span>
          {tx.status === 'brouillon' && <StatusBadge label="Brouillon" variant="orange" />}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'CATÉGORIE',
      render: (tx) => (
        <StatusBadge label={tx.category} variant={getCategoryBadgeVariant(tx.category)} />
      ),
    },
    {
      key: 'event',
      header: 'ÉVÉNEMENT',
      render: (tx) => <span className="text-xs text-[#6D818E]">{tx.event}</span>,
    },
    {
      key: 'amount',
      header: 'MONTANT',
      render: (tx) => (
        <span
          className={`font-bold text-xs whitespace-nowrap ${
            tx.type === 'recette' ? 'text-[#3D9563]' : 'text-[#E74732]'
          }`}
        >
          {formatDzd(tx.amount, { showSign: true, type: tx.type })}
        </span>
      ),
    },
    {
      key: 'receipt',
      header: 'REÇU',
      render: (tx) =>
        tx.receiptName ? (
          <button
            type="button"
            onClick={() =>
              onOpenReceipt({
                title: tx.description,
                reference: tx.id.toUpperCase(),
                date: tx.dateLabel,
                amount: formatDzd(tx.amount, { showSign: true, type: tx.type }),
                categoryOrMember: `${tx.category}${tx.event !== '—' ? ` · ${tx.event}` : ''}`,
                filename: tx.receiptName ?? 'justificatif.pdf',
              })
            }
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A9BD5] hover:underline cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>PDF</span>
          </button>
        ) : (
          <span className="text-xs text-[#E74732] font-medium">Manquant</span>
        ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (tx) => (
        <button
          type="button"
          onClick={() => onEditTransaction(tx)}
          aria-label={`Modifier ${tx.description}`}
          className="p-1.5 rounded-lg text-[#6D818E] hover:text-[#203F52] hover:bg-[#F7F3E9] transition cursor-pointer"
        >
          <Pencil className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5 animate-fade-slide">
      <PageHeader
        title="Transactions"
        subtitle="Tous les mouvements financiers du club."
        actions={
          <>
            <SecondaryButton icon={<Download className="w-4 h-4" />} onClick={handleExport}>
              Exporter
            </SecondaryButton>
            <PrimaryButton icon={<Plus className="w-4 h-4" />} onClick={onAddTransaction}>
              Ajouter
            </PrimaryButton>
          </>
        }
      />

      {/* State filter pills matching screenshot */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#6D818E] font-medium mr-1">États :</span>
        {(['data', 'loading', 'empty', 'error'] as ViewState[]).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setViewState(st)}
            className={`px-3 py-1 rounded-full font-semibold border transition cursor-pointer ${
              viewState === st
                ? 'bg-[#203F52] border-[#203F52] text-white'
                : 'bg-white border-[#E6D9C4] text-[#6D818E] hover:text-[#203F52]'
            }`}
          >
            {st}
          </button>
        ))}

        {eventFilter && (
          <span className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2FA] text-[#2E7EB8] font-semibold">
            Événement : {eventFilter}
            <button
              type="button"
              onClick={() => {
                setEventFilter('');
                onClearInitialEventFilter?.();
              }}
              className="hover:text-[#203F52] font-bold cursor-pointer"
              aria-label="Retirer le filtre événement"
            >
              ×
            </button>
          </span>
        )}
      </div>

      {/* Search and dropdown filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher une transaction..."
        />
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <FilterDropdown
            ariaLabel="Filtrer par catégorie"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={CATEGORY_OPTIONS}
            icon={<Filter className="w-4 h-4" />}
            className="flex-1 sm:flex-none"
          />
          <FilterDropdown
            ariaLabel="Filtrer par mois"
            value={monthFilter}
            onChange={setMonthFilter}
            options={MONTH_OPTIONS}
            icon={<Calendar className="w-4 h-4" />}
            className="flex-1 sm:flex-none"
          />
        </div>
      </div>

      {/* Main table card */}
      <section className="bg-white border border-[#E6D9C4] rounded-2xl shadow-card overflow-hidden">
        {viewState === 'loading' ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-4 w-24 rounded bg-[#EFE8DA]" />
                <div className="h-4 flex-1 rounded bg-[#F4EFE4]" />
                <div className="h-6 w-24 rounded-full bg-[#EFE8DA]" />
                <div className="h-4 w-24 rounded bg-[#F4EFE4]" />
                <div className="h-4 w-20 rounded bg-[#EFE8DA]" />
              </div>
            ))}
          </div>
        ) : viewState === 'error' ? (
          <div className="py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FDECE9] text-[#E74732] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#203F52]">
              Impossible de charger les transactions
            </h3>
            <p className="text-sm text-[#6D818E] mt-1 max-w-md mx-auto">
              Une erreur temporaire est survenue lors de la récupération des écritures comptables.
            </p>
            <div className="mt-4">
              <SecondaryButton
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={() => setViewState('data')}
              >
                Réessayer
              </SecondaryButton>
            </div>
          </div>
        ) : viewState === 'empty' || filteredTransactions.length === 0 ? (
          <div className="py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F3E9] text-[#6D818E] flex items-center justify-center mx-auto mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#203F52]">
              Aucune transaction trouvée
            </h3>
            <p className="text-sm text-[#6D818E] mt-1">
              Modifiez vos filtres ou ajoutez une nouvelle transaction.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2.5">
              <SecondaryButton onClick={resetFilters}>Réinitialiser les filtres</SecondaryButton>
              <PrimaryButton icon={<Plus className="w-4 h-4" />} onClick={onAddTransaction}>
                Ajouter
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={paginatedTransactions}
              rowKey={(tx) => tx.id}
            />
            <Pagination
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              totalItems={filteredTransactions.length}
              itemLabel="transactions"
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>
    </div>
  );
};
