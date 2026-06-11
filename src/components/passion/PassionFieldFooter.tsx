"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  PASSION_FIELD_COPYRIGHT,
  PASSION_FIELD_FOOTER,
  PASSION_FIELD_SOCIAL,
} from "@/constants/passion-field-footer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap } from "@/lib/gsap";

export function PassionFieldFooter() {
  const reducedMotion = usePrefersReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      const footer = footerRef.current;
      const mark = markRef.current;
      if (!footer) return;

      const ctx = gsap.context(() => {
        const reveals = footer.querySelectorAll("[data-field-footer-reveal]");
        if (reducedMotion) {
          gsap.set(reveals, { opacity: 1, y: 0 });
          if (mark) gsap.set(mark, { rotateX: 0, rotateY: 0 });
          return;
        }

        gsap.from(reveals, {
          y: 32,
          opacity: 0,
          duration: 0.95,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        if (mark) {
          gsap.to(mark, {
            rotateY: 8,
            rotateX: -6,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }, footer);

      return () => ctx.revert();
    },
    { scope: footerRef, dependencies: [reducedMotion] },
  );

  return (
    <footer
      ref={footerRef}
      className="passion-field-footer relative mt-16 border-t border-brutal-fg/[0.1] bg-[#ececea] text-brutal-fg sm:mt-20"
      aria-labelledby="passion-field-footer-heading"
    >
      <div className="passion-field-footer-grid mx-auto max-w-[96rem] lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="relative px-4 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <h2
            id="passion-field-footer-heading"
            data-field-footer-reveal
            className="max-w-[18ch] font-sans text-[clamp(1.65rem,7.5vw,4.5rem)] font-black uppercase leading-[0.94] tracking-[-0.045em] text-brutal-fg sm:leading-[0.92]"
          >
            {PASSION_FIELD_FOOTER.headline}
          </h2>

          <div
            data-field-footer-reveal
            className="mt-10 grid gap-6 border-t border-brutal-fg/[0.08] pt-8 sm:mt-14 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8 sm:pt-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brutal-fg/42">
              {PASSION_FIELD_FOOTER.sitemapLabel}
            </p>

            <nav aria-label="Passion sitemap">
              <ul className="space-y-2.5">
                {PASSION_FIELD_FOOTER.sitemap.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-[0.9375rem] font-medium uppercase tracking-[0.04em] text-brutal-fg transition-opacity hover:opacity-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex items-center gap-2.5 sm:flex-col sm:items-start lg:flex-row lg:items-center">
              {PASSION_FIELD_SOCIAL.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full border border-brutal-fg/18 bg-white/60 text-brutal-fg transition-colors hover:border-brutal-fg hover:bg-white"
                  >
                    <span className={`${social.icon} text-sm`} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-field-footer-reveal
            className="mt-12 flex flex-col gap-4 border-t border-brutal-fg/[0.08] pt-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brutal-fg/55">
              {PASSION_FIELD_COPYRIGHT} © {year}
            </p>
            <Link
              href={PASSION_FIELD_FOOTER.creditsHref}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-brutal-fg underline decoration-brutal-fg/30 underline-offset-4 transition-opacity hover:opacity-55"
            >
              {PASSION_FIELD_FOOTER.creditsLabel}
            </Link>
          </div>
        </div>

        <div className="relative border-t border-brutal-fg/[0.1] px-4 py-10 sm:px-8 sm:py-14 lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
          <p
            data-field-footer-reveal
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-brutal-fg/42"
          >
            {PASSION_FIELD_FOOTER.nextPage.eyebrow}
          </p>

          <div
            data-field-footer-reveal
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <Link
              href={PASSION_FIELD_FOOTER.nextPage.href}
              className="font-sans text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.04em] text-brutal-fg transition-opacity hover:opacity-55"
            >
              {PASSION_FIELD_FOOTER.nextPage.title}
            </Link>
            <Link
              href={PASSION_FIELD_FOOTER.nextPage.href}
              className="inline-flex items-center gap-2 rounded-full border border-brutal-fg/25 bg-white/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-brutal-fg transition-colors hover:border-brutal-fg hover:bg-white"
            >
              <span
                className="size-1.5 rounded-full bg-brutal-fg"
                aria-hidden="true"
              />
              {PASSION_FIELD_FOOTER.nextPage.cta}
            </Link>
          </div>

          <div
            ref={markRef}
            data-field-footer-reveal
            className="passion-field-mark relative mx-auto mt-10 flex max-w-[16rem] items-center justify-center lg:mt-14 lg:max-w-none"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 240 240"
              className="h-auto w-full max-w-[14rem] text-brutal-fg lg:max-w-[18rem]"
              fill="none"
            >
              <ellipse
                cx="120"
                cy="128"
                rx="88"
                ry="28"
                className="fill-brutal-fg/12"
              />
              <circle
                cx="120"
                cy="108"
                r="78"
                stroke="currentColor"
                strokeWidth="14"
                className="opacity-90"
              />
              <circle
                cx="120"
                cy="108"
                r="62"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-25"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pb-4">
              <div className="relative size-[5.5rem] overflow-hidden rounded-full ring-2 ring-brutal-fg/15 sm:size-[6.5rem] lg:size-[7.5rem]">
                <Image
                  src="/dock-mark.png"
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
