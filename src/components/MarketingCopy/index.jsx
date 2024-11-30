import { Col, Row } from "react-bootstrap";
import styles from './MarketingCopy.module.scss';

export default function MarketingCopy() {
  return (
    <Row className="pb-5 pt-2">
      <Col md={12} className={styles.copyContainer}>
        <h1 className={styles.title}>Who are we!</h1>
        <h6 className={styles.copy}>
          Since our inception in 2007, Celestia Design has been dedicated to crafting products that embody the beauty and complexity of the universe. Inspired by celestial patterns, we create innovative designs that not only captivate the eye but also inspire awe. Based in Surat, Gujarat, India, our manufacturing facility specializes in high-quality metal ceilings, louvers, and extruded windows. We are committed to pushing the boundaries of design, seamlessly blending creativity with practicality to deliver products that leave a lasting impression.At Celestia Design, we take pride in our ability to transform ideas into reality, ensuring that each creation brings a touch of magic to your space. Join us on our journey to explore the extraordinary!
        </h6>
      </Col>
    </Row>
  );
}