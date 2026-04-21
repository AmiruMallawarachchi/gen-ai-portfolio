import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';

export default async function ProjectsPage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const proj = projects || [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="gradient-text">Select Projects</h1>
        <p className={styles.subtitle}>A showcase of my systems, architectures, and experiments.</p>
      </header>

      <div className={styles.grid}>
        {proj.length > 0 ? proj.map(p => (
          <div key={p.id} className={styles.card}>
            <div className={styles.cardImagePlaceholder}>
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_url} alt={p.title} className={styles.cardImage} />
              ) : (
                <div className={styles.imageFallback}>{p.title.charAt(0)}</div>
              )}
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{p.title}</h2>
              <p className={styles.cardDescription}>{p.description}</p>
              <div className={styles.cardLinks}>
                {p.github_link && (
                  <a href={p.github_link} target="_blank" rel="noreferrer" className={styles.iconLink}>
                    <Github size={20} />
                  </a>
                )}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className={styles.iconLink}>
                    <ExternalLink size={20} />
                  </a>
                )}
                <Link href={`/projects/${p.slug}`} className={styles.readMore}>
                  Case Study →
                </Link>
              </div>
            </div>
          </div>
        )) : (
          <div className={styles.emptyState}>No projects added yet.</div>
        )}
      </div>
    </div>
  );
}
