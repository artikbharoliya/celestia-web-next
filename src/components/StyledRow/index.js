import { Row } from "react-bootstrap";

// Forward classes and props so the shared product template can style its rows.
export default function StyledRow({
  children,
  isLastRow,
  className = "",
  style,
  ...props
}) {
  return (
    <Row
      {...props}
      className={className}
      style={{
        marginTop: "2.5rem",
        marginBottom: isLastRow ? "2.5rem" : 0,
        ...style,
      }}
    >
      {children}
    </Row>
  );
}
