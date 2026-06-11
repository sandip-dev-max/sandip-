import { SERVICES } from "@/constants/services";
import { SITE_LOCATION } from "@/constants/site";

export type WorkCarouselCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const WORK_WITH_ME = {
  id: "work-with-me",
  eyebrow: "Work with me",
  headline: "Here's what I can do for you.",
  intro:
    "Freelance design and front-end development for brands, founders, and teams. I take projects from idea to a polished, fast site you can actually ship.",
  cards: SERVICES.map((service, index) => ({
    id: service.id,
    number: String(index + 1).padStart(2, "0"),
    title: service.title,
    description: service.description,
    image: service.image,
    imageAlt: service.imageAlt,
  })) satisfies WorkCarouselCard[],
  cta: {
    label: "Start a project",
    href: "/#contact",
  },
  location: SITE_LOCATION,
} as const;
