"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SCROLL_ROWS = [
  "Design with purpose",
  "Built different",
  "Code with passion",
  "Create with vision",
  "Innovate always",
] as const;

const ROW_TOP_CLASSES = [
  "top-[14%]",
  "top-[30%]",
  "top-[46%]",
  "top-[62%]",
  "top-[78%]",
] as const;

export function ScrollMaskSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const line = lineRef.current;

      if (!section || !line) return;

      const ctx = gsap.context(() => {
        gsap.set(line, { scaleY: 1, transformOrigin: "top center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        SCROLL_ROWS.forEach((_, index) => {
          const left = leftRowRefs.current[index];
          const right = rightRowRefs.current[index];
          if (!left || !right) return;

          const oddRow = index % 2 === 0;
          const startX = oddRow ? -55 : 55;
          const endX = oddRow ? 55 : -55;
          const rowStart = 0.08 + index * 0.12;

          tl.fromTo(
            [left, right],
            { xPercent: startX },
            {
              xPercent: endX,
              ease: "none",
              duration: 0.72,
            },
            rowStart,
          );
        });
      }, section);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#121212]"
      aria-label="Horizontal scroll showcase"
    >
      <div
        ref={lineRef}
        className="pointer-events-none absolute left-1/2 top-0 z-30 h-full w-px -translate-x-1/2 bg-white/20 will-change-transform"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden">
        {SCROLL_ROWS.map((text, index) => (
          <div
            key={`left-${text}`}
            ref={(el) => {
              leftRowRefs.current[index] = el;
            }}
            className={`absolute left-0 w-max will-change-transform ${ROW_TOP_CLASSES[index]}`}
          >
            <span className="block whitespace-nowrap font-sans text-[clamp(3.5rem,9vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-tighter text-white">
              {text}
            </span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 overflow-hidden">
        {SCROLL_ROWS.map((text, index) => (
          <div
            key={`right-${text}`}
            ref={(el) => {
              rightRowRefs.current[index] = el;
            }}
            className={`absolute left-0 w-max will-change-transform ${ROW_TOP_CLASSES[index]}`}
          >
            <span className="block whitespace-nowrap font-sans text-[clamp(3.5rem,9vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.88)]">
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
