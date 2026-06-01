"use client";

import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import {
  TESTIMONIALS,
  getTestimonialPositionClass,
} from "@/constants/testimonials";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { buildBlogBottomPath } from "@/lib/blog-curve-path";
import { scheduleScrollTriggerRefresh } from "@/lib/scroll-trigger";

function TestimonialBubble({
  quote,
  name,
  detail,
  initials,
  avatarClass,
  tiltClass,
  floatDelay,
  reducedMotion,
}: Omit<(typeof TESTIMONIALS)[number], "position" | "id"> & {
  reducedMotion: boolean;
}) {
  return (
    <figure
      className={`group w-full max-w-[min(100%,18rem)] transition-transform duration-500 ease-out hover:scale-[1.02] sm:max-w-[19rem] ${tiltClass}`}
    >
      <div
        className={`relative ${reducedMotion ? "" : "testimonial-float"}`}
        style={
          reducedMotion
            ? undefined
            : ({ "--float-delay": floatDelay } as CSSProperties)
        }
      >
        <blockquote className="relative rounded-[1.35rem] bg-brutal-fg px-4 py-4 font-sans text-[0.8125rem] font-medium leading-[1.45] tracking-[-0.015em] text-white/95 shadow-[0_20px_50px_-12px_rgba(17,17,17,0.35)] ring-1 ring-white/10 transition-shadow duration-500 group-hover:shadow-[0_28px_60px_-14px_rgba(17,17,17,0.42)] sm:px-[1.125rem] sm:py-[1.125rem] sm:text-[0.875rem]">
          <span
            className="pointer-events-none absolute -left-0.5 -top-1 font-serif text-4xl leading-none text-white/12 select-none"
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="relative z-[1]">{quote}</p>
          <span
            className="absolute -bottom-[7px] left-7 size-3.5 rotate-45 bg-brutal-fg ring-1 ring-white/10"
            aria-hidden
          />
        </blockquote>
      </div>

      <figcaption className="mt-3.5 flex items-center gap-3 pl-1">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-full font-sans text-xs font-semibold shadow-[0_8px_20px_-6px_rgba(17,17,17,0.2)] ring-2 ${avatarClass}`}
          aria-hidden
        >
          {initials}
        </span>
        <span className="font-sans text-[0.8125rem] tracking-[-0.01em] text-brutal-fg/55">
          <span className="font-medium text-brutal-fg/85">{name}</span>
          <span className="text-brutal-fg/35"> · </span>
          {detail}
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    scheduleScrollTriggerRefresh();
  }, []);

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#fafaf8] text-brutal-fg"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(240,237,230,0.9),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#f0ede6]/70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-[#ebe8e0]/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,rgba(17,17,17,0.06)_1px,transparent_0)] [background-size:28px_28px]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full w-px -translate-x-1/2 bg-brutal-fg/[0.07] lg:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[100dvh] lg:px-10 lg:py-24">
        <div className="relative mx-auto lg:min-h-[calc(100dvh-12rem)]">
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center lg:absolute lg:inset-x-0 lg:top-1/2 lg:-translate-y-1/2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brutal-fg/45">
              (Voices)
            </p>
            <h2
              id="testimonials-heading"
              className="mt-5 text-balance font-sans text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-brutal-fg"
            >
              What others have been saying about my work
            </h2>
            <p className="mt-5 max-w-md text-pretty font-sans text-[0.9375rem] leading-relaxed tracking-[-0.01em] text-brutal-fg/50">
              Real notes from clients and collaborators — the kind you get when
              the work ships on time and still feels considered.
            </p>
            <Link
              href="#contact"
              className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-brutal-fg/8 bg-white/80 px-6 py-3 font-sans text-sm font-medium tracking-[-0.02em] text-brutal-fg shadow-[0_8px_30px_rgba(17,17,17,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brutal-fg/14 hover:bg-white hover:shadow-[0_14px_40px_rgba(17,17,17,0.1)]"
            >
              Start a project
              <span
                className="flex size-7 items-center justify-center rounded-full bg-brutal-fg text-brutal-bg"
                aria-hidden
              >
                <ArrowIcon size={12} className="text-brutal-bg" />
              </span>
            </Link>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:mt-0 lg:block lg:min-h-[inherit]">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className={`lg:hover:z-20 ${getTestimonialPositionClass(item.position)} ${item.tiltClass}`}
              >
                <TestimonialBubble {...item} reducedMotion={reducedMotion} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 h-px w-full bg-brutal-fg/[0.08]" aria-hidden>
        <div className="absolute left-1/2 top-1/2 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brutal-fg/20 ring-4 ring-[#fafaf8]" />
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
