"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  WORK_WITH_US,
  type WorkWithUsMetric,
} from "@/constants/work-with-us";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWorkWithUsReveal } from "@/hooks/use-work-with-us-reveal";

function StatusPill({ label, variant = "dark" }: { label: string; variant?: "dark" | "light" }) {
  const dark =
    "border-white/12 bg-white/8 text-white/78 backdrop-blur-sm";
  const light =
    "border-brutal-fg/10 bg-white text-brutal-fg/62 backdrop-blur-sm";

  return (
    <span
      className={`work-with-pill inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
        variant === "dark" ? dark : light
      }`}
    >
      {label}
      <span className="work-with-pill-dot size-1.5 rounded-full bg-[#b8f55a]" aria-hidden="true" />
    </span>
  );
}

function MetricIcon({ type }: { type: WorkWithUsMetric["icon"] }) {
  if (type === "globe") {
    return (
      <span
        className="work-with-metric-icon work-with-metric-icon--globe"
        aria-hidden="true"
      >
        ○
      </span>
    );
  }

  if (type === "layers") {
    return (
      <span
        className="work-with-metric-icon work-with-metric-icon--layers"
        aria-hidden="true"
      >
        ≡
      </span>
    );
  }

  return (
    <span
      className="work-with-metric-icon work-with-metric-icon--spark"
      aria-hidden="true"
    >
      $
    </span>
  );
}

