import React, { useMemo, useState } from 'react';
import { Check, Download, FileText } from 'lucide-react';
import { GeneratedReport, Transaction } from '../../types/ldc';
import { downloadReportSummaryFile } from '../../utils/formatters';
import { DarkButton, SecondaryButton } from '../../components/ui/Buttons';
import { LdcLogo } from '../../components/ui/LdcLogo';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface ReportsPageProps {
  reports: GeneratedReport[];
  transactions: Transaction[];
  onGenerateReport: (report: GeneratedReport) => void;
  onNotify: (title: string, description?: string) => void;
}

const MONTH_CHOICES = [
  { value: '2025-04', label: 'Avril 2025', txCount: 28, catCount: 6 },
  { value: '2025-03', label: 'Mars 2025', txCount: 24, catCount: 6 },
  { value: '2025-02', label: 'Février 2025', txCount: 19, catCount: 5 },
  { value: '2025-01', label: 'Janvier 2025', txCount: 21, catCount: 5 },
];

const SEMESTER_CHOICES = [
  { value: 'S2-2025', label: 'Semestre 2 · 2024–2025', txCount: 92, catCount: 7 },
  { value: 'S1-2024', label: 'Semestre 1 · 2024–2025', txCount: 84, catCount: 7 },
];

export const ReportsPage: React.FC<ReportsPageProps> = ({
  reports,
  transactions,
  onGenerateReport,
  onNotify,
}) => {
  const [periodType, setPeriodType] = useState<'Mensuel' | 'Semestre'>('Mensuel');
  const [selectedMonth, setSelectedMonth] = useState('2025-04');
  const [selectedSemester, setSelectedSemester] = useState('S2-2025');
  const [includeReceipts, setIncludeReceipts] = useState(true);
  const [includeEventDetails, setIncludeEventDetails] = useState(true);

  const previewMeta = useMemo(() => {
    if (periodType === 'Mensuel') {
      const found = MONTH_CHOICES.find((m) => m.value === selectedMonth) ?? MONTH_CHOICES[0];
      const extraCount =
        selectedMonth === '2025-04' ? Math.max(0, transactions.length - 18) : 0;
      return {
        label: found.label,
        upperLabel: found.label.toUpperCase(),
        txCount: found.txCount + extraCount,
        catCount: found.catCount,
      };
    }
    const found =
      SEMESTER_CHOICES.find((s) => s.value === selectedSemester) ?? SEMESTER_CHOICES[0];
    return {
      label: found.label,
      upperLabel: found.label.toUpperCase(),
      txCount: found.txCount,
      catCount: found.catCount,
    };
  }, [periodType, selectedMonth, selectedSemester, transactions.length]);

  const handleExport = (format: 'PDF' | 'Excel') => {
    const newReport: GeneratedReport = {
      id: `rep-${Date.now()}`,
      title: previewMeta.label,
      format,
      size: format === 'PDF' ? '1,9 Mo' : '920 Ko',
      date: '21 avr. 2025',
      periodType,
      periodLabel: previewMeta.label,
      transactionCount: previewMeta.txCount,
      categoryCount: previewMeta.catCount,
      includeReceipts,
      includeEventDetails,
    };

    downloadReportSummaryFile(
      `ldc-rapport-${previewMeta.label.toLowerCase().replace(/\s+/g, '-')}`,
      `Rapport financier · ${previewMeta.label}`,
      [
        `Période : ${periodType} (${previewMeta.label})`,
        `Transactions incluses : ${previewMeta.txCount}`,
        `Catégories couvertes : ${previewMeta.catCount}`,
        `Justificatifs joints : ${includeReceipts ? 'Oui' : 'Non'}`,
        `Détail par événement : ${includeEventDetails ? 'Oui' : 'Non'}`,
        `Généré le : 21 avril 2025`,
      ],
      format
    );

    onGenerateReport(newReport);
    onNotify(
      `Rapport ${format} généré`,
      `Synthèse "${previewMeta.label}" téléchargée et ajoutée aux rapports récents.`
    );
  };

  const handleDownloadRecent = (rep: GeneratedReport) => {
    downloadReportSummaryFile(
      `ldc-rapport-${rep.title.toLowerCase().replace(/\s+/g, '-')}`,
      `Rapport financier · ${rep.title}`,
      [
        `Période : ${rep.periodType} (${rep.periodLabel})`,
        `Transactions : ${rep.transactionCount}`,
        `Catégories : ${rep.categoryCount}`,
        `Format : ${rep.format} (${rep.size})`,
        `Date de génération : ${rep.date}`,
      ],
      rep.format
    );
    onNotify('Téléchargement lancé', `${rep.title} (${rep.format})`);
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title="Rapports financiers"
        subtitle="Générez des synthèses prêtes à partager."
        actions={<StatusBadge label="TRÉSORIER" variant="orange" />}
      />

      {/* Config + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Configurer le rapport */}
        <section className="lg:col-span-8 bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card">
          <h2 className="font-editorial text-lg font-bold text-[#203F52] pb-4 border-b border-[#E6D9C4]/70">
            Configurer le rapport
          </h2>

          <div className="space-y-5 mt-5">
            {/* Period segmented control */}
            <div>
              <label className="block text-xs font-bold text-[#203F52] mb-2">Période</label>
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-[#E6D9C4] bg-white">
                {(['Mensuel', 'Semestre'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPeriodType(mode)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      periodType === mode
                        ? 'bg-[#203F52] text-white'
                        : 'text-[#6D818E] hover:text-[#203F52]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Month or Semester selector */}
            <div>
              <label className="block text-xs font-bold text-[#203F52] mb-2">
                {periodType === 'Mensuel' ? 'Mois' : 'Semestre'}
              </label>
              {periodType === 'Mensuel' ? (
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] bg-white text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                >
                  {MONTH_CHOICES.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] bg-white text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
                >
                  {SEMESTER_CHOICES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-1">
              <label className="flex items-center gap-3 text-xs text-[#4D6372] cursor-pointer select-none">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={includeReceipts}
                  onClick={() => setIncludeReceipts((v) => !v)}
                  className={`w-4 h-4 rounded flex items-center justify-center transition ${
                    includeReceipts
                      ? 'bg-[#3D9563] text-white'
                      : 'border border-[#C9B99F] bg-white'
                  }`}
                >
                  {includeReceipts && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <span>Inclure les justificatifs</span>
              </label>

              <label className="flex items-center gap-3 text-xs text-[#4D6372] cursor-pointer select-none">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={includeEventDetails}
                  onClick={() => setIncludeEventDetails((v) => !v)}
                  className={`w-4 h-4 rounded flex items-center justify-center transition ${
                    includeEventDetails
                      ? 'bg-[#3D9563] text-white'
                      : 'border border-[#C9B99F] bg-white'
                  }`}
                >
                  {includeEventDetails && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <span>Inclure le détail par événement</span>
              </label>
            </div>
          </div>
        </section>

        {/* Right: Aperçu du rapport */}
        <section className="lg:col-span-4 bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card">
          <h2 className="font-editorial text-lg font-bold text-[#203F52] mb-4">
            Aperçu du rapport
          </h2>

          <div className="border border-[#E6D9C4] rounded-xl bg-white p-8 text-center shadow-sm">
            <div className="flex justify-center mb-4">
              <LdcLogo size="lg" />
            </div>
            <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#7C8F9B]">
              RAPPORT FINANCIER
            </div>
            <div className="font-editorial text-xl font-extrabold text-[#203F52] mt-1 tracking-tight">
              {previewMeta.upperLabel}
            </div>
            <div className="w-12 h-0.5 bg-[#F5B400] mx-auto my-4 rounded-full" />
            <p className="text-[11px] text-[#6D818E]">
              {previewMeta.txCount} transactions · {previewMeta.catCount} catégories
            </p>
            <p className="text-[11px] text-[#8DA0AC] mt-1">Généré le 21 avril 2025</p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-3">
              {includeReceipts && <StatusBadge label="Justificatifs" variant="green" />}
              {includeEventDetails && <StatusBadge label="Par événement" variant="blue" />}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <DarkButton
              icon={<Download className="w-4 h-4" />}
              onClick={() => handleExport('PDF')}
              className="w-full"
            >
              Exporter PDF
            </DarkButton>
            <SecondaryButton
              icon={<Download className="w-4 h-4" />}
              onClick={() => handleExport('Excel')}
              className="w-full"
            >
              Exporter Excel
            </SecondaryButton>
          </div>
        </section>
      </div>

      {/* Rapports récents */}
      <section className="bg-white border border-[#E6D9C4] rounded-2xl shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E6D9C4]/70">
          <h2 className="font-editorial text-lg font-bold text-[#203F52]">Rapports récents</h2>
        </div>

        <div className="divide-y divide-[#E6D9C4]/60">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#FBF8F2] transition"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E6F2FA] text-[#4A9BD5] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#203F52] truncate">{rep.title}</div>
                  <div className="text-xs text-[#6D818E] mt-0.5">
                    {rep.format} · {rep.size} · {rep.date}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDownloadRecent(rep)}
                aria-label={`Télécharger ${rep.title}`}
                className="p-2 rounded-xl text-[#4A9BD5] hover:bg-[#E6F2FA]/60 transition cursor-pointer shrink-0"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
