import Link from "next/link";
import { BlogPageShell } from "@/components/blog/BlogPageShell";

export default function BlogPostNotFound() {
  return (
    <BlogPageShell>
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          404
        </p>
        <h1 className="mt-4 font-sans text-3xl font-semibold tracking-[-0.03em] text-white">
          Article not found
        </h1>
        <p className="mt-3 font-sans text-sm leading-relaxed text-white/65">
          That post may have moved or never existed. Browse the full archive
          instead.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-white transition-colors hover:border-blog-accent/50 hover:text-blog-accent"
        >
          View all articles
        </Link>
      </div>
    </BlogPageShell>
  );
}
