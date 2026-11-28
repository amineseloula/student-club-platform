import React, { useRef, useState } from 'react';
import { FileText, Image as ImageIcon, Trash2, Upload } from 'lucide-react';

interface UploadedFileInfo {
  name: string;
  sizeLabel: string;
  previewUrl?: string;
}

interface FileUploadProps {
  value?: UploadedFileInfo | null;
  onChange: (file: UploadedFileInfo | null) => void;
  accept?: string;
  maxSizeMb?: number;
  title?: string;
  helperText?: string;
  error?: string;
  multiple?: false;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSizeMb = 5,
  title = 'Déposez le reçu ici',
  helperText = 'PDF, JPG ou PNG · 5 Mo max.',
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setLocalError(null);
    const allowedExt = accept
      .split(',')
      .map((s) => s.trim().toLowerCase());
    const fileExt = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
    if (!allowedExt.includes(fileExt)) {
      setLocalError(`Format non pris en charge (${fileExt}). Utilisez ${accept}.`);
      return;
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      setLocalError(`Le fichier dépasse la taille maximale de ${maxSizeMb} Mo.`);
      return;
    }
    const sizeKb = file.size / 1024;
    const sizeLabel =
      sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} Mo` : `${Math.max(1, Math.round(sizeKb))} Ko`;
    const isImage = file.type.startsWith('image/');
    if (isImage) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          name: file.name,
          sizeLabel,
          previewUrl: typeof reader.result === 'string' ? reader.result : undefined,
        });
      };
      reader.readAsDataURL(file);
    } else {
      onChange({ name: file.name, sizeLabel });
    }
  };

  const displayError = localError || error;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />

      {value ? (
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-[#E6D9C4] bg-[#FBF8F2]">
          <div className="flex items-center gap-3 min-w-0">
            {value.previewUrl ? (
              <img
                src={value.previewUrl}
                alt={value.name}
                className="w-11 h-11 rounded-lg object-cover border border-[#E6D9C4] shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-lg bg-[#E6F2FA] text-[#4A9BD5] flex items-center justify-center shrink-0">
                {value.name.toLowerCase().endsWith('.pdf') ? (
                  <FileText className="w-5 h-5" />
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#203F52] truncate">{value.name}</p>
              <p className="text-xs text-[#6D818E]">{value.sizeLabel} · Fichier prêt</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg border border-[#E6D9C4] bg-white text-xs font-semibold text-[#203F52] hover:bg-[#F7F3E9] cursor-pointer"
            >
              Remplacer
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Supprimer le fichier"
              className="p-2 rounded-lg border border-[#FDECE9] bg-[#FDECE9] text-[#E74732] hover:bg-[#fbd9d3] transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`rounded-2xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition ${
            dragActive
              ? 'border-[#4A9BD5] bg-[#E6F2FA]/30'
              : displayError
                ? 'border-[#E74732] bg-[#FDECE9]/25'
                : 'border-[#DDD0BA] bg-[#FBF9F4] hover:border-[#4A9BD5]/70'
          }`}
        >
          <div className="w-10 h-10 mx-auto rounded-full bg-white border border-[#E6D9C4]/70 flex items-center justify-center text-[#4A9BD5] shadow-sm mb-3">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-[#203F52]">{title}</p>
          <p className="text-xs text-[#7C8F9B] mt-1">{helperText}</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="mt-4 inline-flex items-center px-4 py-2 rounded-xl bg-white border border-[#E6D9C4] text-xs font-semibold text-[#203F52] shadow-sm hover:bg-[#F7F3E9] transition cursor-pointer"
          >
            Parcourir
          </button>
        </div>
      )}

      {displayError && (
        <p className="text-xs font-medium text-[#E74732] mt-2">{displayError}</p>
      )}
    </div>
  );
};
