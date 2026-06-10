"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { WRITER_MARQUEE, WRITER_MARQUEE_TICKER } from "@/constants/writer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap } from "@/lib/gsap";

export function WriterMarqueeSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items = [...WRITER_MARQUEE_TICKER, ...WRITER_MARQUEE_TICKER, ...WRITER_MARQUEE_TICKER];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const scrollLayer = scrollLayerRef.current;
      const track = trackRef.current;
      if (!section || !scrollLayer || !track || reducedMotion) return;

      const scrollTween = gsap.to(scrollLayer, {
        xPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.45,
        },
      });

      const autoTween = gsap.to(track, {
        xPercent: -33.333,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
        autoTween.kill();
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} className="writer-marquee-section" aria-label="Contact marquee">
      <div className="writer-marquee-mask">
        <div ref={scrollLayerRef} className="writer-marquee-scroll-layer">
          <div ref={trackRef} className="writer-marquee-track">
            {items.map((item, index) => (
              <span key={`${item}-${index}`} className="writer-display writer-marquee-item">
                <span className="writer-marquee-dot" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="writer-marquee-cta" data-writer-cta>
        <p className="writer-display writer-marquee-cta-text">
          {WRITER_MARQUEE.phrase}{" "}
          <Link href={WRITER_MARQUEE.ctaHref} className="writer-email-pill">
            {WRITER_MARQUEE.ctaLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
