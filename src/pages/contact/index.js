
import Layout from '@/components/Layout';
import TitleSection from '@/components/TitleSection';
import { useState } from 'react';
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Button from '@/components/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // if (name === 'message' && value.length > 600) {
    //   alert('Message is too long. Please keep it under 600 characters.');
    // }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ ...formData })
    // });

    // if (response.ok) {
    //   alert('Message sent successfully!');
    //   setFormData({ name: '', email: '', message: '' });
    // } else {
    // }

    alert('This service is under maintence. Please email your questions or comments at : Info@celestiadesign.com');

  };

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
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMessage" className="mt-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>

      </Container>
    </>
  );
}

ContactForm.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
