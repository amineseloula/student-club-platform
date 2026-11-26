// Demo participants and waiting list for the event management page.
// TODO: the backend should return the real lists of each event (for now every event shows these rows).
export const sampleParticipants = [
  { id: 1, memberId: 4, name: 'Nadia Messaoudi', email: 'nadia@estin.dz',   program: 'IA · 2A', status: 'present',   tone: 'green' },
  { id: 2, memberId: 2, name: 'Yasmine Amrane',  email: 'yasmine@estin.dz', program: 'SI · 3A', status: 'confirmed', tone: 'red' },
  { id: 3, memberId: 5, name: 'Rania Khelifi',   email: 'rania@estin.dz',   program: 'IA · 1A', status: 'confirmed', tone: 'red' },
  { id: 4, memberId: 6, name: 'Sarah Lounis',    email: 'sarah@estin.dz',   program: 'SI · 2A', status: 'absent',    tone: 'blue' },
  { id: 5, memberId: 7, name: 'Ayoub Mokrani',   email: 'ayoub@estin.dz',   program: 'ST · 1A', status: 'confirmed', tone: 'green' },
];

export const sampleWaitlist = [
  { id: 101, memberId: null, name: 'Lydia Bensaid', email: 'lydia@estin.dz', program: 'IA · 1A', status: 'waitlist', position: 1, tone: 'blue' },
  { id: 102, memberId: null, name: 'Imane Ouali',   email: 'imane@estin.dz', program: 'SI · 1A', status: 'waitlist', position: 2, tone: 'red' },
  { id: 103, memberId: null, name: 'Yanis Haddad',  email: 'yanis@estin.dz', program: 'ST · 1A', status: 'waitlist', position: 3, tone: 'green' },
  { id: 104, memberId: null, name: 'Meriem Saadi',  email: 'meriem@estin.dz', program: 'IA · 2A', status: 'waitlist', position: 4, tone: 'blue' },
];
