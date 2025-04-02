import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Nexis",
  material: "V-Groove Metal linear",
  description:
    "Lynx product gives look of smooth rounded plank with open to plenum look or revel can be conceled with filler strip. This feature of open plenum can be implimented to increase acoustical function, also to increase airflow and ventilation above the ceiling. The product is available in galvanized steel or aluminum and is suitable for exterior and interior as well as exterior installation. The product can be installed in flat horizontal or vertical and sloped ceilings. Product is offered in powdercoated finish in solid RAL colors or wood veneer print. Wood print option gives look and feel of a true wood without mantainace and downsides like warping, cracing or rot if exposed to mosture. Additionally Lynx planks can be finished on both sides for a low hight ceiling use. ",
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
  image: "4.jpg",
  relatedAccessories: [
    "LS-3LP - 3 In Linear Plank, 8, 10, 12 Feet Lengths",
    "LS-4LP - 4 In Linear Plank, 8, 10, 12 Feet Lengths",
    "LS-6LP - 6 In Linear Plank, 8, 10, 12 Feet Lengths",
    "LS-8LP - 8 In Linear Plank, 8, 10, 12 Feet Lengths",
    "CM-BS-4-120 - 1-1/2\"H x 1/8\"W x 120\" L Carrier Molding, 4 In Module, Black, 10 Pc/Ctn",
    "CM-BS-3-120 - 1-1/2\"H x 1/8\" W x 120\" L Carrier Molding, 3 Inch Module, Black, 10 Pc/Ctn",
    "4SP-BS - 4 In Splice, 10 Pc/Ctn",
    "3SP-BS - 3 In Splice, 10 Pc/Ctn",
    "6SP-BS - 6 In Splice, 10 Pc/Ctn",
    "8SP-BS - 8 In Splice, 10 Pc/Ctn",
    "AM-ST-120 - 1\" H x 3/4\" W x 120\" L - Angle Molding, 10 Pc/Ctn",
    "TR-BS - 1/8\"x120\" L Threaded Rod,10 Pc/Ctn",
    "RCC-4BS - 4\" Rod Connector Clip, 10 Pc/Ctn",
    "CTM-4-XXX - 4\"H x 120\" L - Cloud Trim, STD Color, 10 Pc/Ctn",
    "CTM-6-XXX - 6\"H x 120\" L - Cloud Trim, STD Colors, 10 Pc/Ctn",
    "CC - Cloud Trim Connector Clip, 10 Pc/Ctn"
  ],
  installLayout: "/assets/downloads/LayoutDrawing/Lynx-Layout.pdf",
  dimensionDrawings: "/assets/downloads/DimensionDrawings/Nexis-Dimensions.pdf",
  dataSheet: "/assets/downloads/DataSheets/Nexis.pdf",
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