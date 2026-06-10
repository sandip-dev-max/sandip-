import { SITE_LOCATION } from "@/constants/site";

export type WorkOffering = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const WORK_WITH_US = {
  eyebrow: "Work with me",
  headline: "Here's what I can do for you.",
  intro:
    "Freelance design and front-end development for brands, founders, and teams. I take projects from idea to a polished, fast site you can actually ship.",
  offerings: [
    {
      id: "web-design",
      number: "01",
      title: "Web Design",
      description:
        "Landing pages, portfolios, and product UI with clear hierarchy, strong typography, and motion that supports the story.",
    },
    {
      id: "development",
      number: "02",
      title: "Development",
      description:
        "Next.js builds that are type-safe, responsive, and production-ready — scroll stories, galleries, and interactive sections included.",
    },
    {
      id: "video-editing",
      number: "03",
      title: "Video Editing",
      description:
        "Edits for brand films, social content, and launch reels — paced, polished, and ready to publish.",
    },
    {
      id: "seo-marketing",
      number: "04",
      title: "SEO & Marketing",
      description:
        "SEO foundations, launch pages, and campaign assets so your site ranks, converts, and ships on deadline.",
    },
  ] satisfies WorkOffering[],
  cta: {
    label: "Start a project",
    href: "/#contact",
  },
  location: SITE_LOCATION,
} as const;
