import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Lynx",
  material: "Metal Linear Circular Edge",
  description:
    "Beautiful metal linear circular edge tile. Perfect for any kitchen or bathroom.",
  featureList: [
    "Panel comes in 3\", 4\", 6\" and 8\" width, including reveal",
    "5/8 rounded edge with open reveal to plenum.",
    "Perforated options available to enhance acoustics.",
    "Specially designed carrier for plank means that panels are easy push click installed",
    "Continuous walls to wall and/or discontinuous cloud install possible",
    "Linear planks available in standard wood finish and metallic color. Custom color match possible",
    "Planks can be installed on walls and sloped setting.",
    "Planks are made from 22 gauge Aluminum."
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