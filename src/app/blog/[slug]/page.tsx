import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { BlogPageShell } from "@/components/blog/BlogPageShell";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { SITE_BRAND_NAME } from "@/constants/site";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostSlugs,
  getRelatedBlogPosts,
} from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: `Article not found — ${SITE_BRAND_NAME}` };
  }

  return {
    title: `${post.title} — ${SITE_BRAND_NAME}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug);
  const allPosts = getAllBlogPosts();
  const currentIndex = allPosts.findIndex((item) => item.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <BlogPageShell>
      <article>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blog-bg/30 via-blog-bg/75 to-blog-bg" />
          </div>

          <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
            >
              <span className="ri-arrow-left-line text-sm" aria-hidden="true" />
              All articles
            </Link>

            <div className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
              <span className="ri-calendar-line text-sm" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{post.date}</time>
            </div>

            <h1 className="mt-5 font-sans text-[clamp(2rem,5.5vw,3.75rem)] font-semibold uppercase leading-[1.05] tracking-[-0.04em] text-blog-accent">
              {post.title}
            </h1>

            <p className="mt-5 max-w-2xl font-sans text-[1.0625rem] leading-relaxed tracking-[-0.01em] text-white/75">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="bg-brutal-bg px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <BlogArticleBody paragraphs={post.content} />

          <nav
            className="mx-auto mt-16 flex max-w-3xl flex-col gap-4 border-t border-brutal-border pt-8 sm:flex-row sm:items-center sm:justify-between"
            aria-label="Article navigation"
          >
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="group font-sans text-sm tracking-[-0.01em] text-brutal-fg/70 transition-colors hover:text-brutal-fg"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-brutal-fg/45">
                  Previous
                </span>
                <span className="mt-1 block font-medium text-brutal-fg group-hover:underline">
                  {previousPost.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group text-left font-sans text-sm tracking-[-0.01em] text-brutal-fg/70 transition-colors hover:text-brutal-fg sm:text-right"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-brutal-fg/45">
                  Next
                </span>
                <span className="mt-1 block font-medium text-brutal-fg group-hover:underline">
                  {nextPost.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </div>

        {relatedPosts.length > 0 ? (
          <section
            className="border-t border-white/10 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
            aria-labelledby="related-posts-heading"
          >
            <div className="mx-auto max-w-7xl">
              <h2
                id="related-posts-heading"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
              >
                Keep reading
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>
    </BlogPageShell>
  );
}
