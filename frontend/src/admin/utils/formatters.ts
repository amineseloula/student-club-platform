export function formatDzd(value: number, options?: { showSign?: boolean; type?: 'depense' | 'recette' }): string {
  const formatted = Math.abs(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (options?.showSign && options?.type) {
    return `${options.type === 'recette' ? '+' : '−'} ${formatted} DZD`;
  }
  if (value < 0) {
    return `− ${formatted} DZD`;
  }
  return `${formatted} DZD`;
}

export function formatSignedDiff(diff: number): string {
  const formatted = Math.abs(diff)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (diff > 0) return `+ ${formatted} DZD`;
  if (diff < 0) return `− ${formatted} DZD`;
  return `0 DZD`;
}

const FR_MONTHS_SHORT = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sep',
  'Oct',
  'Nov',
  'Déc',
];

const FR_MONTHS_LOWER = [
  'janv.',
  'févr.',
  'mars',
  'avr.',
  'mai',
  'juin',
  'juil.',
  'août',
  'sept.',
  'oct.',
  'nov.',
  'déc.',
];

export function formatIsoToShortFr(isoDate: string): string {
  if (!isoDate) return '—';
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  const day = String(d).padStart(2, '0');
  const month = FR_MONTHS_SHORT[m - 1] ?? '';
  return `${day} ${month} ${y}`;
}

export function formatIsoToLowerFr(isoDate: string): string {
  if (!isoDate) return '—';
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  const day = String(d).padStart(2, '0');
  const month = FR_MONTHS_LOWER[m - 1] ?? '';
  return `${day} ${month} ${y}`;
}

export function downloadCsv(filename: string, headers: string[], rows: Array<Array<string | number>>): void {
  const escape = (val: string | number) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes(';')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent =
    '\uFEFF' +
    [headers.map(escape).join(';'), ...rows.map((r) => r.map(escape).join(';'))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadReportSummaryFile(
  filename: string,
  title: string,
  lines: string[],
  format: 'PDF' | 'Excel'
): void {
  if (format === 'Excel') {
    downloadCsv(
      filename.endsWith('.csv') ? filename : `${filename}.csv`,
      ['Rubrique', 'Valeur'],
      lines.map((line) => {
        const idx = line.indexOf(':');
        if (idx !== -1) {
          return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
        }
        return [line, ''];
      })
    );
    return;
  }

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<style>
  body { font-family: Georgia, serif; background: #F7F3E9; color: #203F52; padding: 48px; }
  .sheet { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #E6D9C4; border-radius: 16px; padding: 40px; }
  .badge { display: inline-block; background: #F5B400; color: #203F52; font-family: sans-serif; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.08em; }
  h1 { margin: 16px 0 8px; font-size: 28px; }
  hr { border: none; border-top: 2px solid #F5B400; width: 64px; margin: 16px 0 24px; }
  p { font-family: sans-serif; font-size: 14px; line-height: 1.7; margin: 6px 0; color: #3D5564; }
</style>
</head>
<body>
  <div class="sheet">
    <span class="badge">CLUB LDC BY ESTIN · RAPPORT FINANCIER</span>
    <h1>${title}</h1>
    <hr />
    ${lines.map((l) => `<p>${l}</p>`).join('\n    ')}
  </div>
</body>
</html>`;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.html') ? filename : `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
