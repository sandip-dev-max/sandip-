import type { RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  WHO_WE_ARE_APPROACH,
  WHO_WE_ARE_COLLAB,
  WHO_WE_ARE_EYEBROW,
  WHO_WE_ARE_HEADLINE,
  WHO_WE_ARE_HIGHLIGHT,
} from "@/constants/who-we-are";
import { SITE_BRAND_NAME } from "@/constants/site";

type WhoWeAreRevealProps = {
  revealRef: RefObject<HTMLDivElement | null>;
};

function BrandMark({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textClass =
    variant === "dark"
      ? "text-white"
      : "text-brutal-fg";

  return (
    <span
      className={`inline-flex items-center gap-2.5 font-sans text-[0.9375rem] font-semibold tracking-[-0.02em] ${textClass}`}
    >
      <span
        className="size-[1.35rem] shrink-0 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-amber-300 shadow-[0_0_20px_rgba(167,139,250,0.45)]"
        aria-hidden
      />
      {SITE_BRAND_NAME}
    </span>
  );
}

export function WhoWeAreReveal({ revealRef }: WhoWeAreRevealProps) {
  return (
    <div
      ref={revealRef}
      className="who-we-are-reveal absolute inset-0 z-[15] flex flex-col overflow-hidden opacity-0 scale-[0.98] pointer-events-none will-change-[opacity,transform]"
      aria-label="About me"
    >
      <div
        className="pointer-events-none absolute inset-0 who-we-are-grid-lines"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-5 top-0 z-10 h-full w-px who-we-are-guide sm:left-8 lg:left-10"
        aria-hidden
      >
        <span className="absolute left-1/2 top-[38%] size-2.5 -translate-x-1/2 rounded-full bg-brutal-fg ring-4 ring-[#f3f3f1]" />
      </div>

      <header className="relative z-20 shrink-0 px-5 pb-5 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pb-6 lg:pt-12">
        <p className="pl-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brutal-fg/42">
          {WHO_WE_ARE_EYEBROW}
        </p>

        <div className="mt-8 lg:mt-10">
          <h2 className="max-w-[14ch] pl-1 font-sans text-[clamp(2.35rem,5.8vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.048em] text-brutal-fg">
            {WHO_WE_ARE_HEADLINE}
          </h2>

          <div className="mt-10 flex items-center gap-3 pl-1" aria-hidden>
            <span className="size-2 rounded-full bg-brutal-fg" />
            <span className="h-px w-28 bg-brutal-fg/14 sm:w-40" />
            <span className="size-1.5 rounded-full bg-brutal-fg/30" />
            <span className="size-1.5 rounded-full bg-brutal-fg/30" />
            <span className="size-1.5 rounded-full bg-brutal-fg/30" />
          </div>
        </div>
      </header>

      <div className="relative z-20 flex min-h-0 flex-1 flex-col px-5 pb-24 sm:px-8 lg:px-10 lg:pb-28">
        <div className="grid min-h-0 flex-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
          <div className="flex min-h-0 flex-col gap-4 sm:gap-5">
            <article className="reveal-bento-card who-we-are-bento-dark relative flex min-h-[12.5rem] flex-1 flex-col justify-between overflow-hidden rounded-[1.65rem] bg-[#141414] p-6 text-white sm:min-h-[13.5rem] sm:rounded-[1.85rem] sm:p-7 lg:min-h-[14rem]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-sans text-[clamp(3.25rem,9vw,5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                    {WHO_WE_ARE_HIGHLIGHT.count}
                  </p>
                  <p className="mt-3 max-w-[11rem] text-[0.9375rem] leading-snug tracking-[-0.01em] text-white/68">
                    {WHO_WE_ARE_HIGHLIGHT.label}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    ({WHO_WE_ARE_HIGHLIGHT.eyebrow})
                  </p>
                  <div className="mt-4 flex items-center justify-end -space-x-2.5">
                    {WHO_WE_ARE_HIGHLIGHT.avatarInitials.map((initial) => (
                      <span
                        key={initial}
                        className="flex size-9 items-center justify-center rounded-full border-2 border-[#141414] bg-gradient-to-br from-white/22 to-white/8 font-mono text-[10px] font-medium text-white/92 shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]"
                      >
                        {initial}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 who-we-are-team-dots"
                aria-hidden
              />
            </article>

            <article className="reveal-bento-card who-we-are-bento-light relative flex min-h-[12.5rem] flex-col justify-between overflow-hidden rounded-[1.65rem] bg-white p-6 sm:min-h-[13.5rem] sm:rounded-[1.85rem] sm:p-7 lg:min-h-[14rem]">
              <div className="flex items-start justify-between gap-6">
                <BrandMark />
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brutal-fg/42">
                    ({WHO_WE_ARE_APPROACH.eyebrow})
                  </p>
                  <ul className="mt-3 space-y-1 font-sans text-sm tracking-[-0.02em]">
                    {WHO_WE_ARE_APPROACH.stats.map((stat) => (
                      <li key={stat.label} className="text-brutal-fg/70">
                        {stat.label}{" "}
                        <span className="font-medium text-brutal-fg">
                          {stat.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="max-w-[16ch] font-sans text-[1.35rem] font-semibold leading-[1.12] tracking-[-0.035em] text-brutal-fg sm:text-[1.5rem]">
                  {WHO_WE_ARE_APPROACH.title}
                </h3>
                <Link
                  href={WHO_WE_ARE_APPROACH.ctaHref}
                  className="mt-6 inline-flex rounded-full bg-brutal-fg px-6 py-3 font-sans text-sm font-medium tracking-[-0.02em] text-white shadow-[0_14px_36px_-12px_rgba(17,17,17,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgba(17,17,17,0.45)]"
                >
                  {WHO_WE_ARE_APPROACH.ctaLabel}
                </Link>
              </div>
            </article>
          </div>

          <article className="reveal-bento-card relative flex min-h-[26rem] flex-col overflow-hidden rounded-[1.65rem] p-6 sm:min-h-0 sm:rounded-[1.85rem] sm:p-7 lg:min-h-full">
            <Image
              src="/who-we-are-collab-bg.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              aria-hidden
            />
            <div
              className="who-we-are-collab-scrim pointer-events-none absolute inset-0"
              aria-hidden
            />

            <p className="relative z-[1] text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
              ({WHO_WE_ARE_COLLAB.eyebrow})
            </p>

            <div className="relative z-[1] mt-5 flex flex-1 flex-col justify-center sm:mt-6">
              <div className="who-we-are-chat-panel mx-auto w-full max-w-[22rem] rounded-[1.5rem] p-4 ring-1 ring-brutal-fg/[0.08] backdrop-blur-md sm:max-w-md sm:p-5">
                <ul className="space-y-3.5">
                  {WHO_WE_ARE_COLLAB.messages.map((message) =>
                    message.side === "left" ? (
                      <li key={message.id} className="flex justify-start">
                        <span className="max-w-[88%] rounded-[1.1rem] rounded-bl-md bg-white px-4 py-2.5 font-sans text-[0.875rem] leading-snug tracking-[-0.015em] text-brutal-fg shadow-[0_8px_24px_-10px_rgba(17,17,17,0.25)]">
                          {message.text}
                        </span>
                      </li>
                    ) : (
                      <li
                        key={message.id}
                        className="flex flex-col items-end gap-1.5"
                      >
                        {message.time ? (
                          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-brutal-fg/50">
                            {message.time}
                          </span>
                        ) : null}
                        <span className="inline-flex max-w-[88%] items-center gap-2.5 rounded-[1.1rem] rounded-br-md bg-[#121212] px-4 py-2.5 font-sans text-[0.875rem] leading-snug text-white shadow-[0_10px_28px_-12px_rgba(0,0,0,0.55)]">
                          {message.text}
                          <span className="relative size-[1.05rem] shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                            <Image
                              src="/dock-mark.png"
                              alt=""
                              fill
                              sizes="18px"
                              className="object-cover object-center"
                              aria-hidden
                            />
                          </span>
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
