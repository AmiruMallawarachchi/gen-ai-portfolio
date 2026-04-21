import { getProjectBySlug, getProjects } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
   const projects = await getProjects();
   return projects?.filter(p => !!p.slug).map(p => ({ slug: p.slug })) || [];
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    if (slug.startsWith('mock')) {
       // mock view if supabase is empty but mock links were clicked
       return (
        <div style={{ padding: "150px 2rem 100px", minHeight: "100vh", maxWidth: "800px", margin: "0 auto" }}>
           <h1 style={{ fontSize: "var(--heading-1)", marginBottom: "1rem" }}>Mock Project Content</h1>
           <div className="glass-card" style={{ padding: "2rem", borderRadius: "12px", marginTop: "2rem" }}>
              <p>This is a placeholder because your Supabase database is empty.</p>
           </div>
        </div>
       )
    }
    notFound();
  }

  return (
    <div style={{ padding: "150px 2rem 100px", minHeight: "100vh", maxWidth: "800px", margin: "0 auto" }}>
       {project.image_url && (
          <img src={project.image_url} alt={project.title} style={{ width: "100%", borderRadius: "12px", marginBottom: "2rem" }} />
       )}
       <h1 style={{ fontSize: "var(--heading-1)", marginBottom: "1rem" }} className="gradient-text">{project.title}</h1>
       <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
         {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "10px 20px" }}>Live Demo</a>}
         {project.github_link && <a href={project.github_link} target="_blank" rel="noreferrer" className="btn-ghost" style={{ padding: "10px 20px" }}>GitHub Repo</a>}
       </div>
       <div className="content" style={{ lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "1.125rem" }}>
          <p>{project.description}</p>
          {project.content && (
              <div style={{ marginTop: "2rem" }}>
                 {/* For a real portfolio, use a Markdown parser like react-markdown here */}
                 {project.content}
              </div>
          )}
       </div>
    </div>
  );
}
