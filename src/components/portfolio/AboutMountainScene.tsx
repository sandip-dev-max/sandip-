"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  ABOUT_MOUNTAIN_LAYER_COUNT,
  ABOUT_MOUNTAIN_IMAGE,
} from "@/constants/about-mountain";
import {
  WHO_WE_ARE_CREATIVE_IMAGE,
  WHO_WE_ARE_WRITING_IMAGE,
} from "@/constants/who-we-are";
import { useAboutMountainScene } from "@/hooks/use-about-mountain-scene";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LAYERS = Array.from({ length: ABOUT_MOUNTAIN_LAYER_COUNT }, (_, index) => index);

export function AboutMountainScene() {
  const reducedMotion = usePrefersReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  useAboutMountainScene(sceneRef, reducedMotion);

  return (
    <div
      ref={sceneRef}
      className="about-mountain-scene reveal-bento-card"
      aria-label="Interactive 3D mountain scene"
    >
      <div className="about-mountain-stage" data-mountain-stage>
        <div className="about-mountain-world" data-mountain-world>
          <div className="about-mountain-stack" data-mountain-stack>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ABOUT_MOUNTAIN_IMAGE}
              alt=""
              data-webgl-image
              className="about-mountain-webgl-source"
              aria-hidden="true"
            />
            {LAYERS.map((layerIndex) => (
              <div
                key={layerIndex}
                className="about-mountain-layer"
                data-layer-index={String(layerIndex)}
                aria-hidden="true"
              />
            ))}
          </div>

          <div
            className="about-orbit-card about-orbit-card--writing"
            data-orbit-card
            data-orbit-index="0"
          >
            <div className="about-orbit-card-inner about-writing-frame overflow-hidden rounded-[0.85rem] bg-[#eceae4] ring-1 ring-brutal-fg/[0.08]">
              <div
                data-webgl-image
                className="relative aspect-[3/4] w-[5.5rem] sm:w-[6.25rem]"
              >
                <Image
                  src={WHO_WE_ARE_WRITING_IMAGE.src}
                  alt={WHO_WE_ARE_WRITING_IMAGE.alt}
                  fill
                  sizes="6rem"
                  className="object-cover object-[center_72%]"
                />
              </div>
              <p className="px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-brutal-fg/45">
                Story first
              </p>
            </div>
          </div>

          <div
            className="about-orbit-card about-orbit-card--creative"
            data-orbit-card
            data-orbit-index="1"
          >
            <div className="about-orbit-card-inner overflow-hidden rounded-[0.9rem] bg-white ring-1 ring-brutal-fg/[0.08]">
              <div
                data-webgl-image
                className="relative aspect-[4/3] w-[6.5rem] sm:w-[7.5rem]"
              >
                <Image
                  src={WHO_WE_ARE_CREATIVE_IMAGE.src}
                  alt={WHO_WE_ARE_CREATIVE_IMAGE.alt}
                  fill
                  sizes="7.5rem"
                  className="object-cover object-center"
                />
              </div>
              <p className="bg-[#111] px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
                Digital craft
              </p>
            </div>
          </div>

          <div className="about-mountain-base" aria-hidden="true" />
          <div className="about-mountain-glow" aria-hidden="true" />
        </div>
      </div>

      <p className="about-mountain-hint font-mono text-[9px] uppercase tracking-[0.18em] text-brutal-fg/42">
        {reducedMotion ? "Himalayan field study" : "Drag the mountain · move to tilt"}
      </p>

      <span className="sr-only">
        Mountain photograph sourced from {ABOUT_MOUNTAIN_IMAGE}
      </span>
    </div>
  );
}
