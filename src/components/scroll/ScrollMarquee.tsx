"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SCROLL_MARQUEE_PHRASES } from "@/constants/scroll-marquee";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ScrollMarqueeProps = {
  phrases?: readonly string[];
  className?: string;
};

export function ScrollMarquee({
  phrases = SCROLL_MARQUEE_PHRASES,
  className = "",
}: ScrollMarqueeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...phrases, ...phrases];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || reducedMotion) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.55,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className={`scroll-marquee-section relative overflow-hidden border-y border-brutal-fg/[0.08] bg-brutal-bg py-4 sm:py-5 ${className}`}
      aria-hidden="true"
    >
      <div className="scroll-marquee-mask">
        <div ref={trackRef} className="scroll-marquee-track">
          {items.map((phrase, index) => (
            <span key={`${phrase}-${index}`} className="scroll-marquee-item">
              <span className="scroll-marquee-dot" />
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
