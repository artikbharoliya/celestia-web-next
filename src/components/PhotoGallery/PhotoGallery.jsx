import Image from "next/image";
import styles from "./PhotoGallery.module.scss";

export function PhotoGallery({ photos }) {
  return (
    <div className={styles.gallery}>
      {photos.map((photo, index) => (
        <figure key={photo.src} className={styles.project} tabIndex={0}>
          <div className={styles.imageFrame}>
            <Image
              src={photo.src}
              fill
              alt={photo.alt}
              sizes="(max-width: 767px) 90vw, (max-width: 1199px) 44vw, (max-width: 1600px) 29vw, 480px"
            />
          </div>
          <figcaption>
            <div className={styles.captionLabel}>
              <span>Installation {String(index + 1).padStart(2, "0")}</span>
              <span>Celestia Designs</span>
            </div>
            <p className={styles.description}>{photo.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
