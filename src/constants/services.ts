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
      "Interface systems, landing pages, and product UI  structured layouts with clear hierarchy and motion that feels intentional.",
    image: "/project4.png",
    imageAlt: "Web design — portfolio interface preview",
  },
  {
    id: "video-editing",
    number: "002",
    title: "Video Editing",
    description:
      "Video editing to help you create professional and engaging videos.",
    image: "/project2.png",
    imageAlt: "Video editing — e-commerce brand layout",
  },
  {
    id: "development",
    number: "003",
    title: "Development",
    description:
      "Fast, scalable websites engineered for performance and growth  Next.js, type safe APIs, and production ready delivery.",
    image: "/hero.png",
    imageAlt: "Development — workspace with laptop in low light",
  },
  {
    id: "seo",
    number: "004",
    title: "SEO",
    description:
      "SEO services to help your website rank higher in search engines and attract more traffic.",
    image: "/project3.png",
    imageAlt: "SEO services  e-commerce brand layout",
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
  {
    id: "devops",
    number: "006",
    title: "DevOps",
    description:
      "DevOps services to help you deploy and manage your applications.",
    image: "/hero.png",
    imageAlt: "DevOps — education platform landing",
  },
];

/** Default highlighted service (matches reference layout). */
export const DEFAULT_SERVICE_INDEX = 2;
