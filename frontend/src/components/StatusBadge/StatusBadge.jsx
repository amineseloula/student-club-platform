import styles from './StatusBadge.module.css';

export default function StatusBadge({ tone = 'neutral', children }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
