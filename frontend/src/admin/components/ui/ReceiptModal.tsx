import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { PrimaryButton, SecondaryButton } from '../ui/Buttons';
import { LdcLogo } from '../ui/LdcLogo';
import { downloadReportSummaryFile } from '../../utils/formatters';

export interface ReceiptModalData {
  title: string;
  reference: string;
  date: string;
  amount: string;
  categoryOrMember: string;
  filename: string;
}

interface ReceiptModalProps {
  receipt: ReceiptModalData | null;
  onClose: () => void;
  onDownloaded?: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  onClose,
  onDownloaded,
}) => {
  if (!receipt) return null;

  const handleDownload = () => {
    downloadReportSummaryFile(
      receipt.filename.replace(/\.pdf$/i, ''),
      `Justificatif · ${receipt.title}`,
      [
        `Référence : ${receipt.reference}`,
        `Date : ${receipt.date}`,
        `Libellé / Membre : ${receipt.categoryOrMember}`,
        `Montant : ${receipt.amount}`,
        `Document : ${receipt.filename}`,
      ],
      'PDF'
    );
    onDownloaded?.();
  };

  return (
    <Modal
      isOpen={Boolean(receipt)}
      onClose={onClose}
      title="Aperçu du justificatif"
      subtitle={receipt.filename}
      size="md"
      footer={
        <>
          <SecondaryButton onClick={onClose}>Fermer</SecondaryButton>
          <PrimaryButton icon={<Download className="w-4 h-4" />} onClick={handleDownload}>
            Télécharger le reçu
          </PrimaryButton>
        </>
      }
    >
      <div className="rounded-2xl border border-[#E6D9C4] bg-[#FBF8F2] p-6">
        <div className="flex items-center justify-between border-b border-[#E6D9C4] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <LdcLogo size="sm" />
            <div>
              <div className="font-editorial font-bold text-sm text-[#203F52]">Club LDC by ESTIN</div>
              <div className="text-[11px] text-[#6D818E]">Justificatif comptable officiel</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F2FA] text-[#2E7EB8] text-[11px] font-bold">
            <FileText className="w-3.5 h-3.5" />
            PDF
          </span>
        </div>

        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[#6D818E]">Objet</dt>
            <dd className="font-semibold text-[#203F52] text-right">{receipt.title}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#6D818E]">Référence</dt>
            <dd className="font-mono text-xs text-[#203F52]">{receipt.reference}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#6D818E]">Date</dt>
            <dd className="font-medium text-[#203F52]">{receipt.date}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[#6D818E]">Catégorie / Détail</dt>
            <dd className="font-medium text-[#203F52]">{receipt.categoryOrMember}</dd>
          </div>
          <div className="flex justify-between gap-4 pt-3 border-t border-[#E6D9C4]">
            <dt className="font-semibold text-[#203F52]">Montant</dt>
            <dd className="font-editorial text-lg font-bold text-[#203F52]">{receipt.amount}</dd>
          </div>
        </dl>
      </div>
    </Modal>
  );
};
