import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BLOG_POSTS } from "@/constants/blog-posts";
import { buildBlogBottomPath } from "@/lib/blog-curve-path";

function BlogCardArrow() {
  return (
    <span
      className="flex size-9 items-center justify-center rounded-full bg-white/90 text-brutal-fg shadow-sm backdrop-blur-sm"
      aria-hidden
    >
      <ArrowIcon />
    </span>
  );
}

export function BlogSection() {
  return (
    <section
      className="relative w-full bg-[#f5f5f7] text-brutal-fg"
      aria-labelledby="blog-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-px -translate-x-1/2 bg-brutal-fg/10"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-28 pt-16 sm:px-8 sm:pb-32 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brutal-fg/50">
            (Blog)
          </p>

          <h2
            id="blog-heading"
            className="text-center font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-brutal-fg sm:flex-1"
          >
            Smart insights.
          </h2>

          <Link
            href="#"
            className="inline-flex w-fit items-center gap-2 self-center rounded-full bg-brutal-fg px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-brutal-bg shadow-[0_12px_32px_rgba(17,17,17,0.18)] transition-transform hover:-translate-y-0.5 sm:self-auto"
          >
            See all
            <span
              className="flex size-6 items-center justify-center rounded-full bg-white text-brutal-fg"
              aria-hidden
            >
              <ArrowIcon size={12} />
            </span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group">
              <Link href={post.href} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-brutal-fg/5">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute right-3 top-3">
                    <BlogCardArrow />
                  </div>
                </div>

                <p className="mt-4 font-mono text-[11px] text-brutal-fg/45">
                  {post.date}
                </p>
                <h3 className="mt-2 font-sans text-lg font-semibold leading-snug tracking-[-0.02em] text-brutal-fg transition-opacity group-hover:opacity-65">
                  {post.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-10 h-px w-full bg-brutal-fg/12" aria-hidden>
        <div className="absolute left-1/2 top-1/2 z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brutal-fg" />
      </div>

      <svg
        className="relative z-0 -mt-px block w-full text-brutal-bg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path className="fill-brutal-bg" d={buildBlogBottomPath()} />
      </svg>
    </section>
  );
}
