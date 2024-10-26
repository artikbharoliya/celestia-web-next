import styles from './NavBar.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={200}
              height={100}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ms-auto ${styles.navLinkContainer}`}>
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <NavDropdown title="Documents" id="basic-nav-dropdown">
              <NavDropdown.Item><Link href="/documents/certificates">Certifications</Link></NavDropdown.Item>
              <NavDropdown.Item><Link href="/documents/data-sheet">Data Sheets</Link></NavDropdown.Item>
              <NavDropdown.Item><Link href="/documents/installation">Installation</Link></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item><Link href="/products/arlies">arlies</Link></NavDropdown.Item>
              <NavDropdown.Item><Link href="/products/lynx">Lynx</Link></NavDropdown.Item>
              <NavDropdown.Item><Link href="/products/orion">Orion</Link></NavDropdown.Item>
            </NavDropdown>
            <Link href="/contact">Contact Us</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}