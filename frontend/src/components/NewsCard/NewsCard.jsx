import styles from './NewsCard.module.css';

export default function NewsCard({ article, onReadMore }) {
  const { title, date, category, excerpt, image } = article;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{date}</span>
          <span aria-hidden="true">·</span>
          <span>{category}</span>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>

        <button
          type="button"
          className={styles.readLink}
          onClick={() => onReadMore && onReadMore(article)}
        >
          <span>Lire l&apos;article</span>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
