// Organized public website content & mock data for Pages 2–7 and Page 9.
// Connects with existing board mocks (events.js) where applicable.
import lacLg from '../assets/member/lac-lg.jpg';
import lacBanner from '../assets/member/lac-noir-banner.jpg';
import volleyballLg from '../assets/member/volleyball-lg.jpg';
import soireeThumb from '../assets/member/soiree-thumb.jpg';
import heroFriends from '../assets/home/hero-friends.jpg';
import aboutCampfire from '../assets/home/about-campfire.jpg';
import galleryWaterfall from '../assets/home/gallery-waterfall.jpg';
import { getEvents } from './events';

const PUBLIC_EVENT_EXTRAS = {
  1: {
    slug: 'lac-noir',
    title: 'Sortie Lac Noir',
    category: 'outing',
    categoryLabel: 'Sorties & découvertes',
    dateLabel: '26 avril 2025',
    day: '26',
    month: 'AVR',
    timeLabel: '06:30 – 19:00',
    location: 'Akfadou, Béjaïa',
    meetingPoint: 'Entrée principale du campus ESTIN',
    image: lacLg,
    bannerImage: lacBanner,
    shortDescription:
      "Une journée au cœur de la forêt de l'Akfadou entre sentiers ombragés, panoramas et pique-nique au bord du lac.",
    fullDescription: [
      "Partons ensemble à la découverte du mystérieux Lac Noir niché dans le massif forestier de l'Akfadou. Cette sortie mêle randonnée accessible à tous les niveaux, pauses photo et grand pique-nique collectif.",
      "Le transport aller-retour en bus au départ du campus ESTIN, l'encadrement par les membres expérimentés du LDC ainsi qu'une collation matinale sont inclus dans la participation."
    ],
    schedule: [
      { time: '06:30', label: 'Rassemblement et départ en bus devant le campus ESTIN' },
      { time: '09:00', label: 'Arrivée à la lisière de la forêt et début de la randonnée' },
      { time: '12:30', label: 'Pique-nique partagé et jeux collectifs au bord du Lac Noir' },
      { time: '16:30', label: 'Descente vers le point de rendez-vous et collation' },
      { time: '19:00', label: 'Retour estimé au campus ESTIN' },
    ],
    requirements: ['Chaussures de marche', '1,5 L d’eau', 'Déjeuner personnel', 'Veste légère'],
  },
  2: {
    slug: 'volleyball',
    title: 'Tournoi de Volleyball',
    category: 'sport',
    categoryLabel: 'Sport & tournois',
    dateLabel: '3 mai 2025',
    day: '03',
    month: 'MAI',
    timeLabel: '09:00 – 16:30',
    location: 'Campus ESTIN',
    meetingPoint: 'Terrain sportif du campus',
    image: volleyballLg,
    bannerImage: volleyballLg,
    shortDescription:
      'Rassemble ton équipe sur le terrain du campus pour une journée sportive, conviviale et ouverte à toutes les promos.',
    fullDescription: [
      'Le grand tournoi de printemps du LDC revient sur le terrain de l’ESTIN ! Que tu viennes pour remporter la coupe ou simplement partager un bon moment entre amis, la bonne humeur est garantie.',
      'Des rafraîchissements seront disponibles sur place toute la journée avec une animation musicale entre les matchs.'
    ],
    schedule: [
      { time: '09:00', label: 'Accueil des équipes et tirage au sort des poules' },
      { time: '09:45', label: 'Phase de groupes' },
      { time: '13:30', label: 'Demi-finales et petite finale' },
      { time: '15:30', label: 'Grande finale et remise des trophées' },
    ],
    requirements: ['Tenue de sport', 'Baskets adaptées', 'Bouteille d’eau'],
  },
  3: {
    slug: 'soiree-musique',
    title: 'Soirée Musique & Feu',
    category: 'culture',
    categoryLabel: 'Culture & musique',
    dateLabel: '10 mai 2025',
    day: '10',
    month: 'MAI',
    timeLabel: '18:00 – 22:30',
    location: 'Cap Carbon, Béjaïa',
    meetingPoint: 'Parking du foyer étudiant ESTIN',
    image: soireeThumb,
    bannerImage: soireeThumb,
    shortDescription:
      'Guitare acoustique, feu de camp et échanges chaleureux face à la mer pour clôturer la semaine.',
    fullDescription: [
      'Une parenthèse musicale sous les étoiles face aux falaises de Cap Carbon. Apportez vos guitares, percussions ou simplement votre envie de chanter et d’écouter.',
      'Boissons chaudes et encas seront servis autour du feu pour faire connaissance avec les membres de toutes les promotions.'
    ],
    schedule: [
      { time: '18:00', label: 'Départ du bus depuis le campus' },
      { time: '19:00', label: 'Installation du campement et allumage du feu' },
      { time: '19:45', label: 'Scène ouverte acoustique et jeux de groupe' },
      { time: '22:30', label: 'Retour vers Amizour' },
    ],
    requirements: ['Pull chaud', 'Lampe de poche ou frontale', 'Instrument (optionnel)'],
  },
  4: {
    slug: 'concours-dessin',
    title: 'Atelier & Concours Création',
    category: 'creation',
    categoryLabel: 'Création & expression',
    dateLabel: '17 mai 2025',
    day: '17',
    month: 'MAI',
    timeLabel: '13:30 – 17:30',
    location: 'Foyer étudiant ESTIN',
    meetingPoint: 'Salle polyvalente',
    image: heroFriends,
    bannerImage: heroFriends,
    shortDescription:
      'Exprime ta créativité autour du thème « Nature & Vie étudiante » lors d’un après-midi dessin, photo et carnets de voyage.',
    fullDescription: [
      'Ouvert aux dessinateurs, photographes et curieux, cet atelier met à l’honneur les récits visuels de nos sorties.',
      'Le matériel de base est fourni par le club et les meilleures créations seront exposées lors de la journée culturelle.'
    ],
    schedule: [
      { time: '13:30', label: 'Présentation du thème et distribution du matériel' },
      { time: '14:00', label: 'Session de création libre et conseils entre pairs' },
      { time: '16:45', label: 'Exposition éphémère et vote du public' },
    ],
    requirements: ['Carnet personnel (optionnel)', 'Bonne humeur'],
  },
  5: {
    slug: 'randonnee-hivernale',
    title: 'Randonnée Hivernale Djurdjura',
    category: 'outing',
    categoryLabel: 'Sorties & découvertes',
    dateLabel: '22 février 2025',
    day: '22',
    month: 'FÉV',
    timeLabel: '06:00 – 19:30',
    location: 'Tikjda, Djurdjura',
    meetingPoint: 'Entrée principale ESTIN',
    image: galleryWaterfall,
    bannerImage: galleryWaterfall,
    shortDescription:
      'Ascension sur les crêtes enneigées de Tikjda avec chocolats chauds au sommet et retour en musique.',
    fullDescription: [
      'Une journée mémorable dans les hauteurs du Djurdjura pour profiter de l’air pur et des paysages hivernaux entre étudiants.'
    ],
    schedule: [
      { time: '06:00', label: 'Départ du campus' },
      { time: '09:30', label: 'Marche sur les sentiers de Tikjda' },
      { time: '19:30', label: 'Retour au campus' },
    ],
    requirements: ['Vêtements chauds', 'Chaussures imperméables'],
  },
  6: {
    slug: 'beach-volleyball',
    title: 'Journée Beach Volley',
    category: 'sport',
    categoryLabel: 'Sport & tournois',
    dateLabel: '8 mars 2025',
    day: '08',
    month: 'MAR',
    timeLabel: '09:30 – 17:00',
    location: 'Plage de Tichy, Béjaïa',
    meetingPoint: 'Campus ESTIN',
    image: aboutCampfire,
    bannerImage: aboutCampfire,
    shortDescription:
      'Tournoi amical sur le sable de Tichy suivi d’un moment convivial en bord de mer.',
    fullDescription: [
      'Une sortie sportive en plein air qui a réuni six équipes autour d’un grand tournoi sur la plage de Tichy.'
    ],
    schedule: [
      { time: '09:30', label: 'Arrivée sur la plage et échauffement' },
      { time: '10:30', label: 'Matchs de poules et finales' },
      { time: '17:00', label: 'Retour à Amizour' },
    ],
    requirements: ['Casquette', 'Crème solaire', 'Eau'],
  },
  7: {
    slug: 'sortie-gouraya',
    title: 'Escapade Parc National de Gouraya',
    category: 'outing',
    categoryLabel: 'Sorties & découvertes',
    dateLabel: '24 mai 2025',
    day: '24',
    month: 'MAI',
    timeLabel: '07:30 – 17:30',
    location: 'Gouraya, Béjaïa',
    meetingPoint: 'Entrée principale ESTIN',
    image: lacBanner,
    bannerImage: lacBanner,
    shortDescription:
      'Sentier côtier entre mer et falaise jusqu’au sommet de Yemma Gouraya (sortie annulée en raison des prévisions météo).',
    fullDescription: [
      'Cette randonnée sur les hauteurs de Gouraya est temporairement annulée en raison d’un avis météorologique défavorable. Elle sera reprogrammée très prochainement.'
    ],
    schedule: [
      { time: '07:30', label: 'Départ prévu du campus' },
      { time: '12:00', label: 'Pause panoramique' },
    ],
    requirements: ['Baskets de marche', 'Coupe-vent'],
  },
};

