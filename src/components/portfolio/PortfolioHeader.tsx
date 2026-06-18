"use client";

import dynamic from "next/dynamic";
import { Pinyon_Script } from "next/font/google";
import Link from "next/link";
import { useCallback, useState } from "react";
import { PortfolioChat } from "@/components/portfolio/PortfolioChat";

const PortfolioMenu = dynamic(
  () =>
    import("@/components/portfolio/PortfolioMenu").then(
      (module) => module.PortfolioMenu,
    ),
  { ssr: false },
);

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type PortfolioHeaderProps = {
  overlay?: boolean;
};

export function PortfolioHeader({ overlay = false }: PortfolioHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const openChat = useCallback(() => {
    setMenuOpen(false);
    setChatOpen(true);
  }, []);
  const openMenu = useCallback(() => {
    setChatOpen(false);
    setMenuOpen(true);
  }, []);

  const fg = overlay ? "text-white" : "text-brutal-fg";
  const border = overlay ? "border-white/25" : "border-brutal-border";
  const muted = overlay ? "text-white/70" : "text-brutal-fg/60";
  const headerBorder = overlay ? "border-transparent" : "border-b border-brutal-border";

  const menuIcon = (
    <>
      <span className={`block h-px w-3.5 ${overlay ? "bg-white" : "bg-brutal-fg"}`} />
      <span className={`block h-px w-3 ${overlay ? "bg-white" : "bg-brutal-fg"}`} />
      <span className={`block h-px w-2 ${overlay ? "bg-white" : "bg-brutal-fg"}`} />
    </>
  );

  const menuButtonClass = `relative z-[220] flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1 rounded-full border sm:h-9 sm:w-9 ${border}`;

  return (
    <>
      <header
        className={`relative z-[210] flex shrink-0 items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-8 sm:py-5 lg:px-10 ${headerBorder}`}
      >
        <Link
          href="/"
          className={`${pinyonScript.className} shrink-0 text-xl leading-none sm:text-3xl ${overlay ? "text-white" : "text-brutal-fg"}`}
        >
          Sandy
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-3">
          <span
            className={`hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest md:inline-flex ${muted}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            1 active users
          </span>

          <button
            type="button"
            onClick={openChat}
            className={`shrink-0 rounded-full border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest transition-colors sm:px-3 sm:text-[10px] ${border} ${fg} ${overlay ? "hover:bg-white/10" : "hover:border-brutal-fg"}`}
          >
            Messages
          </button>

          <Link
            href="https://www.linkedin.com/in/sandipbhatta-dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`hidden items-center justify-center rounded-full border px-3 py-1.5 transition-colors md:inline-flex ${border} ${fg} ${overlay ? "hover:bg-white/10" : "hover:border-brutal-fg"}`}
          >
            <span className="ri-linkedin-fill text-base" aria-hidden />
          </Link>

          <Link
            href="https://github.com/sandip-dev-max"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`hidden h-8 w-8 items-center justify-center rounded-full border transition-colors sm:flex sm:h-9 sm:w-9 ${border} ${fg} ${overlay ? "hover:bg-white/10" : "hover:border-brutal-fg"}`}
          >
            <span className="ri-github-fill text-base" aria-hidden />
          </Link>

          {menuOpen ? (
            <button
              type="button"
              aria-label="Close menu"
              aria-expanded="true"
              onClick={closeMenu}
              className={menuButtonClass}
            >
              {menuIcon}
            </button>
          ) : (
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded="false"
              onClick={openMenu}
              className={menuButtonClass}
            >
              {menuIcon}
            </button>
          )}
        </div>
      </header>

      <PortfolioMenu open={menuOpen} onClose={closeMenu} />
      <PortfolioChat open={chatOpen} onClose={closeChat} />
    </>
  );
}
