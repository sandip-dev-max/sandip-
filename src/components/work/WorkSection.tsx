"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCardActions } from "@/components/portfolio/ProjectCardActions";
import { PROJECTS } from "@/constants/projects";
import { SITE_BRAND_NAME } from "@/constants/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWorkStackScroll } from "@/hooks/use-work-stack-scroll";
import { scheduleScrollTriggerRefresh } from "@/lib/scroll-trigger";

const WORK_YEAR = new Date().getFullYear().toString().slice(-2);

export function WorkSection() {
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const handleActiveIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const { scrollToIndex } = useWorkStackScroll(
    {
      sectionRef,
      pinRef,
      stackRef,
      cardRefs,
    },
    handleActiveIndexChange,
    reducedMotion,
  );

  useEffect(() => {
    const onResize = () => scheduleScrollTriggerRefresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const selectProject = useCallback(
    (index: number) => {
      scrollToIndex(index);
    },
    [scrollToIndex],
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-[#f5f5f7] text-brutal-fg"
      aria-labelledby="work-heading"
    >
      <div
        ref={pinRef}
        className="mx-auto max-w-[90rem] lg:min-h-screen lg:py-6"
      >
        <div className="grid lg:min-h-[calc(100vh-3rem)] lg:grid-cols-[minmax(0,38%)_minmax(0,1fr)] lg:items-center">
          <div className="flex flex-col justify-between px-5 pb-12 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:py-16 xl:px-14">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/45">
                ({SITE_BRAND_NAME} Portfolio {WORK_YEAR}©)
              </p>

              <h2
                id="work-heading"
                className="mt-10 font-sans text-[clamp(3.5rem,9vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-brutal-fg"
              >
                Work
                <sup className="ml-2 align-super font-sans text-[0.28em] font-medium tracking-normal text-brutal-fg/55">
                  ({PROJECTS.length})
                </sup>
              </h2>

              <span
                className="mt-8 block size-1.5 rounded-full bg-brutal-fg"
                aria-hidden
              />

              <div className="relative mt-16 w-full sm:mt-20 lg:mt-24">
                <span
                  className="absolute -left-5 top-1/2 z-10 size-3 -translate-y-1/2 rounded-full bg-brutal-fg sm:-left-8 lg:-left-10"
                  aria-hidden
                />
                <div className="h-px w-full bg-brutal-fg/12" aria-hidden />
              </div>

              <div className="relative mt-10 min-h-[12rem] sm:min-h-[13rem]">
                {PROJECTS.map((project, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={project.id}
                      className={
                        isActive
                          ? "relative"
                          : "pointer-events-none absolute inset-0 opacity-0"
                      }
                      hidden={!isActive}
                    >
                      <p className="font-sans text-lg font-semibold tracking-[-0.03em] text-brutal-fg">
                        {project.title}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brutal-fg/45">
                        {project.tags.join(" · ")}
                        {project.date ? ` · ${project.date}` : ""}
                      </p>
                      <p className="mt-4 max-w-md text-pretty font-sans text-[0.9375rem] leading-relaxed tracking-[-0.01em] text-brutal-fg/60">
                        {project.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-6 flex flex-wrap gap-2"
                role="tablist"
                aria-label="Featured projects"
              >
                {PROJECTS.map((project, index) => {
                  const isActive = index === activeIndex;
                  const tabClassName = `rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? "bg-brutal-fg text-brutal-bg"
                      : "bg-brutal-fg/6 text-brutal-fg/55 hover:bg-brutal-fg/10 hover:text-brutal-fg"
                  }`;
                  const label = String(index + 1).padStart(2, "0");

                  if (isActive) {
                    return (
                      <button
                        key={project.id}
                        type="button"
                        role="tab"
                        aria-selected="true"
                        aria-controls="work-featured-panel"
                        onClick={() => selectProject(index)}
                        className={tabClassName}
                      >
                        {label}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={project.id}
                      type="button"
                      role="tab"
                      aria-selected="false"
                      aria-controls="work-featured-panel"
                      onClick={() => selectProject(index)}
                      className={tabClassName}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {isDesktop && !reducedMotion && (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-brutal-fg/40">
                  Scroll to stack projects
                </p>
              )}
            </div>

            <div className="mt-10 lg:mt-8">
              <ProjectCardActions
                liveUrl={activeProject.liveUrl}
                githubUrl={activeProject.githubUrl}
                variant="light"
              />
            </div>
          </div>

          <div
            id="work-featured-panel"
            role="tabpanel"
            aria-label={activeProject.title}
            className="relative px-5 pb-12 sm:px-8 lg:px-8 lg:pb-16 lg:pr-10 xl:pr-14"
          >
            <div
              ref={stackRef}
              className="relative mx-auto aspect-[3/4] max-h-[min(78vh,720px)] w-full max-w-xl lg:mx-0 lg:max-h-[min(82vh,780px)] lg:max-w-none"
            >
              {PROJECTS.map((project, index) => (
                <article
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="work-stack-card absolute inset-0 overflow-hidden rounded-[1.75rem] bg-brutal-fg/5 shadow-[0_40px_80px_-24px_rgba(17,17,17,0.22)] ring-1 ring-brutal-fg/[0.08] will-change-transform sm:rounded-[2rem] lg:rounded-[2.25rem]"
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brutal-fg/40 via-transparent to-transparent" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
