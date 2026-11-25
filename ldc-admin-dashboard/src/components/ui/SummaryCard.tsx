import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  subtitleTone?: 'neutral' | 'success' | 'danger';
  variant?: 'default' | 'navy';
  icon?: React.ReactNode;
  valueFirst?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  subtitleTone = 'neutral',
  variant = 'default',
  icon,
  valueFirst = false,
}) => {
  const isNavy = variant === 'navy';

  const subtitleColor = isNavy
    ? 'text-[#B8CAD6]'
    : subtitleTone === 'danger'
      ? 'text-[#E74732]'
      : subtitleTone === 'success'
        ? 'text-[#3D9563]'
        : 'text-[#6D818E]';

  return (
    <div
      className={`rounded-2xl p-5 border transition-shadow ${
        isNavy
          ? 'bg-[#203F52] border-[#203F52] text-white shadow-elevated'
          : 'bg-white border-[#E6D9C4] text-[#203F52] shadow-card'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {valueFirst ? (
            <>
              <div className="font-editorial text-2xl sm:text-[26px] font-bold tracking-tight leading-tight">
                {value}
              </div>
              <div className={`text-xs mt-1.5 ${isNavy ? 'text-[#B8CAD6]' : 'text-[#6D818E]'}`}>
                {title}
              </div>
            </>
          ) : (
            <>
              <div className={`text-xs font-medium ${isNavy ? 'text-[#B8CAD6]' : 'text-[#6D818E]'}`}>
                {title}
              </div>
              <div className="font-editorial text-2xl sm:text-[26px] font-bold tracking-tight mt-2 leading-tight">
                {value}
              </div>
              {subtitle && (
                <div className={`text-[11px] font-medium mt-2 ${subtitleColor}`}>{subtitle}</div>
              )}
            </>
          )}
        </div>
        {icon && (
          <div className="shrink-0 mt-0.5">{icon}</div>
        )}
      </div>
    </div>
  );
};
