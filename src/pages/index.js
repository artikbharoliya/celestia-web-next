import Link from "next/link";
import ControlledCarousel from "@/components/Carousel";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import Inspirations from "@/components/Inspirations";
import Layout from "@/components/Layout";
import MarketingCopy from "@/components/MarketingCopy";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div className="container">
      {/* Hero: the headline leads into photography that spans the whole grid. */}
      <HeroSection />
      <ControlledCarousel />
      <section className="page-section" aria-labelledby="systems-heading">
        <div className="section-heading">
          <p className="eyebrow">01 / The systems</p>
          <Link href="/products" className="text-link">
            View all systems <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <h2
          id="systems-heading"
          className="section-title"
          style={{ marginBottom: "36px" }}
        >
          A system for every expression.
        </h2>
        <Products />
      </section>
      <Inspirations />
      <MarketingCopy />
      {/* The complete inquiry form stays available here and on /contact. */}
      <section
        id="inquiry"
        className="page-section split-section"
        aria-labelledby="inquiry-heading"
      >
        <div>
          <p className="eyebrow">04 / Start a conversation</p>
          <h2 id="inquiry-heading" className="section-title">
            Bring your next
            <br />
            space into focus.
          </h2>
          <p className="section-intro">
            Tell us about your project. Our team can help you explore the right
            ceiling system for your space.
          </p>
          <Link href="/contact" className="text-link">
            Contact details <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout
      pageTitle="Built to last"
      description="Since our inception in 2007, Celestia design has been dedicated to crafting products that embody the beauty and complexity of the universe."
      ogTitle="Celestia Designs | Metal Ceiling and Linear Systems"
      ogDescription="Explore Celestia Designs metal ceiling, baffle, and linear plank systems engineered for interior and exterior architectural applications."
      ogImage="/assets/Logo.png"
      canonicalPath="/"
    >
      {page}
    </Layout>
  );
};
