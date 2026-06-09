"use client";

import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { PassionCollectionSection } from "@/components/passion/PassionCollectionSection";
import { PassionImageField } from "@/components/passion/PassionImageField";
import { PassionFigureBlock } from "@/components/passion/PassionFigure";
import { PASSION_COLLECTIONS } from "@/constants/passion-collections";
import {
  PASSION_CHAPTERS,
  PASSION_INTRO,
  PASSION_PAGE_NAV,
} from "@/constants/passion-story";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scheduleScrollTriggerRefresh } from "@/lib/scroll-trigger";

const PortfolioHeader = dynamic(
  () =>
    import("@/components/portfolio/PortfolioHeader").then(
      (module) => module.PortfolioHeader,
    ),
  { ssr: false },
);

function animateDrawPaths(svg: SVGSVGElement, reducedMotion: boolean) {
  const paths = svg.querySelectorAll<SVGGeometryElement>(".story-draw");
  if (!paths.length) return;

  paths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: reducedMotion ? 0 : length,
    });
  });

  if (reducedMotion) return;

  gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 1.6,
    ease: "power2.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: svg,
      start: "top 82%",
      toggleActions: "play none none reverse",
    },
  });
}

export function PassionStoryExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scheduleScrollTriggerRefresh();
    const onResize = () => scheduleScrollTriggerRefresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const progress = progressRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
      const chapters = root.querySelectorAll<HTMLElement>("[data-story-chapter]");
      const intro = root.querySelector<HTMLElement>("[data-story-intro]");
      const svgs = root.querySelectorAll<SVGSVGElement>("[data-story-draw]");

      svgs.forEach((svg) => animateDrawPaths(svg, reducedMotion));

      if (intro) {
        const introItems = intro.querySelectorAll("[data-story-reveal]");
        if (reducedMotion) {
          gsap.set(introItems, { opacity: 1, y: 0 });
        } else {
          gsap.from(introItems, {
            y: 36,
            opacity: 0,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: intro,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      const collections = root.querySelectorAll<HTMLElement>(
        "[data-passion-collection]",
      );

      collections.forEach((collection) => {
        const title = collection.querySelector("[data-story-reveal]");
        const reveals = collection.querySelectorAll(".passion-collection-item");

        if (reducedMotion) {
          gsap.set([title, ...reveals], { opacity: 1, y: 0 });
          return;
        }

        if (title) {
          gsap.from(title, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: collection,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }

        gsap.from(reveals, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: collection,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        });
      });

      chapters.forEach((chapter) => {
        const number = chapter.querySelector("[data-story-number]");
        const reveals = chapter.querySelectorAll("[data-story-reveal]");

        if (reducedMotion) {
          gsap.set([number, ...reveals], { opacity: 1, y: 0, scale: 1 });
          return;
        }

        if (number) {
          gsap.from(number, {
            scale: 0.88,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        gsap.from(reveals, {
          y: 42,
          opacity: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        });
      });

      if (progress && !reducedMotion) {
        gsap.to(progress, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
          },
        });
      }
      }, root);

      return () => ctx.revert();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <>
      <div
        ref={rootRef}
        className="passion-story relative min-h-screen bg-[#f7f7f5] text-brutal-fg"
      >
        <div
          ref={progressRef}
          className="passion-progress pointer-events-none fixed left-3 top-0 z-[5] hidden h-full origin-top bg-brutal-fg/18 sm:left-5 lg:block"
          aria-hidden="true"
        />

        <PortfolioHeader />

        <nav
          className="passion-top-nav relative z-10 border-b border-brutal-fg/[0.07] px-5 py-8 sm:px-8 lg:px-10"
          aria-label="Passion story sections"
        >
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 lg:gap-4">
            {PASSION_PAGE_NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group block transition-opacity hover:opacity-55"
                >
                  <p className="font-sans text-[0.9375rem] font-medium tracking-[-0.02em] text-brutal-fg">
                    {item.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brutal-fg/42">
                    {item.sublabel}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="relative z-10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <header
            data-story-intro
            className="border-b border-brutal-fg/[0.07] py-14 sm:py-16 lg:py-20"
          >
            <p
              data-story-reveal
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/45"
            >
              {PASSION_INTRO.eyebrow}
            </p>
            <h1
              data-story-reveal
              className="mt-5 max-w-3xl font-sans text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-brutal-fg"
            >
              {PASSION_INTRO.title}
            </h1>
            <p
              data-story-reveal
              className="mt-5 max-w-2xl font-sans text-[1.0625rem] leading-relaxed tracking-[-0.015em] text-brutal-fg/62"
            >
              {PASSION_INTRO.subtitle}
            </p>
          </header>

          <div className="space-y-20 py-16 sm:space-y-24 sm:py-20 lg:space-y-28 lg:py-24">
            {PASSION_CHAPTERS.map((chapter) => (
              <section
                key={chapter.id}
                id={chapter.id}
                data-story-chapter
                className="passion-chapter grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10"
                aria-labelledby={`${chapter.id}-title`}
              >
                <div
                  data-story-number
                  className="lg:col-span-1"
                  aria-hidden="true"
                >
                  <span className="passion-chapter-number font-sans text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-[-0.05em] text-brutal-fg">
                    {chapter.number}
                  </span>
                </div>

                <div className="grid gap-10 lg:col-span-11 lg:grid-cols-11 lg:gap-8">
                  <div className="space-y-6 lg:col-span-5">
                    {chapter.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        data-story-reveal
                        id={index === 0 ? `${chapter.id}-title` : undefined}
                        className="passion-paragraph font-sans text-[1.0625rem] leading-[1.78] tracking-[-0.015em] text-brutal-fg/88"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-2 lg:gap-8">
                    {chapter.figures.map((figure) => (
                      <PassionFigureBlock key={figure.id} figure={figure} />
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="space-y-4">
            {PASSION_COLLECTIONS.map((collection) => (
              <PassionCollectionSection
                key={collection.id}
                collection={collection}
              />
            ))}
          </div>
          </div>

          <PassionImageField />
        </main>
      </div>
    </>
  );
}
