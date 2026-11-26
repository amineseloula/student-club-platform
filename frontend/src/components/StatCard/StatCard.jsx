import IconTile from '../IconTile/IconTile';
import styles from './StatCard.module.css';

export default function StatCard({ icon, tone = 'green', label, value, unit, hint, hintTone, size = 'md', children }) {
  return (
    <article className={styles.card}>
      {icon && <IconTile icon={icon} tone={tone} size="lg" />}
      <div className={styles.text}>
        <p className={styles.label}>{label}</p>
        <p className={`${styles.value} ${size === 'lg' ? styles.valueLarge : ''}`}>
          <span className={styles.number}>{value}</span>
          {unit && <span className={styles.unit}>{unit}</span>}
        </p>
        {children}
        {hint && <p className={`${styles.hint} ${hintTone === 'success' ? styles.hintSuccess : ''}`}>{hint}</p>}
      </div>
    </article>
  );
}
