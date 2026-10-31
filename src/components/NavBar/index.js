import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import { NavList, NavType } from "@/common/constant";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const navigation = useRef(null);
  const productToggle = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Close menus after a route or About-anchor change, including mobile navigation.
    setExpanded(false);
    setProductsOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const closeOutside = (event) => {
      if (!navigation.current?.contains(event.target)) {
        setProductsOpen(false);
        setExpanded(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  const closeMenus = () => {
    setExpanded(false);
    setProductsOpen(false);
  };
  const handleEscape = (event) => {
    if (event.key !== "Escape") return;
    if (productsOpen) {
      setProductsOpen(false);
      productToggle.current?.focus();
    } else {
      setExpanded(false);
      navigation.current?.querySelector(".navbar-toggler")?.focus();
    }
  };

  return (
    <Navbar
      ref={navigation}
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className={styles.navigation}
      aria-label="Main navigation"
      onKeyDown={handleEscape}
    >
      <div className={`container ${styles.inner}`}>
        <Link
          href="/"
          aria-label="Celestia Designs home"
          className={styles.brand}
          onClick={closeMenus}
        >
          <Image
            src="/assets/Logo.png"
            alt="Celestia Design"
            width={112}
            height={64}
            priority
          />
        </Link>
        <Navbar.Toggle
          aria-controls="main-navigation"
          label="Toggle navigation"
        />
        <Navbar.Collapse id="main-navigation" className={styles.collapse}>
          <ul className={styles.links}>
            {NavList.map((item) => (
              <li
                key={item.title}
                className={styles.item}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setProductsOpen(false);
                }}
              >
                <div className={styles.linkRow}>
                  <Link
                    href={item.link}
                    onClick={closeMenus}
                    aria-current={
                      router.pathname === item.link ? "page" : undefined
                    }
                  >
                    {item.title}
                  </Link>
                  {item.type === NavType.Dropdown && (
                    <button
                      ref={productToggle}
                      type="button"
                      className={styles.dropdownToggle}
                      aria-label="Toggle product links"
                      aria-expanded={productsOpen}
                      aria-controls="product-links"
                      onClick={() => setProductsOpen(!productsOpen)}
                    >
                      <span aria-hidden="true">{productsOpen ? "−" : "+"}</span>
                    </button>
                  )}
                </div>
                {item.type === NavType.Dropdown && (
                  <ul
                    id="product-links"
                    className={styles.dropdown}
                    hidden={!productsOpen}
                  >
                    <li>
                      <Link href="/products" onClick={closeMenus}>
                        All systems <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                    {item.dropdownList.map((product) => (
                      <li key={product.title}>
                        <Link href={product.link} onClick={closeMenus}>
                          {product.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
