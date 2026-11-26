import { useState } from 'react';
import { getNewsArticleById, NEWS_ARTICLES } from '../../../mocks/publicData';
import styles from './NewsDetailPage.module.css';

export default function NewsDetailPage({ params = {} }) {
  const [copied, setCopied] = useState(false);
  const article = getNewsArticleById(params.id);

  if (!article) {
    return (
      <div className={styles.notFoundWrap}>
        <div className={styles.notFoundCard}>
          <span className={styles.eyebrow}>ARTICLE INTROUVABLE</span>
          <h1>Cet article n&apos;existe pas</h1>
          <p>Il a peut-être été déplacé ou retiré du journal du club.</p>
          <a href="#/actualites" className={styles.backBtn}>
            ← Retour aux actualités
          </a>
        </div>
      </div>
    );
  }

  const relatedArticles = (article.relatedIds || [])
    .map((id) => NEWS_ARTICLES.find((item) => item.id === id))
    .filter(Boolean);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className={styles.page}>
      <article className={styles.articleContainer}>
        <a href="#/actualites" className={styles.backLink}>
          ← Retour aux actualités
        </a>

        <header className={styles.header}>
          <div className={styles.metaTop}>
            <span className={styles.category}>{article.category}</span>
            <span aria-hidden="true">·</span>
            <time>{article.date}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.intro}>{article.intro}</p>

          <div className={styles.authorBar}>
            <div
              className={styles.authorAvatar}
              style={{
                backgroundColor: article.author.color,
                color: article.author.color === '#F7B900' ? '#203D50' : '#FFFFFF',
              }}
              aria-hidden="true"
            >
              {article.author.initials}
            </div>
            <div>
              <strong className={styles.authorName}>{article.author.name}</strong>
              <span className={styles.authorRole}>{article.author.role}</span>
            </div>
          </div>
        </header>

        <figure className={styles.coverFigure}>
          <img src={article.image} alt={article.title} className={styles.coverImage} />
        </figure>

        <div className={styles.body}>
          {article.sections.map((section) => (
            <section key={section.heading} className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>{section.heading}</h2>
              {section.paragraphs.map((text, idx) => (
                <p key={idx} className={styles.paragraph}>
                  {text}
                </p>
              ))}
            </section>
          ))}

          {article.quote && (
            <blockquote className={styles.quoteBlock}>
              <p>{article.quote}</p>
            </blockquote>
          )}
        </div>

        {/* Social Sharing */}
        <div className={styles.shareBar}>
          <span className={styles.shareLabel}>Partager cet article</span>
          <div className={styles.shareActions}>
            <button type="button" className={styles.shareBtn} onClick={handleCopyLink}>
              {copied ? '✓ Lien copié' : 'Copier le lien'}
            </button>
            <a
              className={styles.shareLink}
              href={`https://wa.me/?text=${encodeURIComponent(`${article.title} — ${shareUrl}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              className={styles.shareLink}
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              className={styles.shareLink}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              X / Twitter
            </a>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedInner}>
            <span className={styles.eyebrow}>CONTINUER LA LECTURE</span>
            <h2 className={styles.relatedTitle}>Articles similaires</h2>

            <div className={styles.relatedGrid}>
              {relatedArticles.map((item) => (
                <a key={item.id} href={`#/actualites/${item.id}`} className={styles.relatedCard}>
                  <img src={item.image} alt={item.title} className={styles.relatedImg} loading="lazy" />
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedMeta}>
                      {item.category} · {item.date}
                    </span>
                    <h3 className={styles.relatedCardTitle}>{item.title}</h3>
                    <span className={styles.relatedRead}>Lire l&apos;article →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
