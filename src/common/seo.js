export const SITE_URL = "https://www.celestiadesign.com";
export const SITE_NAME = "Celestia Designs";
export const DEFAULT_TITLE = "Celestia Designs | Built to last";
export const DEFAULT_DESCRIPTION =
  "Celestia Designs crafts high-quality metal and wood look linear ceiling and baffle systems for interior and exterior architectural projects.";
export const DEFAULT_OG_IMAGE = "/assets/Logo.png";

export function resolveUrl(pathOrUrl = "/") {
  if (!pathOrUrl) return SITE_URL;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function withSiteName(pageTitle) {
  if (!pageTitle) return DEFAULT_TITLE;
  if (pageTitle.includes(SITE_NAME)) return pageTitle;
  return `${pageTitle} | ${SITE_NAME}`;
}

export function toMetaDescription(text, maxLength = 160) {
  const normalized = (text || "").replace(/\s+/g, " ").trim();
  if (!normalized) return DEFAULT_DESCRIPTION;
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: resolveUrl(DEFAULT_OG_IMAGE),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "Info@celestiadesign.com",
        areaServed: "US",
        availableLanguage: ["en"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: resolveUrl(item.path),
    })),
  };
}

export function productSchema({
  name,
  description,
  image,
  urlPath,
  category,
  brand = SITE_NAME,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: resolveUrl(image),
    url: resolveUrl(urlPath),
    brand: {
      "@type": "Brand",
      name: brand,
    },
    category,
  };
}
