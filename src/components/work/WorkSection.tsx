"use client";

import { Anton } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { PROJECTS } from "@/constants/projects";
import { WORK_HERO } from "@/constants/work";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWorkFeaturedReveal } from "@/hooks/use-work-featured-reveal";

const workDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function WorkSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useWorkFeaturedReveal(
    { sectionRef, heroRef, galleryRef },
    reducedMotion,
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-featured scroll-story-section relative w-full border-t border-brutal-fg/[0.07] bg-brutal-bg text-brutal-fg"
      aria-labelledby="work-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-1.5 bg-gradient-to-r from-[#e85d4c] via-[#f0c27b] to-[#4a6fa5] opacity-90"
        aria-hidden="true"
      />

      <div
        className="work-featured-ambient pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div
        ref={heroRef}
        className="work-featured-hero relative z-10 mx-auto max-w-[90rem] px-5 pb-20 pt-24 text-center sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-32 lg:pt-36"
      >
        <h2 id="work-heading" className="sr-only">
          {WORK_HERO.lines.join(" ")}
        </h2>

        <div className="space-y-1 sm:space-y-2">
          {WORK_HERO.lines.map((line) => (
            <div key={line} className="work-hero-line overflow-hidden">
              <span
                data-work-line
                className={`${workDisplay.className} work-hero-line-inner block text-[clamp(2.75rem,8.5vw,5.75rem)] font-normal uppercase leading-[0.92] tracking-[0.01em] text-brutal-fg`}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        <p
          data-work-sub
          className="mx-auto mt-8 max-w-2xl font-mono text-[10px] uppercase leading-[1.9] tracking-[0.18em] text-brutal-fg/48 sm:mt-10 sm:text-[11px]"
        >
          {WORK_HERO.subtitle}
        </p>
      </div>

      <div
        ref={galleryRef}
        className="work-featured-gallery relative z-10 mx-auto max-w-[90rem] px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32"
      >
        <p
          data-work-label
          className="mb-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/42 sm:mb-12"
        >
          {WORK_HERO.label}
        </p>

        <div className="work-featured-track -mx-5 flex gap-5 overflow-x-auto px-5 pb-2 scrollbar-none sm:-mx-8 sm:gap-6 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              data-work-card
              className="work-card group min-w-[min(72vw,15rem)] shrink-0 snap-start lg:min-w-0"
            >
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label={`View ${project.title}`}
              >
                <div className="work-card-media relative aspect-square overflow-hidden bg-[#f1f0ed] ring-1 ring-brutal-fg/[0.07]">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 72vw, 22vw"
                    className="object-cover object-top transition-[transform,filter] duration-700 group-hover:scale-[1.04] group-hover:brightness-[1.03]"
                  />
                </div>

                <p className="work-card-caption mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-brutal-fg/55 transition-[letter-spacing,color] duration-500 group-hover:tracking-[0.22em] group-hover:text-brutal-fg">
                  {project.title}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
