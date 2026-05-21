"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Pinyon_Script } from "next/font/google";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MENU_LATEST_WORK,
  MENU_MAIN_LINKS,
  MENU_SOCIAL_LINKS,
} from "@/constants/menu";
import { SITE_CONTACT_EMAIL } from "@/constants/site";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type PortfolioMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function PortfolioMenu({ open, onClose }: PortfolioMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (panel) gsap.set(panel, { yPercent: -100 });
  }, [mounted]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      // Skip the mount animation — only animate when the user opens/closes.
      if (!hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        gsap.set(panel, { yPercent: open ? 0 : -100 });
        return;
      }

      gsap.to(panel, {
        yPercent: open ? 0 : -100,
        duration: 0.75,
        ease: open ? "power3.out" : "power3.in",
        overwrite: true,
      });
    },
    { dependencies: [open, mounted] },
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleNavClick = () => {
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={panelRef}
      className={`fixed inset-0 z-[200] flex flex-col will-change-transform ${open ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className="flex h-full min-h-0 w-full flex-col lg:flex-row"
        role="dialog"
        aria-modal={open}
        aria-label="Site menu"
      >
        <div className="flex min-h-0 flex-1 flex-col bg-black px-6 py-8 text-white sm:px-10 sm:py-10 lg:w-[58%] lg:px-12 lg:py-12">
          <Link
            href="/"
            onClick={handleNavClick}
            className={`${pinyonScript.className} w-fit text-3xl leading-none sm:text-4xl`}
          >
            Yudeat
          </Link>

          <nav className="mt-16 flex flex-col gap-2 sm:mt-20" aria-label="Main">
            {MENU_MAIN_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="font-sans text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em] transition-opacity hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-12 sm:pt-16">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">
              Latest work
            </p>
            <ul className="mt-4 space-y-2">
              {MENU_LATEST_WORK.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={handleNavClick}
                    className="font-sans text-lg font-medium tracking-tight text-white transition-opacity hover:opacity-60 sm:text-xl"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex min-h-[40vh] flex-col bg-brutal-bg px-6 py-8 text-brutal-fg sm:px-10 sm:py-10 lg:w-[42%] lg:px-12 lg:py-12">
          <div className="flex items-start justify-between gap-6">
            <div className="font-mono text-[10px] uppercase leading-relaxed tracking-widest text-brutal-fg/70">
              <a
                href={`mailto:${SITE_CONTACT_EMAIL}`}
                className="block text-brutal-fg transition-opacity hover:opacity-60"
              >
                {SITE_CONTACT_EMAIL}
              </a>
              <p className="mt-2">Available for freelance work.</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="relative z-10 shrink-0 font-sans text-[clamp(2rem,6vw,4rem)] font-medium leading-none tracking-[-0.04em] transition-opacity hover:opacity-50"
            >
              Close
            </button>
          </div>

          <nav
            className="mt-auto flex flex-col gap-2 pt-10 font-sans text-xl font-medium lowercase tracking-tight sm:text-2xl"
            aria-label="Social"
          >
            {MENU_SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-opacity hover:opacity-50"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>,
    document.body,
  );
}
