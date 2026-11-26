import styles from './EventCard.module.css';

export default function EventCard({ event, href }) {
  const {
    title,
    category,
    categoryTone = 'green',
    day,
    month,
    tag,
    description,
    location,
    price,
    image,
  } = event;

  const content = (
    <>
      <div className={styles.media}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />

        <span
          className={`${styles.categoryBadge} ${
            categoryTone === 'light' ? styles.categoryLight : styles.categoryGreen
          }`}
        >
          {category}
        </span>

        <div className={styles.dateBadge} aria-label={`${day} ${month}`}>
          <span className={styles.dateDay}>{day}</span>
          <span className={styles.dateMonth}>{month}</span>
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.location}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{location}</span>
        </span>
        <span className={styles.price}>{price}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <article className={styles.card}>
        <a href={href} className={styles.cardLink}>
          {content}
        </a>
      </article>
    );
  }

  return <article className={styles.card}>{content}</article>;
}
