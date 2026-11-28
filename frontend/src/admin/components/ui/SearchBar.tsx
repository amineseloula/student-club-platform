import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Rechercher...',
  className = '',
}) => {
  return (
    <div className={`relative flex-1 ${className}`}>
      <Search className="w-4 h-4 text-[#8DA0AC] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#E6D9C4] text-sm text-[#203F52] placeholder:text-[#96A7B2] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40 focus:border-[#F5B400] transition"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8DA0AC] hover:text-[#203F52]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
