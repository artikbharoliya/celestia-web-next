import { breadcrumbSchema } from "@/common/seo";
import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import TitleSection from "@/components/TitleSection";
import { useEffect, useRef, useState } from "react";
import styles from "./ContactPage.module.scss";

// Existing business contact details. Keep these consistent with the sales team.
const CONTACT_DETAILS = {
  addressLines: ["4040 N Collins St", "Suite 138", "Arlington, TX 76005"],
  email: "info@celestiadesign.com",
  phoneDisplay: "+1 (469) 222-5777",
  phoneHref: "+14692225777",
};

export default function ContactPage() {
  const [copyStatus, setCopyStatus] = useState("idle");
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
      setCopyStatus("copied");
    } catch (error) {
      setCopyStatus("error");
    } finally {
      if (resetCopyTimeoutRef.current) {
        window.clearTimeout(resetCopyTimeoutRef.current);
      }

      resetCopyTimeoutRef.current = window.setTimeout(() => {
        setCopyStatus("idle");
      }, 1600);
    }
  };

  return (
    <>
      <TitleSection
        title="Let’s talk about your space."
        subTitle="Product inquiries, technical questions, and project support."
      />
      <section className={styles.contactSection}>
        <div className="container split-section">
          <aside className={styles.infoPanel}>
            <p className={styles.kicker}>Contact / Celestia Designs</p>
            <h2 className={styles.panelTitle}>
              A conversation
              <br />
              starts here.
            </h2>
            <p className={styles.panelCopy}>
              Tell us about your project goals and our team will guide you to
              the right ceiling system.
            </p>
            <div className={styles.detailList}>
              <button
                type="button"
                className={`${styles.detailCard} ${styles.copyCard}`}
                aria-label="Copy address"
                onClick={() =>
                  handleCopy(CONTACT_DETAILS.addressLines.join("\n"))
                }
              >
                <span className={styles.detailLabel}>Address</span>
                <span className={styles.detailValue}>
                  {CONTACT_DETAILS.addressLines.map((line) => (
                    <span key={line} className={styles.detailLine}>
                      {line}
                    </span>
                  ))}
                </span>
              </button>
              <button
                type="button"
                className={`${styles.detailCard} ${styles.copyCard}`}
                aria-label="Copy email address"
                onClick={() => handleCopy(CONTACT_DETAILS.email)}
              >
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>
                  {CONTACT_DETAILS.email}
                </span>
              </button>
              <button
                type="button"
                className={`${styles.detailCard} ${styles.copyCard}`}
                aria-label="Copy phone number"
                onClick={() => handleCopy(CONTACT_DETAILS.phoneDisplay)}
              >
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>
                  {CONTACT_DETAILS.phoneDisplay}
                </span>
              </button>
            </div>
            <p className={styles.copyHint} aria-live="polite">
              {copyStatus === "copied"
                ? "Copied to clipboard"
                : copyStatus === "error"
                  ? "Unable to copy"
                  : "Select a contact detail to copy it."}
            </p>
            <Button
              as="a"
              className={styles.emailButton}
              href={`mailto:${CONTACT_DETAILS.email}`}
            >
              Email us <span aria-hidden="true">↗</span>
            </Button>
          </aside>
          <div className={styles.formPanel}>
            <h2 className="eyebrow">Send an inquiry</h2>
            <p className={styles.formIntro}>
              Share a few details about your project and how we can help.
            </p>
            <ContactForm />
          </div>
        </div>
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
  );
};
