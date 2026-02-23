
import { breadcrumbSchema } from '@/common/seo';
import Button from '@/components/Button';
import ContactForm from '@/components/ContactForm';
import Layout from '@/components/Layout';
import TitleSection from '@/components/TitleSection';
import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import styles from './ContactPage.module.scss';

// Placeholder details for now. Replace with your actual business contact information.
const CONTACT_DETAILS = {
  addressLines: [
    '4040 N Collins St',
    'Suite 138',
    'Arlington, TX 76005',
  ],
  email: 'info@celestiadesign.com',
  phoneDisplay: '+1 (469) 222-5777',
  phoneHref: '+14692225777',
};

export default function ContactPage() {
  const [copyStatus, setCopyStatus] = useState('idle');
  const resetCopyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetCopyTimeoutRef.current) {
        window.clearTimeout(resetCopyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus('copied');
    } catch (error) {
      setCopyStatus('error');
    } finally {
      if (resetCopyTimeoutRef.current) {
        window.clearTimeout(resetCopyTimeoutRef.current);
      }

      resetCopyTimeoutRef.current = window.setTimeout(() => {
        setCopyStatus('idle');
      }, 1600);
    }
  };

  const handleCopyCardKeyDown = (event, textToCopy) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCopy(textToCopy);
    }
  };

  return (
    <>
      <TitleSection title={"Contact Celestia Designs"} />
      <section className={styles.contactSection}>
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col md={5} className="order-2 order-md-1">
              <aside className={styles.infoPanel}>
                <p className={styles.kicker}>Connect with us</p>
                <h2 className={styles.panelTitle}>Get in touch</h2>
                <p className={styles.panelCopy}>
                  Tell us about your project goals and our team will guide you to the right ceiling system.
                </p>

                <div className={styles.detailList}>
                  <div
                    className={`${styles.detailCard} ${styles.copyCard}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleCopy(CONTACT_DETAILS.addressLines.join('\n'))}
                    onKeyDown={(event) => handleCopyCardKeyDown(event, CONTACT_DETAILS.addressLines.join('\n'))}
                  >
                    <p className={styles.detailLabel}>Address</p>
                    <p className={styles.detailValue}>
                      {CONTACT_DETAILS.addressLines.map((line) => (
                        <span key={line} className={styles.detailLine}>{line}</span>
                      ))}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`${styles.detailCard} ${styles.copyCard}`}
                    onClick={() => handleCopy(CONTACT_DETAILS.email)}
                  >
                    <p className={styles.detailLabel}>Email</p>
                    <p className={styles.detailValue}>
                      {CONTACT_DETAILS.email}
                    </p>
                  </button>
                  <button
                    type="button"
                    className={`${styles.detailCard} ${styles.copyCard}`}
                    onClick={() => handleCopy(CONTACT_DETAILS.phoneDisplay)}
                  >
                    <p className={styles.detailLabel}>Phone</p>
                    <p className={styles.detailValue}>
                      {CONTACT_DETAILS.phoneDisplay}
                    </p>
                  </button>
                </div>
                <p className={styles.copyHint} aria-live="polite">
                  {copyStatus === 'copied' && 'Copied to clipboard'}
                  {copyStatus === 'error' && 'Unable to copy'}
                  {copyStatus === 'idle' && 'Click any card to copy'}
                </p>

                <Button as="a" className={styles.emailButton} href={`mailto:${CONTACT_DETAILS.email}`}>
                  Email us
                </Button>
              </aside>
            </Col>
            <Col md={7} className="order-1 order-md-2">
              <div className={styles.formPanel}>
                <Alert variant="light" className={styles.formIntro}>
                  Please fill out the form below with any questions or comments you may have. We will get back to
                  you as soon as possible.
                </Alert>
                <ContactForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
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
