import React from 'react';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  itemLabel = 'éléments',
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(totalItems, currentPage * pageSize);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-[#E6D9C4]/70 text-xs text-[#6D818E]">
      <span>
        {start}–{end} sur {totalItems} {itemLabel}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3.5 py-1.5 rounded-lg border border-[#E6D9C4] bg-white text-[#203F52] font-medium hover:bg-[#FBF8F2] disabled:opacity-45 disabled:pointer-events-none transition cursor-pointer"
        >
          Précédent
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3.5 py-1.5 rounded-lg border border-[#E6D9C4] bg-white text-[#203F52] font-medium hover:bg-[#FBF8F2] disabled:opacity-45 disabled:pointer-events-none transition cursor-pointer"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
