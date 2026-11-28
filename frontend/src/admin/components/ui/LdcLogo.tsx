import React from 'react';

interface LdcLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LdcLogo: React.FC<LdcLogoProps> = ({ size = 'md' }) => {
  const dims =
    size === 'sm' ? 'w-9 h-9 rounded-lg' : size === 'lg' ? 'w-14 h-14 rounded-2xl' : 'w-11 h-11 rounded-xl';

  return (
    <div
      className={`${dims} bg-white border border-[#E6D9C4]/70 shadow-sm flex items-center justify-center shrink-0 overflow-hidden p-1`}
      aria-label="Logo Club LDC"
    >
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sun */}
        <circle cx="48" cy="14" r="6" fill="#F5B400" />
        {/* Mountains */}
        <path d="M6 42L22 18L36 37L45 25L58 42H6Z" fill="#4A9BD5" opacity="0.9" />
        <path d="M18 24L22 18L26 24L22 22L18 24Z" fill="#FFFFFF" />
        {/* Pine tree */}
        <path d="M13 42L17 29L21 42H13Z" fill="#3D9563" />
        <rect x="16" y="42" width="2" height="4" fill="#203F52" />
        {/* Yellow Van / Bus */}
        <rect x="21" y="31" width="26" height="14" rx="4" fill="#F5B400" stroke="#203F52" strokeWidth="2.2" />
        <rect x="24" y="34" width="6" height="5" rx="1" fill="#E6F2FA" stroke="#203F52" strokeWidth="1.4" />
        <rect x="32" y="34" width="6" height="5" rx="1" fill="#E6F2FA" stroke="#203F52" strokeWidth="1.4" />
        <rect x="40" y="34" width="4" height="5" rx="1" fill="#E6F2FA" stroke="#203F52" strokeWidth="1.4" />
        {/* Wheels */}
        <circle cx="28" cy="46" r="3.2" fill="#203F52" />
        <circle cx="28" cy="46" r="1.2" fill="#FFFFFF" />
        <circle cx="41" cy="46" r="3.2" fill="#203F52" />
        <circle cx="41" cy="46" r="1.2" fill="#FFFFFF" />
        {/* Grass base */}
        <path d="M6 49C18 46 46 46 58 49" stroke="#3D9563" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};
