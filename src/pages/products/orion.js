import Product from "@/components/Product";
import TitleSection from "@/components/TitleSection";
// Update deatail of product here
const product = {
  name: "Orion",
  material: "Metal Linear Sq Edge",
  description:
    "The Orion Baffle Series redefines design with a seamless blend of acoustic performance, versatile applications, and striking aesthetics. Ideal for interior and exterior use, it is crafted from durable galvanized steel or aluminum, ensuring long-lasting reliability in any environment. Orion offers exceptional flexibility with 10 size and width options, enabling multidimensional configurations that cater to a wide range of architectural visions. Whether installed as horizontal or vertical baffles or utilized as functional louvers, Orion adapts effortlessly to any space.",
  featureList: [
    "High-quality wooden finish",
    "Easy installation and maintenance",
    "Available in multiple finishes",
    "Designed for acoustic efficiency",
  ],
  image: "orion.jpg",
  downloadLink: "orion",
  relatedAccessories: [
    "OS-112BF-1-120 - 1/2\"D x 1\"W Linear Baffle",
    "OS-212BD0-XXX-120 - 1/2\"D x 2\"W Linear Baffle",
    "OS-212BF-XXX-120 - 1/2\"D x 3\" W - Linear Baffle",
    "OS-11BF-XXX-120 - 1\"D x 1\"W Linear Baffle",
    "OS-12BF-XXX-120 - 2\"D x 1\"W Linear Baffle",
    "OS-23BF-XXX-120 - 3\"D x 2\" W Linear Baffle",
    "OS-24F-XXX-120 - 4\"D x 2\" W Linear Baffle",
    "OS-26BF-XXX-120 - 6\"D x 2\" W Linear Baffle",
    "OS-33BF-XXX-120 - 3\"D x 3\" W Linear Baffle",
    "OS-24F-XXX-120 - 6\"D x 3\" W Linear Baffle",
    "OS-112SP - 1/2\"D x 1\"W Splice",
    "OS-212SP - 1/2\"D x 2\"W Splice",
    "OS-312SP - 1/2\"D x 3\"W Splice",
    "OS-112EC - 1/2\"D x 1\"W End Caps",
    "OS-212EC - 1/2\"D x 2\"W End Caps",
    "OS-112EC - 1/2\"D x 3\"W End Caps",
    "OS-11SP - 1\"D x 1\" W Splice",
    "OS-12SP - 2\"D x 1\" W Splice",
    "OS-12SP - 3\"D x 1\" W Splice",
    "OS-11EC - 1\"D x 1\" W End Caps",
    "OS-12EC - 2\"D x 1\" W End Caps",
    "OS-12EC - 3\"D x 1\" W End Caps",
    "OS-23SP - 3\"D x 2\"W Splice",
    "OS-24SP - 4\"D x 2\" W Splice",
    "OS-26SP - 6\"D x 2\" W Splice",
    "OS-23EC - 3\"D x 2\"W End Caps",
    "OS-24EC - 4\"D x 2\" W End Caps",
    "OS-26EC - 6\"D x 2\" W End Caps",
    "OS-23SP - 3\"D x 3\"W Splice",
    "OS-24SP - 6\"D x 3\" W Splice",
    "OS-23EC - 3\"D x 3\"W End Caps",
    "OS-24EC - 6\"D x 3\" W End Caps",
    "OSCM-BS-120 - Carrier Molding, STD Colors",
    "AM-ST-120 - 1\" H x 3/4\" W x 120\" L - Angle Molding, 10 Pc/Ctn",
    "TR-BS - 1/8\"x120\" L Threaded Rod,10 Pc/Ctn",
    "RCC-4BS - 4\" Rod Connector Clip, 10 Pc/Ctn",
    "CTM-4-XXX - 4\"H x 120\" L - Cloud Trim, STD Color, 10 Pc/Ctn",
    "CTM-6-XXX - 6\"H x 120\" L - Cloud Trim, STD Colors, 10 Pc/Ctn",
    "CC - Cloud Trim Connector Clip, 10 Pc/Ctn"
  ],
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
