"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { PortfolioChat } from "@/components/portfolio/PortfolioChat";
import { WRITER_NAV } from "@/constants/writer";

const PortfolioMenu = dynamic(
  () =>
    import("@/components/portfolio/PortfolioMenu").then(
      (module) => module.PortfolioMenu,
    ),
  { ssr: false },
);

const ARIA_EXPANDED_TRUE = { "aria-expanded": "true" } as const;
const ARIA_EXPANDED_FALSE = { "aria-expanded": "false" } as const;

type WriterNavActionsProps = {
  variant?: "light" | "dark";
};

export function WriterNavActions({ variant = "light" }: WriterNavActionsProps) {
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

  const isDark = variant === "dark";

  return (
    <>
      <div className="writer-header-actions">
        <button
          type="button"
          className={`writer-header-messages${isDark ? " writer-header-messages--on-dark" : ""}`}
          onClick={openChat}
        >
          {WRITER_NAV.messagesLabel}
        </button>

        <button
          type="button"
          className={`writer-header-menu-btn${isDark ? " writer-header-menu-btn--on-dark" : ""}`}
          onClick={openMenu}
          {...(menuOpen ? ARIA_EXPANDED_TRUE : ARIA_EXPANDED_FALSE)}
          aria-label={WRITER_NAV.menuLabel}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <PortfolioMenu open={menuOpen} onClose={closeMenu} />
      <PortfolioChat open={chatOpen} onClose={closeChat} />
    </>
  );
}
