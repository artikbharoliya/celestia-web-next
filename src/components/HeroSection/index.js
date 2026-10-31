import Link from "next/link";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
    <div className={styles.heroHeading}>
      <h1>
        Precision above.
        <br />
        Possibility beyond.
      </h1>
      <div className={styles.introduction}>
        <p>
          Architectural metal systems.
          <br />
          Designed for possibility.
          <br />
          Made in India since 2007.
        </p>
        <Link href="/products" className="text-link">
          Explore systems <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
