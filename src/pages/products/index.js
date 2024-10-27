import Products from "@/components/Products";
import TitleSection from "@/components/TitleSection";

export default function ProductPage() {
  return (
    <>
      <TitleSection title={"All Products"}>
        <Products />
      </TitleSection>
    </>
  );
}
