import type { Metadata } from "next";
import { PassionStoryExperience } from "@/components/passion/PassionStoryExperience";
import { SITE_BRAND_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Passion & Story — ${SITE_BRAND_NAME}`,
  description:
    "The other half of what I make — photography, mountains, visual culture, and the story behind the work.",
};

export default function PassionPage() {
  return <PassionStoryExperience />;
}
