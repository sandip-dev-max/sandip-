"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { SERVICES } from "@/constants/services";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useServicesScroll } from "@/hooks/use-services-scroll";

const serviceTabClassName =
  "group flex w-full items-baseline gap-3 py-1 text-left sm:gap-5 sm:py-1.5";

export function ServicesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionReady, setMotionReady] = useState(false);
  const activeService = SERVICES[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const handleActiveIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const { selectIndex } = useServicesScroll(
    {
      sectionRef,
      pinRef,
      imageLayerRefs,
      descriptionRefs,
    },
    handleActiveIndexChange,
    reducedMotion,
    motionReady,
  );

  const registerImageRef = useCallback(
    (index: number, el: HTMLDivElement | null) => {
      imageLayerRefs.current[index] = el;
      if (
        !motionReady &&
        imageLayerRefs.current.filter(Boolean).length === SERVICES.length
      ) {
        setMotionReady(true);
      }
    },
    [motionReady],
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-white text-brutal-fg"
      aria-labelledby="services-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-px -translate-x-1/2 bg-brutal-fg/[0.08]"
        aria-hidden
      />

      <div
        ref={pinRef}
        className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10"
      >
        <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-brutal-fg/10 py-5 sm:py-6">
          <p
            id="services-heading"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/50"
          >
            (Services)
          </p>

          <div
            className="flex items-center justify-center gap-2"
            role="group"
            aria-label="Jump to service"
          >
            {SERVICES.map((service, index) => {
              const isActive = index === activeIndex;
              const dotClassName = `rounded-full transition-all duration-300 ${
                isActive
                  ? "size-2 bg-brutal-fg"
                  : "size-1.5 bg-brutal-fg/20 hover:bg-brutal-fg/35"
              }`;

              if (isActive) {
                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-label={`Show ${service.title}`}
                    aria-current="true"
                    onClick={() => selectIndex(index)}
                    className={dotClassName}
                  />
                );
              }

              return (
                <button
                  key={service.id}
                  type="button"
                  aria-label={`Show ${service.title}`}
                  onClick={() => selectIndex(index)}
                  className={dotClassName}
                />
              );
            })}
          </div>

          <div className="flex justify-end">
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full bg-brutal-fg px-5 py-2.5 font-sans text-sm font-medium tracking-[-0.02em] text-white shadow-[0_14px_36px_-10px_rgba(17,17,17,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-10 py-10 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:py-14 xl:gap-16">
          <div className="flex min-h-0 flex-col justify-center">
            <div
              className="space-y-0.5 sm:space-y-1"
              role="tablist"
              aria-label="Services"
            >
              {SERVICES.map((service, index) => {
                const isActive = index === activeIndex;
                const tabId = `service-tab-${service.id}`;
                const numberClassName = `w-10 shrink-0 font-mono text-[10px] tracking-[0.12em] transition-colors duration-500 sm:w-12 sm:text-[11px] ${
                  isActive ? "text-brutal-fg/55" : "text-brutal-fg/25"
                }`;
                const titleClassName = `font-sans leading-[0.92] tracking-[-0.04em] transition-all duration-500 ease-out ${
                  isActive
                    ? "text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold text-brutal-fg"
                    : "text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium text-brutal-fg/20"
                }`;

                if (isActive) {
                  return (
                    <button
                      key={service.id}
                      id={tabId}
                      type="button"
                      role="tab"
                      aria-selected="true"
                      aria-controls="services-detail-panel"
                      onClick={() => selectIndex(index)}
                      className={serviceTabClassName}
                    >
                      <span className={numberClassName}>
                        ({service.number})
                      </span>
                      <span className={titleClassName}>{service.title}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={service.id}
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-selected="false"
                    aria-controls="services-detail-panel"
                    onClick={() => selectIndex(index)}
                    className={serviceTabClassName}
                  >
                    <span className={numberClassName}>({service.number})</span>
                    <span className={titleClassName}>{service.title}</span>
                  </button>
                );
              })}
            </div>

            {isDesktop && !reducedMotion && (
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-brutal-fg/40">
                Scroll to explore each service
              </p>
            )}
          </div>

          <div
            id="services-detail-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${activeService.id}`}
            className="flex min-h-0 flex-col justify-center lg:pl-4 xl:pl-8"
          >
            <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-[1.25rem] bg-brutal-fg/5 ring-1 ring-brutal-fg/[0.06] sm:min-h-[18rem] sm:rounded-[1.5rem] lg:min-h-0 lg:max-h-[min(58vh,560px)] lg:flex-1">
              {SERVICES.map((service, index) => (
                <div
                  key={service.id}
                  ref={(el) => registerImageRef(index, el)}
                  className={`absolute inset-0 will-change-transform ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover object-center transition-[filter] duration-500 ${
                      index === activeIndex ? "grayscale-0" : "grayscale"
                    }`}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            <div className="relative mt-6 min-h-[4.5rem] max-w-md shrink-0 sm:mt-8">
              {SERVICES.map((service, index) => (
                <p
                  key={service.id}
                  ref={(el) => {
                    descriptionRefs.current[index] = el;
                  }}
                  className={`text-pretty font-sans text-[0.9375rem] leading-relaxed tracking-[-0.01em] text-brutal-fg/75 sm:text-base ${
                    index === activeIndex
                      ? "relative z-[1]"
                      : "pointer-events-none absolute inset-0"
                  }`}
                  hidden={index !== activeIndex}
                >
                  {service.description}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