export function WorkWithUsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useWorkWithUsReveal({ sectionRef }, reducedMotion);

  const { eyebrow, team, metrics, workflow } = WORK_WITH_US;

  return (
    <section
      ref={sectionRef}
      id="work-with-us"
      className="work-with-us scroll-story-section relative w-full overflow-hidden border-t border-brutal-fg/[0.1] bg-[#f0ede5] text-brutal-fg"
      aria-labelledby="work-with-us-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-1.5 bg-gradient-to-r from-[#e85d4c] via-[#f0c27b] to-[#4a6fa5] opacity-90"
        aria-hidden="true"
      />

      <div
        data-wwu-glow
        className="work-with-ambient pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[min(100dvh,56rem)] w-full max-w-[90rem] flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:min-h-[100dvh] lg:px-10">
        <div className="mb-8 sm:mb-10">
          <p
            data-wwu-eyebrow
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-brutal-fg/45"
          >
            {eyebrow}
          </p>
          <h2
            id="work-with-us-heading"
            data-wwu-title
            className="mt-3 font-sans text-[clamp(2rem,4.5vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-brutal-fg"
          >
            Built with care,{" "}
            <span className="text-[#c44d3f]">shipped with craft</span>
          </h2>
          <p
            data-wwu-title
            className="mt-3 max-w-xl font-sans text-[0.9375rem] leading-relaxed tracking-[-0.015em] text-brutal-fg/58"
          >
            A small studio rhythm — research, design, build, and iterate until
            the product feels inevitable in the browser.
          </p>
        </div>

        <div className="work-with-grid grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          <article
            data-wwu-panel
            data-wwu-team
            className="work-with-panel work-with-panel--team group relative aspect-square overflow-hidden rounded-[1.35rem] bg-[#0d0d0d] text-white shadow-[0_32px_80px_-36px_rgba(17,17,17,0.55)] ring-1 ring-white/10 sm:rounded-[1.5rem] lg:min-h-[28rem]"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,rgb(232_93_76/0.18),transparent_68%)]"
              aria-hidden="true"
            />

            <div className="work-with-orbit relative flex h-full w-full items-center justify-center p-8">
              <div
                data-wwu-ring-wrap
                className="work-with-ring-wrap"
                aria-hidden="true"
              >
                <div className="work-with-ring work-with-ring--outer" />
              </div>
              <div
                data-wwu-ring-wrap
                className="work-with-ring-wrap"
                aria-hidden="true"
              >
                <div className="work-with-ring work-with-ring--inner" />
              </div>

              <p className="work-with-orbit-copy relative z-10 max-w-[11rem] text-center font-sans text-[clamp(1.05rem,2.2vw,1.35rem)] font-medium leading-snug tracking-[-0.02em] text-white">
                {team.headline}
              </p>

              {team.members.map((member, index) => (
                <div
                  key={member.id}
                  data-wwu-avatar
                  data-member-id={member.id}
                  data-avatar-index={reducedMotion ? undefined : String(index)}
                  className={`work-with-avatar work-with-avatar--${member.ring} ${
                    reducedMotion ? "" : "work-with-avatar-float"
                  }`}
                >
                  <div
                    data-wwu-avatar-inner
                    className="relative size-full overflow-hidden rounded-full ring-2 ring-white/20 transition-transform duration-500 group-hover:scale-105"
                  >
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      fill
                      sizes="64px"
                      className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="grid min-h-0 gap-4 sm:gap-5">
            <article
              data-wwu-panel
              data-wwu-metrics
              className="work-with-panel work-with-panel--metrics relative overflow-hidden rounded-[1.35rem] bg-[#141414] p-5 text-white shadow-[0_28px_70px_-34px_rgba(17,17,17,0.5)] ring-1 ring-white/8 sm:rounded-[1.5rem] sm:p-6"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#b8f55a]/10 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-4">
                <h3 className="font-sans text-[clamp(1.1rem,2vw,1.35rem)] font-semibold tracking-[-0.02em]">
                  {metrics.title}
                </h3>
                <StatusPill label={metrics.tag} />
              </div>

              <div className="work-with-metrics-stack relative mt-8 min-h-[11rem]">
                {metrics.items.map((item, index) => (
                  <div
                    key={item.id}
                    data-wwu-metric
                    data-metric-index={String(index)}
                    className="work-with-metric-card absolute inset-x-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#222] px-4 py-3 shadow-[0_22px_44px_-26px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:-translate-y-0.5"
                  >
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#111] ring-1 ring-white/8">
                      <Image
                        src={item.thumb}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover object-top opacity-90"
                        aria-hidden
                      />
                    </div>
                    <p className="min-w-0 flex-1 font-sans text-[0.8125rem] font-medium leading-snug tracking-[-0.01em] text-white/90 sm:text-sm">
                      {item.label}
                    </p>
                    <MetricIcon type={item.icon} />
                  </div>
                ))}
              </div>
            </article>

            <article
              data-wwu-panel
              data-wwu-workflow
              className="work-with-panel work-with-panel--workflow relative overflow-hidden rounded-[1.35rem] bg-[#eceae4] p-5 shadow-[0_24px_60px_-34px_rgba(17,17,17,0.22)] ring-1 ring-brutal-fg/[0.08] sm:rounded-[1.5rem] sm:p-6"
            >
              <div
                className="work-with-workflow-dots pointer-events-none absolute inset-0 opacity-70"
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-4">
                <h3 className="max-w-[16rem] font-sans text-[clamp(1.05rem,2vw,1.3rem)] font-semibold leading-snug tracking-[-0.02em] text-brutal-fg">
                  {workflow.title}
                </h3>
                <StatusPill label={workflow.tag} variant="light" />
              </div>

              <div className="work-with-flow relative mt-10 min-h-[9rem]">
                <div className="work-with-flow-row flex flex-wrap items-center gap-2 sm:gap-3">
                  <span data-wwu-node className="work-with-flow-node">
                    <span className="work-with-flow-dot" aria-hidden="true" />
                    {workflow.nodes[0]?.label}
                  </span>
                  <span
                    data-wwu-connector
                    className="work-with-flow-line"
                    aria-hidden="true"
                  />
                  <span data-wwu-node className="work-with-flow-node">
                    <span className="work-with-flow-dot" aria-hidden="true" />
                    {workflow.nodes[1]?.label}
                  </span>
                </div>

                <div
                  data-wwu-connector
                  className="work-with-flow-branch"
                  aria-hidden="true"
                />

                <div className="work-with-flow-row mt-8 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-3">
                  <span data-wwu-node className="work-with-flow-node">
                    <span className="work-with-flow-dot" aria-hidden="true" />
                    {workflow.nodes[2]?.label}
                  </span>
                  <span data-wwu-node className="work-with-flow-node sm:ml-auto">
                    <span className="work-with-flow-dot" aria-hidden="true" />
                    {workflow.nodes[3]?.label}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
