import StyledRow from "@/components/StyledRow";
import Image from "next/image";
import { Col, Ratio, Button } from "react-bootstrap";
export default function Product({
  name,
  image,
  material,
  description,
  featureList,
  donwloadLink,
  relatedAccessories
}) {
  console.log(featureList);

  return (
    <>
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
          className="d-flex flex-column  align-items-center align-items-md-start text-center text-md-start"
        >
          <h1 className="mb-3">Product Description</h1>
          <p className="mb-4">{description}</p>
          <Button variant="primary" className="me-auto mb-3">
            Download Data Sheet
          </Button>
          <Button variant="primary" className="me-auto mb-3">
            Download Install Manual
          </Button>
          <Button variant="primary" className="me-auto mb-3">
            Metal Perforations Option
          </Button>
          <Button variant="primary" className="me-auto mb-3">
            Color and Wood Finish Options
          </Button>
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
