/* Themed illustration for the error pages: a trail through the hills at sunset.
   variant "lost"  (404): a signpost with a question mark.
   variant "locked" (403): a closed gate with a padlock. */
export default function Scene({ variant = "lost", code = "404" }) {
  return (
    <div className="scene" role="img" aria-label={variant === "lost" ? "Un panneau perdu sur un sentier" : "Une barrière fermée sur un sentier"}>
      <span className="tape tape--tl" />
      <span className="tape tape--br" />
      <div className="scene__code" aria-hidden="true">{code}</div>
      <svg viewBox="0 0 360 230" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbf1d6" />
            <stop offset="1" stopColor="#fdfaf2" />
          </linearGradient>
        </defs>
        <rect width="360" height="230" fill="url(#sky)" />
        <circle cx="285" cy="62" r="24" fill="#ecba3d" />
        <circle cx="285" cy="62" r="34" fill="#ecba3d" opacity="0.2" />
        <path d="M0 150 70 88l42 48 46-62 66 76 40-34 96 52v62H0z" fill="#2c4660" />
        <path d="M0 172 60 126l50 40 54-46 72 62 50-38 74 42v64H0z" fill="#4a8c5c" />
        <path d="M0 196c70-26 130-14 180-6s120 22 180-8v48H0z" fill="#3b7a4c" />
        {/* trail */}
        <path d="M150 230c8-24 24-38 36-48 8-7 6-14-4-18" fill="none" stroke="#f2e9d6" strokeWidth="14" strokeLinecap="round" />
        <path d="M150 230c8-24 24-38 36-48 8-7 6-14-4-18" fill="none" stroke="#ecba3d" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
        {variant === "lost" ? (
          <g>
            <rect x="82" y="104" width="7" height="82" rx="3" fill="#233a52" />
            <path d="M89 108h54l14 13-14 13H89z" fill="#ecba3d" stroke="#233a52" strokeWidth="3" strokeLinejoin="round" />
            <path d="M82 144H36l-12 12 12 12h46z" fill="#fdfaf2" stroke="#233a52" strokeWidth="3" strokeLinejoin="round" />
            <text x="115" y="127" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="16" fill="#233a52">?</text>
            <text x="56" y="162" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="14" fill="#cf5238">???</text>
          </g>
        ) : (
          <g>
            <rect x="82" y="120" width="7" height="68" rx="3" fill="#233a52" />
            <rect x="250" y="120" width="7" height="68" rx="3" fill="#233a52" />
            <rect x="89" y="132" width="161" height="9" rx="3" fill="#8a6a3a" />
            <rect x="89" y="156" width="161" height="9" rx="3" fill="#8a6a3a" />
            <path d="M89 132l161 33M89 165l161-33" stroke="#8a6a3a" strokeWidth="6" strokeLinecap="round" />
            <rect x="146" y="124" width="38" height="34" rx="7" fill="#ecba3d" stroke="#233a52" strokeWidth="3" />
            <path d="M154 124v-10a11 11 0 0 1 22 0v10" fill="none" stroke="#233a52" strokeWidth="4" strokeLinecap="round" />
            <circle cx="165" cy="140" r="4" fill="#233a52" />
          </g>
        )}
      </svg>
    </div>
  );
}
