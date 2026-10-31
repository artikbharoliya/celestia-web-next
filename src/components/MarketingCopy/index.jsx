import styles from "./MarketingCopy.module.scss";

export default function MarketingCopy() {
  return (
    <section
      id="about"
      className={`page-section split-section ${styles.about}`}
      aria-labelledby="about-heading"
    >
      <div>
        <p className="eyebrow">03 / About Celestia</p>
        <h2 id="about-heading" className="section-title">
          Considered design.
          <br />
          Built to last.
        </h2>
      </div>
      <div className={styles.copy}>
        <p>
          Since 2007, Celestia Design has brought together material, geometry,
          and manufacturing to create architectural metal systems.
        </p>
        <p>
          Based in Surat, Gujarat, India, we manufacture metal ceilings,
          louvers, and extruded windows. Our linear and baffle systems bring a
          consistent design language to interior and exterior spaces.
        </p>
      </div>
    </section>
  );
}
