import StyledRow from "@/components/StyledRow";
import Image from "next/image";
import { useState } from "react";
import { Col, Modal } from "react-bootstrap";
import Button from "@/components/Button";
import FileIcon from "/public/assets/ico/file-download.svg";
import styles from './Product.module.scss';

export default function Product({
  name,
  image,
  material,
  description,
  featureList,
  installLayout,
  dimensionDrawings,
  relatedAccessories,
  dataSheet
}) {

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Drawings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Array.isArray(dimensionDrawings) && dimensionDrawings.length > 0 ? (
            <ul>
              {dimensionDrawings.map((drawing) => {
                const fileName = drawing.split('/').pop();
                return (
                  <li key={drawing} className={styles.downloadLink}>
                    <Image src={FileIcon} alt="Download file icon" width={18} height={18} />
                    <a href={drawing} download target="_blank" rel="noopener noreferrer">
                      {fileName}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No dimension drawings available.</p>
          )}
        </Modal.Body>
      </Modal>
      <StyledRow className={styles.heroRow}>
        <Col xs={12} md={5} className={styles.imageCol}>
          <div className={styles.imageCard}>
            <div className={styles.imageFrame}>
              <Image
                src={`/assets/products/${image}`}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.productImage}
              />
            </div>
          </div>
        </Col>
        <Col xs={12} md={7} className={styles.contentCol}>
          <div className={styles.meta}>
            <h2 className={styles.productName}>{name}</h2>
            {material && <div className={styles.material}>{material}</div>}
          </div>
          <p className={styles.descriptionText}>{description}</p>
          <div className={styles.actionStack}>
            {dataSheet && (
              <a download href={dataSheet} className={styles.actionLink}>
                <Button variant="primary" className={styles.actionButton}>
                  Download Data Sheet
                </Button>
              </a>
            )}
            {installLayout && (
              <a download href={installLayout} className={styles.actionLink}>
                <Button variant="primary" className={styles.actionButton}>
                  Install Layout
                </Button>
              </a>
            )}
            {dimensionDrawings && (
              <Button
                variant="primary"
                className={styles.actionButton}
                onClick={() => {
                  if (Array.isArray(dimensionDrawings)) {
                    setShowModal(true);
                    console.log(dimensionDrawings);
                    console.log("Clicked Dimension Drawings Button");
                  } else {
                    console.log("Single file dimensionDrawings");
                    const link = document.createElement('a');
                    link.href = dimensionDrawings;
                    link.download = dimensionDrawings.split('/').pop();
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
              >
                Dimension Drawings
              </Button>
            )}
          </div>
        </Col>
      </StyledRow>
      <StyledRow className="align-items-center mt-4" isLastRow>
        <Col
          xs={12}
          md={7}
          className="d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start"
        >
          {featureList.length > 0 && (
            <>
              <h5>Product features:</h5>
              <ul className="text-start text-md-start">
                {featureList.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </>
          )}
        </Col>
      </StyledRow>
      <StyledRow className="align-items-center mt-4" isLastRow>
        <Col
          xs={12}
          md={7}
          className="d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start"
        >
          <h5>Related Accessories:</h5>
          <ul>
            {
              relatedAccessories.map((accessory) => (
                <li key={accessory}>{accessory}</li>
              ))
            }
          </ul>
        </Col>
      </StyledRow>
    </>
  );
}
