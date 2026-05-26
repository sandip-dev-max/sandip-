"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LiveClock } from "@/components/portfolio/LiveClock";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { ProjectCardActions } from "@/components/portfolio/ProjectCardActions";
import { PROJECTS } from "@/constants/projects";

gsap.registerPlugin(ScrollTrigger);

const TECH_TAGS = ["Next.js", "TypeScript", "UI Systems"] as const;

export function PortfolioHero() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBackdropRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);

  const setGalleryInteractive = (interactive: boolean) => {
    const blockHero = interactive ? "none" : "auto";
    heroContentRef.current?.style.setProperty("pointer-events", blockHero);
    galleryGridRef.current?.classList.toggle("pointer-events-none", !interactive);
  };

  useGSAP(() => {
    if (
      !scrollSectionRef.current ||
      !stickyContainerRef.current ||
      !leftColumnRef.current ||
      !rightColumnRef.current ||
      !footerRef.current ||
      !heroSectionRef.current ||
      !heroBackdropRef.current ||
      !heroContentRef.current ||
      !galleryGridRef.current
    )
      return;

    setGalleryInteractive(false);

    const projectImages =
      galleryGridRef.current.querySelectorAll<HTMLImageElement>(".project-img");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollSectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: stickyContainerRef.current,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setGalleryInteractive(self.progress >= 0.55);
        },
        onLeave: () => setGalleryInteractive(true),
        onEnterBack: () => setGalleryInteractive(false),
      },
    });

    const revealDuration = 1;

    timeline
      .to(
        heroBackdropRef.current,
        { opacity: 0, duration: revealDuration, ease: "power2.inOut" },
        0,
      )
      .to(
        heroContentRef.current,
        { opacity: 0, duration: revealDuration, ease: "power2.inOut" },
        0,
      )
      .to(
        leftColumnRef.current,
        {
          xPercent: -120,
          opacity: 0,
          duration: revealDuration,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        rightColumnRef.current,
        {
          xPercent: 120,
          opacity: 0,
          duration: revealDuration,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        footerRef.current,
        {
          yPercent: 100,
          opacity: 0,
          duration: revealDuration,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        galleryGridRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: revealDuration,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        projectImages,
        { scale: 1.05, yPercent: -6, duration: revealDuration, ease: "none" },
        0,
      );

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      setGalleryInteractive(false);
    };
  }, { scope: scrollSectionRef });

  return (
    /* Track layer running down the viewport */
    <div ref={scrollSectionRef} className="relative w-full bg-brutal-bg">
      {/* Pinned viewport — scroll distance set by ScrollTrigger end: "+=120%" */}
      <div
        ref={stickyContainerRef}
        className="relative flex h-screen w-screen flex-col overflow-hidden"
      >
        {/* Gallery sits below header so nav stays clickable */}
        <div
          ref={galleryGridRef}
          className="absolute inset-0 z-10 grid h-full grid-cols-1 grid-rows-4 gap-4 bg-black p-4 opacity-0 scale-95 pointer-events-none will-change-[opacity,transform] md:grid-cols-2 md:grid-rows-2 md:gap-6 md:p-12"
        >
         
        </div>

        <div className="relative z-50 shrink-0 pointer-events-auto">
          <PortfolioHeader />
        </div>

        <section
          ref={heroSectionRef}
          className="hero-content relative z-20 flex min-h-0 flex-1 flex-col text-brutal-fg"
        >
          <div
            ref={heroBackdropRef}
            className="pointer-events-none absolute inset-0 z-0 bg-brutal-bg"
            aria-hidden
          />
          <div
            ref={heroContentRef}
            className="relative z-10 flex min-h-0 flex-1 flex-col will-change-[opacity]"
          >
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 px-5 py-6 sm:gap-10 sm:px-8 sm:py-8 lg:grid-cols-12 lg:gap-x-6 lg:px-10 lg:py-8">
            
            {/* Left structural block animating leftward */}
            <div ref={leftColumnRef} className="flex min-h-0 flex-col lg:col-span-7 will-change-transform">
              <h1 className="font-sans text-4xl font-black uppercase leading-[0.88] tracking-tighter md:text-7xl lg:text-8xl">
                Software
                <br />
                Developer
              </h1>

              <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
                {TECH_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brutal-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/65 md:px-4 md:py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 aspect-[16/7] w-full overflow-hidden border border-brutal-border md:mt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero.png"
                  alt="Yudeat in front of a lake and mountains"
                  className="hero-image h-full w-full object-cover object-[center_68%]"
                />
              </div>

              <div className="mt-4 flex items-start gap-3 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-brutal-fg/70 md:mt-5">
                <span className="text-base leading-none" aria-hidden>
                  →
                </span>
                <p>
                  Based in Kathmandu,
                  <br />
                  passionate in architect &amp; UI
                </p>
              </div>
            </div>

            {/* Right structural block animating rightward */}
            <div ref={rightColumnRef} className="flex min-h-0 flex-col justify-between gap-8 lg:col-span-5 lg:pb-2 lg:pt-20 xl:pt-28 will-change-transform">
              <div className="space-y-4 lg:space-y-5 lg:text-right">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest lg:justify-end">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                    aria-hidden
                  />
                  Open for work
                </div>

                <p className="font-mono text-[10px] uppercase tracking-widest text-brutal-fg/50">
                  01 / From Nepal with love
                </p>

                <p className="max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-widest text-brutal-fg/75 lg:ml-auto">
                  Building fast, clean web apps for real users. Open for freelance /
                  full-time based in Kathmandu Valley, NP.
                </p>
              </div>

              <div className="flex flex-col gap-6 lg:items-end lg:text-right">
                <h2 className="font-sans text-4xl font-black uppercase leading-[0.88] tracking-tighter md:text-6xl lg:text-7xl xl:text-8xl">
                  Yudeat
                </h2>

                <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/60 lg:items-end">
                  <span>2024 Portfolio</span>
                  <button
                    type="button"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-brutal-border px-4 py-2 text-brutal-fg transition-colors hover:border-brutal-fg hover:bg-brutal-fg hover:text-brutal-bg"
                  >
                    Selected work
                    <span aria-hidden>↘</span>
                  </button>
                  <span className="text-brutal-fg/45">
                    <LiveClock />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer animating downward */}
          <footer ref={footerRef} className="flex shrink-0 items-center justify-between border-t border-brutal-border px-5 py-4 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/55 sm:px-8 sm:py-5 lg:px-10 will-change-transform">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span>Design &amp; code by Yudeat</span>
              <button
                type="button"
                className="flex items-center gap-2 transition-colors hover:text-brutal-fg"
              >
              Climb
                <span className="h-1.5 w-1.5 rounded-full bg-brutal-fg" aria-hidden />
              </button>
            </div>
            <a
              href="#contact"
              className="text-brutal-fg/45 transition-colors hover:text-brutal-fg"
            >
              Get in touch ↓
            </a>
          </footer>
          </div>
        </section>
      </div>
    </div>
  );
}