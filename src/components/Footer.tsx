import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.brand}>
            <h3>Ami<span className="gradient-text">.ai</span></h3>
            <p>Generative AI Engineer building autonomous agents and intelligence architectures.</p>
          </div>
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>Explore</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/articles">Articles</Link></li>
              </ul>
            </div>
            <div className={styles.linkGroup}>
              <h4>Connect</h4>
              <ul>
                <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Ami. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
