import styles from './NavBar.module.scss';
import globalStyles from '../../styles/globals.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <>
      <nav className={globalStyles.container}>
        <div className={`${styles.navContainer}`}>
          <div className={styles.navLogo}>
            <Image src={'/assets/Logo.png'} width={208} height={118} />
          </div>
          <div className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </nav>
    </>
  );
}