"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import {
  PASSION_INTRO,
  PASSION_INTRO_PHOTOS,
} from "@/constants/passion-story";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap } from "@/lib/gsap";

const COLLAGE_OFFSETS = [
  { className: "passion-intro-photo-a", delay: "0s" },
  { className: "passion-intro-photo-b", delay: "0.35s" },
  { className: "passion-intro-photo-c", delay: "0.7s" },
] as const;

export function PassionIntroHero() {
  const reducedMotion = usePrefersReducedMotion();
  const introRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const intro = introRef.current;
      if (!intro || reducedMotion) return;

      const ctx = gsap.context(() => {
        const photos = intro.querySelectorAll("[data-intro-photo]");
        photos.forEach((photo, index) => {
          gsap.to(photo, {
            y: index % 2 === 0 ? -28 : 22,
            ease: "none",
            scrollTrigger: {
              trigger: intro,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          });
        });
      }, intro);

      return () => ctx.revert();
    },
    { scope: introRef, dependencies: [reducedMotion] },
  );

  const titleWords = PASSION_INTRO.title.split(" ");

  return (
    <header
      ref={introRef}
      data-story-intro
      className="passion-intro relative overflow-hidden border-b border-brutal-fg/[0.07] py-14 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-1.5 bg-gradient-to-r from-[#e85d4c] via-[#f0c27b] to-[#4a6fa5] opacity-90"
        aria-hidden="true"
      />

      <div className="passion-intro-ambient pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="passion-watermark font-sans uppercase">Passion</span>
        <span className="passion-orb passion-orb-a" />
        <span className="passion-orb passion-orb-b" />
        <span className="passion-orb passion-orb-c" />
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
        <div>
          <p
            data-story-reveal
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/45"
          >
            {PASSION_INTRO.eyebrow}
          </p>

          <h1 className="mt-5 max-w-3xl font-sans text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-brutal-fg">
            {titleWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                data-story-reveal
                className="passion-title-word mr-[0.28em] inline-block"
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            data-story-reveal
            className="mt-5 max-w-2xl font-sans text-[1.0625rem] leading-relaxed tracking-[-0.015em] text-brutal-fg/62"
          >
            {PASSION_INTRO.subtitle}
          </p>

          <div
            data-story-reveal
            className="mt-8 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-brutal-fg/40"
          >
            <span className="passion-intro-chip">Parbat, Nepal</span>
            <span className="passion-intro-chip">Mountaineering studies</span>
            <span className="passion-intro-chip">97 field frames</span>
          </div>
        </div>

        <div
          className="passion-intro-collage relative mx-auto aspect-[4/5] w-full max-w-[22rem] lg:max-w-none lg:justify-self-end"
          aria-hidden="true"
        >
          {PASSION_INTRO_PHOTOS.map((photo, index) => {
            const offset = COLLAGE_OFFSETS[index];
            if (!offset) return null;

            return (
              <div
                key={photo.src}
                data-intro-photo
                className={`passion-intro-photo ${offset.className}`}
              >
                <div
                  className={`passion-tilt-card h-full w-full ${
                    reducedMotion ? "" : "passion-float"
                  }`}
                  data-delay={reducedMotion ? undefined : offset.delay}
                >
                  <div className="passion-media-frame relative h-full w-full overflow-hidden bg-[#f1f0ed] shadow-[0_22px_50px_-28px_rgba(17,17,17,0.42)] ring-1 ring-brutal-fg/[0.07]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 55vw, 280px"
                      className="object-cover object-center"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        data-story-reveal
        className="passion-chapter-rule relative z-10 mt-14 origin-left bg-gradient-to-r from-brutal-fg/28 via-brutal-fg/10 to-transparent"
        aria-hidden="true"
      />
    </header>
  );
}
