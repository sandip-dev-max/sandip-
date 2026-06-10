"use client";

import { useRef } from "react";
import { WriterAboutSection } from "@/components/writer/WriterAboutSection";
import { WriterHeader } from "@/components/writer/WriterHeader";
import { WriterFooter } from "@/components/writer/WriterFooter";
import { WriterMarqueeSection } from "@/components/writer/WriterMarqueeSection";
import { WriterPixelSection } from "@/components/writer/WriterPixelSection";
import { WriterStatementSection } from "@/components/writer/WriterStatementSection";
import { WriterStatsSection } from "@/components/writer/WriterStatsSection";
import { WriterWorkStrip } from "@/components/writer/WriterWorkStrip";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWriterPageMotion } from "@/hooks/use-writer-page-motion";

export function WriterExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useWriterPageMotion(rootRef, reducedMotion);

  return (
    <div ref={rootRef} className="writer-experience">
      <div className="writer-vignette" aria-hidden="true" />

      <WriterHeader />

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
