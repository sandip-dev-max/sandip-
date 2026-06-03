"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import {
  DOCK_MENU_LEFT,
  DOCK_MENU_RIGHT,
  type DockSectionId,
} from "@/constants/dock-menu";
import { SITE_BRAND_NAME } from "@/constants/site";
import { useActiveDockSection, useDockVisibility } from "@/hooks/use-dock-menu";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { scrollToHash } from "@/lib/scroll-to-hash";

function sectionForHref(href: string): DockSectionId | null {
  if (href === "#hero") return "hero";
  if (href === "#work") return "work";
  if (href === "#services") return "services";
  if (href === "#contact") return "contact";
  return null;
}

type DockLinkProps = {
  label: string;
  href: string;
  isActive: boolean;
  onNavigate: (href: string) => void;
};

function DockLink({ label, href, isActive, onNavigate }: DockLinkProps) {
  const className = `font-sans text-sm font-medium tracking-[-0.02em] transition-colors ${
    isActive
      ? "text-brutal-fg"
      : "text-brutal-fg/45 hover:text-brutal-fg/75"
  }`;

  if (isActive) {
    return (
      <button
        type="button"
        onClick={() => onNavigate(href)}
        className={className}
        aria-current="page"
      >
        {label}
      </button>
    );
  }

  return (
    <button type="button" onClick={() => onNavigate(href)} className={className}>
      {label}
    </button>
  );
}

export function DockMenu() {
  const { lenis } = useLenis();
  const visible = useDockVisibility();
  const activeSection = useActiveDockSection();
  const reducedMotion = usePrefersReducedMotion();

  const onNavigate = useCallback(
    (href: string) => {
      scrollToHash(lenis, href);
    },
    [lenis],
  );

  const motionClass = reducedMotion
    ? visible
      ? "opacity-100"
      : "pointer-events-none opacity-0"
    : visible
      ? "translate-y-0 opacity-100"
      : "pointer-events-none translate-y-6 opacity-0";

  return (
    <nav
      aria-label="Primary dock navigation"
      className={`fixed bottom-5 left-1/2 z-[200] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 transition-all duration-500 ease-out sm:bottom-8 sm:w-auto ${motionClass}`}
    >
      <div className="flex items-center justify-between gap-4 rounded-full bg-white/95 px-4 py-2.5 shadow-[0_18px_50px_-12px_rgba(17,17,17,0.28)] ring-1 ring-brutal-fg/[0.08] backdrop-blur-md sm:gap-6 sm:px-6 sm:py-3">
        <div className="flex items-center gap-4 sm:gap-5">
          {DOCK_MENU_LEFT.map((item) => (
            <DockLink
              key={item.id}
              label={item.label}
              href={item.href}
              isActive={sectionForHref(item.href) === activeSection}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate("#hero")}
          className="inline-flex shrink-0 items-center gap-2.5 rounded-full px-1 py-0.5 font-sans text-sm font-semibold tracking-[-0.02em] text-brutal-fg transition-opacity hover:opacity-80"
          aria-label={`${SITE_BRAND_NAME} home`}
        >
          <span className="relative size-7 shrink-0 overflow-hidden rounded-full ring-1 ring-brutal-fg/10">
            <Image
              src="/dock-mark.png"
              alt=""
              fill
              sizes="28px"
              className="object-cover object-center"
              aria-hidden
            />
          </span>
          {SITE_BRAND_NAME}
        </button>

        <div className="flex items-center gap-4 sm:gap-5">
          {DOCK_MENU_RIGHT.map((item) => (
            <DockLink
              key={item.id}
              label={item.label}
              href={item.href}
              isActive={sectionForHref(item.href) === activeSection}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
