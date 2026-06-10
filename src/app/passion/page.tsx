import type { Metadata } from "next";
import { PassionStoryExperience } from "@/components/passion/PassionStoryExperience";
import { SITE_BRAND_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: `Passion & Story — ${SITE_BRAND_NAME}`,
  description:
    "Born in Parbat, Nepal — mountaineering studies, high-altitude field work, and the story behind the craft.",
};

export default function PassionPage() {
  return <PassionStoryExperience />;
}