export const PUBLIC_EVENT_CATEGORIES = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'outing', label: 'Sorties & découvertes' },
  { value: 'sport', label: 'Sport & tournois' },
  { value: 'culture', label: 'Culture & musique' },
  { value: 'creation', label: 'Création & expression' },
];

const REGISTERED_EVENTS_KEY = 'ldc_public_registered_events_v1';

export function getRegisteredEventIds() {
  try {
    const raw = window.localStorage.getItem(REGISTERED_EVENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleEventRegistration(eventId) {
  const numId = Number(eventId);
  const current = getRegisteredEventIds();
  const exists = current.includes(numId);
  const next = exists ? current.filter((id) => id !== numId) : [...current, numId];
  try {
    window.localStorage.setItem(REGISTERED_EVENTS_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage errors
  }
  return { isRegistered: !exists, registeredIds: next };
}

export function getPublicEvents() {
  const registeredIds = getRegisteredEventIds();
  const boardEvents = getEvents().map((evt) => {
    const extra = PUBLIC_EVENT_EXTRAS[evt.id] || {};
    const status = evt.status === 'draft' ? 'open' : evt.status;
    const extraReg = registeredIds.includes(evt.id) ? 1 : 0;
    const registered = Math.min(evt.capacity, evt.registered + extraReg);

    return {
      id: evt.id,
      slug: extra.slug || String(evt.id),
      title: extra.title || evt.name,
      category: extra.category || evt.category,
      categoryLabel: extra.categoryLabel || 'Sorties & découvertes',
      date: evt.date,
      dateLabel: extra.dateLabel || evt.date,
      day: extra.day || evt.date.slice(8, 10),
      month: extra.month || 'MAI',
      timeLabel: extra.timeLabel || (evt.startTime ? `${evt.startTime}` : 'Toute la journée'),
      location: extra.location || evt.location || 'Campus ESTIN',
      meetingPoint: extra.meetingPoint || evt.meetingPoint || 'Campus ESTIN',
      price: evt.price,
      priceLabel: evt.price > 0 ? `${evt.price.toLocaleString('fr-FR')} DZD` : 'Gratuit',
      capacity: evt.capacity,
      registered,
      status: status === 'open' && registered >= evt.capacity ? 'full' : status,
      image: extra.image || evt.image || lacLg,
      bannerImage: extra.bannerImage || extra.image || evt.image || lacBanner,
      shortDescription: extra.shortDescription || evt.description || 'Un moment convivial organisé par le LDC.',
      fullDescription: extra.fullDescription || [
        evt.description || 'Rejoins les membres du LDC pour vivre cet événement étudiant au grand air.',
      ],
      schedule: extra.schedule || [{ time: evt.startTime || '09:00', label: 'Accueil des participants' }],
      requirements: extra.requirements || ['Carte d’étudiant'],
      isUserRegistered: registeredIds.includes(evt.id),
    };
  });

  // Append cancelled sample event (id: 7) so all 4 status indicators (Open, Full, Cancelled, Past) are showcased.
  const cancelledExtra = PUBLIC_EVENT_EXTRAS[7];
  const cancelledEvent = {
    id: 7,
    slug: cancelledExtra.slug,
    title: cancelledExtra.title,
    category: cancelledExtra.category,
    categoryLabel: cancelledExtra.categoryLabel,
    date: '2025-05-24',
    dateLabel: cancelledExtra.dateLabel,
    day: cancelledExtra.day,
    month: cancelledExtra.month,
    timeLabel: cancelledExtra.timeLabel,
    location: cancelledExtra.location,
    meetingPoint: cancelledExtra.meetingPoint,
    price: 900,
    priceLabel: '900 DZD',
    capacity: 40,
    registered: 18,
    status: 'cancelled',
    image: cancelledExtra.image,
    bannerImage: cancelledExtra.bannerImage,
    shortDescription: cancelledExtra.shortDescription,
    fullDescription: cancelledExtra.fullDescription,
    schedule: cancelledExtra.schedule,
    requirements: cancelledExtra.requirements,
    isUserRegistered: false,
  };

  return [...boardEvents, cancelledEvent];
}

export function getPublicEventByIdOrSlug(idOrSlug) {
  const list = getPublicEvents();
  return list.find((evt) => String(evt.id) === String(idOrSlug) || evt.slug === idOrSlug) || null;
}

export const NEWS_ARTICLES = [
  {
    id: 'nouvelle-saison',
    featured: true,
    date: '18 AVRIL 2025',
    category: 'Vie du club',
    title: "Une nouvelle saison, la même envie d'explorer",
    excerpt:
      'Nouveaux itinéraires, ateliers en plein air et sorties de printemps : découvrez tout ce que le bureau vous prépare pour ce semestre.',
    intro:
      "Le printemps s'installe sur le campus d'Amizour et le calendrier du LDC s'enrichit de nouvelles expéditions entre mer, forêt et rencontres étudiantes.",
    author: { name: 'Amine Meziane', role: 'Président · LDC', initials: 'AM', color: '#398F60' },
    readTime: '3 min de lecture',
    image: heroFriends,
    sections: [
      {
        heading: 'Un programme pensé par et pour les étudiants',
        paragraphs: [
          "Cette nouvelle saison s'ouvre avec la même conviction qui anime le LDC depuis 2020 : offrir aux étudiants de l'ESTIN un espace vivant pour respirer, découvrir la région et tisser des amitiés sincères en dehors des amphithéâtres.",
          "Au programme des prochaines semaines : l'expédition au Lac Noir dans le massif de l'Akfadou, le grand tournoi inter-promos de volleyball et nos veillées musicales face à la mer."
        ],
      },
      {
        heading: 'Comment réserver ta place dans le bus ?',
        paragraphs: [
          'Les inscriptions ouvrent deux semaines avant chaque événement directement depuis la page Événements ou lors de nos permanences du mardi et du jeudi.',
          "Chaque inscrit reçoit ensuite son billet QR personnel pour embarquer rapidement le matin du départ."
        ],
      },
    ],
    quote: '« On oublie parfois un cours magistral, jamais un lever de soleil partagé au sommet avec sa promo. »',
    relatedIds: ['retour-soiree', 'tournoi-volleyball'],
  },
  {
    id: 'retour-soiree',
    featured: false,
    date: '11 AVRIL 2025',
    category: 'Récit',
    title: 'Retour sur notre soirée musique',
    excerpt:
      'Plus de soixante étudiants réunis autour du feu pour une parenthèse acoustique inoubliable sous les étoiles.',
    intro:
      'Retour en mots et en émotions sur une veillée qui a rassemblé musiciens amateurs, conteurs et nouveaux arrivants.',
    author: { name: 'Yasmine Amrani', role: 'Vice-présidente', initials: 'YA', color: '#DC452E' },
    readTime: '4 min de lecture',
    image: soireeThumb,
    sections: [
      {
        heading: 'Une scène ouverte face à la mer',
        paragraphs: [
          'Vendredi dernier, les guitares, percussions et chants étudiants ont résonné jusque tard dans la nuit lors de notre veillée mensuelle.',
          "Entre boissons chaudes et discussions spontanées, nouveaux arrivants et anciens du club ont partagé un moment simple et chaleureux loin de la pression des examens."
        ],
      },
      {
        heading: 'Rendez-vous le mois prochain',
        paragraphs: [
          'Devant l’enthousiasme général, une deuxième édition est déjà programmée le 10 mai à Cap Carbon. Préparez vos morceaux !'
        ],
      },
    ],
    quote: '« Il suffit d’une guitare, d’un feu de camp et de soixante voix pour transformer une soirée ordinaire en souvenir durable. »',
    relatedIds: ['nouvelle-saison', 'kefrida-bilan'],
  },
  {
    id: 'tournoi-volleyball',
    featured: false,
    date: '04 AVRIL 2025',
    category: 'Sport',
    title: 'Le tournoi de volleyball revient',
    excerpt:
      'Formez vos équipes de six joueurs et venez défendre vos couleurs lors du grand rendez-vous sportif du mois de mai.',
    intro:
      'Le terrain du campus s’apprête à vibrer au rythme des smashes, des encouragements et de la convivialité étudiante.',
    author: { name: 'Riad Saadi', role: 'Trésorier & Logistique', initials: 'RS', color: '#F7B900' },
    readTime: '2 min de lecture',
    image: volleyballLg,
    sections: [
      {
        heading: 'Modalités d’inscription',
        paragraphs: [
          'Le traditionnel tournoi de printemps du LDC fait son grand retour sur le terrain du campus ESTIN le samedi 3 mai.',
          'Que vous soyez compétiteur aguerri ou simplement là pour l’ambiance, l’événement est ouvert gratuitement à tous les étudiants.'
        ],
      },
    ],
    quote: '« L’esprit d’équipe sur le terrain est le même que sur les sentiers : on avance ensemble. »',
    relatedIds: ['nouvelle-saison', 'partenariat-equipement'],
  },
  {
    id: 'kefrida-bilan',
    featured: false,
    date: '27 MARS 2025',
    category: 'Sorties',
    title: 'Kefrida : 45 étudiants sous les cascades',
    excerpt:
      'Retour sur notre randonnée printanière aux gorges de Kherrata et à la cascade de Kefrida sous un soleil radieux.',
    intro:
      'Une escapade rafraîchissante qui a marqué l’ouverture des sorties du second semestre.',
    author: { name: 'Lina Nouri', role: 'Secrétaire générale', initials: 'LN', color: '#4B96C5' },
    readTime: '3 min de lecture',
    image: galleryWaterfall,
    sections: [
      {
        heading: 'Une matinée entre falaises et fraîcheur',
        paragraphs: [
          'Dès 7 heures du matin, le bus affichait complet. Après une marche accessible le long des gorges, le groupe a profité de la fraîcheur de la cascade pour un grand déjeuner collectif.'
        ],
      },
    ],
    quote: '« À deux heures du campus, la nature offre un dépaysement total dont on ressort plein d’énergie. »',
    relatedIds: ['nouvelle-saison', 'retour-soiree'],
  },
  {
    id: 'appel-musiciens',
    featured: false,
    date: '19 MARS 2025',
    category: 'Culture',
    title: 'Appel aux talents pour les veillées culturelles',
    excerpt:
      'Guitaristes, photographes, poètes ou amateurs de théâtre : rejoignez la cellule Création & Expression du LDC.',
    intro:
      'Le club ouvre un espace dédié aux expressions artistiques étudiantes pour animer nos soirées et carnets de voyage.',
    author: { name: 'Yasmine Amrani', role: 'Vice-présidente', initials: 'YA', color: '#DC452E' },
    readTime: '2 min de lecture',
    image: aboutCampfire,
    sections: [
      {
        heading: 'Un tremplin bienveillant',
        paragraphs: [
          'Pas besoin d’être professionnel pour monter sur la scène de nos soirées feu de camp : l’essentiel est l’envie de partager.'
        ],
      },
    ],
    quote: '« Chaque talent étudiant mérite une scène chaleureuse pour s’exprimer librement. »',
    relatedIds: ['retour-soiree', 'nouvelle-saison'],
  },
  {
    id: 'partenariat-equipement',
    featured: false,
    date: '10 MARS 2025',
    category: 'Vie du club',
    title: 'Guide pratique : bien préparer sa première rando',
    excerpt:
      'Chaussures, hydratation, sac léger : nos conseils simples pour profiter pleinement de tes sorties sans mauvaise surprise.',
    intro:
      'Tu n’as jamais fait de randonnée en montagne ? Voici l’essentiel à glisser dans ton sac avant de monter dans le bus.',
    author: { name: 'Amine Meziane', role: 'Président · LDC', initials: 'AM', color: '#398F60' },
    readTime: '4 min de lecture',
    image: lacLg,
    sections: [
      {
        heading: 'Les trois indispensables',
        paragraphs: [
          'Une paire de baskets ou chaussures à semelle crantée, au moins 1,5 L d’eau et un coupe-vent léger font toute la différence sur les sentiers de Kabylie.'
        ],
      },
    ],
    quote: '« Bien préparé, chaque kilomètre devient un plaisir plutôt qu’un effort. »',
    relatedIds: ['kefrida-bilan', 'nouvelle-saison'],
  },
  {
    id: 'bilan-integration',
    featured: false,
    date: '25 FÉVRIER 2025',
    category: 'Communauté',
    title: 'Journée d’intégration : bienvenue aux 1re année',
    excerpt:
      'Plus de 90 nouveaux étudiants ont découvert l’esprit LDC lors d’une journée jeux, défis et pique-nique géant.',
    intro:
      'Accueil chaleureux pour la nouvelle promotion avec des équipes mixtes et de belles rencontres dès les premiers jours.',
    author: { name: 'Lina Nouri', role: 'Secrétaire générale', initials: 'LN', color: '#4B96C5' },
    readTime: '3 min de lecture',
    image: lacBanner,
    sections: [
      {
        heading: 'Briser la glace dès le premier mois',
        paragraphs: [
          'Grâce aux ateliers par équipes mêlant anciens et nouveaux, chacun a pu repartir avec des repères sur le campus et de nouveaux visages familiers.'
        ],
      },
    ],
    quote: '« L’accueil est la première promesse du LDC : personne ne reste à l’écart. »',
    relatedIds: ['nouvelle-saison', 'tournoi-volleyball'],
  },
];

export function getNewsArticleById(id) {
  return NEWS_ARTICLES.find((item) => item.id === id) || null;
}

export const GALLERY_ALBUMS = [
  {
    id: 'akfadou-2025',
    title: 'Randonnée Lac Noir & Akfadou',
    dateLabel: 'Printemps 2025',
    location: 'Massif de l’Akfadou, Béjaïa',
    size: 'large',
    coverImage: lacLg,
    description: 'Des sentiers ombragés jusqu’aux rives paisibles du Lac Noir.',
    photos: [
      { id: 'ak-1', image: lacLg, caption: 'Pâturages et falaises du Lac Noir', location: 'Akfadou, Béjaïa' },
      { id: 'ak-2', image: lacBanner, caption: 'Panorama sur les crêtes rocheuses', location: 'Massif de l’Akfadou' },
      { id: 'ak-3', image: heroFriends, caption: 'Pause sourire au bord de l’eau', location: 'Lac Noir, 2025' },
    ],
  },
  {
    id: 'kefrida-escapade',
    title: 'Cascades de Kefrida',
    dateLabel: 'Mars 2025',
    location: 'Kherrata · Béjaïa',
    size: 'standard',
    coverImage: galleryWaterfall,
    description: 'Fraîcheur, embruns et fou-rires au pied de la grande cascade.',
    photos: [
      { id: 'kf-1', image: galleryWaterfall, caption: 'Sous les embruns de Kefrida', location: 'Cascade de Kefrida' },
      { id: 'kf-2', image: heroFriends, caption: 'Compagnons de sentier', location: 'Gorges de Kherrata' },
    ],
  },
  {
    id: 'soirees-feu',
    title: 'Veillées & Feu de camp',
    dateLabel: 'Saison 2024–2025',
    location: 'Cap Carbon & Forêt',
    size: 'standard',
    coverImage: soireeThumb,
    description: 'Guitares acoustiques, flammes dorées et discussions tardives.',
    photos: [
      { id: 'sf-1', image: soireeThumb, caption: 'Chants acoustiques sous les étoiles', location: 'Cap Carbon' },
      { id: 'sf-2', image: aboutCampfire, caption: 'Lumière dorée autour du foyer', location: 'Forêt d’Akfadou' },
    ],
  },
  {
    id: 'tournois-campus',
    title: 'Tournois Sportifs ESTIN',
    dateLabel: 'Saison 2025',
    location: 'Campus Amizour',
    size: 'wide',
    coverImage: volleyballLg,
    description: 'Matchs acharnés, esprit d’équipe et encouragements tout au long de l’année.',
    photos: [
      { id: 'sp-1', image: volleyballLg, caption: 'Service décisif sur le sable', location: 'Campus ESTIN' },
      { id: 'sp-2', image: aboutCampfire, caption: 'Débriefing d’après-match', location: 'Amizour' },
    ],
  },
  {
    id: 'vie-communaute',
    title: 'Esprit LDC & Golden Hour',
    dateLabel: '2020 – 2025',
    location: 'ESTIN Béjaïa',
    size: 'standard',
    coverImage: aboutCampfire,
    description: 'Les visages et les rires qui font battre le cœur du club.',
    photos: [
      { id: 'vc-1', image: aboutCampfire, caption: 'Cercle de discussion en forêt', location: 'Akfadou' },
      { id: 'vc-2', image: heroFriends, caption: 'Amitiés forgées en sortie', location: 'Béjaïa' },
      { id: 'vc-3', image: lacLg, caption: 'Dernier regard avant le retour', location: 'Lac Noir' },
    ],
  },
];

export const ABOUT_PILLARS = [
  {
    number: '01',
    title: 'Sorties & découvertes',
    description:
      'Randonnées en montagne, cascades, bivouacs et escapades côtières pour explorer les trésors naturels de Kabylie et d’Algérie.',
    tone: 'green',
    icon: 'compass',
  },
  {
    number: '02',
    title: 'Sport & tournois',
    description:
      'Tournois de volleyball, défis inter-promos et journées sportives en plein air pour cultiver l’énergie et le fair-play.',
    tone: 'red',
    icon: 'trophy',
  },
  {
    number: '03',
    title: 'Culture & musique',
    description:
      'Veillées acoustiques autour du feu, scènes ouvertes et cercles d’échanges pour vibrer au rythme de nos talents.',
    tone: 'blue',
    icon: 'music',
  },
  {
    number: '04',
    title: 'Création & expression',
    description:
      'Ateliers photo, carnets de voyage, dessin et projets collaboratifs pour raconter nos aventures autrement.',
    tone: 'yellow',
    icon: 'spark',
  },
];

export const EXECUTIVE_COMMITTEE = [
  { initials: 'AM', name: 'Amine Meziane', role: 'Président', color: '#398F60', textColor: '#FFFFFF' },
  { initials: 'YA', name: 'Yasmine Amrani', role: 'Vice-présidente', color: '#DC452E', textColor: '#FFFFFF' },
  { initials: 'LN', name: 'Lina Nouri', role: 'Secrétaire générale', color: '#4B96C5', textColor: '#FFFFFF' },
  { initials: 'RS', name: 'Riad Saadi', role: 'Trésorier & Logistique', color: '#F7B900', textColor: '#203D50' },
];

export const PRIVACY_SECTIONS = [
  {
    id: 'collecte',
    number: '01',
    title: 'Collecte des données personnelles',
    summary:
      'Le LDC (Leisure & Discovery Club) collecte uniquement les informations strictement nécessaires à la gestion de la vie associative, des adhésions et de la sécurité lors des sorties.',
    details: [
      'Les données sont recueillies directement auprès de vous lors de votre demande d’adhésion, de votre inscription à un événement ou via le formulaire de contact du site.',
      'Aucune donnée n’est collectée à votre insu ni revendue à des tiers commerciaux.'
    ],
  },
  {
    id: 'types',
    number: '02',
    title: 'Types d’informations collectées',
    summary:
      'Nous enregistrons uniquement des données d’identification académique et de contact adaptées aux activités du club.',
    details: [
      'Identité et profil étudiant : nom complet, prénom, numéro d’étudiant ESTIN, filière et année d’étude.',
      'Coordonnées : adresse e-mail universitaire ou personnelle et numéro de téléphone pour les urgences lors des déplacements.',
      'Activité associative : historique d’inscription aux événements, présence et statut de cotisation annuelle.',
      'Messages de contact : nom, adresse e-mail, objet et contenu transmis via la page Contact.'
    ],
  },
  {
    id: 'finalites',
    number: '03',
    title: 'Finalité du traitement des données',
    summary:
      'Vos informations servent exclusivement à organiser les activités étudiantes et assurer un accueil fiable.',
    details: [
      'Gérer les listes de participants, les réservations de transport et les listes d’attente des sorties.',
      'Émettre les billets QR et les attestations de participation aux événements.',
      'Répondre aux questions, idées et demandes de partenariat envoyées via le formulaire de contact.',
      'Communiquer les annonces importantes (changements d’horaire ou consignes de sécurité).'
    ],
  },
  {
    id: 'conservation',
    number: '04',
    title: 'Conservation et sécurité',
    summary:
      'Les données sont conservées pour la durée de l’année universitaire active et protégées contre tout accès non autorisé.',
    details: [
      'Seuls les membres autorisés du bureau exécutif (Président, Bureau, Trésorier) accèdent aux outils d’administration et à la messagerie de contact.',
      'Les archives des anciens mandats sont anonymisées ou supprimées au terme d’un délai maximal de 24 mois après la fin de l’adhésion.'
    ],
  },
  {
    id: 'droits',
    number: '05',
    title: 'Vos droits et contact',
    summary:
      'Vous disposez à tout moment d’un droit d’accès, de rectification et de suppression de vos données personnelles.',
    details: [
      'Vous pouvez demander la mise à jour ou l’effacement de vos informations en écrivant à contact@ldc-estin.dz ou en passant aux permanences du club.',
      'Toute demande reçoit une réponse du bureau dans un délai maximum de 7 jours ouvrables.'
    ],
  },
];
