import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Lynx",
  material: "Metal Linear Circular Edge",
  description:
    "Beautiful metal linear circular edge tile. Perfect for any kitchen or bathroom.",
  featureList: [
    "High-quality wooden finish",
    "Easy installation and maintenance",
    "Available in multiple finishes",
    "Designed for acoustic efficiency",
  ],
  image: "lynx.jpg",
  downloadLink: "Lynx",
};
export default function Lynx() {
  return (
    <TitleSection
      title={product.name}
      subTitle={product.material}
    >
      <Product {...product} />
    </TitleSection>
  );
}