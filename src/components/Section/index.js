import styles from './Section.module.scss';

export default function Section({ children }) {
  return (
    <>
      <div className={styles.section}>
        {children}
      </div>
    </>
  );
}