import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string; // rendered HTML
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title,
          excerpt: data.excerpt,
          date: data.date,
          author: data.author,
          authorRole: data.authorRole,
          category: data.category,
          readTime: data.readTime,
          coverImage: data.coverImage,
          tags: data.tags || [],
        } as BlogPostMeta;
      })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const processed = await remark().use(remarkHtml).process(content);
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      author: data.author,
      authorRole: data.authorRole,
      category: data.category,
      readTime: data.readTime,
      coverImage: data.coverImage,
      tags: data.tags || [],
      content: processed.toString(),
    };
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3
): Promise<BlogPostMeta[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export async function getCategories(): Promise<string[]> {
  const all = await getAllPosts();
  return Array.from(new Set(all.map((p) => p.category)));
}