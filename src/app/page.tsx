import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import { Terminal, Database, Code, Cpu } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  // Fetch Tech Stack
  const { data: techStack } = await supabase.from('tech_stack').select('*');
  
  // Fetch Experience
  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .order('layout_order', { ascending: true });

  // Fetch Education
  const { data: education } = await supabase
    .from('education')
    .select('*')
    .order('layout_order', { ascending: true });

  const tech = techStack || [];
  const exp = experience || [];
  const edu = education || [];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            Gen AI Engineer based in Cyberspace
          </div>
          <h1 className="animate-fade-in gradient-text">Architecting Intelligence</h1>
          <p className={styles.heroSubtitle}>
            Specialized in Large Language Models, Multi-Modal Systems, and Scalable Backend Infrastructure. 
            Transforming research papers into production-ready software.
          </p>
          <div className={styles.heroActions}>
            <Link href="/projects" className={styles.primaryButton}>
              <Terminal size={18} /> View Projects
            </Link>
            <a href="mailto:contact@example.com" className={styles.secondaryButton}>
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Cpu className="accent-text" /> Neural Synapses (Tech Stack)
        </h2>
        <div className={styles.bentoGrid}>
          {tech.length > 0 ? tech.map((t) => (
            <div key={t.id} className={styles.bentoCard}>
              <h3 className={styles.bentoTitle}>{t.name}</h3>
              <p className={styles.bentoCategory}>{t.category}</p>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${t.proficiency}%` }} />
              </div>
            </div>
          )) : (
            <div className={styles.emptyState}>No tech stack configured yet.</div>
          )}
        </div>
      </section>

      <div className={styles.splitSection}>
        {/* Experience Section */}
        <section className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>
            <Code className="accent-text" /> Experience Log
          </h2>
          <div className={styles.timeline}>
            {exp.length > 0 ? exp.map((e) => (
              <div key={e.id} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3>{e.role}</h3>
                    <span className={styles.timelineDate}>{e.date_range}</span>
                  </div>
                  <h4 className={styles.timelineCompany}>{e.company}</h4>
                  <p>{e.description}</p>
                </div>
              </div>
            )) : (
              <div className={styles.emptyState}>No experience configured yet.</div>
            )}
          </div>
        </section>

        {/* Education Section */}
        <section className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>
            <Database className="accent-text" /> Training Data (Education)
          </h2>
          <div className={styles.timeline}>
            {edu.length > 0 ? edu.map((e) => (
              <div key={e.id} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3>{e.degree}</h3>
                    <span className={styles.timelineDate}>{e.date_range}</span>
                  </div>
                  <h4 className={styles.timelineCompany}>{e.institution}</h4>
                  <p>{e.description}</p>
                </div>
              </div>
            )) : (
              <div className={styles.emptyState}>No education configured yet.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
