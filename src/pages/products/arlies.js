import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Arlies",
  material: "Metal Linear Sq Edge",
  description:
    "Beautiful metal linear square edge tile. Perfect for any kitchen or bathroom.",
  featureList: [
    "Panel comes in 3\", 4\", 6\" and 8\" width, including reveal",
    "5/8 Square edge with closed reveal.",
    "Perforated options available to enhance acoustics.",
    "Specially designed carrier for plank means that panels are easy push click installed",
    "Continuous walls to wall and/or discontinuous cloud install possible",
    "Linear planks available in standard wood finish and metallic color. Custom color match possible",
    "Planks can be installed on walls and sloped setting.",
    "Planks are made from 22 gauge Aluminum.",
    "Concealed suspension, clips and trims designs."
  ],
  image: "arlies.jpg",
  downloadLink: "arlies",
};
export default function Arlies() {
  return (
    <TitleSection
      title={product.name}
      subTitle={product.material}
    >
      <Product {...product} />
    </TitleSection>
  );
}
