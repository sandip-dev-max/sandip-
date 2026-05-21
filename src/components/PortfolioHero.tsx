"use client";

import { PortfolioFooter } from "@/components/portfolio/PortfolioFooter";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";

const TECH_TAGS = ["Next.js", "TypeScript", "UI Systems"] as const;

export function PortfolioHero() {
  return (
    <section className="hero-content flex h-screen w-full flex-col overflow-hidden bg-brutal-bg text-brutal-fg">
      <PortfolioHeader />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 px-5 py-6 sm:gap-10 sm:px-8 sm:py-8 lg:grid-cols-12 lg:gap-x-6 lg:px-10 lg:py-8">
        {/* Left — 7 cols */}
        <div className="flex min-h-0 flex-col lg:col-span-7">
          <h1 className="font-sans text-4xl font-black uppercase leading-[0.88] tracking-tighter md:text-7xl lg:text-8xl">
            Software
            <br />
            Developer
          </h1>

          <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brutal-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/65 md:px-4 md:py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 aspect-[16/7] w-full overflow-hidden border border-brutal-border md:mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt="Yudeat in front of a lake and mountains"
              className="hero-image h-full w-full object-cover object-[center_68%]"
            />
          </div>

          <div className="mt-4 flex items-start gap-3 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-brutal-fg/70 md:mt-5">
            <span className="text-base leading-none" aria-hidden>
              →
            </span>
            <p>
              Based in Kathmandu,
              <br />
              passionate in architect &amp; UI
            </p>
          </div>
        </div>

        {/* Right — 5 cols, offset down */}
        <div className="flex min-h-0 flex-col justify-between gap-8 lg:col-span-5 lg:pb-2 lg:pt-20 xl:pt-28">
          <div className="space-y-4 lg:space-y-5 lg:text-right">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest lg:justify-end">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                aria-hidden
              />
              Open for work
            </div>

            <p className="font-mono text-[10px] uppercase tracking-widest text-brutal-fg/50">
              01 / From Nepal with love
            </p>

            <p className="max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-widest text-brutal-fg/75 lg:ml-auto">
              Building fast, clean web apps for real users. Open for freelance /
              full-time based in Kathmandu Valley, NP.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:items-end lg:text-right">
            <h2 className="font-sans text-4xl font-black uppercase leading-[0.88] tracking-tighter md:text-6xl lg:text-7xl xl:text-8xl">
              Yudeat
            </h2>

            <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest text-brutal-fg/60 lg:items-end">
              <span>2026 Portfolio</span>
              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-brutal-border px-4 py-2 text-brutal-fg transition-colors hover:border-brutal-fg hover:bg-brutal-fg hover:text-brutal-bg"
              >
                Selected work
                <span aria-hidden>↘</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <PortfolioFooter />
    </section>
  );
}
