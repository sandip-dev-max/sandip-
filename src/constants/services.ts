export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const SERVICES: Service[] = [
  {
    id: "web-design",
    number: "001",
    title: "Web Design",
    description:
      "Interface systems, landing pages, and product UI — structured layouts with clear hierarchy and motion that feels intentional.",
    image: "/project4.png",
    imageAlt: "Web design — portfolio interface preview",
  },
  {
    id: "social-media",
    number: "002",
    title: "Social Media",
    description:
      "Campaign-ready visuals and scroll-stopping layouts built for feeds, stories, and brand consistency across platforms.",
    image: "/project2.png",
    imageAlt: "Social media — e-commerce brand layout",
  },
  {
    id: "development",
    number: "003",
    title: "Development",
    description:
      "Fast, scalable websites engineered for performance and growth — Next.js, type-safe APIs, and production-ready delivery.",
    image: "/hero.png",
    imageAlt: "Development — workspace with laptop in low light",
  },
  {
    id: "brand-identity",
    number: "004",
    title: "Brand Identity",
    description:
      "Visual direction, typography, and digital brand kits that translate cleanly from moodboard to live product.",
    image: "/project3.png",
    imageAlt: "Brand identity — industrial brand hero",
  },
  {
    id: "marketing",
    number: "005",
    title: "Marketing",
    description:
      "Conversion-focused pages, SEO foundations, and launch assets that help teams ship campaigns without friction.",
    image: "/project1.png",
    imageAlt: "Marketing — education platform landing",
  },
];

/** Default highlighted service (matches reference layout). */
export const DEFAULT_SERVICE_INDEX = 2;
