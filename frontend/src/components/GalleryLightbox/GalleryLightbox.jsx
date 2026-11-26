import { useEffect } from 'react';
import styles from './GalleryLightbox.module.css';

export default function GalleryLightbox({ items, activeIndex, onClose, onSelect }) {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const current = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelect((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onSelect((activeIndex - 1 + items.length) % items.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onSelect]);

  if (!isOpen || !current) return null;

  const goPrev = () => onSelect((activeIndex - 1 + items.length) % items.length);
  const goNext = () => onSelect((activeIndex + 1) % items.length);

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`Souvenir : ${current.caption}`}
      onClick={onClose}
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fermer la visionneuse"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={goPrev}
          aria-label="Photo précédente"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <figure className={styles.polaroidFrame}>
          <div className={styles.imageBox}>
            <img src={current.image} alt={current.caption} className={styles.image} />
          </div>
          <figcaption className={styles.captionBar}>
            <div>
              <strong className={styles.captionTitle}>{current.caption}</strong>
              {current.location && <span className={styles.captionMeta}>{current.location}</span>}
            </div>
            <span className={styles.counter}>
              {activeIndex + 1} / {items.length}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={goNext}
          aria-label="Photo suivante"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
