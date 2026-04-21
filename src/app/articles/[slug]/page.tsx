import { getArticleBySlug, getArticles } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
   const articles = await getArticles();
   return articles?.filter(a => !!a.slug).map(a => ({ slug: a.slug })) || [];
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article style={{ padding: "150px 2rem 100px", minHeight: "100vh", maxWidth: "800px", margin: "0 auto" }}>
       {article.cover_image && (
          <img src={article.cover_image} alt={article.title} style={{ width: "100%", borderRadius: "12px", marginBottom: "2rem" }} />
       )}
       <time style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--accent-gradient-start)", marginBottom: "1rem", display: "block", textAlign: "center" }}>
          {new Date(article.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
       </time>
       <h1 style={{ fontSize: "var(--heading-1)", marginBottom: "3rem", textAlign: "center" }} className="gradient-text">{article.title}</h1>
       
       <div className="content" style={{ lineHeight: "1.8", color: "var(--text-primary)", fontSize: "1.125rem", background: "white", padding: "3rem", borderRadius: "12px", boxShadow: "var(--shadow-sm)" }}>
          {/* For a real portfolio, use a Markdown parser like react-markdown here */}
          {article.content}
       </div>
    </article>
  );
}
