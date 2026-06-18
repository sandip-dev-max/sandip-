export type PassionNavItem = {
  label: string;
  sublabel: string;
  href: string;
};

export type PassionFigureType =
  | "globe"
  | "clock"
  | "photo"
  | "mountain"
  | "studio"
  | "screen";

export type PassionFigure = {
  id: string;
  type: PassionFigureType;
  caption: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type PassionChapter = {
  id: string;
  number: string;
  paragraphs: string[];
  figures: PassionFigure[];
};
export type PassionProfileSection = {
  label: string;
  body: string;
};

export const PASSION_PAGE_NAV: PassionNavItem[] = [
  { label: "Sandip", sublabel: "Home", href: "/" },
  { label: "Work", sublabel: "Selected projects", href: "/#work" },
  { label: "Passion", sublabel: "Beyond the screen", href: "/passion" },
  {
    label: "Gallery",
    sublabel: "Creative archive",
    href: "/passion#image-field",
  },
  { label: "Journal", sublabel: "Ideas & notes", href: "/blog" },
  { label: "Lifestyle", sublabel: "Interests", href: "/passion#collections" },
  { label: "Contact", sublabel: "Get in touch", href: "/#contact" },
];
export const PASSION_INTRO = {
  eyebrow: "Developer • Founder • Creative",
  title: "Building, creating, exploring",
  subtitle:
    "Code, fashion, business, and storytelling — different mediums, same curiosity.",
};
export const PASSION_PROFILE = {
  title: "Profile Introduction",
  sections: [
    {
      label: "Developer",
      body: "I enjoy turning ideas into digital products, focusing on clean interfaces and practical experiences.",
    },
    {
      label: "Founder",
      body: "Building projects and businesses has taught me that good products start with solving real problems.",
    },
    {
      label: "Creative",
      body: "Fashion, videography, and design influence the way I approach both technology and everyday life.",
    },
  ] satisfies PassionProfileSection[],
};
export const PASSION_INTRO_PHOTOS = [
  { src: "/field/creative.jpeg", alt: "Creative lifestyle frame" },
  { src: "/field/hera.jpeg", alt: "Street and fashion inspiration" },
  { src: "/field/photo3.jpeg", alt: "Daily creative moments" },
] as const;
export const PASSION_CHAPTERS: PassionChapter[] = [
  {
    id: "chapter-1",
    number: "1.",
    paragraphs: [
      "Development is my main craft. I enjoy building products that combine thoughtful design with reliable functionality.",
      "Every project is a chance to learn something new, whether it's creating better user experiences or solving technical challenges.",
    ],
    figures: [
      { id: "fig-1", type: "globe", caption: "Fig 1: Building digitally" },
      {
        id: "fig-2",
        type: "screen",
        caption: "Fig 2: Products in progress",
        imageSrc: "/explore.jpg",
        imageAlt: "Modern web project",
      },
    ],
  },
  {
    id: "chapter-2",
    number: "2.",
    paragraphs: [
      "Entrepreneurship keeps me curious. I enjoy exploring ideas, launching projects, and understanding how brands grow.",
      "Creating something from scratch is challenging, but seeing an idea become real is always worth the process.",
    ],
    figures: [
      { id: "fig-3", type: "clock", caption: "Fig 3: Building over time" },
      { id: "fig-4", type: "studio", caption: "Fig 4: Founder mindset" },
    ],
  },
  {
    id: "chapter-3",
    number: "3.",
    paragraphs: [
      "Outside of work, I'm drawn to fashion and videography. I appreciate good styling, clean aesthetics, and visual storytelling.",
      "Capturing moments through a camera and experimenting with different looks inspires many of my creative decisions.",
    ],
    figures: [
      {
        id: "fig-5",
        type: "photo",
        caption: "Fig 5: Style & visuals",
        imageSrc: "/yupppa.jpg",
        imageAlt: "Creative photography",
      },
      {
        id: "fig-6",
        type: "photo",
        caption: "Fig 6: Everyday inspiration",
        imageSrc: "/fashion.jpeg",
        imageAlt: "Lifestyle photography",
      },
    ],
  },
  {
    id: "chapter-4",
    number: "4.",
    paragraphs: [
      "For me, technology and creativity aren't separate worlds. Design influences code, business shapes products, and storytelling connects everything together.",
      "This space is simply a collection of the things I enjoy building, creating, and exploring along the way.",
    ],
    figures: [
      { id: "fig-7", type: "studio", caption: "Fig 7: Creative process" },
      {
        id: "fig-8",
        type: "screen",
        caption: "Fig 8: Always building",
        imageSrc: "/nike.jpg",
        imageAlt: "Creative digital work",
      },
    ],
  },
];
