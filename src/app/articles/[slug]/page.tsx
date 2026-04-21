import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

export const revalidate = 60;

export default async function ArticleDetailPage({ params }) {
  const { slug } = params;

  let article = null;
  const { data } = await supabase.from('articles').select('*').eq('slug', slug).single();
  article = data;

  // Fallback
  if (!article) {
    if (slug === 'fine-tuning-llama-3') {
      article = {
        title: 'Efficient Fine-tuning of LLaMA 3 for Domain Specific Tasks',
        published_date: '2024-03-15',
        content: `## Introduction\nFine-tuning large language models has historically been computationally expensive. However, with the advent of Parameter-Efficient Fine-Tuning (PEFT) methods, it is now accessible.\n\n## Methodology\nWe explore QLoRA...`,
        cover_image: null
      };
    } else if (slug === 'rag-in-production') {
      article = {
        title: 'Scaling RAG: From Prototype to Enterprise Production',
        published_date: '2024-02-28',
        content: `## Context\nRetrieval-Augmented Generation is eating the world.\n\n## Architecture\nBuilding a robust RAG service requires intelligent Chunking, precise embeddings, and an optimized Vector DB.`,
        cover_image: null
      };
    } else {
      notFound();
    }
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/articles" className="btn-secondary" style={{ marginBottom: '3rem', display: 'inline-flex', padding: '0.5rem 1rem', border: 'none', background: 'var(--glass-bg)' }}>
        <ArrowLeft size={16} /> Back to Articles
      </Link>
      
      <article>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
            <Calendar size={16} />
            <span>{new Date(article.published_date).toLocaleDateString()}</span>
          </div>
          <h1 className="heading-1" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{article.title}</h1>
        </div>

        {article.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.cover_image} alt={article.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: '3rem', border: '1px solid var(--glass-border)' }} />
        )}

        <div className="markdown-content" style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.8' }}>
          {article.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} style={{ color: 'var(--text-primary)', marginTop: '3rem', marginBottom: '1.5rem', fontSize: '2rem' }}>{line.replace('## ', '')}</h2>;
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} style={{ marginBottom: '1.5rem' }}>{line}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
