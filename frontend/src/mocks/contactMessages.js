// Seed contact messages shared between Page 8 (Contact) and Page 52 (Board Contact Messages Inbox).
// TODO: remove seed fallback once backend /api/contact-messages endpoint is connected to a database.

export const INITIAL_CONTACT_MESSAGES = [
  {
    id: 101,
    fullName: 'Sofiane Haddad',
    email: 'sofiane.haddad@estin.dz',
    subject: 'Adhésion au club',
    message:
      "Bonjour l'équipe LDC ! Je suis étudiant en 1re année CP à l'ESTIN et j'aimerais savoir quand auront lieu les prochaines permanences pour finaliser mon adhésion et régler la cotisation annuelle.",
    createdAt: '2025-04-22T09:15:00Z',
    isRead: false,
    consentAccepted: true,
  },
  {
    id: 102,
    fullName: 'Meriem Benali',
    email: 'm.benali@estin.dz',
    subject: 'Sortie Lac Noir',
    message:
      "Salut ! Pour la randonnée du 26 avril au Lac Noir, est-ce qu'il reste encore des places dans le bus ? Je souhaite aussi savoir si des bâtons de marche sont nécessaires pour le sentier.",
    createdAt: '2025-04-21T17:42:00Z',
    isRead: false,
    consentAccepted: true,
  },
  {
    id: 103,
    fullName: 'Karim Ziani',
    email: 'karim.ziani@gmail.com',
    subject: 'Partenariat & Sponsoring',
    message:
      "Bonjour, je représente une boutique d'équipement outdoor à Béjaïa. Nous serions ravis d'offrir des réductions aux membres du LDC et de sponsoriser vos prochains tournois universitaires.",
    createdAt: '2025-04-20T14:10:00Z',
    isRead: true,
    consentAccepted: true,
  },
  {
    id: 104,
    fullName: 'Ines Boudiaf',
    email: 'ines.boudiaf@estin.dz',
    subject: 'Tournoi de Volleyball',
    message:
      'Bonjour, notre équipe de 6 joueuses souhaite s’inscrire au tournoi de volleyball du 3 mai. Faut-il un capitaine membre actif ou tous les membres de l’équipe doivent-ils être inscrits au club ?',
    createdAt: '2025-04-18T11:30:00Z',
    isRead: true,
    consentAccepted: true,
  },
];
