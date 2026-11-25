import React, { useMemo } from 'react';
import { FileText, Pencil, Plus, Wallet } from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { EXPENSE_CATEGORIES_DATA, MONTHLY_CASH_FLOW } from '../../data/mockData';
import { PageId, Transaction } from '../../types/ldc';
import { formatDzd } from '../../utils/formatters';
import { PrimaryButton } from '../../components/ui/Buttons';
import { ColumnDef, DataTable } from '../../components/ui/DataTable';
import { PageHeader } from '../../components/ui/PageHeader';
import { ReceiptModalData } from '../../components/ui/ReceiptModal';
import { getCategoryBadgeVariant, StatusBadge } from '../../components/ui/StatusBadge';
import { SummaryCard } from '../../components/ui/SummaryCard';

interface FinancialDashboardPageProps {
  transactions: Transaction[];
  baseCountDelta: number;
  onNavigate: (page: PageId) => void;
  onAddTransaction: () => void;
  onEditTransaction: (tx: Transaction) => void;
  onOpenReceipt: (receipt: ReceiptModalData) => void;
}

export const FinancialDashboardPage: React.FC<FinancialDashboardPageProps> = ({
  transactions,
  onNavigate,
  onAddTransaction,
  onEditTransaction,
  onOpenReceipt,
}) => {
  // Base screenshot metrics + live reflection of any newly added/updated April transactions
  const stats = useMemo(() => {
    const baseTxIds = new Set(Array.from({ length: 18 }, (_, i) => `tx-${i + 1}`));
    const extraTx = transactions.filter((t) => !baseTxIds.has(t.id) && t.status !== 'brouillon');

    const extraIncome = extraTx
      .filter((t) => t.type === 'recette')
      .reduce((sum, t) => sum + t.amount, 0);
    const extraExpense = extraTx
      .filter((t) => t.type === 'depense')
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingJustificationTx = transactions.filter(
      (t) => t.type === 'depense' && !t.receiptName && t.status !== 'brouillon'
    );
    const missingReceiptsCount = Math.max(3, pendingJustificationTx.length);
    const missingReceiptsAmount =
      14200 +
      extraTx
        .filter((t) => t.type === 'depense' && !t.receiptName)
        .reduce((sum, t) => sum + t.amount, 0);

    const currentBalance = 184250 + extraIncome - extraExpense;
    const monthIncome = 128500 + extraIncome;
    const monthExpense = 86450 + extraExpense;
    const budgetPercent = Math.round((monthExpense / 120000) * 100);

    return {
      currentBalance,
      monthIncome,
      monthExpense,
      budgetPercent,
      missingReceiptsCount,
      missingReceiptsAmount,
    };
  }, [transactions]);

  const recentTransactions = useMemo(
    () =>
      transactions
        .filter((t) => t.status !== 'brouillon')
        .slice(0, 4),
    [transactions]
  );

  const columns: ColumnDef<Transaction>[] = [
    {
      key: 'date',
      header: 'DATE',
      render: (tx) => <span className="text-xs text-[#6D818E] whitespace-nowrap">{tx.dateLabel}</span>,
    },
    {
      key: 'description',
      header: 'DESCRIPTION',
      render: (tx) => <span className="font-semibold text-[#203F52]">{tx.description}</span>,
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
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Vue financière"
        subtitle="Suivi du budget du club · Avril 2025"
        actions={
          <PrimaryButton icon={<Plus className="w-4 h-4" />} onClick={onAddTransaction}>
            Ajouter une transaction
          </PrimaryButton>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          variant="navy"
          title="Solde actuel"
          value={formatDzd(stats.currentBalance)}
          subtitle="Disponible après engagements"
          icon={<Wallet className="w-6 h-6 text-[#F5B400]" />}
        />
        <SummaryCard
          title="Recettes du mois"
          value={formatDzd(stats.monthIncome)}
          subtitle="+18,2% vs mars"
          subtitleTone="neutral"
        />
        <SummaryCard
          title="Dépenses du mois"
          value={formatDzd(stats.monthExpense)}
          subtitle={`${stats.budgetPercent}% du budget mensuel`}
          subtitleTone="neutral"
        />
        <SummaryCard
          title="À justifier"
          value={formatDzd(stats.missingReceiptsAmount)}
          subtitle={`${stats.missingReceiptsCount} reçus manquants`}
          subtitleTone="danger"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Monthly cash flow */}
        <section className="xl:col-span-8 bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="font-editorial text-lg font-bold text-[#203F52]">Flux mensuels</h2>
              <p className="text-xs text-[#6D818E] mt-0.5">
                Recettes et dépenses, en milliers DZD
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#6D818E] font-medium">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3D9563]" />
                Recettes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#E74732]" />
                Dépenses
              </span>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MONTHLY_CASH_FLOW}
                margin={{ top: 16, right: 8, left: 8, bottom: 0 }}
                barGap={6}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6D818E', fontSize: 11, fontWeight: 500 }}
                />
                <Tooltip
                  cursor={{ fill: '#F7F3E9', opacity: 0.6 }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E6D9C4',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#203F52',
                  }}
                  formatter={(value: number, name: string) => [
                    `${(value * 1000).toLocaleString('fr-FR').replace(/\u202f/g, ' ')} DZD`,
                    name === 'recettes' ? 'Recettes' : 'Dépenses',
                  ]}
                />
                <Bar
                  dataKey="recettes"
                  fill="#3D9563"
                  barSize={14}
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="depenses"
                  fill="#E74732"
                  barSize={14}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Expenses by category */}
        <section className="xl:col-span-4 bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card flex flex-col">
          <h2 className="font-editorial text-lg font-bold text-[#203F52]">
            Dépenses par catégorie
          </h2>

          <div className="flex-1 flex flex-col sm:flex-row xl:flex-row items-center justify-between gap-4 mt-4">
            <div className="relative w-[170px] h-[170px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EXPENSE_CATEGORIES_DATA}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={74}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {EXPENSE_CATEGORIES_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E6D9C4',
                      borderRadius: '10px',
                      fontSize: '12px',
                    }}
                    formatter={(val: number, name: string) => [`${val}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-editorial text-lg font-bold text-[#203F52] leading-none">
                  86,4K
                </span>
                <span className="text-[10px] font-semibold text-[#7C8F9B] mt-1">DZD</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-3">
              {EXPENSE_CATEGORIES_DATA.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-[#4D6372] truncate">{cat.name}</span>
                  </div>
                  <span className="font-bold text-[#203F52] tabular-nums">{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Recent transactions */}
      <section className="bg-white border border-[#E6D9C4] rounded-2xl shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E6D9C4]/70 flex items-center justify-between gap-4">
          <h2 className="font-editorial text-lg font-bold text-[#203F52]">
            Dernières transactions
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('transactions')}
            className="text-xs font-semibold text-[#4A9BD5] hover:underline cursor-pointer"
          >
            Voir toutes →
          </button>
        </div>
        <DataTable
          columns={columns}
          data={recentTransactions}
          rowKey={(tx) => tx.id}
        />
      </section>
    </div>
  );
};
