import ControlledCarousel from "@/components/Carousel";
import HeroSection from "@/components/HeroSection";
import MarketingCopy from "@/components/MarketingCopy";
import Products from "@/components/Products";
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
    </>
  );
}
