export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  date?: string;
};

/** Update liveUrl / githubUrl with your deployed sites and repos. */
export const PROJECTS: Project[] = [
  {
    id: "2",
    title: "Kachu Kart",
    description:
      "B2B e-commerce storefront with catalog flows, Redux state, and a product-first layout tuned for wholesale buyers.",
    image: "/project2.png",
    imageAlt: "Kachu Kart — B2B e-commerce About Us page",
    tags: ["Redux", "Tailwind"],
    liveUrl: "https://demo-chi-lilac-49.vercel.app/",
    githubUrl: "https://github.com/yudeat",
    date: "July 10, 2025",
  },
  {
    id: "1",
    title: "Exile Platform",
    description:
      "A dark education OS with structured learning paths, role-based access, and a calm interface built for long study sessions.",
    image: "/project1.png",
    imageAlt: "Exile Platform — dark education OS landing page",
    tags: ["NextJS", "Prisma"],
    liveUrl: "https://exileos.com",
    githubUrl: "https://github.com/Yudeat/Liminal",
    date: "November 11, 2025",
  },
  {
    id: "3",
    title: "Steel Wood Nepal",
    description:
      "Industrial materials brand site focused on SEO, fast loads, and clear service storytelling for construction partners.",
    image: "/project3.png",
    imageAlt: "Steel Wood Nepal — industrial materials hero section",
    tags: ["SEO", "NextJS"],
    liveUrl: "https://steelwoodnepal.com",
    githubUrl: "https://github.com/Yudeat/pratice",
    date: "May 10, 2025",
  },
  {
    id: "4",
    title: "Portfolio",
    description:
      "A motion-led developer portfolio with GSAP scroll choreography, brutal layout, and a gallery reveal tied to scroll.",
    image: "/project4.png",
    imageAlt:
      "Creative developer portfolio — red brutalist hero with GSAP motion",
    tags: ["GSAP", "Tailwind", "Next.js"],
    liveUrl: "https://predeepchy.vercel.app/",
    githubUrl: "https://github.com/Yudeat/Portfolios",
    date: "April 10, 2025",
  },
];
