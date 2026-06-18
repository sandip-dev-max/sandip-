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
    image: "/web-design.png",
    imageAlt: "Web design — desktop monitor with interactive website layout",
  },
  {
    id: "video-editing",
    number: "002",
    title: "Video Editing",
    description:
      "Video editing to help you create professional and engaging videos.",
    image: "/video-editing.png",
    imageAlt: "Video editing — mobile trim, speed, and music controls",
  },
  {
    id: "development",
    number: "003",
    title: "Development",
    description:
      "Fast, scalable websites engineered for performance and growth  Next.js, type safe APIs, and production ready delivery.",
    image: "/development.png",
    imageAlt: "Development — glowing brain and light bulb innovation concept",
  },
  {
    id: "seo",
    number: "004",
    title: "SEO",
    description:
      "SEO services to help your website rank higher in search engines and attract more traffic.",
    image: "/seo.png",
    imageAlt: "SEO — search bar with colorful SEO lettering",
  },
  {
    id: "marketing",
    number: "005",
    title: "Marketing",
    description:
      "Conversion-focused pages, SEO foundations, and launch assets that help teams ship campaigns without friction.",
    image: "/marketing.jpg",
    imageAlt: "Marketing — digital advertising, SEO, and brand strategy illustration",
  },
  {
    id: "Videography",
    number: "006",
    title: "Videography",
    description:
      "Professional videography services to capture your story and bring it to life.",
    image: "/videography.jpg",
    imageAlt: "Videography — cinematic camera and lighting setup",
  },
];

/** Default highlighted service (matches reference layout). */
export const DEFAULT_SERVICE_INDEX = 2;
