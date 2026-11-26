import Icon from '../Icon/Icon';
import styles from './InfoBanner.module.css';

export default function InfoBanner({ tone = 'info', icon = 'file', title, children, onDismiss }) {
  const role = tone === 'danger' ? 'alert' : tone === 'success' ? 'status' : undefined;

  return (
    <div className={`${styles.banner} ${styles[tone]}`} role={role}>
      <Icon name={icon} size={20} className={styles.icon} />
      <div className={styles.text}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.body}>{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className={styles.close} onClick={onDismiss} aria-label="Close message">
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
