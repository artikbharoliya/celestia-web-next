import styles from './Footer.module.scss';
import globalStyles from '../../styles/globals.module.scss';
import Image from 'next/image';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className={styles.footerContainer}>
        <Container>
          <Row>
            <Col md={8} xs={12}>
              <Image
                src="/assets/Logo.png"
                alt="Logo"
                width={200}
                height={100}
              />
            </Col>
            <Col md={4} xs={12}>
              <Stack gap={3}>
                <Link href="/">Home</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/about">About Us</Link>
              </Stack>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}