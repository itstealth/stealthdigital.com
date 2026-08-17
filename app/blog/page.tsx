import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { getAllPosts, getCategories } from "@/lib/blog";
import { format, parseISO } from "date-fns";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Marketing insights, playbooks, and growth ideas from the Stealth Digital team.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <PageHero
        eyebrow="The Stealth Blog"
        title="Ideas, playbooks & growth notes."
        description="Real tactics from real client work. No fluff, no guru-speak. Just what's working in SEO, paid media, social, and web."
        compact
      />

      {/* Featured post */}
      {featured && (
        <section className="py-12 md:py-20 border-b border-cream/10">
          <div className="container-x">
            <Reveal variant="up">
              <Link
                href={`/blog/${featured.slug}`}
                className="group block relative overflow-hidden rounded-sm bg-ink-900"
              >
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                    <Parallax distance={25}>
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    </Parallax>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="pill border-accent/40 text-accent">
                        Featured
                      </span>
                      <span className="pill">{featured.category}</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-cream mb-4 leading-tight text-balance group-hover:text-accent transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-cream/70 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-cream/50">
                      <span>{featured.author}</span>
                      <span>·</span>
                      <span>
                        {format(parseISO(featured.date), "MMM d, yyyy")}
                      </span>
                      <span>·</span>
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Category filter */}
      <section className="py-12 border-b border-cream/10">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/50">
              Categories:
            </span>
            <button className="pill border-accent text-accent">All</button>
            {categories.map((c) => (
              <button key={c} className="pill hover:border-accent hover:text-accent">
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All posts */}
      <section className="py-20 md:py-32">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal
                key={post.slug}
                variant="up"
                delay={i * 0.05}
                className="group"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative overflow-hidden bg-ink-900 border border-cream/10 hover:border-accent/30 transition-colors"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Parallax distance={18}>
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Parallax>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 pill border-cream/20 bg-ink-950/80 backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-cream mb-3 leading-tight text-balance group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-cream/60 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-cream/40 font-mono">
                      <span>{format(parseISO(post.date), "MMM d")}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-950/80 border border-cream/10 opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight size={14} className="text-accent" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-32 border-t border-cream/10 bg-ink-900">
        <div className="container-x text-center max-w-2xl">
          <Reveal variant="up">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
              [Newsletter]
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream mb-4 leading-tight">
              Get growth ideas <span className="text-accent">in your inbox.</span>
            </h2>
            <p className="text-cream/70 mb-8">
              One email a fortnight. SEO playbooks, ad creative teardowns, and
              growth ideas from our team.
            </p>
            <form
              action="https://formspree.io/f/your-form-id"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="email"
                placeholder="[email protected]"
                required
                className="flex-1 border border-cream/15 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-accent focus:outline-none rounded-full"
              />
              <button
                type="submit"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-accent-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}