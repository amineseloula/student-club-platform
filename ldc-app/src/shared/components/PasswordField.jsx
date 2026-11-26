import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Field from "./Field.jsx";

/* Password input with a show / hide toggle. Same props as Field. */
export default function PasswordField(props) {
  const [shown, setShown] = useState(false);
  return (
    <Field
      {...props}
      type={shown ? "text" : "password"}
      className={`field--pw ${props.className ?? ""}`}
      adornment={
        <button
          type="button"
          className="field__toggle"
          onClick={() => setShown((s) => !s)}
          aria-label={shown ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={shown}
        >
          {shown ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}
