import Link from "next/link";
import { getProjects } from "@/lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Projects | Ami.ai",
  description: "Explore generative AI projects and architectures.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const hasProjects = projects && projects.length > 0;

  return (
    <div style={{ padding: "150px 2rem 100px", minHeight: "100vh" }}>
      <div className="container">
        <h1 style={{ fontSize: "var(--heading-1)", marginBottom: "1rem" }} className="animate-fade-in-up">
          Engineering <span className="gradient-text">Portfolio</span>
        </h1>
        <p style={{ fontSize: "var(--body-large)", color: "var(--text-secondary)", marginBottom: "4rem", maxWidth: "600px" }} className="animate-fade-in-up delay-100">
          A collection of production-ready systems, autonomous agents, and open-source models I have developed.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }} className="animate-fade-in-up delay-200">
          {hasProjects ? projects.map(proj => (
            <div key={proj.id} className="glass-card" style={{ padding: "2rem", borderRadius: "12px", transition: "transform 0.3s ease" }}>
               <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{proj.title}</h3>
               <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: "1.6" }}>{proj.description}</p>
               <Link href={`/projects/${proj.slug}`} className="btn-ghost" style={{ padding: "10px 20px", fontSize: "14px" }}>View Details &rarr;</Link>
            </div>
          )) : (
             <div className="glass-card" style={{ padding: "2rem", borderRadius: "12px" }}>
               <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>No projects found</h3>
               <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: "1.6" }}>Add some projects to your Supabase database to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
