import styles from './HeroSection.module.scss';

export default function HeroSection() {
  return (
    <>
      <div className={styles.heroContainer}>
        <div >
          <h1>Celestia Designs</h1>
        </div>
        <div >
          <p>Since our inception in 2007, Celestia design has been dedicated to crafting products that embody the beauty and complexity of the universe.</p>
        </div>
      </div>
    </>
  );
}