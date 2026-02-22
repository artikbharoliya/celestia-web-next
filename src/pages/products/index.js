import { breadcrumbSchema } from "@/common/seo";
import Layout from "@/components/Layout";
import Products from "@/components/Products";
import TitleSection from "@/components/TitleSection";

export default function ProductsPage() {
  return (
    <>
      <TitleSection title={"All Products"}>
        <Products />
      </TitleSection>
    </>
  );
}

ProductsPage.getLayout = function getLayout(page) {
  return (
    <Layout
      pageTitle="Metal Ceiling Products"
      description="Browse Celestia Designs metal linear ceiling and baffle product systems for commercial and architectural projects."
      canonicalPath="/products"
      ogImage="/assets/products/1.jpg"
      jsonLd={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
      ])}
    >
      {page}
    </Layout>
  );
};
