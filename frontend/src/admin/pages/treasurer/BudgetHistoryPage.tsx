import React from 'react';
import { Check, Download, PenLine } from 'lucide-react';
import { BudgetHistoryEntry } from '../../types/ldc';
import { downloadCsv } from '../../utils/formatters';
import { SecondaryButton } from '../../components/ui/Buttons';
import { PageHeader } from '../../components/ui/PageHeader';

interface BudgetHistoryPageProps {
  entries: BudgetHistoryEntry[];
  onNotify: (title: string, description?: string) => void;
}

export const BudgetHistoryPage: React.FC<BudgetHistoryPageProps> = ({
  entries,
  onNotify,
}) => {
  const formatPlainDzd = (val: number) =>
    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const handleExport = () => {
    downloadCsv(
      'ldc-historique-budget.csv',
      ['Horodatage', 'Budget / Catégorie', 'Utilisateur', 'Ancien montant', 'Nouveau montant', 'Motif'],
      entries.map((e) => [
        e.timestamp,
        e.target,
        e.user,
        e.previousValue,
        e.newValue,
        e.reason,
      ])
    );
    onNotify('Historique exporté', 'Le journal des modifications budgétaires a été téléchargé.');
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Historique du budget"
        subtitle="Toutes les modifications sont conservées et horodatées."
        actions={
          <SecondaryButton icon={<Download className="w-4 h-4" />} onClick={handleExport}>
            Exporter
          </SecondaryButton>
        }
      />

      <section className="bg-white border border-[#E6D9C4] rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="relative pl-12 space-y-8">
          {/* Vertical connecting timeline line */}
          <div
            className="absolute left-[18px] top-4 bottom-4 w-px bg-[#E6D9C4]"
            aria-hidden="true"
          />

          {entries.map((entry) => {
            const isApprove = entry.type === 'approve';
            return (
              <div key={entry.id} className="relative">
                {/* Circular icon node */}
                <div
                  className={`absolute -left-12 top-0.5 w-9 h-9 rounded-full flex items-center justify-center border ${
                    isApprove
                      ? 'bg-[#EDF2F6] border-[#DCE4EC] text-[#6D818E]'
                      : 'bg-[#E6F2FA] border-[#D2E7F7] text-[#4A9BD5]'
                  }`}
                >
                  {isApprove ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <PenLine className="w-4 h-4" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-medium text-[#7C8F9B]">{entry.timestamp}</div>
                  <h2 className="font-editorial text-lg font-bold text-[#203F52]">
                    {entry.target}
                  </h2>
                  <p className="text-xs text-[#4D6372]">
                    <span className="font-bold text-[#203F52]">{entry.user}</span> a modifié le
                    montant
                  </p>
                  <p className="text-xs font-bold text-[#203F52] pt-1 tabular-nums">
                    {formatPlainDzd(entry.previousValue)} → {formatPlainDzd(entry.newValue)} DZD
                  </p>
                  <p className="text-xs italic text-[#7C8F9B]">{entry.reason}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
