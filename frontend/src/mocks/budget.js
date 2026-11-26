// Demo budget figures (DZD) for the read-only budget page.
// TODO: load them from the backend (the treasurer manages them).
export const budget = {
  balance: 184250,
  updatedAt: 'Apr 20, 2025 at 18:42',
  summary: [
    { id: 'income',    label: 'Income · April',   amount: 128500, hint: '+18.2% vs March', hintTone: 'success' },
    { id: 'expenses',  label: 'Expenses · April', amount: 86450,  hint: '72% of the monthly budget' },
    { id: 'available', label: 'Available budget', amount: 97800,  hint: 'After commitments' },
  ],
  eventBudgets: [
    { id: 1, name: 'Lac Noir',    spent: 58200, planned: 65000 },
    { id: 2, name: 'SmashIT',     spent: 47850, planned: 45000 },
    { id: 3, name: 'Music night', spent: 21400, planned: 38000 },
  ],
  transactions: [
    { id: 1, title: 'Lac Noir transport',  category: 'Transport', date: '2025-04-18', amount: -42000 },
    { id: 2, title: 'Membership fees',     category: 'Income',    date: '2025-04-16', amount: 68500 },
    { id: 3, title: 'SmashIT equipment',   category: 'Equipment', date: '2025-04-14', amount: -18750 },
    { id: 4, title: 'TechLab partnership', category: 'Income',    date: '2025-04-06', amount: 35000 },
  ],
};
