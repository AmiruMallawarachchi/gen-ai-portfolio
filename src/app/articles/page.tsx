import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import Link from 'next/link';

export default async function ArticlesPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('published_date', { ascending: false });

  const arts = articles || [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="gradient-text">Research & Writings</h1>
        <p className={styles.subtitle}>Thoughts on Generative AI, system design, and the future.</p>
      </header>

      <div className={styles.list}>
        {arts.length > 0 ? arts.map(a => (
          <Link href={`/articles/${a.slug}`} key={a.id} className={styles.articleCard}>
            <div className={styles.meta}>
              <span className={styles.date}>
                {new Date(a.published_date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
            <h2 className={styles.title}>{a.title}</h2>
            <p className={styles.excerpt}>{a.excerpt}</p>
            <div className={styles.readMore}>Read Article →</div>
          </Link>
        )) : (
          <div className={styles.emptyState}>No articles published yet.</div>
        )}
      </div>
    </div>
  );
}
