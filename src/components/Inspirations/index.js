import Image from "next/image";
import Link from "next/link";
import styles from "./Inspirations.module.scss";

export default function Inspirations() {
  return (
    <section
      className={`page-section ${styles.application}`}
      aria-labelledby="applications-heading"
    >
      <div>
        <p className="eyebrow">02 / In application</p>
        <h2 id="applications-heading" className="section-title">
          Designed into
          <br />
          the experience
          <br />
          of a space.
        </h2>
        <Link href="/projects" className="text-link">
          View projects <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <figure className={styles.figure}>
        <div className={styles.imageFrame}>
          <Image
            src="/assets/inspirations/3.jpg"
            alt="Wood-look linear ceiling with integrated lights above a collaborative office"
            fill
            sizes="(max-width: 767px) 90vw, (max-width: 1600px) 60vw, 960px"
          />
        </div>
        <figcaption>
          Arlies / Wood-look finish / Collaborative workspace
        </figcaption>
      </figure>
    </section>
  );
}
