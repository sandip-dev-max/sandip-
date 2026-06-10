"use client";

import Link from "next/link";
import { useRef } from "react";
import { WriterAboutSection } from "@/components/writer/WriterAboutSection";
import { WriterFooter } from "@/components/writer/WriterFooter";
import { WriterMarqueeSection } from "@/components/writer/WriterMarqueeSection";
import { WriterPixelSection } from "@/components/writer/WriterPixelSection";
import { WriterStatementSection } from "@/components/writer/WriterStatementSection";
import { WriterStatsSection } from "@/components/writer/WriterStatsSection";
import { WriterWorkStrip } from "@/components/writer/WriterWorkStrip";
import { WRITER_NAV, WRITER_SITE_TITLE } from "@/constants/writer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWriterPageMotion } from "@/hooks/use-writer-page-motion";

export function WriterExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useWriterPageMotion(rootRef, reducedMotion);

  return (
    <div ref={rootRef} className="writer-experience">
      <div className="writer-vignette" aria-hidden="true" />

      <header className="writer-header" data-writer-header>
        <p className="writer-header-location">{WRITER_NAV.location}</p>
        <Link href="/" className="writer-display writer-header-title">
          {WRITER_SITE_TITLE}
        </Link>
        <Link
          href={WRITER_NAV.homeHref}
          className="writer-header-menu"
          aria-label="Back to main portfolio"
        >
          <span />
          <span />
        </Link>
      </header>

      <WriterWorkStrip />
      <WriterAboutSection />
      <WriterStatementSection />
      <WriterStatsSection />
      <WriterPixelSection />
      <WriterMarqueeSection />
      <WriterFooter />
    </div>
  );
}
