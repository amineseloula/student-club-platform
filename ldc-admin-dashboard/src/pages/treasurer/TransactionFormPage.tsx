import React, { useState } from 'react';
import { FileMinus, Plus } from 'lucide-react';
import { Transaction, TransactionCategory, TransactionType } from '../../types/ldc';
import { formatIsoToShortFr } from '../../utils/formatters';
import { PrimaryButton, SecondaryButton } from '../../components/ui/Buttons';
import { FileUpload } from '../../components/ui/FileUpload';
import { PageHeader } from '../../components/ui/PageHeader';

interface TransactionFormPageProps {
  editingTransaction?: Transaction | null;
  onCancel: () => void;
  onSave: (tx: Transaction, isDraft: boolean) => void;
}

const CATEGORIES: TransactionCategory[] = [
  'Transport',
  'Matériel',
  'Collations',
  'Communication',
  'Cotisations',
  'Partenariat',
  'Autres',
];

const EVENTS = [
  'Sortie Lac Noir',
  'Tournoi Volleyball',
  'Soirée Musique',
  'Welcome Day',
  'SmashIT',
  'Concours de dessin',
  'Sortie Kherrata',
  '—',
];

export const TransactionFormPage: React.FC<TransactionFormPageProps> = ({
  editingTransaction,
  onCancel,
  onSave,
}) => {
  const isEditing = Boolean(editingTransaction);

  const [type, setType] = useState<TransactionType>(editingTransaction?.type ?? 'depense');
  const [amount, setAmount] = useState<string>(
    editingTransaction ? String(editingTransaction.amount) : ''
  );
  const [date, setDate] = useState<string>(editingTransaction?.date ?? '2025-04-21');
  const [category, setCategory] = useState<TransactionCategory>(
    editingTransaction?.category ?? 'Transport'
  );
  const [event, setEvent] = useState<string>(editingTransaction?.event ?? 'Sortie Lac Noir');
  const [description, setDescription] = useState<string>(editingTransaction?.description ?? '');
  const [receipt, setReceipt] = useState<{
    name: string;
    sizeLabel: string;
    previewUrl?: string;
  } | null>(
    editingTransaction?.receiptName
      ? { name: editingTransaction.receiptName, sizeLabel: '240 Ko' }
      : null
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (isDraft: boolean): boolean => {
    const nextErrors: Record<string, string> = {};
    const parsedAmount = Number(amount.replace(/\s+/g, '').replace(',', '.'));

    if (!amount.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = 'Veuillez saisir un montant valide supérieur à 0 DZD.';
    }
    if (!date) {
      nextErrors.date = 'La date de la transaction est obligatoire.';
    }
    if (!description.trim() || description.trim().length < 3) {
      nextErrors.description = 'Veuillez décrire précisément cette transaction.';
    }
    if (!isDraft && type === 'depense' && !receipt) {
      nextErrors.receipt = 'Un justificatif (PDF, JPG ou PNG) est obligatoire pour toute dépense.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (isDraft: boolean) => {
    if (!validate(isDraft)) return;
    const parsedAmount = Math.round(Number(amount.replace(/\s+/g, '').replace(',', '.')));
    const monthKey = date.slice(0, 7);

    const payload: Transaction = {
      id: editingTransaction?.id ?? `tx-${Date.now()}`,
      date,
      dateLabel: formatIsoToShortFr(date),
      monthKey,
      description: description.trim(),
      category,
      event,
      type,
      amount: parsedAmount,
      receiptName: receipt?.name,
      receiptType: receipt?.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
      status: isDraft ? 'brouillon' : type === 'depense' && !receipt ? 'a_justifier' : 'validee',
    };

    onSave(payload, isDraft);
  };

  return (
    <div className="space-y-6 animate-fade-slide">
      <PageHeader
        title={isEditing ? 'Modifier une transaction' : 'Ajouter une transaction'}
        subtitle="Enregistrez une recette ou une dépense avec son justificatif."
        actions={
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-semibold text-[#203F52] hover:text-[#4A9BD5] px-3 py-2 cursor-pointer"
          >
            Annuler
          </button>
        }
      />

      {/* Card 1: Informations de la transaction */}
      <section className="bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card max-w-4xl">
        <h2 className="font-editorial text-lg font-bold text-[#203F52] pb-4 border-b border-[#E6D9C4]/70">
          Informations de la transaction
        </h2>

        {/* Transaction type selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <button
            type="button"
            onClick={() => setType('depense')}
            className={`flex items-center gap-3.5 p-4 rounded-xl border text-left transition cursor-pointer ${
              type === 'depense'
                ? 'border-[#E74732] bg-[#FDECE9]/40 ring-1 ring-[#E74732]/30'
                : 'border-[#E6D9C4] bg-white hover:bg-[#FBF8F2]'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                type === 'depense'
                  ? 'bg-[#FDECE9] text-[#E74732]'
                  : 'bg-[#F7F3E9] text-[#6D818E]'
              }`}
            >
              <FileMinus className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#203F52]">Dépense</div>
              <div className="text-[11px] text-[#6D818E]">Sortie d'argent</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setType('recette');
              setErrors((prev) => {
                const copy = { ...prev };
                delete copy.receipt;
                return copy;
              });
            }}
            className={`flex items-center gap-3.5 p-4 rounded-xl border text-left transition cursor-pointer ${
              type === 'recette'
                ? 'border-[#3D9563] bg-[#E5F4EC]/50 ring-1 ring-[#3D9563]/30'
                : 'border-[#E6D9C4] bg-white hover:bg-[#FBF8F2]'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                type === 'recette'
                  ? 'bg-[#E5F4EC] text-[#3D9563]'
                  : 'bg-[#F7F3E9] text-[#6D818E]'
              }`}
            >
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#203F52]">Recette</div>
              <div className="text-[11px] text-[#6D818E]">Entrée d'argent</div>
            </div>
          </button>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">
              Montant (DZD)
            </label>
            <input
              type="number"
              min="0"
              step="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#203F52] placeholder:text-[#96A7B2] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40 ${
                errors.amount ? 'border-[#E74732]' : 'border-[#E6D9C4]'
              }`}
            />
            {errors.amount && (
              <p className="text-xs text-[#E74732] mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40 ${
                errors.date ? 'border-[#E74732]' : 'border-[#E6D9C4]'
              }`}
            />
            {errors.date && <p className="text-xs text-[#E74732] mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TransactionCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] bg-white text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#203F52] mb-1.5">
              Événement associé
            </label>
            <select
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6D9C4] bg-white text-sm text-[#203F52] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40"
            >
              {EVENTS.map((ev) => (
                <option key={ev} value={ev}>
                  {ev === '—' ? 'Aucun événement' : ev}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-bold text-[#203F52] mb-1.5">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez précisément cette transaction..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#203F52] placeholder:text-[#96A7B2] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40 ${
              errors.description ? 'border-[#E74732]' : 'border-[#E6D9C4]'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-[#E74732] mt-1">{errors.description}</p>
          )}
        </div>
      </section>

      {/* Card 2: Justificatif */}
      <section className="bg-white border border-[#E6D9C4] rounded-2xl p-6 shadow-card max-w-4xl">
        <div className="pb-4 border-b border-[#E6D9C4]/70 mb-5">
          <h2 className="font-editorial text-lg font-bold text-[#203F52]">Justificatif</h2>
          <p className="text-xs text-[#6D818E] mt-0.5">
            {type === 'depense'
              ? 'Obligatoire pour toute dépense.'
              : 'Optionnel pour une recette (bordereau ou attestation).'}
          </p>
        </div>

        <FileUpload
          value={receipt}
          onChange={setReceipt}
          error={errors.receipt}
        />
      </section>

      {/* Bottom actions */}
      <div className="flex flex-wrap items-center justify-end gap-3 max-w-4xl">
        <SecondaryButton onClick={() => handleSubmit(true)}>
          Enregistrer en brouillon
        </SecondaryButton>
        <PrimaryButton onClick={() => handleSubmit(false)}>
          Enregistrer la transaction
        </PrimaryButton>
      </div>
    </div>
  );
};
