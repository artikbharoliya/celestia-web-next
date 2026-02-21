import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Arlies",
  material: "Metal Linear Sq Edge",
  description:
    "Arlies features a sleek square-edge design with concealed reveals, making it an ideal solution for subtly hiding elements above the ceiling, such as decking, plumbing, air ducts, lighting, and cables. Constructed from galvanized steel or aluminum, it offers a cost-effective, durable option suitable for both interior and exterior installations.",
  featureList: [
    "Panels are available in widths of 3\", 4\", 6\", and 8\", including reveal, with a 5/8\" thickness, ensuring dimensional consistency and robust performance.",
    "Designed with a 5/8\" square edge and a closed reveal, delivering a sleek and seamless architectural appearance.",
    "Features an engineered carrier system for precise, push-click installation, streamlining the installation process.",
    "Accommodates both continuous wall-to-wall installations and discontinuous cloud configurations, with optional cloud trim for clean edges in non-continuous applications.",
    "Suitable for versatile applications, including walls, sloped surfaces, and ceilings, meeting diverse design and functional requirements.",
    "Fabricated from 0.5-mm aluminum or 0.45-mm galvanized steel, providing a durable, lightweight, and cost-effective solution.",
    "Finished with a high-performance 55-micron powder coating, offering exceptional durability and backed by a 10-year warranty on all RAL colors and wood finishes.",
    "Custom color and veneer finish matching options enable tailored solutions for specific design projects.",
    "Double-sided finishing is available for exposed planks, providing enhanced aesthetics and additional weather resistance for outdoor installations.",
    "Panels are designed for easy removal, granting direct plenum access for maintenance or adjustments without requiring the disassembly of the entire ceiling system."
  ],
  relatedAccessories: [
    "AS-3LP - 3 In Linear Plank, 8, 10, 12 Feet Lengths",
    "AS-4LP - 4 In Linear Plank, 8, 10, 12 Feet Lengths",
    "AS-6LP - 6 In Linear Plank, 8, 10, 12 Feet Lengths",
    "AS-8LP - 8 In Linear Plank, 8, 10, 12 Feet Lengths",
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
  image: "1.jpg",
  installLayout: "/assets/downloads/LayoutDrawing/Arlies-Layout.pdf",
  dimensionDrawings: [
    "/assets/downloads/DimensionDrawings/ARLIES - Dimensional Drawing - 12-5-2024.pdf",
    "/assets/downloads/DimensionDrawings/ARLIES - METAL LINEAR SYSTEM SQUARE.pdf",
    "/assets/downloads/DimensionDrawings/ARLIES - Related Accessories.pdf",
    "/assets/downloads/DimensionDrawings/ARLIES - ARLIES CLOUD TRIM DETAIL.pdf",
  ],
  dataSheet: "/assets/downloads/DataSheets/Arlies.pdf",
};
export default function Arlies() {
  return (
    <TitleSection
      title={product.name}
      subTitle={product.material}
      description={product.description}
    >
      <Product {...product} />
    </TitleSection>
  );
}
