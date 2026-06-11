import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/constants/blog-posts";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { getBlogPostPath } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group">
      <Link href={getBlogPostPath(post.slug)} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-white/5">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 40vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        <div className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/55 sm:mt-5 sm:gap-2 sm:text-[11px] sm:tracking-[0.14em]">
          <span className="ri-calendar-line text-xs sm:text-sm" aria-hidden="true" />
          <time dateTime={post.publishedAt}>{post.date}</time>
        </div>

        <h3 className="mt-2 font-sans text-[clamp(0.8125rem,3.4vw,1.5rem)] font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-blog-accent transition-opacity group-hover:opacity-80 sm:mt-3">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 font-sans text-[0.8125rem] leading-relaxed tracking-[-0.01em] text-white/72 sm:mt-3 sm:line-clamp-3 sm:text-[0.9375rem]">
          {post.excerpt}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-blog-accent transition-transform group-hover:translate-x-1 sm:mt-5 sm:gap-2 sm:text-[11px] sm:tracking-[0.16em]">
          Read article
          <ArrowIcon size={12} className="text-blog-accent" />
        </span>
      </Link>
    </article>
  );
}
