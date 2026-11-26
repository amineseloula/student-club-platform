// Fake API for membership applications: demo data kept in memory.
// TODO: send decisions to the backend (approving should create the member).
let applications = [
  { id: 1, name: 'Lydia Bensaid',  email: 'lydia@estin.dz',  studentId: '2024/241', program: 'IA · 1A', sentAt: 'Today, 11:04',     tone: 'blue' },
  { id: 2, name: 'Karim Yahiaoui', email: 'karim@estin.dz',  studentId: '2023/098', program: 'SI · 2A', sentAt: 'Today, 09:12',     tone: 'red' },
  { id: 3, name: 'Sonia Madi',     email: 'sonia@estin.dz',  studentId: '2024/187', program: 'ST · 1A', sentAt: 'Yesterday, 17:30', tone: 'blue' },
  { id: 4, name: 'Arezki Rahmani', email: 'arezki@estin.dz', studentId: '2022/054', program: 'IA · 3A', sentAt: 'Yesterday, 14:22', tone: 'red' },
];

export function getApplications() {
  return applications;
}

export function decideApplication(id) {
  applications = applications.filter((application) => application.id !== id);
}
