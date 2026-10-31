import Image from "next/image";
import Link from "next/link";
import styles from "./Products.module.scss";

// Shared by the homepage and catalog. Keep summaries factual and product names exact.
const products = [
  {
    name: "Arlies",
    material: "Square-edge metal linear system",
    image: "1.jpg",
    slug: "arlies",
  },
  {
    name: "Lynx",
    material: "Round-edge metal linear system",
    image: "2.jpg",
    slug: "lynx",
  },
  { name: "Orion", material: "Linear baffles", image: "3.jpg", slug: "orion" },
  {
    name: "Nexis",
    material: "V-groove metal linear system",
    image: "4.jpg",
    slug: "nexis",
  },
];

export default function Products({ headingTag = "h3" }) {
  const ProductHeading = headingTag;
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <article key={product.slug} className={styles.product}>
          <Link
            href={`/products/${product.slug}`}
            className={styles.productLink}
          >
            <div className={styles.imageFrame}>
              <Image
                src={`/assets/products/${product.image}`}
                alt={`${product.name} — ${product.material} profile`}
                fill
                sizes="(max-width: 767px) 90vw, (max-width: 1600px) 44vw, 730px"
              />
            </div>
            <div className={styles.productLabel}>
              <ProductHeading>{product.name}</ProductHeading>
              <p>{product.material}</p>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
