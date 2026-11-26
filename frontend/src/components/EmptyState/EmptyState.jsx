import IconTile from '../IconTile/IconTile';
import styles from './EmptyState.module.css';

export default function EmptyState({ icon = 'info', title, children, action }) {
  return (
    <div className={styles.wrapper}>
      <IconTile icon={icon} tone="blue" size="lg" />
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.text}>{children}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
