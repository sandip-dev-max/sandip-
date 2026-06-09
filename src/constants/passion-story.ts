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

export const PASSION_PAGE_NAV: PassionNavItem[] = [
  { label: "Yudeat", sublabel: "Home", href: "/" },
  { label: "Work", sublabel: "Projects index", href: "/#work" },
  { label: "Passion", sublabel: "Story & craft", href: "/passion" },
  { label: "Field", sublabel: "Image archive", href: "/passion#image-field" },
  { label: "Journal", sublabel: "Writing", href: "/blog" },
  { label: "Mountains", sublabel: "Field notes", href: "/passion#collections-mountains" },
  { label: "Contact", sublabel: "Get in touch", href: "/#contact" },
];

export const PASSION_INTRO = {
  eyebrow: "Profession & passion",
  title: "The other half of what I make",
  subtitle:
    "Code pays the bills. Photography, mountains, and visual culture keep the work honest.",
};

export const PASSION_INTRO_PHOTOS = [
  {
    src: "/field/IMG_6730.jpg",
    alt: "Himalayan ridgeline above a cloud inversion",
  },
  {
    src: "/field/IMG_6711.jpg",
    alt: "Mountain light on a valley walk",
  },
  {
    src: "/field/IMG_6695.jpg",
    alt: "Field frame from a ridge study",
  },
] as const;

export const PASSION_CHAPTERS: PassionChapter[] = [
  {
    id: "chapter-1",
    number: "1.",
    paragraphs: [
      "I grew up in the Kathmandu Valley — a place where prayer flags, concrete terraces, and Himalayan ridgelines share the same horizon. My family was practical: study hard, build a stable life. I was practical too, but I kept noticing light.",
      "Architecture school sketches turned into late-night walks. I photographed doorways, staircases, and fog sitting low in the valley. I did not know it yet, but I was learning composition the way some people learn language — by listening first.",
    ],
    figures: [
      {
        id: "fig-1",
        type: "globe",
        caption: "Fig 1: Valley coordinates",
      },
      {
        id: "fig-2",
        type: "photo",
        caption: "Fig 2: Kathmandu mornings",
        imageSrc: "/field/IMG_6662.jpg",
        imageAlt: "Morning light in the Kathmandu valley",
      },
    ],
  },
  {
    id: "chapter-2",
    number: "2.",
    paragraphs: [
      "Design arrived as a discipline before code did. I loved grids, brutalist posters, and the tension between raw structure and human warmth. Typography felt like architecture you could read.",
      "When I started building interfaces, the same questions followed me: what should be loud, what should disappear, and how does someone feel five seconds after landing on a page?",
    ],
    figures: [
      {
        id: "fig-3",
        type: "clock",
        caption: "Fig 3: Learning in seasons",
      },
      {
        id: "fig-4",
        type: "screen",
        caption: "Fig 4: First shipped interface",
        imageSrc: "/project4.png",
        imageAlt: "Bold portfolio interface with expressive typography",
      },
    ],
  },
  {
    id: "chapter-3",
    number: "3.",
    paragraphs: [
      "Photography became my second profession — not because I chased weddings or stock libraries, but because walking with a camera slows me down. Mountains especially. They refuse fast aesthetics.",
      "Some of my favorite frames are ordinary: pine silhouettes, cloud inversions, a ridge line that looks like a blade. I chase clarity, not drama. The same instinct shows up when I design a product dashboard.",
    ],
    figures: [
      {
        id: "fig-5",
        type: "mountain",
        caption: "Fig 5: Field study",
        imageSrc: "/field/IMG_6730.jpg",
        imageAlt: "Snow peaks above a sea of clouds in the Himalayas",
      },
      {
        id: "fig-6",
        type: "photo",
        caption: "Fig 6: Distance & scale",
        imageSrc: "/field/IMG_6706.jpg",
        imageAlt: "Rolling hills and soft morning light",
      },
    ],
  },
  {
    id: "chapter-4",
    number: "4.",
    paragraphs: [
      "Today I work as a freelance designer and front-end developer for teams who want software that feels considered. Client work funds the craft. Personal projects and mountain trips refill the visual library.",
      "If you are here for the developer portfolio, you will find it on the home page. If you are here for the person behind it — this is the thread that ties the work together: storytelling, restraint, and a permanent curiosity about what happens just outside the frame.",
    ],
    figures: [
      {
        id: "fig-7",
        type: "studio",
        caption: "Fig 7: Studio practice",
      },
      {
        id: "fig-8",
        type: "screen",
        caption: "Fig 8: Systems in production",
        imageSrc: "/project2.png",
        imageAlt: "Wholesale marketplace interface with clean product layout",
      },
    ],
  },
];
