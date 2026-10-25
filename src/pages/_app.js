import Layout from "@/components/Layout";
import "@/styles/index.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7YCBRG6ZBG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7YCBRG6ZBG');
        `}
      </Script>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
