import { Row } from "react-bootstrap";

export default function StyledRow({ children, isLastRow }) {
  return (
    <Row
      style={{
        padding: 0,
        marginTop: "2.5rem",
        marginBottom: isLastRow ? "2.5rem" : 0,
      }}
    >
      {children}
    </Row>
  );
}
