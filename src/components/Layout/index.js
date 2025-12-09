import Head from "next/head";
import Footer from "../Footer";
import NavBar from "../NavBar";

export default function Layout({
  pageTitle = "",
  description = "",
  ogTitle = "",
  ogDescription = "",
  ogImage = "",
  ogUrl = "",
  allowIndexing = true, 
  children,
 }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
        {ogTitle && <meta property="og:title" content={ogTitle} />}
        {ogDescription && <meta property="og:description" content={ogDescription} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogUrl && <meta property="og:url" content={ogUrl} />}
        {!allowIndexing && <meta name="robots" content="noindex" />}
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}