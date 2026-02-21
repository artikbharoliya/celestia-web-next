import { Button, Card, Col, Ratio, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import styles from "./Products.module.scss";

export default function Products() {

  const products = [
    {
      id: 1,
      name: "Arlies",
      material: "Metal Linear Sq Edge",
      description: "Beautiful metal linear square edge tile. Perfect for any kitchen or bathroom.",
      image: "1.jpg",
      slug: "arlies",
    },
    {
      id: 2,
      name: "Lynx",
      material: "Metal Linear Circular Edge",
      description: "Beautiful metal linear circular edge tile. Perfect for any kitchen or bathroom.",
      image: "2.jpg",
      slug: "lynx",
    },
    {
      id: 3,
      name: "Orion",
      material: "Versatile Linear Baffles",
      description: "Beautiful versatile linear baffles. Perfect for any kitchen or bathroom.",
      image: "3.jpg",
      slug: "orion",
    },
    {
      id: 4,
      name: "Nexis",
      material: "V-Groove Metal linear",
      description: "Metal Linear with V-Groove Revel. Perfect for Interior or Exterior Installation",
      image: "4.jpg",
      slug: "nexis",
    }
  ]

  return (
    <>
      <div className={styles.productContainer}>
        <h1 className={styles.productTitle}>Products</h1>
        <Row className={styles.productRow}>
          {products.map((product, index) => (
            <Col className={`my-3 ${styles.productCardContainer}`} key={index}>
              <Card key={product.id} className={styles.productCard}>
                <Ratio aspectRatio={"4x3"}>
                  <Image
                    src={`/assets/products/${product.image}`}
                    alt={product.name}
                    height={270}
                    width={360}
                  />
                </Ratio>
                <Card.Body className="mt-auto">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Subtitle>{product.material}</Card.Subtitle>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                  <Link href={`products/${product.slug}`}>
                    <Button variant="primary">Learn More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </div>
    </>
  );
}