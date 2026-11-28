import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  className = '',
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5B400] hover:bg-[#E0A300] active:scale-[0.99] text-[#203F52] font-semibold text-sm transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${className}`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

export const DarkButton: React.FC<ButtonProps> = ({
  children,
  icon,
  className = '',
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#203F52] hover:bg-[#183140] active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${className}`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  className = '',
  ...props
}) => (
  <button
    type="button"
    {...props}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#FBF8F2] active:scale-[0.99] text-[#203F52] border border-[#E6D9C4] font-semibold text-sm transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${className}`}
  >
    {icon}
    <span>{children}</span>
  </button>
);
