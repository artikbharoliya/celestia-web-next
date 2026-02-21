import Section from "../Section";
import style from "./TitleSction.module.scss";
import { Col, Container, Row } from "react-bootstrap";
export default function TitleSection({ title, subTitle, children }) {
  return (
    <>
      <div className={`${style.banner}`}>
        <Container>
          <Row className={`${style.bannerContent}`}>
            <Col xl={6}>
              <div className="text-truncate h1">{title}</div>
              {subTitle && (<div className="text-truncate text-muted h5">{subTitle}</div>)}
            </Col>
          </Row>
        </Container>
      </div>
      <Container>{children}</Container>
    </>
  );
}
