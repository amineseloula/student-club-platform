import styles from './Form.module.css';

export function Field({ label, htmlFor, required = false, hint, error, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className={styles.error}>
          {error}
        </p>
      ) : (
        hint && <p className={styles.hint}>{hint}</p>
      )}
    </div>
  );
}

export function FormGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

export function TextInput({ invalid = false, ...props }) {
  return (
    <input
      className={`${styles.control} ${invalid ? styles.invalid : ''}`}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${props.id}-error` : undefined}
      {...props}
    />
  );
}

export function TextArea({ invalid = false, rows = 6, inputRef, ...props }) {
  return (
    <textarea
      ref={inputRef}
      rows={rows}
      className={`${styles.control} ${styles.textarea} ${invalid ? styles.invalid : ''}`}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${props.id}-error` : undefined}
      {...props}
    />
  );
}

export function Select({ options, invalid = false, ...props }) {
  return (
    <select
      className={`${styles.control} ${styles.select} ${invalid ? styles.invalid : ''}`}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function Checkbox({ label, ...props }) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}

export function Toggle({ id, label, description, checked, onChange }) {
  return (
    <div className={styles.toggleRow}>
      <div>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {description && <p className={styles.hint}>{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.toggleKnob} />
      </button>
    </div>
  );
}
