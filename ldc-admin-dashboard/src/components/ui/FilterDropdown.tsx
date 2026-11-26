import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  onChange,
  options,
  icon,
  className = '',
  ariaLabel,
}) => {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#203F52] pointer-events-none">
          {icon}
        </span>
      )}
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none bg-white border border-[#E6D9C4] rounded-xl py-2.5 pr-9 text-sm font-semibold text-[#203F52] hover:bg-[#FBF8F2] focus:outline-none focus:ring-2 focus:ring-[#F5B400]/40 focus:border-[#F5B400] cursor-pointer transition ${
          icon ? 'pl-10' : 'pl-3.5'
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-[#6D818E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};
