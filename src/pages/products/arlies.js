import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Arlies",
  material: "Metal Linear Sq Edge",
  description:
    "Beautiful metal linear square edge tile. Perfect for any kitchen or bathroom.",
  featureList: [
    "High-quality wooden finish",
    "Easy installation and maintenance",
    "Available in multiple finishes",
    "Designed for acoustic efficiency",
  ],
  image: "arlies.jpg",
  downloadLink: "arlies",
};
export default function Arlies() {
  return (
    <TitleSection title={"Wooden ceiling linears"} subTitle={"By Nikolai Bain"}>
      <Product {...product}/>
    </TitleSection>
  );
}
