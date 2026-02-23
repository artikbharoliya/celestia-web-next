
import { breadcrumbSchema } from '@/common/seo';
import ContactForm from '@/components/ContactForm';
import Layout from '@/components/Layout';
import TitleSection from '@/components/TitleSection';
import { Container, Row, Col, Alert } from 'react-bootstrap';

export default function ContactPage() {
  return (
    <>
      <TitleSection title={"Contact Celestia Designs"} />
      <Container>
        <Row className="justify-content-center pt-3">
          <Col md={8}>
            <Alert variant="light">
              Please fill out the form below with any questions or comments you may have. We will get back to you as soon as possible.
            </Alert>
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

ContactPage.getLayout = function getLayout(page) {
  return (
    <Layout
      pageTitle="Contact Celestia Designs"
      description="Contact Celestia Designs for product inquiries, technical questions, and project support."
      canonicalPath="/contact"
      jsonLd={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ])}
    >
      {page}
    </Layout>
  )
}
