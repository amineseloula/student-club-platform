// Dates are stored as "YYYY-MM-DD". We format them in UTC so the day
// never shifts because of the user's time zone.
const shortDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const longDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const numberFormat = new Intl.NumberFormat('en-US');

function toDate(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`);
}

export function formatDate(isoDate) {
  return isoDate ? shortDate.format(toDate(isoDate)) : '—';
}

export function formatDateLong(isoDate) {
  return isoDate ? longDate.format(toDate(isoDate)) : '—';
}

export function formatNumber(value) {
  return numberFormat.format(value);
}

export function formatMoney(amount) {
  return `${numberFormat.format(amount)} DZD`;
}

export function formatSignedMoney(amount) {
  const sign = amount < 0 ? '−' : '+';
  return `${sign} ${formatMoney(Math.abs(amount))}`;
}

export function shortName(fullName) {
  const [first, last] = fullName.split(' ');
  return last ? `${first} ${last[0]}.` : first;
}
