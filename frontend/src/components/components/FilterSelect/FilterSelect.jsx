import Icon from '../Icon/Icon';
import styles from './FilterSelect.module.css';

// Looks like a button ("Role: all") but is a real <select>: the select is invisible
// and covers the button, so clicking opens the normal dropdown (keyboard-friendly too).
export default function FilterSelect({ label, value, options, onChange }) {
  const current = options.find((option) => option.value === value);

  return (
    <label className={styles.wrapper}>
      <Icon name="filter" size={18} />
      <span className={styles.text}>
        {label}: <span className={styles.value}>{current?.label}</span>
      </span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
