import { Check, Circle } from "lucide-react";
import { evaluatePassword, PASSWORD_RULES } from "../utils/password.js";

/* 4-segment strength meter + checklist. Pass the current password as `value`. */
export default function PasswordStrength({ value }) {
  const { score, label, checks } = evaluatePassword(value);
  return (
    <div className="strength" aria-live="polite">
      <div className="strength__head">
        <div className={`strength__bar strength__bar--${score}`} role="meter" aria-valuemin={0} aria-valuemax={4} aria-valuenow={score} aria-label="Robustesse du mot de passe">
          {[1, 2, 3, 4].map((i) => <span key={i} className={i <= score ? "is-on" : ""} />)}
        </div>
        <span className={`strength__label strength__label--${score}`}>{label || "Robustesse"}</span>
      </div>
      <ul className="strength__rules">
        {PASSWORD_RULES.map((r) => (
          <li key={r.key} className={checks[r.key] ? "is-ok" : ""}>
            {checks[r.key] ? <Check size={13} strokeWidth={3} /> : <Circle size={13} />} {r.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
