import styles from './SegmentedControl.module.css';

export default function SegmentedControl({ options, value, onChange, label }) {
  return (
    <div className={styles.group} role="group" aria-label={label}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.option} ${isActive ? styles.active : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
