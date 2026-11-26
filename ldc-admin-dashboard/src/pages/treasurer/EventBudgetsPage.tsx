import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { EventBudget } from '../../types/ldc';
import { downloadCsv, formatDzd, formatSignedDiff } from '../../utils/formatters';
import { SecondaryButton } from '../../components/ui/Buttons';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface EventBudgetsPageProps {
  budgets: EventBudget[];
  onViewEventTransactions: (eventName: string) => void;
  onNotify: (title: string, description?: string) => void;
}

export const EventBudgetsPage: React.FC<EventBudgetsPageProps> = ({
  budgets,
  onViewEventTransactions,
  onNotify,
}) => {
  const handleExport = () => {
    downloadCsv(
      'ldc-budgets-evenements.csv',
      ['Événement', 'Statut', 'Budget prévu (DZD)', 'Dépenses réelles (DZD)', 'Écart (DZD)'],
      budgets.map((ev) => [
        ev.name,
        ev.status === 'dans_le_budget'
          ? 'Dans le budget'
          : ev.status === 'depassement'
            ? 'Dépassement'
            : 'Non engagé',
        ev.planned,
        ev.actual,
        ev.actual - ev.planned,
      ])
    );
    onNotify('Budgets exportés', 'Le comparatif des événements a été téléchargé en CSV.');
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Budgets des événements"
        subtitle="Comparaison des montants prévus et des coûts réels."
        actions={
          <SecondaryButton icon={<Download className="w-4 h-4" />} onClick={handleExport}>
            Exporter
          </SecondaryButton>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {budgets.map((ev) => {
          const diff = ev.actual - ev.planned;
          const rawRatio = ev.planned > 0 ? Math.round((ev.actual / ev.planned) * 100) : 0;
          const displayPercent = Math.min(100, rawRatio);

          const isOverrun = ev.status === 'depassement';
          const isUnengaged = ev.status === 'non_engage';

          const iconWrapClass = isOverrun
            ? 'bg-[#FDECE9] text-[#E74732]'
            : isUnengaged
              ? 'bg-[#EDF1F4] text-[#6D818E]'
              : 'bg-[#E5F4EC] text-[#3D9563]';

          const barFillClass = isOverrun
            ? 'bg-[#E74732]'
            : isUnengaged
              ? 'bg-transparent'
              : 'bg-[#3D9563]';

          const badgeLabel = isOverrun
            ? 'DÉPASSEMENT'
            : isUnengaged
              ? 'NON ENGAGÉ'
              : 'DANS LE BUDGET';

          const badgeVariant = isOverrun ? 'red' : isUnengaged ? 'gray' : 'green';

          return (
            <article
              key={ev.id}
              className="bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card flex flex-col justify-between gap-5"
            >
              {/* Card Header */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconWrapClass}`}
                >
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="font-editorial text-lg font-bold text-[#203F52] leading-snug">
                    {ev.name}
                  </h2>
                  <StatusBadge label={badgeLabel} variant={badgeVariant} />
                </div>
              </div>

              {/* 3 Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <div className="text-[11px] text-[#6D818E]">Budget prévu</div>
                  <div className="text-sm font-bold text-[#203F52] mt-0.5 tabular-nums">
                    {formatDzd(ev.planned)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#6D818E]">Dépenses réelles</div>
                  <div className="text-sm font-bold text-[#203F52] mt-0.5 tabular-nums">
                    {formatDzd(ev.actual)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#6D818E]">Écart</div>
                  <div className="text-sm font-bold text-[#203F52] mt-0.5 tabular-nums">
                    {formatSignedDiff(diff)}
                  </div>
                </div>
              </div>

              {/* Progress bar + footer */}
              <div>
                <div className="h-2 w-full rounded-full bg-[#EDE5D5] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${barFillClass}`}
                    style={{ width: `${displayPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 mt-3">
                  <span className="text-[11px] text-[#7C8F9B] font-medium">
                    {displayPercent}% consommé
                  </span>
                  <button
                    type="button"
                    onClick={() => onViewEventTransactions(ev.name)}
                    className="text-xs font-semibold text-[#4A9BD5] hover:underline cursor-pointer"
                  >
                    Voir les transactions →
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
