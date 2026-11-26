import aboutCampfire from '../../../assets/home/about-campfire.jpg';
import { ABOUT_PILLARS, EXECUTIVE_COMMITTEE } from '../../../mocks/publicData';
import styles from './AboutPage.module.css';

function PillarIcon({ type }) {
  switch (type) {
    case 'compass':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case 'trophy':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );
    case 'music':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
        </svg>
      );
  }
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* 1. Beige Editorial Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>À PROPOS DU LDC · ESTIN BÉJAÏA</span>
              <h1 className={styles.heroTitle}>Nés pour sortir du cadre.</h1>
              <p className={styles.heroSubtitle}>
                Depuis 2020, le Leisure &amp; Discovery Club rassemble les étudiants de l&apos;ESTIN autour du grand air,
                du sport, de la culture et de l&apos;amitié vraie.
              </p>
              <div className={styles.heroActions}>
                <a href="#/evenements" className={styles.btnPrimary}>
                  Découvrir nos sorties →
                </a>
                <a href="#/contact" className={styles.btnOutline}>
                  Nous contacter
                </a>
              </div>
            </div>

            <div className={styles.heroMedia}>
              <figure className={styles.tiltedFrame}>
                <span className={styles.tape} aria-hidden="true" />
                <img
                  src={aboutCampfire}
                  alt="Membres du LDC réunis autour d'un feu de camp en forêt"
                  className={styles.heroImage}
                />
                <figcaption className={styles.frameCaption}>
                  Forêt de l&apos;Akfadou · Esprit LDC depuis 2020
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Club History (2 columns) */}
      <section className={styles.historySection}>
        <div className={styles.container}>
          <div className={styles.historyGrid}>
            <div>
              <span className={styles.eyebrow}>NOTRE HISTOIRE</span>
              <h2 className={styles.sectionTitle}>
                Un bus loué entre amis, devenu une tradition étudiante.
              </h2>
            </div>

            <div className={styles.historyCopy}>
              <p>
                Tout a commencé en 2020 sur le campus de l&apos;ESTIN à Amizour. Quelques étudiants passionnés de
                randonnée ont voulu offrir une bouffée d&apos;air frais à leurs camarades entre deux périodes d&apos;examens :
                partir tôt le matin, marcher ensemble dans les montagnes de Kabylie et rentrer le soir avec de vrais souvenirs.
              </p>
              <p>
                Au fil des promotions, ces premières sorties se sont transformées en un club structuré porté par une règle
                simple : <strong>Human first, Student second.</strong> Plus de 280 membres et 80 événements plus tard,
                la même curiosité continue d&apos;animer chaque départ.
              </p>
              <div className={styles.milestones}>
                <div>
                  <strong>2020</strong>
                  <span>Fondation à l&apos;ESTIN</span>
                </div>
                <div>
                  <strong>280+</strong>
                  <span>Membres engagés</span>
                </div>
                <div>
                  <strong>80+</strong>
                  <span>Sorties &amp; tournois</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full-width Dark Navy Mission & Vision */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.missionInner}>
            <span className={styles.missionEyebrow}>MISSION &amp; VISION</span>
            <h2 className={styles.missionTitle}>
              Faire de la vie étudiante une aventure collective, ouverte et mémorable.
            </h2>
            <div className={styles.missionColumns}>
              <div className={styles.missionCard}>
                <h3>Notre mission</h3>
                <p>
                  Créer des parenthèses accessibles où chaque étudiant, quelle que soit sa promo, peut découvrir son
                  territoire, pratiquer un sport, partager sa créativité et tisser des liens durables.
                </p>
              </div>
              <div className={styles.missionCard}>
                <h3>Notre vision</h3>
                <p>
                  Bâtir à l&apos;ESTIN une communauté bienveillante et autonome qui valorise l&apos;entraide, le respect
                  de la nature et l&apos;équilibre humain tout au long du parcours universitaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Four Colorful Activity Pillars */}
      <section className={styles.pillarsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.eyebrow}>CE QUI NOUS ANIME</span>
            <h2 className={styles.sectionTitle}>Quatre piliers pour vivre le club</h2>
            <p className={styles.sectionDesc}>
              Nos activités s&apos;articulent autour de quatre univers complémentaires pensés pour tous les profils.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {ABOUT_PILLARS.map((pillar) => (
              <article key={pillar.number} className={`${styles.pillarCard} ${styles[`pillar_${pillar.tone}`]}`}>
                <div className={styles.pillarTop}>
                  <span className={styles.pillarNumber}>{pillar.number}</span>
                  <span className={styles.pillarIcon}>
                    <PillarIcon type={pillar.icon} />
                  </span>
                </div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Executive Committee */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.eyebrow}>BUREAU EXÉCUTIF</span>
            <h2 className={styles.sectionTitle}>L&apos;équipe qui fait rouler le bus.</h2>
            <p className={styles.sectionDesc}>
              Des étudiants élus et bénévoles qui préparent chaque sortie, veillent à la logistique et accueillent les nouveaux membres.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {EXECUTIVE_COMMITTEE.map((member) => (
              <article key={member.name} className={styles.teamCard}>
                <div
                  className={styles.avatar}
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
    </div>
  );
}
