import Link from "next/link";
import { getArticles } from "@/lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Articles | Ami.ai",
  description: "Writings on AI, language models, and software engineering.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  const hasArticles = articles && articles.length > 0;

  return (
    <div style={{ padding: "150px 2rem 100px", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "var(--heading-1)", marginBottom: "1rem" }} className="animate-fade-in-up">
          Insights & <span className="gradient-text">Writing</span>
        </h1>
        <p style={{ fontSize: "var(--body-large)", color: "var(--text-secondary)", marginBottom: "4rem" }} className="animate-fade-in-up delay-100">
          Thoughts on emerging technologies, deployment strategies, and building reliable Gen AI products.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} className="animate-fade-in-up delay-200">
          {hasArticles ? articles.map(article => (
            <div key={article.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "2rem" }}>
               <time style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--accent-gradient-start)", marginBottom: "0.5rem", display: "block" }}>
                  {new Date(article.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
               </time>
               <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                 <Link href={`/articles/${article.slug}`} style={{ transition: "color 0.2s" }} className="article-link">{article.title}</Link>
               </h3>
               <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1rem" }}>{article.excerpt}</p>
               <Link href={`/articles/${article.slug}`} style={{ color: "var(--accent-gradient-start)", fontWeight: 600, fontSize: "0.875rem" }}>Read Article &rarr;</Link>
            </div>
          )) : (
             <div style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "2rem" }}>
               <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>No articles published yet</h3>
               <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>Check back soon for insights on generative AI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
