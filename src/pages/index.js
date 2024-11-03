import ControlledCarousel from "@/components/Carousel";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import Products from "@/components/Products";
import Section from "@/components/Section";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Container>
        {/* Make a hero container that has text and a CTA on the left and a carousel on the right */}
        <Row>
          <Col md={5}>
            <HeroSection />
          </Col>
          <Col md={7}>
            <ControlledCarousel />
          </Col>
        </Row>
        <Products />
      </Container>
    </>
  );
}
