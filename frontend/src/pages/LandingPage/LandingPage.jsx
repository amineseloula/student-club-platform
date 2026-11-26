import { useState, useEffect } from 'react';
import styles from './LandingPage.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import EventCard from '../../components/EventCard/EventCard';
import NewsCard from '../../components/NewsCard/NewsCard';
import GalleryLightbox from '../../components/GalleryLightbox/GalleryLightbox';
import { navigate } from '../../router/hashRouter';

import clubLogo from '../../assets/logo.jpg';
import lacLg from '../../assets/member/lac-lg.jpg';
import volleyballLg from '../../assets/member/volleyball-lg.jpg';
import soireeThumb from '../../assets/member/soiree-thumb.jpg';
import heroFriends from '../../assets/home/hero-friends.jpg';
import aboutCampfire from '../../assets/home/about-campfire.jpg';
import galleryWaterfall from '../../assets/home/gallery-waterfall.jpg';

const STATS = [
  { value: '2020', label: 'Année de création' },
  { value: '280+', label: 'Membres réunis' },
  { value: '80+', label: 'Événements vécus' },
  { value: '1.4K', label: 'Abonnés en ligne' },
];

const UPCOMING_EVENTS = [
  {
    id: 'lac-noir',
    title: 'Sortie Lac Noir',
    category: 'SORTIE & NATURE',
    categoryTone: 'green',
    day: '26',
    month: 'AVR',
    tag: 'RANDONNÉE · 06:30',
    description:
      "Une journée au cœur de l'Akfadou entre sentiers forestiers, panoramas et pique-nique au bord du lac.",
    location: 'Akfadou, Béjaïa',
    price: '1 500 DZD',
    image: lacLg,
  },
  {
    id: 'volleyball',
    title: 'Tournoi de Volleyball',
    category: 'SPORT',
    categoryTone: 'light',
    day: '03',
    month: 'MAI',
    tag: 'TOURNOI · 09:30',
    description:
      'Rassemble ton équipe sur le terrain du campus pour une matinée sportive, conviviale et ouverte à tous.',
    location: 'Campus ESTIN',
    price: 'Gratuit',
    image: volleyballLg,
  },
  {
    id: 'soiree-musique',
    title: 'Soirée Musique & Feu',
    category: 'CULTURE & PARTAGE',
    categoryTone: 'green',
    day: '10',
    month: 'MAI',
    tag: 'SOIRÉE · 18:00',
    description:
      'Guitare acoustique, feu de camp et échanges chaleureux face à la mer pour clôturer la semaine.',
    location: 'Cap Carbon',
    price: '600 DZD',
    image: soireeThumb,
  },
];

const LATEST_NEWS = [
  {
    id: 'nouvelle-saison',
    date: '18 AVRIL 2025',
    category: 'VIE DU CLUB',
    title: "Une nouvelle saison, la même envie d'explorer",
    excerpt:
      'Nouveaux itinéraires, ateliers en plein air et sorties de printemps : découvrez le programme préparé par le bureau.',
    image: heroFriends,
    fullText: [
      "Cette nouvelle saison s'ouvre avec la même conviction qui anime le LDC depuis 2020 : offrir aux étudiants de l'ESTIN un espace vivant pour respirer, découvrir la région et tisser des amitiés sincères.",
      "Au programme des prochaines semaines : l'expédition au Lac Noir dans le massif de l'Akfadou, le grand tournoi inter-promos de volleyball et nos veillées musicales face à la mer.",
      'Les inscriptions ouvrent progressivement pour chaque sortie directement au stand du club ou auprès des membres du bureau.'
    ],
  },
  {
    id: 'retour-soiree',
    date: '11 AVRIL 2025',
    category: 'RÉCIT',
    title: 'Retour sur notre soirée musique',
    excerpt:
      'Plus de soixante étudiants réunis autour du feu pour une parenthèse acoustique inoubliable sous les étoiles.',
    image: soireeThumb,
    fullText: [
      'Vendredi dernier, les guitares, percussions et chants étudiants ont résonné jusque tard dans la nuit lors de notre veillée mensuelle.',
      "Entre boissons chaudes et discussions spontanées, nouveaux arrivants et anciens du club ont partagé un moment simple et chaleureux loin de la pression des examens.",
      'Merci à tous les musiciens bénévoles et à notre équipe logistique pour cette belle réussite.'
    ],
  },
  {
    id: 'tournoi-volleyball',
    date: '04 AVRIL 2025',
    category: 'SPORT',
    title: 'Le tournoi de volleyball revient',
    excerpt:
      'Formez vos équipes de six joueurs et venez défendre vos couleurs lors du rendez-vous sportif du mois de mai.',
    image: volleyballLg,
    fullText: [
      'Le traditionnel tournoi de printemps du LDC fait son grand retour sur le terrain du campus ESTIN le samedi 3 mai.',
      'Que vous soyez compétiteur aguerri ou simplement là pour l’ambiance, l’événement est ouvert gratuitement à tous les étudiants.',
      'Inscrivez votre équipe avant le 30 avril pour garantir votre créneau dans le tableau.'
    ],
  },
];

