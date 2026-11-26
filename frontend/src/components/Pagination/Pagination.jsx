import styles from './Pagination.module.css';

export default function Pagination({ page, totalPages, onPageChange, summary }) {
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav className={styles.footer} aria-label="Pagination">
      <p className={styles.summary}>{summary}</p>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onPageChange(page - 1)}
          disabled={isFirst}
        >
          Previous
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => onPageChange(page + 1)}
          disabled={isLast}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
