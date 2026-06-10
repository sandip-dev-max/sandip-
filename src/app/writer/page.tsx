import type { Metadata } from "next";
import { WriterExperience } from "@/components/writer/WriterExperience";
import { WRITER_SITE_TITLE } from "@/constants/writer";
import { SITE_BRAND_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `${WRITER_SITE_TITLE} — ${SITE_BRAND_NAME}`,
  description:
    "Original poetry and prose — Mama, The Passenger Station, Obsidian shadow's mind, and Love at Sanity.",
};

export default function WriterPage() {
  return <WriterExperience />;
}
