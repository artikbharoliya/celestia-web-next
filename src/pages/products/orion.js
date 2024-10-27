import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Orion",
  material: "Metal Linear Sq Edge",
  description:
    "Beautiful versatile linear baffles. Perfect for any kitchen or bathroom.",
  featureList: [
    "High-quality wooden finish",
    "Easy installation and maintenance",
    "Available in multiple finishes",
    "Designed for acoustic efficiency",
  ],
  image: "orion.jpg",
  downloadLink: "orion",
};
export default function Orion() {
  return (
    <TitleSection
      title={product.name}
      subTitle={product.material}
    >
      <Product {...product} />
    </TitleSection>
  );
}
