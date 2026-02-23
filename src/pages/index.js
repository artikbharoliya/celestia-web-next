import ControlledCarousel from "@/components/Carousel";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import Inspirations from "@/components/Inspirations";
import Layout from "@/components/Layout";
import MarketingCopy from "@/components/MarketingCopy";
import Products from "@/components/Products";
import TitleSection from "@/components/TitleSection";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Container>
        {/* Make a hero container that has text and a CTA on the left and a carousel on the right */}
        <Row style={{ marginTop: "40px", marginBottom: "40px" }}>
          <Col md={5}>
            <HeroSection />
          </Col>
          <Col md={7}>
            <ControlledCarousel />
          </Col>
        </Row>
        <Products />
        <MarketingCopy />
      </Container>
      <Container fluid>
        <TitleSection title={"Inspirations"} titleTag="h2" />
      </Container>
      <Container>
        <Row className="justify-content-center py-5">
          <Col md={12}>
            <Inspirations />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col>
            <TitleSection title={"Contact Us"} titleTag="h2" />
          </Col>
        </Row>
        <Row className="justify-content-center py-3">
          <Col md={6}>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </>
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
  )
}
