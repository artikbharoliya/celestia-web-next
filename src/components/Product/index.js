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
          className="d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start"
        >
          <p className="mb-4">{description}</p>
          <Button variant="primary" className="mx-auto">
            Download Data Sheet
          </Button>
        </Col>
      </StyledRow>
      <StyledRow className="align-items-center mt-4" isLastRow>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start"
        >
          <h1 className="mb-3">Product Description</h1>
          <p className="mb-3">{description}</p>
          {featureList.length > 0 && (
            <>
              <h6>Product features:</h6>
              <ul className="text-start text-md-start">
                {featureList.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </>
          )}
        </Col>
      </StyledRow>
    </>
  );
}
