"use client";

import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  killScrollTriggersFor,
  scheduleScrollTriggerRefresh,
} from "@/lib/scroll-trigger";

const DEFAULT_PHRASES = [
  "Built Different",
  "Design with purpose",
  "Code with passion",
  "Innovate always",
] as const;

export type HorizontalPhraseSwapScrollProps = {
  phrases?: string[];
};

export function HorizontalPhraseSwapScroll({
  phrases = [...DEFAULT_PHRASES],
}: HorizontalPhraseSwapScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const phraseCount = phrases.length;

  const labels = useMemo(() => {
    return phrases.map((p, i) => `${i}-${p}`);
  }, [phrases]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (phraseCount < 2) {
        phraseRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            opacity: i === 0 ? 1 : 0,
            xPercent: 0,
          });
        });
        return;
      }

      const els = phraseRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (els.length !== phraseCount) return;

      // Clean staging: Item 0 starts in center. Items 1+ are staged off-screen right.
      els.forEach((el, index) => {
        gsap.set(el, {
          opacity: index === 0 ? 1 : 0,
          xPercent: index === 0 ? 0 : 100,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${(phraseCount - 1) * 600}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sequential pair transitions using simple .to chains to prevent timeline reversal/scrubbing glitches
      for (let i = 0; i < phraseCount - 1; i += 1) {
        const outgoing = els[i];
        const incoming = els[i + 1];

        // Slide out left and fade
        tl.to(
          outgoing,
          {
            opacity: 0,
            xPercent: -100,
            duration: 1,
          },
          i,
        );

        // Slide in from right (pre-staged at 100) and fade in
        tl.to(
          incoming,
          {
            opacity: 1,
            xPercent: 0,
            duration: 1,
          },
          i,
        );
      }

      scheduleScrollTriggerRefresh();

      return () => {
        killScrollTriggersFor(section);
        tl.kill();
      };
    },
    {
      scope: sectionRef,
      // Track full phrases array to trigger updates if strings or array contents change, not just length.
      dependencies: [phrases, phraseCount],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center bg-[#121212]"
      aria-label="Horizontal phrase swap scroll animation"
    >
      {/* Added overflow-hidden to prevent layout blowout from phrases staged at xPercent: 100 */}
      <div className="relative h-full w-full overflow-hidden px-6 sm:px-10">
        {phrases.map((phrase, index) =>
          index === 0 ? (
            <div
              key={labels[index] ?? index}
              ref={(el) => {
                phraseRefs.current[index] = el;
              }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <p className="max-w-5xl px-2 text-center text-6xl font-bold tracking-tight text-white sm:text-7xl">
                {phrase}
              </p>
            </div>
          ) : (
            <div
              key={labels[index] ?? index}
              ref={(el) => {
                phraseRefs.current[index] = el;
              }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              aria-hidden="true"
            >
              <p className="max-w-5xl px-2 text-center text-6xl font-bold tracking-tight text-white sm:text-7xl">
                {phrase}
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}