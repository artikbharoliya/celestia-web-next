import style from "./TitleSction.module.scss";
import { Col, Container, Row } from "react-bootstrap";

export default function TitleSection({ title, subTitle, titleTag = "h1", children }) {
  const HeadingTag = titleTag;

  return (
    <>
      <div className={`${style.banner}`}>
        <Container>
          <Row className={`${style.bannerContent}`}>
            <Col xl={6}>
              <HeadingTag className="text-truncate">{title}</HeadingTag>
              {subTitle && <p className="text-truncate text-muted h5 mb-0">{subTitle}</p>}
            </Col>
          </Row>
        </Container>
      </div>
      <Container>{children}</Container>
    </>
  );
}
