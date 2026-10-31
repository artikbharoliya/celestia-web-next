import StyledRow from "@/components/StyledRow";
import Image from "next/image";
import { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import Button from "@/components/Button";
import styles from "./Product.module.scss";

export default function Product({
  name,
  image,
  material,
  description,
  featureList = [],
  installLayout,
  dimensionDrawings,
  relatedAccessories = [],
  dataSheet,
}) {
  const [showDrawings, setShowDrawings] = useState(false);
  return (
    <>
      {/* Document links keep their original file URLs and readable file names. */}
      <Modal
        show={showDrawings}
        onHide={() => setShowDrawings(false)}
        aria-labelledby="drawings-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="drawings-title">
            {name} / Dimension drawings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className={styles.downloadList}>
            {Array.isArray(dimensionDrawings) &&
              dimensionDrawings.map((drawing) => (
                <li key={drawing}>
                  <a href={drawing} download>
                    <span>{drawing.split("/").pop()}</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                </li>
              ))}
          </ul>
        </Modal.Body>
      </Modal>
      <StyledRow className={styles.heroRow}>
        <Col xs={12} md={6} className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <Image
              src={`/assets/products/${image}`}
              alt={`${name} — ${material} profile`}
              fill
              sizes="(max-width: 767px) 90vw, (max-width: 1600px) 44vw, 720px"
              priority
            />
          </div>
        </Col>
        <Col xs={12} md={6} className={styles.contentCol}>
          <p className="eyebrow">01 / System overview</p>
          <h2 className={styles.material}>{material}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            {dataSheet && (
              <a download href={dataSheet}>
                Download data sheet <span aria-hidden="true">↓</span>
              </a>
            )}
            {installLayout && (
              <a download href={installLayout}>
                Download installation layout <span aria-hidden="true">↓</span>
              </a>
            )}
            {Array.isArray(dimensionDrawings) &&
            dimensionDrawings.length > 0 ? (
              <button type="button" onClick={() => setShowDrawings(true)}>
                View dimension drawings <span aria-hidden="true">↗</span>
              </button>
            ) : (
              typeof dimensionDrawings === "string" && (
                <a download href={dimensionDrawings}>
                  Download dimension drawing <span aria-hidden="true">↓</span>
                </a>
              )
            )}
          </div>
        </Col>
      </StyledRow>
      {featureList.length > 0 && (
        <section
          className={`page-section ${styles.detailSection}`}
          aria-labelledby="features-heading"
        >
          <div>
            <p className="eyebrow">02 / Specifications</p>
            <h2 id="features-heading" className="section-title">
              Product features.
            </h2>
          </div>
          <ol className={styles.features}>
            {featureList.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ol>
        </section>
      )}
      {relatedAccessories.length > 0 && (
        <section className="page-section" aria-labelledby="accessories-heading">
          <p className="eyebrow">03 / The complete system</p>
          <h2 id="accessories-heading" className="section-title">
            Related accessories.
          </h2>
          <ul className={styles.accessories}>
            {relatedAccessories.map((accessory) => (
              <li key={accessory}>{accessory}</li>
            ))}
          </ul>
        </section>
      )}
      <div className={styles.inquiry}>
        <p>Discuss {name} for your next project.</p>
        <Button as="a" href="/contact">
          Start a conversation <span aria-hidden="true">↗</span>
        </Button>
      </div>
    </>
  );
}
