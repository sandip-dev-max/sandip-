"use client";

import Image from "next/image";
import type { PassionFigure } from "@/constants/passion-story";
import {
  StoryClockSvg,
  StoryGlobeSvg,
  StoryStudioSvg,
} from "@/components/passion/StorySvgs";
import { useCardTilt } from "@/hooks/use-card-tilt";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type PassionFigureProps = {
  figure: PassionFigure;
};

export function PassionFigureBlock({ figure }: PassionFigureProps) {
  const reducedMotion = usePrefersReducedMotion();
  const tiltRef = useCardTilt(reducedMotion, 0.85);

  return (
    <figure
      data-story-reveal
      className="passion-figure group"
      data-story-figure={figure.id}
    >
      <div
        ref={tiltRef}
        className="passion-tilt-card passion-figure-media overflow-hidden bg-[#f1f0ed] shadow-[0_18px_44px_-30px_rgba(17,17,17,0.35)] ring-1 ring-brutal-fg/[0.07]"
      >
        {figure.type === "globe" ? (
          <StoryGlobeSvg
            data-story-draw
            className="mx-auto h-auto w-[72%] py-8 text-brutal-fg/82"
          />
        ) : null}

        {figure.type === "clock" ? (
          <StoryClockSvg
            data-story-draw
            className="mx-auto h-auto w-[72%] py-8 text-brutal-fg/82"
          />
        ) : null}

        {figure.type === "studio" ? (
          <StoryStudioSvg
            data-story-draw
            className="mx-auto h-auto w-[84%] py-6 text-brutal-fg/82"
          />
        ) : null}

        {figure.type === "photo" ||
        figure.type === "mountain" ||
        figure.type === "screen" ? (
          <div
            className={`passion-media-frame relative w-full overflow-hidden ${
              figure.type === "screen" ? "aspect-[16/10]" : "aspect-[4/5]"
            }`}
          >
            <Image
              src={figure.imageSrc ?? "/hero.png"}
              alt={figure.imageAlt ?? ""}
              fill
              sizes="(max-width: 768px) 90vw, 320px"
              className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                figure.type === "mountain"
                  ? "object-center"
                  : "object-[center_35%]"
              }`}
            />
          </div>
        ) : null}
      </div>

      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-brutal-fg/42">
        {figure.caption}
      </figcaption>
    </figure>
  );
}
