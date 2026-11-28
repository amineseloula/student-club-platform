import React from 'react';

export type BadgeVariant =
  | 'green'
  | 'red'
  | 'orange'
  | 'blue'
  | 'gray'
  | 'navy'
  | 'yellow';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  green: 'bg-[#E5F4EC] text-[#2F855A]',
  red: 'bg-[#FDECE9] text-[#D43E2A]',
  orange: 'bg-[#FAEBE0] text-[#C46A34]',
  blue: 'bg-[#E6F2FA] text-[#2E7EB8]',
  gray: 'bg-[#EDF1F4] text-[#607482]',
  navy: 'bg-[#203F52] text-white',
  yellow: 'bg-[#FEF5D6] text-[#9A6E00]',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'gray',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.06em] uppercase whitespace-nowrap ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {label}
    </span>
  );
};

export function getCategoryBadgeVariant(category: string): BadgeVariant {
  switch (category) {
    case 'Cotisations':
    case 'Partenariat':
      return 'green';
    case 'Autres':
      return 'gray';
    default:
      return 'blue';
  }
}
