import { forwardRef } from "react";
import BsButton from "react-bootstrap/Button";
import styles from "./Button.module.scss";

const Button = forwardRef(function Button(
  { className = "", variant = "primary", ...props },
  ref
) {
  const mergedClassName = [styles.button, className].filter(Boolean).join(" ");
  return <BsButton ref={ref} variant={variant} className={mergedClassName} {...props} />;
});

export default Button;
