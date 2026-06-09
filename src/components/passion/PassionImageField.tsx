"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import {
  IMAGE_FIELD_INNER_ITEMS,
  IMAGE_FIELD_ITEMS,
  IMAGE_FIELD_TAGS,
  type ImageFieldItem,
  type ImageFieldTag,
} from "@/constants/image-field";
import { PassionFieldFooter } from "@/components/passion/PassionFieldFooter";
import { useFieldScrollDive } from "@/hooks/use-field-scroll-dive";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap } from "@/lib/gsap";

function FieldPiece({
  item,
  setRef,
  variant,
}: {
  item: ImageFieldItem;
  setRef: (id: string) => (node: HTMLDivElement | null) => void;
  variant: "outer" | "inner";
}) {
  return (
    <div
      ref={setRef(item.id)}
      className={`field-piece ${item.slot} ${
        variant === "inner" ? "field-piece--inner" : "field-piece--outer"
      }`}
      data-tags={item.tags.join(" ")}
      data-depth={variant}
    >
      <div className="field-piece-frame field-piece-frame-3d overflow-hidden bg-[#f4f4f4] shadow-[0_18px_50px_-28px_rgba(17,17,17,0.45)] ring-1 ring-brutal-fg/[0.07]">
        <div className="relative h-full w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={
              variant === "inner"
                ? "(max-width: 768px) 28vw, 12vw"
                : "(max-width: 768px) 42vw, 18vw"
            }
            className={`field-piece-image object-cover ${
              item.id === "hero-crop" ? "object-[center_20%]" : "object-center"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export function PassionImageField() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeTag, setActiveTag] = useState<ImageFieldTag>("all");

  const sectionRef = useRef<HTMLElement>(null);
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const pinViewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const outerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const innerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setOuterRef = useCallback(
    (id: string) => (node: HTMLDivElement | null) => {
      outerRefs.current[id] = node;
    },
    [],
  );

  const setInnerRef = useCallback(
    (id: string) => (node: HTMLDivElement | null) => {
      innerRefs.current[id] = node;
    },
    [],
  );

  const isVisible = useCallback(
    (tags: ImageFieldItem["tags"]) =>
      activeTag === "all" || tags.includes(activeTag),
    [activeTag],
  );

  useFieldScrollDive(
    {
      scrollStage: scrollStageRef,
      pinViewport: pinViewportRef,
      canvas: canvasRef,
      world: worldRef,
      core: coreRef,
      vignette: vignetteRef,
      hint: hintRef,
      header: headerRef,
      outerPieceRefs: outerRefs,
      innerPieceRefs: innerRefs,
    },
    reducedMotion,
  );

  useGSAP(
    () => {
      IMAGE_FIELD_ITEMS.forEach((item) => {
        const node = outerRefs.current[item.id];
        if (!node) return;

        const visible = isVisible(item.tags);

        if (reducedMotion) {
          node.style.visibility = visible ? "visible" : "hidden";
          return;
        }

        gsap.to(node, {
          autoAlpha: visible ? 1 : 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    },
    { scope: sectionRef, dependencies: [activeTag, reducedMotion, isVisible] },
  );

  return (
    <section
      id="image-field"
      ref={sectionRef}
      className="passion-image-field relative border-t border-brutal-fg/[0.07] bg-white text-brutal-fg"
      aria-labelledby="image-field-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-2 bg-gradient-to-r from-[#e85d4c] via-[#f0c27b] to-[#4a6fa5] opacity-90"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[96rem] px-5 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div
          ref={scrollStageRef}
          className="field-scroll-stage relative"
          aria-label="Scroll to enter the image field"
        >
          <div
            ref={pinViewportRef}
            className="field-pin-viewport relative h-[100dvh] w-full overflow-hidden"
          >
            <div ref={headerRef} className="relative z-20 will-change-transform">
              <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
                <p
                  className="field-brand-static font-sans text-[clamp(2.5rem,6vw,4rem)] font-black uppercase leading-none tracking-[-0.06em]"
                  aria-hidden="true"
                >
                  Field
                </p>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/45">
                    Visual archive
                  </p>
                  <h2
                    id="image-field-heading"
                    className="mt-3 max-w-xl font-sans text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-brutal-fg"
                  >
                    Scattered notes from shoots, screens, and walks
                  </h2>
                </div>
              </div>
            </div>

            <div
              ref={vignetteRef}
              className="field-vignette pointer-events-none absolute inset-0 z-[25]"
              aria-hidden="true"
            />

            <div
              ref={coreRef}
              className="field-core pointer-events-none absolute inset-0 z-[22] flex flex-col items-center justify-center px-6 text-center"
            >
              <p className="field-core-eyebrow font-mono text-[10px] uppercase tracking-[0.22em]">
                Inside the archive
              </p>
              <p className="field-core-headline mt-4 max-w-md font-sans text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
                Surrounded by frames, screens, and mountain light
              </p>
              <p className="field-core-sub mt-3 max-w-sm font-sans text-sm leading-relaxed">
                Keep scrolling to filter and explore
              </p>
            </div>

            <div
              ref={canvasRef}
              className="field-canvas field-canvas-dive field-canvas-3d absolute inset-x-0 top-[12%] bottom-[8%] mx-auto max-w-[96rem]"
            >
              <div
                ref={worldRef}
                className="field-world-3d relative h-full w-full will-change-transform"
              >
                {IMAGE_FIELD_ITEMS.map((item) => (
                  <FieldPiece
                    key={item.id}
                    item={item}
                    setRef={setOuterRef}
                    variant="outer"
                  />
                ))}
                {IMAGE_FIELD_INNER_ITEMS.map((item) => (
                  <FieldPiece
                    key={item.id}
                    item={item}
                    setRef={setInnerRef}
                    variant="inner"
                  />
                ))}
              </div>
            </div>

            <p
              ref={hintRef}
              className="field-scroll-hint absolute bottom-8 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-brutal-fg/45"
            >
              Scroll to enter ↓
            </p>
          </div>
        </div>

        <nav
          className="relative z-10 mt-10 border-t border-brutal-fg/[0.08] pt-8"
          aria-label="Image field filters"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {IMAGE_FIELD_TAGS.map((tag) =>
              activeTag === tag ? (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed="true"
                  className="rounded-full border border-brutal-fg bg-brutal-fg px-4 py-2 font-mono text-[11px] lowercase tracking-[0.06em] text-white transition-colors"
                >
                  {tag}
                </button>
              ) : (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed="false"
                  className="rounded-full border border-brutal-fg/22 bg-white px-4 py-2 font-mono text-[11px] lowercase tracking-[0.06em] text-brutal-fg transition-colors hover:border-brutal-fg/45"
                >
                  {tag}
                </button>
              ),
            )}
          </div>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-brutal-fg/38">
            Filter the field
          </p>
        </nav>
      </div>

      <PassionFieldFooter />
    </section>
  );
}
