import { Button, Card, Ratio } from "react-bootstrap";
import Section from "../Section";
import Image from "next/image";
import Link from "next/link";

export default function Products() {

  const products = [
    {
      id: 1,
      name: "Arlies",
      material: "Metal Linear Sq Edge",
      description: "Beautiful metal linear square edge tile. Perfect for any kitchen or bathroom.",
      image: "arlies.jpg",
      slug: "arlies",
    },
    {
      id: 2,
      name: "Lynx",
      material: "Metal Linear Circular Edge",
      description: "Beautiful metal linear circular edge tile. Perfect for any kitchen or bathroom.",
      image: "lynx.jpg",
      slug: "lynx",
    },
    {
      id: 3,
      name: "Orion",
      material: "Versatile Linear Baffles",
      description: "Beautiful versatile linear baffles. Perfect for any kitchen or bathroom.",
      image: "orion.jpg",
      slug: "orion",
    }
  ]

  return (
    <>
      <Section>
        {products.map(product => (
          <Card key={product.id} className="mx-3">
            <Ratio aspectRatio={"4x3"}>
              <Image
                src={`/assets/products/${product.image}`}
                alt={product.name}
                height={300}
                width={400}
              />
            </Ratio>
            <Card.Body className="mt-auto">
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle>{product.material}</Card.Subtitle>
              <Card.Text>
                {product.description}
              </Card.Text>
              <Link href={`/${product.slug}`}>
                <Button variant="primary">Learn More</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Section>
    </>
  );
}