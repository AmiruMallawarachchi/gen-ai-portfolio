"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <Link href="/">
          Ami<span className="gradient-text">.ai</span>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={pathname === "/" ? styles.active : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className={pathname.startsWith("/projects") ? styles.active : ""}
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/articles"
            className={pathname.startsWith("/articles") ? styles.active : ""}
          >
            Articles
          </Link>
        </li>
      </ul>
      <div className={styles.navCta}>
        <a href="mailto:contact@example.com" className="btn-primary">
          Hire Me
        </a>
      </div>
    </nav>
  );
}
