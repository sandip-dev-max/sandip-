"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const VISION_PHRASES = [
  { lead: "Design", rest: " with purpose" },
  { lead: "Built", rest: " different" },
  { lead: "Code", rest: " with passion" },
  { lead: "Create", rest: " with vision" },
  { lead: "Crafted", rest: " for quality" },
] as const;

const PHRASE_COUNT = VISION_PHRASES.length;

function splitChars(text: string): string[] {
  return Array.from(text);
}

export function ScrollMaskSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const dot = dotRef.current;

      if (!section || !dot) return;

      const phrases = phraseRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (phrases.length !== PHRASE_COUNT) return;

      const ctx = gsap.context(() => {
        phrases.forEach((phrase, index) => {
          gsap.set(phrase, {
            autoAlpha: index === 0 ? 1 : 0,
          });
        });
        gsap.set(dot, { top: "22%" });

        if (reducedMotion) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${(PHRASE_COUNT - 1) * 130}%`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        for (let i = 0; i < PHRASE_COUNT - 1; i += 1) {
          const prev = phrases[i];
          const next = phrases[i + 1];
          const prevChars = Array.from(
            prev.querySelectorAll<HTMLElement>("[data-char]"),
          );
          const nextChars = Array.from(
            next.querySelectorAll<HTMLElement>("[data-char]"),
          );
          const dotTop = 22 + ((i + 1) / (PHRASE_COUNT - 1)) * 56;

          const stepStart = i;
          const incomingStart = stepStart + 0.55;

          timeline.set(next, { autoAlpha: 1 }, stepStart);
          timeline.set(nextChars, { opacity: 0, xPercent: 120 }, stepStart);

          // Current phrase fully disappears first (character by character).
          timeline.to(
            prevChars,
            {
              opacity: 0,
              xPercent: -120,
              duration: 0.5,
              ease: "power2.in",
              stagger: { each: 0.012, from: "start" },
            },
            stepStart,
          );
          timeline.set(prev, { autoAlpha: 0 }, stepStart + 0.52);

          // Then next phrase appears (character by character).
          timeline.to(
            nextChars,
            {
              opacity: 1,
              xPercent: 0,
              duration: 0.52,
              ease: "power2.out",
              stagger: { each: 0.012, from: "start" },
            },
            incomingStart,
          );

          timeline.to(
            dot,
            { top: `${dotTop}%`, duration: 1, ease: "power2.inOut" },
            stepStart,
          );
        }
      }, section);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      className="scroll-mask-section relative h-screen w-full overflow-hidden bg-[#121212] text-white"
      aria-labelledby="vision-heading"
    >
      <p className="scroll-mask-eyebrow pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 font-sans text-sm tracking-[-0.01em] text-white/90 sm:top-10">
        (Our Vision)
      </p>

      <div
        className="pointer-events-none absolute left-6 top-0 z-10 h-full w-px bg-white/20 sm:left-10 lg:left-14"
        aria-hidden
      >
        <div
          ref={dotRef}
          className="scroll-mask-guide-dot absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-white"
        />
      </div>

      <div className="relative z-20 flex h-full items-center justify-center px-6 sm:px-10">
        <div className="relative h-[7.5rem] w-full max-w-6xl sm:h-[8.5rem] md:h-[10rem]">
          {VISION_PHRASES.map((phrase, index) =>
            index === 0 ? (
              <div
                key={phrase.lead}
                ref={(el) => {
                  phraseRefs.current[index] = el;
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <h2
                  id="vision-heading"
                  className="scroll-mask-headline text-center font-sans text-[clamp(2.4rem,7.8vw,7rem)] font-bold uppercase leading-[1.03] tracking-[-0.045em]"
                >
                  <span className="scroll-mask-headline-lead">
                    {splitChars(phrase.lead).map((char, charIndex) => (
                      <span
                        key={`lead-${phrase.lead}-${charIndex}`}
                        className="inline-block will-change-transform"
                        data-char
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                  <span className="scroll-mask-headline-rest">
                    {splitChars(phrase.rest).map((char, charIndex) => (
                      <span
                        key={`rest-${phrase.lead}-${charIndex}`}
                        className="inline-block will-change-transform"
                        data-char
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                </h2>
              </div>
            ) : (
              <div
                key={phrase.lead}
                ref={(el) => {
                  phraseRefs.current[index] = el;
                }}
                className="absolute inset-0 flex items-center justify-center opacity-0"
                aria-hidden="true"
              >
                <h2 className="scroll-mask-headline text-center font-sans text-[clamp(2.4rem,7.8vw,7rem)] font-bold uppercase leading-[1.03] tracking-[-0.045em]">
                  <span className="scroll-mask-headline-lead">
                    {splitChars(phrase.lead).map((char, charIndex) => (
                      <span
                        key={`lead-${phrase.lead}-${charIndex}`}
                        className="inline-block will-change-transform"
                        data-char
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                  <span className="scroll-mask-headline-rest">
                    {splitChars(phrase.rest).map((char, charIndex) => (
                      <span
                        key={`rest-${phrase.lead}-${charIndex}`}
                        className="inline-block will-change-transform"
                        data-char
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                </h2>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}