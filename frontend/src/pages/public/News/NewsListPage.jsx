import { useState } from 'react';
import { NEWS_ARTICLES } from '../../../mocks/publicData';
import styles from './NewsListPage.module.css';

const PAGE_SIZE = 3;

export default function NewsListPage() {
  const [page, setPage] = useState(1);

  const featured = NEWS_ARTICLES.find((a) => a.featured) || NEWS_ARTICLES[0];
  const restArticles = NEWS_ARTICLES.filter((a) => a.id !== featured.id);

  const totalPages = Math.max(1, Math.ceil(restArticles.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleArticles = restArticles.slice(start, start + PAGE_SIZE);

  return (
    <div className={styles.page}>
      {/* 1. Beige Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>JOURNAL DU BDE</span>
          <h1 className={styles.heroTitle}>Nouvelles du club.</h1>
          <p className={styles.heroSubtitle}>
            Récits de sorties, annonces officielles et coulisses de la vie étudiante au LDC ESTIN.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          {/* 2. Featured Article */}
          <article className={styles.featuredCard}>
            <div className={styles.featuredMedia}>
              <img src={featured.image} alt={featured.title} className={styles.featuredImg} />
            </div>
            <div className={styles.featuredBody}>
              <span className={styles.featuredTag}>À LA UNE · {featured.category.toUpperCase()}</span>
              <span className={styles.featuredDate}>{featured.date} · {featured.readTime}</span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <a href={`#/actualites/${featured.id}`} className={styles.featuredBtn}>
                Lire l&apos;article →
              </a>
            </div>
          </article>

          {/* 3. News Grid */}
          <div className={styles.gridHeader}>
            <h2 className={styles.gridHeading}>Toutes les publications</h2>
            <span className={styles.gridCount}>{restArticles.length} articles</span>
          </div>

          <div className={styles.newsGrid}>
            {visibleArticles.map((article) => (
              <article key={article.id} className={styles.card}>
                <a href={`#/actualites/${article.id}`} className={styles.cardImgWrap}>
                  <img src={article.image} alt={article.title} className={styles.cardImg} loading="lazy" />
                </a>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCat}>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className={styles.cardTitle}>
                    <a href={`#/actualites/${article.id}`}>{article.title}</a>
                  </h3>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
                  <a href={`#/actualites/${article.id}`} className={styles.readLink}>
                    Lire l&apos;article →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* 4. Pagination */}
          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Pagination des actualités">
              <button
                type="button"
                className={styles.pageBtn}
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ← Précédent
              </button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, idx) => {
                  const num = idx + 1;
                  return (
                    <button
                      key={num}
                      type="button"
                      className={`${styles.pageNum} ${currentPage === num ? styles.pageNumActive : ''}`}
                      onClick={() => setPage(num)}
                      aria-current={currentPage === num ? 'page' : undefined}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className={styles.pageBtn}
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Suivant →
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}
