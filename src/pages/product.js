import { useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProductLegacyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/products");
  }, [router]);

  return (
    <div className="container page-section">
      <p>
        This page has moved. <Link href="/products">Go to Products</Link>.
      </p>
      <noscript>
        <p>
          JavaScript is disabled. Use this link:{" "}
          <Link href="/products">Products</Link>.
        </p>
      </noscript>
    </div>
  );
}

ProductLegacyPage.getLayout = function getLayout(page) {
  return (
    <Layout
      pageTitle="Products"
      description="Legacy route for products listing."
      canonicalPath="/products"
      allowIndexing={false}
    >
      {page}
    </Layout>
  );
};
