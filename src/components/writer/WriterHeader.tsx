"use client";

import Link from "next/link";
import { WriterNavActions } from "@/components/writer/WriterNavActions";
import { WRITER_NAV, WRITER_SITE_TITLE } from "@/constants/writer";

export function WriterHeader() {
  return (
    <header className="writer-header" data-writer-header>
      <p className="writer-header-location">{WRITER_NAV.location}</p>
      <Link href="/writer" className="writer-display writer-header-title">
        {WRITER_SITE_TITLE}
      </Link>
      <WriterNavActions />
    </header>
  );
}
