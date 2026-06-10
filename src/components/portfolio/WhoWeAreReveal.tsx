"use client";

import type { ReactNode, RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { LiveClock } from "@/components/portfolio/LiveClock";
import {
  WHO_WE_ARE_BIO,
  WHO_WE_ARE_CONTACT_CARD,
  WHO_WE_ARE_CREATIVE_IMAGE,
  WHO_WE_ARE_IMAGE,
  WHO_WE_ARE_NAV,
  WHO_WE_ARE_STAT,
  WHO_WE_ARE_STAMP_LABEL,
  WHO_WE_ARE_WRITING_IMAGE,
} from "@/constants/who-we-are";
import { SITE_BRAND_NAME } from "@/constants/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const aboutSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

type WhoWeAreRevealProps = {
  revealRef: RefObject<HTMLDivElement | null>;
};

function StampLabel({ variant }: { variant: "outline" | "solid" }) {
  const words = WHO_WE_ARE_STAMP_LABEL.split(" ");

  return (
    <span
      className={`flex flex-col items-center gap-1 font-sans text-[clamp(1.5rem,3.5vw,2rem)] font-semibold uppercase leading-[0.82] tracking-[-0.04em] ${
        variant === "outline"
          ? "text-transparent [-webkit-text-stroke:1.5px_#111]"
          : "text-brutal-fg"
      }`}
      aria-hidden="true"
    >
      {words.map((word) => (
        <span key={word}>{word}</span>
      ))}
    </span>
  );
}

function FloatWrap({
  children,
  delay = "0s",
  reducedMotion,
  className = "",
}: {
  children: ReactNode;
  delay?: string;
  reducedMotion: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${reducedMotion ? "" : "about-float"} ${className}`}
      data-delay={reducedMotion ? undefined : delay}
    >
      {children}
    </div>
  );
}

export function WhoWeAreReveal({ revealRef }: WhoWeAreRevealProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      id="about"
      ref={revealRef}
      className={`${aboutSerif.className} who-we-are-reveal col-start-1 row-start-1 grid min-h-0 grid-rows-[auto_1fr] overflow-x-hidden opacity-0 scale-[0.98] pointer-events-none will-change-[opacity,transform]`}
      aria-label="About me"
    >
      <div className="about-ambient pointer-events-none" aria-hidden="true">
        <span className="about-watermark font-sans uppercase">{SITE_BRAND_NAME}</span>
        <span className="about-orb about-orb-a" />
        <span className="about-orb about-orb-b" />
        <span className="about-orb about-orb-c" />
      </div>

      <nav
        className="relative z-30 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 pb-2 pt-8 font-sans text-[0.8125rem] uppercase tracking-[0.08em] text-brutal-fg sm:px-8 sm:pt-10 lg:px-10"
        aria-label="About section"
      >
        <div className="justify-self-start">
          <Link
            href={WHO_WE_ARE_NAV.indexHref}
            className="transition-opacity hover:opacity-55"
          >
            {WHO_WE_ARE_NAV.indexLabel}
          </Link>
          <span className="text-brutal-fg/35"> , </span>
          <span>{WHO_WE_ARE_NAV.infoLabel}</span>
        </div>

        <LiveClock variant="24h" />

        <Link
          href={WHO_WE_ARE_NAV.journalHref}
          className="justify-self-end transition-opacity hover:opacity-55"
        >
          {WHO_WE_ARE_NAV.journalLabel}
        </Link>
      </nav>

      <div className="about-stage relative z-20 mx-auto flex min-h-0 w-full max-w-[90rem] flex-1 flex-col px-5 pb-16 pt-2 sm:px-8 sm:pb-20 lg:px-10">
        <div className="about-collage-grid grid min-h-0 flex-1 gap-3 sm:gap-4">
          <FloatWrap
            reducedMotion={reducedMotion}
            delay="0s"
            className="reveal-bento-card about-collage-writing self-start justify-self-start"
          >
            <figure className="about-writing-frame overflow-hidden rounded-[1rem] bg-[#eceae4] shadow-[0_24px_60px_-28px_rgba(17,17,17,0.35)] ring-1 ring-brutal-fg/[0.08]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={WHO_WE_ARE_WRITING_IMAGE.src}
                  alt={WHO_WE_ARE_WRITING_IMAGE.alt}
                  fill
                  sizes="15rem"
                  className="object-cover object-[center_72%]"
                />
              </div>
              <figcaption className="px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-brutal-fg/45">
                Story first
              </figcaption>
            </figure>
          </FloatWrap>

          <FloatWrap
            reducedMotion={reducedMotion}
            delay="0.4s"
            className="reveal-bento-card about-collage-creative rotate-[4deg] sm:rotate-[6deg]"
          >
            <figure className="overflow-hidden rounded-[1.1rem] bg-white shadow-[0_36px_80px_-32px_rgba(232,93,76,0.45)] ring-1 ring-brutal-fg/[0.08]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={WHO_WE_ARE_CREATIVE_IMAGE.src}
                  alt={WHO_WE_ARE_CREATIVE_IMAGE.alt}
                  fill
                  sizes="22rem"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <figcaption className="bg-[#111] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
                Digital craft
              </figcaption>
            </figure>
          </FloatWrap>

          <div
            className="reveal-bento-card about-photo-frame about-collage-portrait overflow-hidden rounded-[1.25rem] bg-white shadow-[0_40px_90px_-30px_rgba(17,17,17,0.4)] sm:-rotate-[6deg] lg:rotate-0"
            aria-hidden="true"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={WHO_WE_ARE_IMAGE.src}
                alt={WHO_WE_ARE_IMAGE.alt}
                fill
                sizes="22rem"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="reveal-bento-card about-stat-pill about-collage-stat hidden rounded-[1rem] border border-brutal-fg/8 bg-white/90 p-4 shadow-[0_20px_50px_-24px_rgba(17,17,17,0.28)] backdrop-blur-sm sm:block">
            <p className="font-sans text-2xl font-semibold tracking-[-0.04em] text-[#e85d4c]">
              ↑ {WHO_WE_ARE_STAT.value}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brutal-fg/50">
              {WHO_WE_ARE_STAT.label}
            </p>
            <p className="mt-2 font-sans text-[0.8125rem] leading-snug tracking-[-0.01em] text-brutal-fg/62">
              {WHO_WE_ARE_STAT.note}
            </p>
          </div>

          <div className="about-bio about-collage-bio flex flex-col items-center self-center justify-self-center text-center">
            <p className="reveal-bento-card font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/45">
              (About me)
            </p>
            <h2 className="reveal-bento-card mt-4 font-sans text-[clamp(1.75rem,4.5vw,3rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-brutal-fg">
              {WHO_WE_ARE_BIO.headline}
            </h2>
            <p className="reveal-bento-card mt-6 text-pretty text-[clamp(1.2rem,2.4vw,1.75rem)] leading-[1.38] tracking-[-0.02em] text-brutal-fg">
              {WHO_WE_ARE_BIO.lead}
            </p>
            <p className="reveal-bento-card mt-4 text-pretty text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.42] tracking-[-0.015em] text-brutal-fg/72">
              {WHO_WE_ARE_BIO.trail}
            </p>

            <div className="reveal-bento-card mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={WHO_WE_ARE_BIO.readMoreHref}
                className="inline-flex rounded-full bg-[#e85d4c] px-6 py-3 font-sans text-sm font-medium tracking-[-0.02em] text-white shadow-[0_16px_40px_-14px_rgba(232,93,76,0.65)] transition-transform hover:-translate-y-0.5"
              >
                {WHO_WE_ARE_BIO.readMoreLabel}
              </Link>
              <Link
                href={WHO_WE_ARE_BIO.contactHref}
                className="inline-flex rounded-full border border-brutal-fg/18 bg-white/70 px-6 py-3 font-sans text-sm font-medium tracking-[-0.02em] text-brutal-fg backdrop-blur-sm transition-colors hover:border-brutal-fg/35"
              >
                {WHO_WE_ARE_BIO.contactLabel}
              </Link>
            </div>
          </div>

          <div className="reveal-bento-card about-card-outline about-collage-outline hidden rounded-[0.35rem] border border-brutal-fg/20 bg-white/85 px-4 py-7 shadow-[0_24px_60px_-28px_rgba(17,17,17,0.3)] backdrop-blur-sm sm:block">
            <StampLabel variant="outline" />
          </div>

          <div className="reveal-bento-card about-card-contact about-collage-contact rotate-[-2deg] rounded-[0.35rem] border border-brutal-fg/10 bg-white px-4 py-5 shadow-[0_28px_70px_-32px_rgba(17,17,17,0.38)] sm:rotate-[-3deg]">
            <p className="font-sans text-[0.875rem] font-medium leading-snug tracking-[-0.02em] text-brutal-fg">
              {WHO_WE_ARE_CONTACT_CARD.name},
              <br />
              <span className="font-normal text-brutal-fg/72">
                {WHO_WE_ARE_CONTACT_CARD.role}
              </span>
            </p>
            <ul className="mt-4 space-y-1.5 font-sans text-[0.75rem] leading-relaxed tracking-[-0.01em] text-brutal-fg/68">
              <li>{WHO_WE_ARE_CONTACT_CARD.phone}</li>
              <li className="break-all">{WHO_WE_ARE_CONTACT_CARD.email}</li>
            </ul>
          </div>

          <div className="reveal-bento-card about-card-stamp about-collage-stamp hidden rotate-[8deg] rounded-[0.35rem] border border-brutal-fg/10 bg-white px-4 py-7 shadow-[0_30px_70px_-30px_rgba(17,17,17,0.35)] sm:block">
            <StampLabel variant="solid" />
          </div>
        </div>
      </div>
    </div>
  );
}
