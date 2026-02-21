import StyledRow from "@/components/StyledRow";
import Image from "next/image";
import { useState } from "react";
import { Col, Ratio, Button, Modal } from "react-bootstrap";
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
      <StyledRow>
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <Ratio aspectRatio="4x3">
            <Image
              src={`/assets/products/${image}`}
              alt={"arlies"}
              height={300}
              width={400}
              className="rounded"
            />
          </Ratio>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column align-items-center align-items-md-start text-center text-md-start"
        >
          {dataSheet && (
            <a download href={dataSheet}>
              <Button variant="primary" className="me-auto mb-3">
                Download Data Sheet
              </Button>
            </a>
          )}
          {installLayout && (
            <a download href={installLayout}>
              <Button variant="primary" className="me-auto mb-3">
                Install Layout
              </Button>
            </a>
          )}
          {dimensionDrawings && (
            <Button variant="primary" className="mb-3" onClick={() => {
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
            }}>
              Dimension Drawings
            </Button>
          )}
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
