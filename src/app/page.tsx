import Link from "next/link";
import styles from "./page.module.css";
import { getFeaturedProjects, getExperience, getEducation, getTechStack } from "@/lib/supabase";

export const revalidate = 60; // ISR cache

export default async function Home() {
  // Fetch required data from Supabase, pass fallback dummy data if not available
  const projects = await getFeaturedProjects();
  const experience = await getExperience();
  const education = await getEducation();
  const techStack = await getTechStack();

  // Fallbacks if tables are empty
  const hasProjects = projects && projects.length > 0;
  const hasExp = experience && experience.length > 0;
  const hasEdu = education && education.length > 0;
  const hasTech = techStack && techStack.length > 0;

  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 style={{ fontSize: "var(--hero-title)", marginBottom: "1rem" }} className="animate-fade-in-up">
          <span className="gradient-text">Architect intelligence.</span><br />
          Ship agents that work.
        </h1>
        <p className={`${styles.heroSubtitle} animate-fade-in-up delay-100`}>
          I build generative AI applications, robust LLM pipelines, and autonomous agents that transform raw data into enterprise-grade cognitive systems.
        </p>
        <div className={`${styles.ctaGroup} animate-fade-in-up delay-200`}>
          <Link href="/projects" className="btn-primary">View Work</Link>
          <a href="mailto:contact@example.com" className="btn-ghost">Get in touch</a>
        </div>
      </section>

      {/* Tech Stack / Features Section */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Capabilities & Stack</h2>
          <div className={styles.featureGrid}>
            {hasTech ? techStack.map((tech) => (
              <div key={tech.id} className={styles.featureCard}>
                <h3>{tech.name}</h3>
                <p>{tech.category} - {tech.proficiency}% Match</p>
              </div>
            )) : (
              <>
                <div className={styles.featureCard}>
                  <h3>Large Language Models</h3>
                  <p>Fine-tuning, RAG pipelines, and API integrations with GPT-4, Claude 3, and Open Source models.</p>
                </div>
                <div className={styles.featureCard}>
                  <h3>Vector Databases</h3>
                  <p>Semantic search, embedding generation, and high-performance querying using Pinecone and Postgres+pgvector.</p>
                </div>
                <div className={styles.featureCard}>
                  <h3>Full-Stack TypeScript</h3>
                  <p>Modern interactive UIs with Next.js, combined with robust backend APIs in Node.js and specialized Python microservices.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.section} style={{ background: "var(--background)" }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Professional Experience</h2>
          <div className={styles.timeline}>
            {hasExp ? experience.map((exp) => (
              <div key={exp.id} className={styles.timelineItem}>
                <span className={styles.timelineDate}>{exp.date_range}</span>
                <h3 className={styles.timelineTitle}>{exp.role}</h3>
                <h4 className={styles.timelineSubtitle}>{exp.company}</h4>
                <p className={styles.timelineDesc}>{exp.description}</p>
              </div>
            )) : (
              <>
                <div className={styles.timelineItem}>
                  <span className={styles.timelineDate}>2023 - Present</span>
                  <h3 className={styles.timelineTitle}>Senior Generative AI Engineer</h3>
                  <h4 className={styles.timelineSubtitle}>AI Innovators Inc.</h4>
                  <p className={styles.timelineDesc}>Lead development of autonomous enterprise systems using LangChain, Next.js, and custom foundational models. Architected a scalable RAG infrastructure serving millions of daily queries.</p>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.timelineDate}>2020 - 2023</span>
                  <h3 className={styles.timelineTitle}>Software Engineer (Machine Learning)</h3>
                  <h4 className={styles.timelineSubtitle}>Tech Giants LLC</h4>
                  <p className={styles.timelineDesc}>Optimized inference servers and designed custom data pipelines to fine-tune NLP applications for scale. Developed APIs that integrated intelligent categorization directly into core products.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

       {/* Featured Projects Section */}
       <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.featureGrid}>
             {hasProjects ? projects.map((project) => (
                <div key={project.id} className={styles.featureCard}>
                  <h3>{project.title}</h3>
                  <p style={{ marginBottom: "1.5rem" }}>{project.description}</p>
                  <Link href={`/projects/${project.slug}`} style={{ color: "var(--accent-gradient-start)", fontWeight: 600 }}>Explore Project &rarr;</Link>
                </div>
              )) : (
                <>
                  <div className={styles.featureCard}>
                    <h3>Agentic Support Automation</h3>
                    <p style={{ marginBottom: "1.5rem" }}>An autonomous support agent pipeline that handles dynamic issue resolution and orchestration across multiple internal systems.</p>
                    <Link href={`/projects/mock-1`} style={{ color: "var(--accent-gradient-start)", fontWeight: 600 }}>Explore Project &rarr;</Link>
                  </div>
                  <div className={styles.featureCard}>
                    <h3>Semantic Document Engine</h3>
                    <p style={{ marginBottom: "1.5rem" }}>A high-performance semantic search platform bridging complex compliance documents with an intuitive natural-language chat interface.</p>
                    <Link href={`/projects/mock-2`} style={{ color: "var(--accent-gradient-start)", fontWeight: 600 }}>Explore Project &rarr;</Link>
                  </div>
                </>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
