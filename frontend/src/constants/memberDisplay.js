// Labels and badge colours for member roles, statuses and fees (pages 35 and 36).
export const ROLE_BADGE = {
  president: { label: 'President', tone: 'info' },
  board:     { label: 'Board',     tone: 'info' },
  treasurer: { label: 'Treasurer', tone: 'info' },
  member:    { label: 'Member',    tone: 'neutral' },
};

export const STATUS_BADGE = {
  active:   { label: 'Active',   tone: 'success' },
  inactive: { label: 'Inactive', tone: 'danger' },
};

export const FEE_BADGE = {
  paid:    { label: 'Paid',    tone: 'success' },
  pending: { label: 'Pending', tone: 'warning' },
  unpaid:  { label: 'Unpaid',  tone: 'danger' },
};
