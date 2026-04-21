import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials are not set!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types
export interface TechStack {
  id?: string;
  name: string;
  icon?: string;
  proficiency?: number;
  category: string;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  date_range: string;
  description: string;
  layout_order: number;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  dates: string;
  descriptions: string;
}

export interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  image_url?: string;
  link?: string;
  github_link?: string;
  content?: string;
  featured?: boolean;
}

export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  published_date: string;
  featured?: boolean;
}

// Data Fetchers
export async function getFeaturedProjects() {
  const { data, error } = await supabase.from('projects').select('*').eq('featured', true).limit(3);
  if (error) {
     console.error("Error fetching projects:", error);
     return [];
  }
  return data as Project[];
}

export async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*');
  return data as Project[];
}

export async function getProjectBySlug(slug: string) {
  const { data } = await supabase.from('projects').select('*').eq('slug', slug).single();
  return data as Project;
}

export async function getTechStack() {
  const { data } = await supabase.from('tech_stack').select('*');
  return data as TechStack[] || [];
}

export async function getExperience() {
  const { data } = await supabase.from('experience').select('*').order('layout_order', { ascending: true });
  return data as Experience[] || [];
}

export async function getEducation() {
  const { data } = await supabase.from('education').select('*');
  return data as Education[] || [];
}

export async function getArticles() {
  const { data } = await supabase.from('articles').select('*').order('published_date', { ascending: false });
  return data as Article[] || [];
}

export async function getArticleBySlug(slug: string) {
  const { data } = await supabase.from('articles').select('*').eq('slug', slug).single();
  return data as Article;
}
