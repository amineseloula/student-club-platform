import styles from './Panel.module.css';

export default function Panel({ title, subtitle, action, flush = false, className = '', children }) {
  return (
    <section className={`${styles.panel} ${className}`}>
      {(title || action) && (
        <header className={styles.header}>
          <div>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </header>
      )}
      <div className={`${styles.body} ${flush ? styles.bodyFlush : ''}`}>{children}</div>
    </section>
  );
}