const GALLERY_ITEMS = [
  {
    id: 'kefrida',
    image: galleryWaterfall,
    caption: 'Cascade de Kefrida',
    location: 'Sortie printemps · Béjaïa',
    tiltClass: 'polaroidOne',
  },
  {
    id: 'estin-volley',
    image: volleyballLg,
    caption: 'Tournoi ESTIN',
    location: 'Campus Amizour',
    tiltClass: 'polaroidTwo',
  },
  {
    id: 'akfadou-night',
    image: soireeThumb,
    caption: 'Veillée Akfadou',
    location: 'Nuit sous les pins',
    tiltClass: 'polaroidThree',
  },
  {
    id: 'campfire-circle',
    image: aboutCampfire,
    caption: 'Autour du feu',
    location: 'Pause conviviale en forêt',
    tiltClass: 'polaroidFour',
  },
  {
    id: 'lac-noir-2024',
    image: lacLg,
    caption: 'Lac Noir, 2024',
    location: 'Massif de l’Akfadou',
    tiltClass: 'polaroidFive',
  },
];

const EXECUTIVE_TEAM = [
  {
    initials: 'AM',
    name: 'Amine Meziane',
    role: 'Président',
    color: '#398D5D',
    textColor: '#ffffff',
  },
  {
    initials: 'YA',
    name: 'Yasmine Amrani',
    role: 'Vice-présidente',
    color: '#E94B32',
    textColor: '#ffffff',
  },
  {
    initials: 'LN',
    name: 'Lina Nouri',
    role: 'Secrétaire générale',
    color: '#4A90C2',
    textColor: '#ffffff',
  },
  {
    initials: 'RS',
    name: 'Riad Saadi',
    role: 'Trésorier & Logistique',
    color: '#F5B800',
    textColor: '#203B4D',
  },
];

