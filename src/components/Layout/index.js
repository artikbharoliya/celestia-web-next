import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../Footer";
import NavBar from "../NavBar";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  organizationSchema,
  resolveUrl,
  toMetaDescription,
  websiteSchema,
  withSiteName,
} from "@/common/seo";

export default function Layout({
  pageTitle = "",
  description = "",
  ogTitle = "",
  ogDescription = "",
  ogImage = "",
  ogUrl = "",
  canonicalPath = "",
  twitterImage = "",
  twitterCard = "summary_large_image",
  jsonLd = null,
  allowIndexing = true, 
  children,
 }) {
  const router = useRouter();
  const currentPath = router?.asPath?.split("?")[0] || "/";
  const canonicalUrl = resolveUrl(canonicalPath || ogUrl || currentPath);
  const resolvedTitle = withSiteName(pageTitle);
  const resolvedDescription = toMetaDescription(description || DEFAULT_DESCRIPTION);
  const resolvedOgTitle = ogTitle || resolvedTitle;
  const resolvedOgDescription = toMetaDescription(ogDescription || resolvedDescription);
  const resolvedOgImage = resolveUrl(ogImage || DEFAULT_OG_IMAGE);
  const resolvedOgUrl = resolveUrl(ogUrl || canonicalPath || currentPath);
  const resolvedTwitterImage = resolveUrl(twitterImage || ogImage || DEFAULT_OG_IMAGE);
  const robotsValue = allowIndexing ? "index,follow" : "noindex,nofollow";
  const pageSchemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const jsonLdSchemas = [organizationSchema(), websiteSchema(), ...pageSchemas];

  return (
    <>
      <Head>
        <title>{resolvedTitle}</title>
        <meta name="description" content={resolvedDescription} />
        <meta name="robots" content={robotsValue} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={resolvedOgTitle} />
        <meta property="og:description" content={resolvedOgDescription} />
        <meta property="og:image" content={resolvedOgImage} />
        <meta property="og:url" content={resolvedOgUrl} />
        <meta property="og:site_name" content="Celestia Designs" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={resolvedOgTitle} />
        <meta name="twitter:description" content={resolvedOgDescription} />
        <meta name="twitter:image" content={resolvedTwitterImage} />
        <link rel="icon" href="/favicon.ico" />
        {jsonLdSchemas.map((schema, index) => (
          <script
            key={`jsonld-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
