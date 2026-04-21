import Link from 'next/link';
import { Terminal, Lightbulb, PenTool, User } from 'lucide-react';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Terminal size={24} className={styles.iconAccent} />
          <span>GenAI.dev</span>
        </Link>
        <div className={styles.links}>
          <Link href="/" className={styles.navLink}>
            <User size={16} /> Home
          </Link>
          <Link href="/projects" className={styles.navLink}>
            <Lightbulb size={16} /> Projects
          </Link>
          <Link href="/articles" className={styles.navLink}>
            <PenTool size={16} /> Articles
          </Link>
        </div>
      </div>
    </nav>
  );
}
