"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import { WORK_WITH_ME } from "@/constants/work-with-us";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { pinScrollDistance, SCROLL_PIN_DEFAULTS } from "@/lib/scroll-pin";
import { killScrollTriggersFor } from "@/lib/scroll-trigger";
import { scheduleRevealRefresh } from "@/lib/section-reveal";

const CARDS = WORK_WITH_ME.cards;
const CARD_COUNT = CARDS.length;
const SCROLL_VH_PER_STEP = 42;

function getCardSpacing(): number {
  if (typeof window === "undefined") return 300;
  return window.matchMedia("(max-width: 639px)").matches ? 240 : 300;
}

type CarouselElements = {
  cards: HTMLElement[];
  inners: HTMLElement[];
  overlays: HTMLElement[];
  images: HTMLElement[];
};

function collectCarouselElements(track: HTMLElement): CarouselElements {
  return {
    cards: gsap.utils.toArray<HTMLElement>("[data-wwu-card]", track),
    inners: gsap.utils.toArray<HTMLElement>("[data-wwu-inner]", track),
    overlays: gsap.utils.toArray<HTMLElement>("[data-wwu-overlay]", track),
    images: gsap.utils.toArray<HTMLElement>("[data-wwu-image]", track),
  };
}

function applyCoverflow(activeIndex: number, elements: CarouselElements) {
  const { cards, inners, overlays, images } = elements;
  const spacing = getCardSpacing();

  cards.forEach((card, index) => {
    const distance = index - activeIndex;
    const absDistance = Math.abs(distance);
    const isActive = absDistance < 0.35;

    const scale = gsap.utils.clamp(0.58, 1.04, 1.04 - absDistance * 0.2);
    const rotateY = gsap.utils.clamp(-68, 68, distance * -68);
    const x = distance * spacing;
    const z = -absDistance * 180;
    const zIndex = Math.round(120 - absDistance * 18);
    const opacity = absDistance > 2.4 ? 0 : gsap.utils.clamp(0.28, 1, 1 - absDistance * 0.32);
    const overlayOpacity = gsap.utils.clamp(0, 0.78, absDistance * 0.42);
    const grayscale = gsap.utils.clamp(0, 100, absDistance * 72);

    gsap.set(card, {
      x,
      z,
      scale,
      rotateY,
      opacity,
      zIndex,
      transformOrigin: "50% 50%",
      transformPerspective: 1400,
      force3D: true,
    });

    const inner = inners[index];
    if (inner) {
      gsap.set(inner, {
        boxShadow: isActive
          ? "0 40px 90px -24px rgba(255,255,255,0.22), 0 0 0 1px rgba(255,255,255,0.12)"
          : "0 24px 60px -32px rgba(0,0,0,0.75)",
      });
    }

    const overlay = overlays[index];
    const image = images[index];
    if (overlay) gsap.set(overlay, { opacity: overlayOpacity });
    if (image) gsap.set(image, { filter: `grayscale(${grayscale}%)` });
  });
}

export function WorkWithMe() {
  const reducedMotion = usePrefersReducedMotion();
  const { lenis } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const trigger = scrollTriggerRef.current;
      if (!trigger || CARD_COUNT <= 1) return;

      const clamped = gsap.utils.clamp(0, CARD_COUNT - 1, index);
      const progress = clamped / (CARD_COUNT - 1);
      const target = trigger.start + (trigger.end - trigger.start) * progress;

      if (lenis) {
        lenis.scrollTo(target, { duration: 1.05 });
        return;
      }

      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [lenis],
  );

  const goToPrevious = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const goToNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    },
    [goToNext, goToPrevious],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!section || !pin || !track) return;

      killScrollTriggersFor(section);

      const elements = collectCarouselElements(track);

      const ctx = gsap.context(() => {
        if (reducedMotion || CARD_COUNT <= 1) {
          applyCoverflow(0, elements);
          setActiveIndex(0);
          return;
        }

        applyCoverflow(0, elements);

        const state = { active: 0 };

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: pinScrollDistance(CARD_COUNT - 1, SCROLL_VH_PER_STEP),
            pin,
            scrub: 0.85,
            ...SCROLL_PIN_DEFAULTS,
            onUpdate: (self) => {
              const nextIndex = Math.round(self.progress * (CARD_COUNT - 1));
              setActiveIndex((current) =>
                current === nextIndex ? current : nextIndex,
              );
            },
          },
        });

        scrollTriggerRef.current = timeline.scrollTrigger ?? null;

        timeline.to(state, {
          active: CARD_COUNT - 1,
          ease: "none",
          duration: 1,
          onUpdate: () => applyCoverflow(state.active, elements),
        });

        scheduleRevealRefresh();
      }, section);

      return () => {
        scrollTriggerRef.current = null;
        ctx.revert();
      };
    },
    {
      scope: sectionRef,
      dependencies: [reducedMotion, lenis],
      revertOnUpdate: true,
    },
  );

  const { eyebrow, headline, intro, cta, location } = WORK_WITH_ME;

  return (
    <section
      ref={sectionRef}
      id={WORK_WITH_ME.id}
      className="relative isolate scroll-story-section overflow-hidden bg-black text-white"
      aria-labelledby="work-with-me-heading"
    >
      <div
        ref={pinRef}
        className="relative flex h-screen flex-col overflow-hidden bg-black"
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_38%,rgb(255_255_255_/_0.09),transparent_65%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-32"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-32"
          aria-hidden="true"
        />

        <header className="relative z-20 shrink-0 border-b border-white/10 px-5 pb-5 pt-10 text-center sm:px-8 sm:pt-11 lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            {eyebrow}
          </p>
          <h2
            id="work-with-me-heading"
            className="mt-3 font-sans text-[clamp(1.5rem,4vw,2.35rem)] font-semibold tracking-[-0.04em]"
          >
            {headline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/58 sm:text-[0.9375rem]">
            {intro}
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            Scroll to explore
          </p>
        </header>

        <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-24 pt-2 sm:px-8 lg:px-10">
          <div
            className="relative flex h-[min(56vh,26rem)] w-full max-w-6xl items-center justify-center [perspective:1400px]"
            role="group"
            aria-roledescription="carousel"
            aria-label="Work with me"
          >
            <div
              ref={trackRef}
              className="carousel-track relative h-full w-full [transform-style:preserve-3d]"
            >
              {CARDS.map((card, index) => (
                <article
                  key={card.id}
                  data-wwu-card
                  className="absolute left-1/2 top-1/2 w-[min(78vw,20rem)] -translate-x-1/2 -translate-y-1/2 will-change-transform sm:w-[22rem]"
                  aria-hidden={index !== activeIndex ? true : undefined}
                  aria-label={`${card.number} ${card.title}`}
                >
                  <div
                    data-wwu-inner
                    className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] ring-1 ring-white/5 [transform-style:preserve-3d] [backface-visibility:hidden]"
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                      <div data-wwu-image className="absolute inset-0">
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          fill
                          sizes="(max-width: 640px) 78vw, 352px"
                          className="object-cover object-center"
                          priority={index === 0}
                        />
                      </div>
                      <div
                        data-wwu-overlay
                        className="pointer-events-none absolute inset-0 bg-black/55"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="flex flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                        {card.number}
                      </p>
                      <h3 className="mt-1 font-sans text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/72">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="absolute bottom-7 left-0 right-0 z-20 flex flex-col items-center gap-4 px-5">
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Work with me slides"
            >
              {CARDS.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex ? "true" : "false"}
                  aria-label={`Go to ${card.title}`}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={cta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white transition hover:border-white/40 hover:bg-white/10"
              >
                {cta.label}
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
                {location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
