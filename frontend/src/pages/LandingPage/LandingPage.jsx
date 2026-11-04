import styles from './LandingPage.module.css';

export default function LandingPage() {
  const tracks = [
    {
      icon: '💻',
      title: 'Full-Stack Web Dev',
      description: 'Master modern frontend architectures, RESTful APIs, and cloud deployments through team-based open source projects.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'CSS Architecture']
    },
    {
      icon: '🧠',
      title: 'AI & Data Science',
      description: 'Explore neural networks, computer vision, data analysis, and practical machine learning applications.',
      tags: ['Python', 'PyTorch', 'Data Analysis', 'Scikit-Learn']
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Build native and cross-platform mobile apps for iOS and Android with modern toolchains.',
      tags: ['Flutter', 'React Native', 'Mobile UI']
    },
    {
      icon: '🎨',
      title: 'UI/UX & Product Design',
      description: 'Design intuitive interfaces, create scalable design systems, and run usability tests for student products.',
      tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems']
    },
    {
      icon: '🏆',
      title: 'Competitive Programming',
      description: 'Sharpen your problem-solving, algorithms, and data structure skills for national and international contests.',
      tags: ['Algorithms', 'Data Structures', 'Codeforces', 'LeetCode']
    },
    {
      icon: '🎙️',
      title: 'Leadership & Soft Skills',
      description: 'Develop public speaking, project management, agile teamwork, and tech community leadership abilities.',
      tags: ['Public Speaking', 'Agile', 'Teamwork', 'Pitching']
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'LDC Annual Hackathon 2026',
      date: 'NOV 18 - 20, 2026',
      badge: 'Major Flagship',
      location: 'Main Campus Innovation Lab',
      speaker: '48-hour team challenge with industry mentors',
      status: 'Open for registration'
    },
    {
      id: 2,
      title: 'Modern CSS & Design Systems Masterclass',
      date: 'NOV 25, 2026',
      badge: 'Workshop',
      location: 'Auditorium Hall B & Online Stream',
      speaker: 'Lead Frontend Team',
      status: 'Free entry'
    },
    {
      id: 3,
      title: 'Tech Talk: Landing Your First Engineering Internship',
      date: 'DEC 02, 2026',
      badge: 'Career Talk',
      location: 'Student Union Seminar Room',
      speaker: 'Guest Alumni from Top Tech Firms',
      status: 'Limited seats'
    }
  ];

  return (
    <div className={styles.page}>
      {/* ── 1. HERO SECTION ── */}
      <section className={styles.heroSection} id="hero">
        <div className={styles.sectionContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>
                🎓 The Official Student Club Platform
              </span>
              <h1 className={styles.heroTitle}>
                Where Ambition Meets{' '}
                <span className={styles.heroHighlight}>Innovation</span> & Leadership.
              </h1>
              <p className={styles.heroSubtitle}>
                LDC Club connects passionate university students to build impactful software, participate in hackathons, and cultivate leadership skills that launch careers.
              </p>
              <div className={styles.heroButtonGroup}>
                <a href="#join" className={styles.btnPrimary}>
                  🚀 Join the Club
                </a>
                <a href="#events" className={styles.btnSecondary}>
                  📅 Explore Events
                </a>
              </div>
            </div>

            {/* Live Club Highlights Showcase Card */}
            <div className={styles.heroVisual}>
              <div className={styles.showcaseCard}>
                <div className={styles.showcaseHeader}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>LDC Club Snapshot</h3>
                  <span className={styles.showcaseStatus}>
                    <span className={styles.statusDot}></span>
                    Fall Semester Active
                  </span>
                </div>

                <div className={styles.showcaseStats}>
                  <div className={styles.miniStat}>
                    <div className={styles.miniStatValue}>650+</div>
                    <div className={styles.miniStatLabel}>Enrolled Students</div>
                  </div>
                  <div className={styles.miniStat}>
                    <div className={styles.miniStatValue}>45+</div>
                    <div className={styles.miniStatLabel}>Workshops / Year</div>
                  </div>
                  <div className={styles.miniStat}>
                    <div className={styles.miniStatValue}>18</div>
                    <div className={styles.miniStatLabel}>Hackathon Wins</div>
                  </div>
                  <div className={styles.miniStat}>
                    <div className={styles.miniStatValue}>100%</div>
                    <div className={styles.miniStatLabel}>Student Run</div>
                  </div>
                </div>

                <div className={styles.showcaseActivity}>
                  <span className={styles.activityTitle}>Current Club Highlights:</span>
                  <span className={styles.activityItem}>
                    ⚡ Web Dev Bootcamp Cohort #4 in session
                  </span>
                  <span className={styles.activityItem}>
                    🏆 Hackathon 2026 team registrations are open
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. NUMBERS & IMPACT ── */}
      <section className={styles.sectionContainer} id="about">
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>650+</span>
            <span className={styles.statLabel}>Active Members</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>45+</span>
            <span className={styles.statLabel}>Technical Workshops</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>18</span>
            <span className={styles.statLabel}>Awards & Trophies</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>12+</span>
            <span className={styles.statLabel}>Real-world Projects</span>
          </div>
        </div>
      </section>

      {/* ── 3. TRACKS & DISCIPLINES ── */}
      <section className={styles.sectionContainer} id="features">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>What We Do</span>
          <h2 className={styles.sectionTitle}>Club Tracks & Programs</h2>
          <p className={styles.sectionDesc}>
            Whether you want to build websites, train AI models, create mobile apps, or lead creative teams, we have a track for you.
          </p>
        </div>

        <div className={styles.tracksGrid}>
          {tracks.map((track) => (
            <div key={track.title} className={styles.trackCard}>
              <div className={styles.trackIconBox}>{track.icon}</div>
              <h3 className={styles.trackTitle}>{track.title}</h3>
              <p className={styles.trackText}>{track.description}</p>
              <div className={styles.trackTags}>
                {track.tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. UPCOMING EVENTS ── */}
      <section className={styles.sectionContainer} id="events">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Don't Miss Out</span>
          <h2 className={styles.sectionTitle}>Upcoming Events & Workshops</h2>
          <p className={styles.sectionDesc}>
            Hands-on learning, guest speakers from tech leaders, and networking opportunities all semester long.
          </p>
        </div>

        <div className={styles.eventsGrid}>
          {upcomingEvents.map((evt) => (
            <article key={evt.id} className={styles.eventCard}>
              <div className={styles.eventHeader}>
                <span className={styles.eventDate}>{evt.date}</span>
                <span className={styles.eventBadge}>{evt.badge}</span>
              </div>
              <div className={styles.eventBody}>
                <h3 className={styles.eventTitle}>{evt.title}</h3>
                <div className={styles.eventMeta}>
                  <span>📍 {evt.location}</span>
                  <span>🎙️ {evt.speaker}</span>
                </div>
              </div>
              <div className={styles.eventFooter}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-success)', fontWeight: 600 }}>
                  ✓ {evt.status}
                </span>
                <button type="button" className={styles.btnRegister}>
                  Details →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 5. CALL TO ACTION ── */}
      <section className={styles.sectionContainer} id="join">
        <div className={styles.ctaBanner}>
          <h2 className={styles.ctaTitle}>Ready to Level Up Your University Experience?</h2>
          <p className={styles.ctaText}>
            Join the LDC Club community today. Build projects that matter, gain practical leadership experience, and make lifelong friends in tech.
          </p>
          <div className={styles.ctaActionGroup}>
            <a href="#contact" className={styles.btnPrimary}>
              ✨ Apply for Membership
            </a>
            <a href="#events" className={styles.btnSecondary} style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
              Explore Calendar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

