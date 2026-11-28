import React from 'react';
import { Modal } from './Modal';
import { DarkButton, PrimaryButton, SecondaryButton } from './Buttons';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'primary' | 'danger' | 'navy';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  tone = 'primary',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <>
          <SecondaryButton onClick={onClose}>{cancelLabel}</SecondaryButton>
          {tone === 'danger' ? (
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#E74732] hover:bg-[#cf3925] text-white font-semibold text-sm transition cursor-pointer"
            >
              {confirmLabel}
            </button>
          ) : tone === 'navy' ? (
            <DarkButton
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </DarkButton>
          ) : (
            <PrimaryButton
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </PrimaryButton>
          )}
        </>
      }
    >
      <p className="text-sm text-[#4D6372] leading-relaxed">{message}</p>
    </Modal>
  );
};
