import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <Link href="/" aria-label="Celestia Designs home">
              <Image
                src="/assets/Logo.png"
                alt="Celestia Design"
                width={112}
                height={64}
                className={styles.logo}
              />
            </Link>
            <p className={styles.description}>
              Architectural metal systems.
              <br />
              Precision in every line.
            </p>
          </div>
          <nav aria-label="Footer navigation" className={styles.links}>
            <Link href="/products">Products</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/#about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className={styles.contact}>
            <p className="eyebrow">Start a conversation</p>
            <a href="mailto:info@celestiadesign.com">
              info@celestiadesign.com <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Celestia Designs</span>
          <span>Built to last.</span>
        </div>
      </div>
    </footer>
  );
}
