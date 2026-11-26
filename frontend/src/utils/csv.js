// Builds a CSV file in the browser and downloads it (used by the "Export" buttons).
// columns: [{ header: 'Name', value: (row) => row.name }, ...]

function escapeCell(value) {
  let text = String(value ?? '');

  // A cell starting with = + - @ could be run as a formula by Excel, so we neutralise it.
  if (/^[=+\-@]/.test(text)) {
    text = `'${text}`;
  }

  if (/[",\n\r]/.test(text)) {
    text = `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export function downloadCsv(filename, columns, rows) {
  const header = columns.map((column) => escapeCell(column.header)).join(',');
  const lines = rows.map((row) => columns.map((column) => escapeCell(column.value(row))).join(','));

  // \uFEFF tells Excel the file is UTF-8, so accented letters display correctly.
  const content = '\uFEFF' + [header, ...lines].join('\r\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
