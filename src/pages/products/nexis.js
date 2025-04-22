import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Nexis",
  material: "V-Groove Metal linear",
  description:
    "Nexis features a sleek V-Groove edge with concealed reveals, making it an ideal solution for subtly hiding elements above the ceiling, such a decking, pluming, air ducts, lighting, and cables. Constructed from galvanized steel or aluminum, it offers a cost effective, durable option suitable for both interior and exterior installations.The product supports versatile installation configuration, where thin and thick planks can be mixed in staggered pattern to give a more unique look to ceilings. Product support diverse install such as vertical, sloped and can also be installed in exterior of the building. For non-continuous ceiling installations, Nexis can be finished with cloud trim for a clean and professional appearance. Available in powder-coated finishes, Nexis offers a choice of solid RAL color or wood veneer prints, delivering the aesthetic appeal of natural wood without maintenance challenges, Unlike traditional wood, the wood-look finish resists warping, cracking, and rot even in high-moisture environments*. Whether for a clean, minimalist interior or a functional exterior, Nexis provides a durable, visually appealing ceiling solution tailored to your design needs.",
  featureList: [
    "V-groove planks are available in widths of 3\",4\",6\",8\" & 12\" nominal widths, these panels are installed using 3\" or 4\" modular carriers.",
    "Panels are designed with mitered edge to form 5/16\" grooved seam.",
    "Features an engineered carrier system for precise, push click installation, streamlining the installation process.",
    "Perforation option is available for Nexis plank to enhance acoustics.",
    "Supports both continuous wall-to-wall and discontinuous cloud setups, with optional trim for clean edges.",
    "Suitable for vertical, sloped surfaces, ceilings and exterior installation to meet diverse design and functional needs."
  ],
  image: "4.jpg",
  relatedAccessories: [
    "NS-3LP - 3\" Linear Plank, 10 ft or 12 ft Length",
    "NS-4LP - 4\" Linear Plank, 10 ft or 12 ft Length",
    "NS-6LP - 6\" Linear Plank, 10 ft or 12 ft Length",
    "NS-8LP - 8\" Linear Plank, 10 ft or 12 ft Length",
    "NS-9LP - 9\" Linear Plank, 10 ft or 12 ft Length",
    "NS-12LP - 12\" Linear Plank, 10 ft or 12 ft Length",
    "CM3NS - 3\" Module Carrier",
    "CM4NS - 4\" Module Carrier",
    "4NS-SP - 4\" Splice",
    "8NS-SP - 8\" Splice",
    "3NS-SP - 3\" Splice",
    "6NS-SP - 6\" Splice",
    "9NS-SP - 9\" Splice",
    "12NS-SP - 12\" Splice",
    "WC - Wind Clip",
    "AM-ST-120 - Wind Clip",
    "TR-BS - Threaded Rod",
    "RCC-4BS - 4\" Rod Connector Clip",
    "CTM-4 - 4\" L-Cloud Trim",
    "CTM-6 - 6\" L-Cloud Trim",
    "CC - Cloud Trim Clip"
  ],
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