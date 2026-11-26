import styles from './DataTable.module.css';

// Generic table used by every list page.
// columns: [{ key, header, muted?, render?: (row) => JSX }] — without render, it shows row[key].
export default function DataTable({
  columns,
  rows,
  getRowKey = (row) => row.id,
  emptyMessage = 'Nothing to show.',
  minWidth = 820,
}) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table} style={{ minWidth }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((column) => (
                  <td key={column.key} className={column.muted ? styles.muted : undefined}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
