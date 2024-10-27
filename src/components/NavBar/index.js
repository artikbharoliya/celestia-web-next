import { RiArrowDownWideLine } from "@remixicon/react";
import styles from "./NavBar.module.scss";
import Image from "next/image";
import Link from "next/link";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { NavList, NavType } from "@/common/constant";

const NavIem = ({ item, toggleSubmenu, submenuOpen }) => {
  if (item.type === NavType.Dropdown) {
    return (
      <li
        key={item.title}
        className={`${styles.menuItem} ${styles.menuItemHasChildren}`}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu(item.title);
          }}
          className={`${styles.dropDownItem}`}
        >
          {item.title}{" "}
          <RiArrowDownWideLine
            className={`${styles.downArrow} ${item.title === submenuOpen ? styles.upArrow : ""
              }`}
          />
        </div>
        <ul
          className={`${styles.subMenu} ${item.title === submenuOpen ? styles.active : ""
            }`}
        >
          {item.dropdownList.map((subItem, subIndex) => (
            <li key={subIndex} className={styles.menuItem}>
              <Link href={subItem.link}>{subItem.title}</Link>
            </li>
          ))}
        </ul>
      </li>
    );
  } else {
    return (
      <li key={item.title} className={styles.menuItem}>
        <Link href={item.link}>{item.title}</Link>
      </li>
    );
  }
};
export default function NavBar() {
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const mediaSize = 991;

  const toggleSubmenu = (title) => {
    setSubmenuOpen((prev) => (prev === title ? null : title));
  };

  const collapseSubMenu = () => {
    setSubmenuOpen(null);
  };

  const resizeFix = () => {
    if (window.innerWidth > mediaSize) {
      collapseSubMenu();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeFix);
    return () => window.removeEventListener("resize", resizeFix);
  }, []);
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <Image src="/assets/Logo.png" alt="Logo" width={200} height={100} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ms-auto ${styles.navLinkContainer}`}>
            {NavList.map((item, index) => (
              <NavIem
                key={index}
                item={item}
                toggleSubmenu={toggleSubmenu}
                submenuOpen={submenuOpen}
              />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
