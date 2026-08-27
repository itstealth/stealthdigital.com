import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, Clock, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { LetsWorkTogether } from "@/components/ui/lets-work-section";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    getPostBySlug(slug),
    getRelatedPosts(slug, 3),
  ]);

  if (!post) notFound();

  return (
    <>
      {/* Article hero */}
      <article>
        <header className="relative pt-32 md:pt-44 pb-12 md:pb-16 border-b border-cream/10">
          <div className="container-x max-w-4xl">
            <Reveal variant="up">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cream/50 hover:text-accent transition-colors mb-8"
              >
                <ArrowLeft size={12} /> Back to Blog
              </Link>
            </Reveal>

            <Reveal variant="up" delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <span className="pill border-accent/40 text-accent">
                  {post.category}
                </span>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.15}>
              <h1 className="font-display text-[36px] sm:text-[52px] md:text-[72px] lg:text-[88px] font-bold leading-[0.98] tracking-[-0.03em] text-balance text-cream mb-8">
                {post.title}
              </h1>
            </Reveal>

            <Reveal variant="up" delay={0.25}>
              <p className="text-lg md:text-xl text-cream/70 leading-relaxed text-pretty mb-8">
                {post.excerpt}
              </p>
            </Reveal>

            <Reveal variant="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center font-display text-base font-bold text-accent">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-cream">
                      {post.author}
                    </div>
                    <div className="font-mono text-xs text-cream/50">
                      {post.authorRole}
                    </div>
                  </div>
                </div>
                <span className="hidden md:block text-cream/20">|</span>
                <div className="flex items-center gap-2 font-mono text-xs text-cream/50">
                  <Calendar size={12} />
                  {format(parseISO(post.date), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-cream/50">
                  <Clock size={12} />
                  {post.readTime}
                </div>
              </div>
            </Reveal>
          </div>
        </header>

        {/* Cover image */}
        <div className="container-x max-w-5xl my-12 md:my-16">
          <Reveal variant="up">
            <div className="relative aspect-[16/8] overflow-hidden rounded-sm bg-ink-800">
              <Parallax distance={20}>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                  priority
                />
              </Parallax>
            </div>
          </Reveal>
        </div>

        {/* Content */}
        <div className="container-x max-w-3xl py-12 md:py-20">
          <div
            className="prose-stealth"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-cream/10">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50 mb-3">
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-20 md:py-32 border-t border-cream/10 bg-ink-900">
          <div className="container-x">
            <Reveal variant="up">
              <div className="flex items-center gap-3 mb-12">
                <span className="h-px w-8 bg-accent" />
                <span className="eyebrow">Keep Reading</span>
              </div>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal
                  key={r.slug}
                  variant="up"
                  delay={i * 0.08}
                  className="group"
                >
                  <Link
                    href={`/blog/${r.slug}`}
                    className="block bg-ink-950 border border-cream/10 hover:border-accent/30 transition-colors"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                      <span className="absolute top-4 left-4 pill border-cream/20 bg-ink-950/80 backdrop-blur">
                        {r.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold tracking-tight text-cream mb-2 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <div className="font-mono text-xs text-cream/40">
                        {format(parseISO(r.date), "MMM d, yyyy")} · {r.readTime}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <LetsWorkTogether />

      {/* Prose styles */}
      <style>{`
        .prose-stealth { color: rgba(245,241,234,0.8); font-size: 17px; line-height: 1.8; }
        .prose-stealth h2 { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: #F5F1EA; margin-top: 56px; margin-bottom: 20px; letter-spacing: -0.02em; line-height: 1.15; }
        .prose-stealth h3 { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: #F5F1EA; margin-top: 40px; margin-bottom: 16px; letter-spacing: -0.01em; }
        .prose-stealth p { margin-bottom: 24px; }
        .prose-stealth a { color: #EF4444; text-decoration: underline; text-underline-offset: 3px; }
        .prose-stealth a:hover { color: #F87171; }
        .prose-stealth strong { color: #F5F1EA; font-weight: 600; }
        .prose-stealth em { font-style: italic; }
        .prose-stealth ul, .prose-stealth ol { padding-left: 24px; margin-bottom: 24px; }
        .prose-stealth li { margin-bottom: 8px; }
        .prose-stealth ul li { list-style-type: disc; }
        .prose-stealth ol li { list-style-type: decimal; }
        .prose-stealth blockquote { border-left: 3px solid #EF4444; padding-left: 20px; font-style: italic; margin: 32px 0; color: rgba(245,241,234,0.6); }
        .prose-stealth code { font-family: var(--font-mono); background: rgba(245,241,234,0.05); padding: 2px 6px; border-radius: 3px; font-size: 0.9em; color: #EF4444; }
        .prose-stealth pre { background: rgba(245,241,234,0.05); padding: 20px; border-radius: 4px; overflow-x: auto; margin: 24px 0; border: 1px solid rgba(245,241,234,0.1); }
        .prose-stealth pre code { background: transparent; padding: 0; color: inherit; }
        .prose-stealth hr { border: none; height: 1px; background: linear-gradient(to right, transparent, rgba(245,241,234,0.15), transparent); margin: 48px 0; }
        .prose-stealth table { width: 100%; margin: 32px 0; border-collapse: collapse; }
        .prose-stealth th, .prose-stealth td { padding: 12px 16px; border-bottom: 1px solid rgba(245,241,234,0.1); text-align: left; }
        .prose-stealth th { background: rgba(245,241,234,0.05); font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #EF4444; }
      `}</style>
    </>
  );
}