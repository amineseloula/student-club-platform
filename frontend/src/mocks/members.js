// Fake API for members: demo data kept in memory (resets on page refresh).
// TODO: replace these functions with calls to the backend.
export const ROLES = [
  { value: 'president', label: 'President' },
  { value: 'board',     label: 'Board' },
  { value: 'treasurer', label: 'Treasurer' },
  { value: 'member',    label: 'Member' },
];

// TODO: confirm the full program names with the team.
export const PROGRAMS = {
  IA: 'Artificial Intelligence',
  SI: 'Information Systems',
  ST: 'Science & Technology',
};

let members = [
  {
    id: 1, name: 'Amine Meziane', email: 'amine@estin.dz', tone: 'green',
    role: 'president', status: 'active', fee: 'paid',
    studentId: '2022/031', clubId: 'LDC-2025-001', program: 'SI', year: 3,
    phone: '+213 555 10 20 30', joined: '2023-10-02', lastActivity: 'Today, 10:24',
    stats: { events: 14, attended: 13 },
    history: [
      { id: 1, name: 'Kherrata Waterfalls', date: '2025-04-12', status: 'present' },
      { id: 2, name: 'Welcome Night 2025',  date: '2025-02-22', status: 'present' },
    ],
  },
  {
    id: 2, name: 'Yasmine Amrane', email: 'yasmine@estin.dz', tone: 'red',
    role: 'board', status: 'active', fee: 'paid',
    studentId: '2022/087', clubId: 'LDC-2025-014', program: 'SI', year: 3,
    phone: '+213 555 11 22 33', joined: '2024-01-15', lastActivity: 'Yesterday, 18:20',
    stats: { events: 9, attended: 8 },
    history: [{ id: 1, name: 'Welcome Night 2025', date: '2025-02-22', status: 'present' }],
  },
  {
    id: 3, name: 'Lina Nait', email: 'lina@estin.dz', tone: 'blue',
    role: 'treasurer', status: 'active', fee: 'paid',
    studentId: '2022/112', clubId: 'LDC-2025-021', program: 'IA', year: 3,
    phone: '+213 555 44 55 66', joined: '2024-02-03', lastActivity: 'Apr 20, 18:42',
    stats: { events: 7, attended: 7 },
    history: [{ id: 1, name: 'SmashIT Tournament', date: '2025-02-08', status: 'present' }],
  },
  {
    id: 4, name: 'Nadia Messaoudi', email: 'nadia@estin.dz', tone: 'green',
    role: 'member', status: 'active', fee: 'paid',
    studentId: '2023/127', clubId: 'LDC-2025-127', program: 'IA', year: 2,
    phone: '+213 555 76 54 32', joined: '2025-01-14', lastActivity: 'Today, 09:42',
    stats: { events: 6, attended: 5 },
    history: [
      { id: 1, name: 'Kherrata Waterfalls', date: '2025-04-12', status: 'present' },
      { id: 2, name: 'Welcome Night 2025',  date: '2025-02-22', status: 'present' },
      { id: 3, name: 'SmashIT Tournament',  date: '2025-02-08', status: 'absent' },
    ],
  },
  {
    id: 5, name: 'Rania Khelifi', email: 'rania@estin.dz', tone: 'red',
    role: 'member', status: 'active', fee: 'pending',
    studentId: '2024/045', clubId: 'LDC-2025-160', program: 'IA', year: 1,
    phone: '+213 555 98 76 54', joined: '2025-02-10', lastActivity: 'Apr 18, 12:05',
    stats: { events: 2, attended: 2 },
    history: [{ id: 1, name: 'Welcome Night 2025', date: '2025-02-22', status: 'present' }],
  },
  {
    id: 6, name: 'Sarah Lounis', email: 'sarah@estin.dz', tone: 'blue',
    role: 'member', status: 'inactive', fee: 'unpaid',
    studentId: '2023/201', clubId: 'LDC-2024-088', program: 'SI', year: 2,
    phone: '+213 555 12 34 56', joined: '2024-03-01', lastActivity: 'Mar 2, 16:10',
    stats: { events: 3, attended: 1 },
    history: [{ id: 1, name: 'SmashIT Tournament', date: '2025-02-08', status: 'absent' }],
  },
  {
    id: 7, name: 'Ayoub Mokrani', email: 'ayoub@estin.dz', tone: 'green',
    role: 'member', status: 'active', fee: 'paid',
    studentId: '2024/112', clubId: 'LDC-2025-171', program: 'ST', year: 1,
    phone: '+213 555 65 43 21', joined: '2025-02-20', lastActivity: 'Apr 19, 08:15',
    stats: { events: 1, attended: 1 },
    history: [{ id: 1, name: 'Kherrata Waterfalls', date: '2025-04-12', status: 'present' }],
  },
];

export function getMembers() {
  return members;
}

export function getMemberById(id) {
  return members.find((member) => member.id === Number(id)) ?? null;
}

export function updateMember(id, changes) {
  members = members.map((member) => (member.id === Number(id) ? { ...member, ...changes } : member));
  return getMemberById(id);
}
