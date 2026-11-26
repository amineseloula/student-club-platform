import { useState } from 'react';
import GalleryLightbox from '../../../components/GalleryLightbox/GalleryLightbox';
import { GALLERY_ALBUMS } from '../../../mocks/publicData';
import styles from './GalleryPage.module.css';

export default function GalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setLightboxIndex(null);
  };

  const openLightboxAt = (album, index) => {
    setSelectedAlbum(album);
    setLightboxIndex(index);
  };

  return (
    <div className={styles.page}>
      {/* 1. Beige Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>GALERIE SOUVENIRS</span>
          <h1 className={styles.heroTitle}>Des images qui racontent.</h1>
          <p className={styles.heroSubtitle}>
            Parcours les albums photo de nos sorties, tournois et veillées depuis 2020. Clique sur un album pour explorer ses clichés.
          </p>
        </div>
      </section>

      {/* 2. Album Grid OR Selected Album Photos */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          {!selectedAlbum ? (
            <div className={styles.albumGrid}>
              {GALLERY_ALBUMS.map((album) => (
                <article
                  key={album.id}
                  className={`${styles.albumCard} ${styles[`size_${album.size}`]}`}
                >
                  <button
                    type="button"
                    className={styles.albumBtn}
                    onClick={() => openAlbum(album)}
                    aria-label={`Ouvrir l'album ${album.title} (${album.photos.length} photos)`}
                  >
                    <img src={album.coverImage} alt={album.title} className={styles.albumImg} loading="lazy" />
                    <div className={styles.albumOverlay} />
                    <div className={styles.albumContent}>
                      <span className={styles.albumMeta}>
                        {album.dateLabel} · {album.photos.length} photo{album.photos.length > 1 ? 's' : ''}
                      </span>
                      <h2 className={styles.albumTitle}>{album.title}</h2>
                      <p className={styles.albumDesc}>{album.description}</p>
                      <span className={styles.albumAction}>Voir l&apos;album →</span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.albumView}>
              <div className={styles.albumHeader}>
                <div>
                  <button
                    type="button"
                    className={styles.backToAlbums}
                    onClick={() => {
                      setSelectedAlbum(null);
                      setLightboxIndex(null);
                    }}
                  >
                    ← Tous les albums
                  </button>
                  <h2 className={styles.selectedTitle}>{selectedAlbum.title}</h2>
                  <p className={styles.selectedMeta}>
                    {selectedAlbum.location} · {selectedAlbum.dateLabel} · {selectedAlbum.photos.length} photos
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.slideshowBtn}
                  onClick={() => setLightboxIndex(0)}
                >
                  Ouvrir le diaporama →
                </button>
              </div>

              <div className={styles.photosGrid}>
                {selectedAlbum.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    className={styles.photoCard}
                    onClick={() => openLightboxAt(selectedAlbum, index)}
                    aria-label={`Agrandir : ${photo.caption}`}
                  >
                    <div className={styles.photoImgWrap}>
                      <img src={photo.image} alt={photo.caption} className={styles.photoImg} loading="lazy" />
                    </div>
                    <div className={styles.photoInfo}>
                      <strong>{photo.caption}</strong>
                      <span>{photo.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Lightbox */}
      {selectedAlbum && (
        <GalleryLightbox
          items={selectedAlbum.photos}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onSelect={setLightboxIndex}
        />
      )}
    </div>
  );
}
