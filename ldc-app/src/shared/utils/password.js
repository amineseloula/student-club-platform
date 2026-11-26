/* Password rules (keep identical on the backend):
   at least 8 characters, one lowercase, one uppercase, one digit. A symbol makes it stronger. */
export function evaluatePassword(pw = "") {
  const checks = {
    length: pw.length >= 8,
    mixedCase: /[a-z]/.test(pw) && /[A-Z]/.test(pw),
    digit: /\d/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
  };
  let score = Object.values(checks).filter(Boolean).length; // 0–4
  if (!checks.length) score = Math.min(score, 1);
  if (!pw) score = 0;
  const labels = ["", "Très faible", "Faible", "Correct", "Excellent"];
  return {
    checks,
    score,
    label: labels[score],
    acceptable: checks.length && checks.mixedCase && checks.digit,
  };
}

export const PASSWORD_RULES = [
  { key: "length", label: "8 caractères minimum" },
  { key: "mixedCase", label: "Majuscule et minuscule" },
  { key: "digit", label: "Au moins un chiffre" },
  { key: "symbol", label: "Un symbole (recommandé)" },
];
