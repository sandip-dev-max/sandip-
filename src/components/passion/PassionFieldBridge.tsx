"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap } from "@/lib/gsap";

export function PassionFieldBridge() {
  const reducedMotion = usePrefersReducedMotion();
  const bridgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bridge = bridgeRef.current;
      if (!bridge || reducedMotion) return;

      const ctx = gsap.context(() => {
        const arrow = bridge.querySelector("[data-bridge-arrow]");
        if (arrow) {
          gsap.to(arrow, {
            y: 8,
            duration: 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }, bridge);

      return () => ctx.revert();
    },
    { scope: bridgeRef, dependencies: [reducedMotion] },
  );

  return (
    <div
      ref={bridgeRef}
      data-passion-bridge
      className="passion-field-bridge relative overflow-hidden border-t border-brutal-fg/[0.07] bg-white py-14 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgb(237_168_120/0.14),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-8 lg:px-10">
        <p
          data-story-reveal
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/42"
        >
          Visual archive
        </p>
        <h2
          data-story-reveal
          className="mt-3 font-sans text-[clamp(1.5rem,6.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-brutal-fg sm:mt-4"
        >
          Enter the field
        </h2>
        <p
          data-story-reveal
          className="mx-auto mt-4 max-w-lg font-sans text-[1rem] leading-relaxed tracking-[-0.015em] text-brutal-fg/58"
        >
          Ninety-seven frames from walks, ridges, and ordinary light — scattered,
          then pulled into focus as you scroll.
        </p>

        <Link
          href="#image-field"
          data-story-reveal
          className="group mt-8 inline-flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brutal-fg/50 transition-colors hover:text-brutal-fg"
        >
          <span>Scroll to dive</span>
          <span
            data-bridge-arrow
            className="text-lg leading-none transition-transform group-hover:translate-y-0.5"
            aria-hidden="true"
          >
            ↓
          </span>
        </Link>
      </div>
    </div>
  );
}
