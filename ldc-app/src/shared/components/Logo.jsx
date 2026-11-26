import { IMAGES } from "../images.js";

/* Shows the real logo when IMAGES.logo is set, otherwise a simple placeholder. */
export default function Logo({ className = "" }) {
  if (IMAGES.logo) return <img src={IMAGES.logo} alt="LDC" className={className} />;

  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="Logo LDC (placeholder)">
      <rect width="64" height="64" rx="12" fill="#e9efe9" />
      <path d="M8 46 24 24l9 12 6-8 17 18z" fill="#4a8c5c" />
      <circle cx="46" cy="18" r="6" fill="#ecba3d" />
    </svg>
  );
}
