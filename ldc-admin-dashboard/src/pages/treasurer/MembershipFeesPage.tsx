import React, { useMemo, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { MembershipFee, MembershipStatus } from '../../types/ldc';
import { downloadCsv, formatDzd } from '../../utils/formatters';
import { SecondaryButton } from '../../components/ui/Buttons';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { ColumnDef, DataTable } from '../../components/ui/DataTable';
import { PageHeader } from '../../components/ui/PageHeader';
import { ReceiptModalData } from '../../components/ui/ReceiptModal';
import { SearchBar } from '../../components/ui/SearchBar';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { SummaryCard } from '../../components/ui/SummaryCard';

interface MembershipFeesPageProps {
  members: MembershipFee[];
  onMarkPaid: (memberId: string) => void;
  onOpenReceipt: (receipt: ReceiptModalData) => void;
  onNotify: (title: string, description?: string) => void;
}

const AVATAR_COLORS: Record<MembershipFee['avatarColor'], string> = {
  blue: 'bg-[#4A9BD5]',
  red: 'bg-[#E74732]',
  green: 'bg-[#3D9563]',
  navy: 'bg-[#203F52]',
};

export const MembershipFeesPage: React.FC<MembershipFeesPageProps> = ({
  members,
  onMarkPaid,
  onOpenReceipt,
  onNotify,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | MembershipStatus>('all');
  const [confirmMember, setConfirmMember] = useState<MembershipFee | null>(null);

  // Base counts from screenshot + live delta when members are marked paid
  const kpis = useMemo(() => {
    const paidInList = members.filter((m) => m.status === 'payee').length;
    const pendingInList = members.filter((m) => m.status === 'en_attente').length;
    const unpaidInList = members.filter((m) => m.status === 'impayee').length;

    // Initial list has 4 paid, 2 pending, 2 unpaid -> offset to season totals (231, 18, 35)
    const paidCount = 227 + paidInList;
    const pendingCount = 16 + pendingInList;
    const unpaidCount = 33 + unpaidInList;
    const totalCollected = paidCount * 1500;

    return { paidCount, pendingCount, unpaidCount, totalCollected };
  }, [members]);

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter((m) => {
      if (statusFilter !== 'all' && m.status !== statusFilter) return false;
      if (q) {
        const hay = `${m.name} ${m.memberNumber} ${m.paymentDate}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [members, search, statusFilter]);

  const handleExport = () => {
    downloadCsv(
      'ldc-cotisations-2024-2025.csv',
      ['Membre', 'N° Membre', 'Date de paiement', 'Montant (DZD)', 'Statut'],
      filteredMembers.map((m) => [
        m.name,
        m.memberNumber,
        m.paymentDate,
        m.amount,
        m.status === 'payee' ? 'Payée' : m.status === 'en_attente' ? 'En attente' : 'Impayée',
      ])
    );
    onNotify('Cotisations exportées', `${filteredMembers.length} lignes exportées en CSV.`);
  };

  const columns: ColumnDef<MembershipFee>[] = [
    {
      key: 'member',
      header: 'MEMBRE',
      render: (m) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full ${AVATAR_COLORS[m.avatarColor]} text-white text-xs font-bold flex items-center justify-center shrink-0`}
          >
            {m.initials}
          </div>
          <span className="font-semibold text-[#203F52]">{m.name}</span>
        </div>
      ),
    },
    {
      key: 'memberNumber',
      header: 'N° MEMBRE',
      render: (m) => <span className="text-xs text-[#6D818E] tabular-nums">{m.memberNumber}</span>,
    },
    {
      key: 'paymentDate',
      header: 'DATE DE PAIEMENT',
      render: (m) => <span className="text-xs text-[#6D818E]">{m.paymentDate}</span>,
    },
    {
      key: 'amount',
      header: 'MONTANT',
      render: (m) => (
        <span className="text-xs font-bold text-[#203F52] tabular-nums">
          {formatDzd(m.amount)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'STATUT',
      render: (m) => {
        if (m.status === 'payee') return <StatusBadge label="PAYÉE" variant="green" />;
        if (m.status === 'en_attente')
          return <StatusBadge label="EN ATTENTE" variant="orange" />;
        return <StatusBadge label="IMPAYÉE" variant="red" />;
      },
    },
    {
      key: 'action',
      header: 'ACTION',
      render: (m) =>
        m.status === 'payee' ? (
          <button
            type="button"
            onClick={() =>
              onOpenReceipt({
                title: `Cotisation annuelle · ${m.name}`,
                reference: `COT-${m.memberNumber}`,
                date: m.paymentDate,
                amount: formatDzd(m.amount),
                categoryOrMember: `${m.name} (N° ${m.memberNumber})`,
                filename: `recu-cotisation-${m.memberNumber}.pdf`,
              })
            }
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A9BD5] hover:underline cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Reçu</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmMember(m)}
            className="text-xs font-bold text-[#2E7EB8] hover:underline cursor-pointer"
          >
            Marquer payée
          </button>
        ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Cotisations des membres"
        subtitle="Suivi des paiements pour la saison 2024–2025."
        actions={
          <SecondaryButton icon={<Download className="w-4 h-4" />} onClick={handleExport}>
            Exporter
          </SecondaryButton>
        }
      />

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard valueFirst value={String(kpis.paidCount)} title="Cotisations payées" />
        <SummaryCard valueFirst value={String(kpis.pendingCount)} title="En attente" />
        <SummaryCard valueFirst value={String(kpis.unpaidCount)} title="Impayées" />
        <SummaryCard
          valueFirst
          value={formatDzd(kpis.totalCollected)}
          title="Total collecté"
        />
      </div>

      {/* Search + Status tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher un membre..."
        />
        <div className="flex items-center rounded-xl border border-[#E6D9C4] bg-white p-1 overflow-x-auto">
          {(
            [
              { value: 'all', label: 'Tous' },
              { value: 'payee', label: 'Payée' },
              { value: 'en_attente', label: 'En attente' },
              { value: 'impayee', label: 'Impayée' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                statusFilter === tab.value
                  ? 'bg-[#203F52] text-white'
                  : 'text-[#6D818E] hover:text-[#203F52]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <section className="bg-white border border-[#E6D9C4] rounded-2xl shadow-card overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredMembers}
          rowKey={(m) => m.id}
          emptyState={
            <div className="py-12 px-6 text-center text-sm text-[#6D818E]">
              Aucun membre ne correspond à votre recherche.
            </div>
          }
        />
      </section>

      <ConfirmationDialog
        isOpen={Boolean(confirmMember)}
        onClose={() => setConfirmMember(null)}
        onConfirm={() => {
          if (confirmMember) {
            onMarkPaid(confirmMember.id);
          }
        }}
        title="Confirmer le paiement"
        message={
          confirmMember
            ? `Marquer la cotisation de ${confirmMember.name} (${formatDzd(confirmMember.amount)}) comme payée aujourd'hui ?`
            : ''
        }
        confirmLabel="Marquer payée"
        tone="primary"
      />
    </div>
  );
};
