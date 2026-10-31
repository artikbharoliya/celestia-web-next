import Image from "next/image";
import styles from "./PhotoGallery.module.scss";

export function PhotoGallery({ photos }) {
  return (
    <div className={styles.gallery}>
      {photos.map((photo, index) => (
        <figure key={photo} className={styles.project}>
          <div className={styles.imageFrame}>
            <Image
              src={photo}
              fill
              alt={`Celestia architectural installation ${index + 1}`}
              sizes="(max-width: 767px) 90vw, (max-width: 1199px) 44vw, (max-width: 1600px) 29vw, 480px"
            />
          </div>
          <figcaption>
            <span>Installation {String(index + 1).padStart(2, "0")}</span>
            <span>Celestia Designs</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
