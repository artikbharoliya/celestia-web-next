import ControlledCarousel from "@/components/Carousel";
import HeroSection from "@/components/HeroSection";
import Inspirations from "@/components/Inspirations";
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
      <Container>
        <Row className="justify-content-md-center py-5">
          <Col md={7}>
            <Inspirations />
          </Col>
        </Row>
      </Container>
    </>
  );
}
