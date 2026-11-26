import { useId } from "react";

/* Label + control + optional hint / error. `adornment` is placed inside the control (e.g. eye button). */
export default function Field({ label, as = "input", error, hint, adornment, children, className = "", id, ...props }) {
  const auto = useId();
  const fid = id ?? auto;
  const note = error || hint;
  const Tag = as;
  return (
    <div className={`field ${error ? "field--invalid" : ""} ${className}`}>
      <label className="field__label" htmlFor={fid}>{label}</label>
      <div className="field__wrap">
        <Tag
          id={fid}
          className="field__control"
          aria-invalid={error ? true : undefined}
          aria-describedby={note ? `${fid}-note` : undefined}
          {...props}
        >
          {children}
        </Tag>
        {adornment}
      </div>
      {note && (
        <p id={`${fid}-note`} className={error ? "field__error" : "field__hint"} role={error ? "alert" : undefined}>
          {note}
        </p>
      )}
    </div>
  );
}