export default function LandingPage({ onLoginClick, onJoinClick }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [infoModal, setInfoModal] = useState(null);

  useEffect(() => {
    if (!activeArticle && !infoModal) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveArticle(null);
        setInfoModal(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeArticle, infoModal]);

  const openJoinModal = () => {
    setInfoModal({
      badge: 'SAISON 2025 – 2026',
      title: 'Rejoindre le LDC',
      paragraphs: [
        "Les adhésions sont ouvertes à tous les étudiants de l'ESTIN ! Passe nous voir lors de nos permanences chaque mardi et jeudi entre 12h et 14h au foyer étudiant.",
        "Tu peux aussi nous écrire à contact@ldc-estin.dz pour réserver ta place dans le prochain bus."
      ],
      actionLabel: 'Voir les prochaines sorties',
      actionHref: '#evenements',
    });
  };

  const openLoginModal = () => {
    setInfoModal({
      badge: 'ESPACE MEMBRE',
      title: 'Connexion membre LDC',
      paragraphs: [
        "L'accès à l'espace membre s'effectue avec ton compte étudiant activé lors de ton inscription auprès du bureau.",
        "Besoin d'activer ton accès ou de récupérer ton billet QR ? Rapproche-toi du bureau exécutif pendant les permanences."
      ],
      actionLabel: 'Contacter le bureau',
      actionHref: '#contact',
    });
  };

  const handleJoinTrigger = () => {
    if (onJoinClick) {
      onJoinClick();
    } else {
      openJoinModal();
    }
  };

  const handleLoginTrigger = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      openLoginModal();
    }
  };

  return (
    <div className={styles.pageShell}>
      <Navbar activePath="/" onLoginClick={handleLoginTrigger} onJoinClick={handleJoinTrigger} />

      <main className={styles.mainContent}>
        {/* ── B. HERO SECTION ── */}
        <section className={styles.heroSection} id="accueil">
          <div className={styles.heroDecorRing} aria-hidden="true" />
          <div className={styles.heroDecorRingInner} aria-hidden="true" />

          <div className={styles.sectionContainer}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <span className={styles.heroBadge}>
                  <span className={styles.heroBadgeDot} aria-hidden="true" />
                  CLUB ÉTUDIANT · DEPUIS 2020
                </span>

                <h1 className={styles.heroTitle}>
                  <span className={styles.heroTitleNavy}>Human first,</span>
                  <br />
                  <span className={styles.heroTitleTerracotta}>Student second.</span>
                </h1>

                <p className={styles.heroSubtitle}>
                  À l&apos;ESTIN, on explore la nature, on partage des moments authentiques et on grandit ensemble — avant même d&apos;être étudiants.
                </p>

                <div className={styles.heroButtonGroup}>
                  <a
                    href="#rejoindre"
                    className={styles.btnPrimary}
                    onClick={(e) => {
                      e.preventDefault();
                      handleJoinTrigger();
                    }}
                  >
                    <span>Rejoindre le club</span>
                    <span aria-hidden="true">→</span>
                  </a>

                  <a href="#/evenements" className={styles.btnSecondary}>
                    Découvrir nos événements
                  </a>
                </div>

                <p className={styles.heroKeywords} aria-label="Valeurs du club">
                  <span>EXPLORE</span>
                  <span className={styles.keywordDot} aria-hidden="true">·</span>
                  <span>LEARN</span>
                  <span className={styles.keywordDot} aria-hidden="true">·</span>
                  <span>CONNECT</span>
                </p>
              </div>

              <div className={styles.heroVisual}>
                <div className={styles.heroPhotoComposition}>
                  <figure className={styles.heroPolaroid}>
                    <div className={styles.heroPhotoWrap}>
                      <img
                        src={heroFriends}
                        alt="Membres du LDC en sortie au bord d'un lac"
                        className={styles.heroPhoto}
                      />
                    </div>
                    <figcaption className={styles.heroPolaroidCaption}>
                      Sortie intégration · LDC ESTIN
                    </figcaption>
                  </figure>

                  <div className={styles.heroLogoSeal} aria-hidden="true">
                    <img src={clubLogo} alt="" className={styles.heroLogoImage} />
                  </div>

                  <div className={styles.heroStickyNote}>
                    <span className={styles.stickyTag}>Prochaine sortie</span>
                    <span className={styles.stickyText}>Lac Noir · 26 Avril →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── C. STATISTICS BAR ── */}
        <section className={styles.statsSection} aria-label="Chiffres clés du club">
          <div className={styles.sectionContainer}>
            <div className={styles.statsGrid}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <span className={styles.statNumber}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── D. UPCOMING EVENTS ── */}
        <section className={styles.eventsSection} id="evenements">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeaderLeft}>
              <span className={styles.sectionEyebrow}>
                <span className={styles.eyebrowLine} aria-hidden="true" />
                PROCHAINEMENT
              </span>
              <h2 className={styles.sectionTitle}>Des moments à vivre, ensemble.</h2>
              <p className={styles.sectionDesc}>
                Randonnées, sport et soirées au grand air : découvre les prochains rendez-vous du club et réserve ta place.
              </p>
            </div>

            <div className={styles.cardsGridThree}>
              {UPCOMING_EVENTS.map((event) => (
                <EventCard key={event.id} event={event} href={`#/evenements/${event.id}`} />
              ))}
            </div>

            <div className={styles.eventsCtaRow}>
              <a href="#/evenements" className={styles.btnNavy}>
                <span>Voir tous les événements</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── E. ABOUT / CLUB SPIRIT ── */}
        <section className={styles.spiritSection} id="a-propos">
          <div className={styles.spiritGlow} aria-hidden="true" />
          <div className={styles.sectionContainer}>
            <div className={styles.spiritGrid}>
              <div className={styles.spiritVisual}>
                <div className={styles.spiritFrame}>
                  <span className={styles.yellowTape} aria-hidden="true" />
                  <div className={styles.spiritPhotoWrap}>
                    <img
                      src={aboutCampfire}
                      alt="Étudiants du club réunis autour d'un feu de camp en forêt"
                      className={styles.spiritPhoto}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.spiritContent}>
                <span className={styles.spiritEyebrow}>
                  <span className={styles.spiritLine} aria-hidden="true" />
                  NOTRE ESPRIT
                </span>

                <h2 className={styles.spiritTitle}>
                  Plus qu&apos;un club.
                  <br />
                  <span className={styles.spiritTitleYellow}>Une bande d&apos;humains.</span>
                </h2>

                <p className={styles.spiritDesc}>
                  Né à l&apos;ESTIN en 2020, le LDC rassemble des étudiants curieux qui préfèrent l&apos;aventure vécue aux écrans. Chaque sortie est une parenthèse pour rire, apprendre à se connaître et repartir avec des souvenirs qui durent.
                </p>

                <button
                  type="button"
                  className={styles.btnWhite}
                  onClick={() => navigate('/a-propos')}
                >
                  <span>Découvrir notre histoire</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── F. LATEST NEWS ── */}
        <section className={styles.newsSection} id="actualites">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeaderLeft}>
              <span className={styles.sectionEyebrow}>
                <span className={styles.eyebrowLine} aria-hidden="true" />
                JOURNAL DU BDE
              </span>
              <h2 className={styles.sectionTitle}>Les dernières nouvelles</h2>
            </div>

            <div className={styles.cardsGridThree}>
              {LATEST_NEWS.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onReadMore={(item) => navigate(`/actualites/${item.id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── G. PHOTO GALLERY / MEMORIES ── */}
        <section className={styles.gallerySection} id="galerie">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.centeredEyebrow}>
                <span className={styles.eyebrowLine} aria-hidden="true" />
                SOUVENIRS
                <span className={styles.eyebrowLine} aria-hidden="true" />
              </span>
              <h2 className={styles.sectionTitle}>Les instants qu&apos;on garde.</h2>
            </div>

            <div className={styles.polaroidStrip}>
              {GALLERY_ITEMS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.polaroidCard} ${styles[item.tiltClass]}`}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Agrandir la photo : ${item.caption}`}
                >
                  <span className={styles.polaroidImgWrap}>
                    <img
                      src={item.image}
                      alt={item.caption}
                      className={styles.polaroidImg}
                      loading="lazy"
                    />
                  </span>
                  <span className={styles.polaroidCaption}>{item.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── H. EXECUTIVE COMMITTEE ── */}
        <section className={styles.teamSection} id="equipe">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.centeredEyebrow}>
                <span className={styles.eyebrowLine} aria-hidden="true" />
                L&apos;ÉQUIPE
                <span className={styles.eyebrowLine} aria-hidden="true" />
              </span>
              <h2 className={`${styles.sectionTitle} ${styles.teamTitle}`}>
                Des étudiants au service des étudiants.
              </h2>
            </div>

            <div className={styles.teamGrid}>
              {EXECUTIVE_TEAM.map((member) => (
                <article key={member.name} className={styles.teamMember}>
                  <div
                    className={styles.avatarCircle}
                    style={{ backgroundColor: member.color, color: member.textColor }}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── I. JOIN THE CLUB CTA ── */}
        <section className={styles.joinSection} id="rejoindre">
          <div className={styles.sectionContainer}>
            <div className={styles.joinBanner}>
              <div className={styles.joinDecorArcOne} aria-hidden="true" />
              <div className={styles.joinDecorArcTwo} aria-hidden="true" />

              <div className={styles.joinCopy}>
                <span className={styles.joinSeason}>SAISON 2025 – 2026</span>
                <h2 className={styles.joinTitle}>Ta place est dans le bus.</h2>
                <p className={styles.joinText}>
                  Rejoins une communauté étudiante active et pars à la découverte de nouvelles aventures tout au long de l&apos;année.
                </p>
              </div>

              <button
                type="button"
                className={styles.joinBtn}
                onClick={handleJoinTrigger}
              >
                <span>Je rejoins l&apos;aventure</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer onLoginClick={handleLoginTrigger} onJoinClick={handleJoinTrigger} />

      {/* Gallery Lightbox */}
      <GalleryLightbox
        items={GALLERY_ITEMS}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelect={setLightboxIndex}
      />

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          onClick={() => setActiveArticle(null)}
        >
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setActiveArticle(null)}
              aria-label="Fermer l'article"
            >
              ×
            </button>
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className={styles.modalBanner}
            />
            <div className={styles.modalBody}>
              <span className={styles.modalEyebrow}>
                {activeArticle.date} · {activeArticle.category}
              </span>
              <h3 id="article-modal-title" className={styles.modalTitle}>
                {activeArticle.title}
              </h3>
              <div className={styles.modalParagraphs}>
                {activeArticle.fullText.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Informational Modal (Story / Join / Member Space) */}
      {infoModal && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-modal-title"
          onClick={() => setInfoModal(null)}
        >
          <div className={styles.infoModalCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setInfoModal(null)}
              aria-label="Fermer la fenêtre"
            >
              ×
            </button>
            <span className={styles.modalEyebrow}>{infoModal.badge}</span>
            <h3 id="info-modal-title" className={styles.modalTitle}>
              {infoModal.title}
            </h3>
            <div className={styles.modalParagraphs}>
              {infoModal.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className={styles.modalActions}>
              <a
                href={infoModal.actionHref}
                className={styles.btnNavy}
                onClick={() => setInfoModal(null)}
              >
                <span>{infoModal.actionLabel}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
