import ControlledCarousel from "@/components/Carousel";
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
        <TitleSection title={"Inspirations"} />
      </Container>
      <Container fluid>
        <Row className="justify-content-center py-5">
          <Col md={12}>
            <Inspirations />
          </Col>
        </Row>
      </Container>
    </>
  );
}


Home.getLayout = function getLayout(page) {
  return (
    <Layout
      pageTitle="Celestia Designs | Built to last"
      description="Since our inception in 2007, Celestia design has been dedicated to crafting products that embody the beauty and complexity of the universe."
      ogImage="/assets/Logo.png"
      ogUrl="https://www.celestiadesign.com/"
    >
      {page}
    </Layout>
  )
}