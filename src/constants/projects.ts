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

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "SikhShyaNetra",
    description:
      "A complete school management platform with custom database architectures and multi-role user workflows.",
    image: "/sikshya.png",
    imageAlt: "SikhShyaNetra school management platform dashboard",
    tags: ["Education", "Management System", "Full Stack"],
    liveUrl: "https://github.com/sandip-dev-max",
    githubUrl: "https://github.com/sandip-dev-max",
    date: "2026",
  },
  {
    id: "02",
    title: "The Origin Tech",
    description:
      "Corporate technology website and business infrastructure for an engineering studio.",
    image: "/theorigintech.png",
    imageAlt: "The Origin Tech corporate website",
    tags: ["Corporate", "Business", "Web Development"],
    liveUrl: "https://theorigintech.com/",
    githubUrl: "https://github.com/sandip-dev-max",
    date: "2026",
  },
  {
    id: "03",
    title: "Pathibhara Job Link Solution",
    description:
      "Recruitment and manpower platform connecting talent to opportunities across Nepal.",
    image: "/pathibhara.png",
    imageAlt: "Pathibhara Job Link recruitment platform",
    tags: ["Recruitment", "Job Portal", "Marketplace"],
    liveUrl: "https://pathibharagroup.sandipbhatta477.workers.dev/",
    githubUrl: "https://github.com/sandip-dev-max",
    date: "2026",
  },
  {
    id: "04",
    title: "Naulo Mart",
    description:
      "Modern e-commerce shopping application with fluid, brand-led user interfaces.",
    image: "/naulomart.png",
    imageAlt: "Naulo Mart e-commerce platform",
    tags: ["E-commerce", "Retail", "Shopping"],
    liveUrl: "https://www.naulomart.com/",
    githubUrl: "https://github.com/sandip-dev-max",
    date: "2026",
  },
  {
    id: "05",
    title: "Explore",
    description:
      "A modern destination discovery platform designed to help users explore countries, cultures, and travel opportunities through immersive visuals and intuitive navigation.",
    image: "/explore.jpg",
    imageAlt: "Explore travel and destination discovery website",
    tags: ["Travel", "Tourism", "Web Platform"],
    liveUrl: "https://your-demo-link.com",
    githubUrl: "https://github.com/sandip-dev-max",
    date: "2026",
  },
  {
    id: "06",
    title: "RD Friendship Cafe",
    description:
      "A warm, brand-forward website for a local café featuring menu, ambience, and online presence.",
    image: "/rdfriendshipcafe.png",
    imageAlt: "RD Friendship Cafe branding website",
    tags: ["Hospitality", "Restaurant", "Branding"],
    liveUrl: "https://www.rdfriendshipcafe.com/",
    githubUrl: "https://github.com/sandip-dev-max",
    date: "2026",
  },
  {
    id: "07",
    title: "Everest Global Network",
    description:
      "Professional corporate website for a global consultancy firm, designed for authority and conversions.",
    image: "/everestglobalnetwork.png",
    imageAlt: "Everest Global Network corporate consultancy website",
    tags: ["Consultancy", "Corporate", "Business"],
    liveUrl: "https://everestglobalnetwork.com.np/",
    githubUrl: "https://github.com/sandip-dev-max",
    date: "2026",
  },
  {
  id: "07",
  title: "Nike Shoes",
  description:
    "A modern sneaker e-commerce website inspired by Nike, featuring immersive product showcases, smooth shopping experiences, and a bold, performance-driven design.",
  image: "/nike.jpg",
  imageAlt: "Nike-inspired sneaker e-commerce website",
  tags: ["E-Commerce", "Fashion", "Retail"],
  liveUrl: "https://your-demo-link.com",
  githubUrl: "https://github.com/sandip-dev-max",
  date: "2026",
},
];
