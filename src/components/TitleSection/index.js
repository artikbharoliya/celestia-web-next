import styles from "./TitleSction.module.scss";

export default function TitleSection({
  title,
  subTitle,
  titleTag = "h1",
  children,
}) {
  const Heading = titleTag;
  return (
    <>
      <header className={`container ${styles.heading}`}>
        <p className="eyebrow">
          Celestia Designs / Architectural metal systems
        </p>
        <Heading>{title}</Heading>
        {subTitle && <p className={styles.subtitle}>{subTitle}</p>}
      </header>
      {children && <div className="container">{children}</div>}
    </>
  );
}
