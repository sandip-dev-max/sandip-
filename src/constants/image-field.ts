export const IMAGE_FIELD_TAGS = [
  "all",
  "landscape",
  "portrait",
  "ui",
  "mountains",
  "illustration",
  "archive",
] as const;

export type ImageFieldTag = (typeof IMAGE_FIELD_TAGS)[number];

export type ImageFieldDepth = "surface" | "inner";

export type ImageFieldItem = {
  id: string;
  src: string;
  alt: string;
  tags: Exclude<ImageFieldTag, "all">[];
  slot: string;
  depth?: ImageFieldDepth;
};

export const IMAGE_FIELD_BRAND = "Yudeat";

export const IMAGE_FIELD_ITEMS: ImageFieldItem[] = [
  {
    id: "hero-portrait",
    src: "/hero.png",
    alt: "Portrait in front of lake and mountains",
    tags: ["portrait", "landscape", "archive"],
    slot: "field-slot-a",
  },
  {
    id: "mountain-ridge",
    src: "/about-mountain.png",
    alt: "Himalayan peaks above clouds",
    tags: ["mountains", "landscape"],
    slot: "field-slot-b",
  },
  {
    id: "hills-light",
    src: "/who-we-are-collab-bg.png",
    alt: "Soft hills in morning light",
    tags: ["landscape", "mountains"],
    slot: "field-slot-c",
  },
  {
    id: "writing-hand",
    src: "/about-writing-hand.png",
    alt: "Illustrated hand writing with a pen",
    tags: ["illustration", "archive"],
    slot: "field-slot-d",
  },
  {
    id: "creative-hero",
    src: "/about-creative-hero.png",
    alt: "Laptop with bold digital experience design",
    tags: ["ui", "archive"],
    slot: "field-slot-e",
  },
  {
    id: "project-edu",
    src: "/project1.png",
    alt: "Education platform interface",
    tags: ["ui"],
    slot: "field-slot-f",
  },
  {
    id: "project-market",
    src: "/project2.png",
    alt: "Wholesale marketplace UI",
    tags: ["ui"],
    slot: "field-slot-g",
  },
  {
    id: "project-industrial",
    src: "/project3.png",
    alt: "Industrial brand web interface",
    tags: ["ui", "landscape"],
    slot: "field-slot-h",
  },
  {
    id: "project-portfolio",
    src: "/project4.png",
    alt: "Portfolio with expressive typography",
    tags: ["ui", "archive"],
    slot: "field-slot-i",
  },
  {
    id: "dock-mark",
    src: "/dock-mark.png",
    alt: "Mountain mark icon",
    tags: ["mountains", "illustration", "archive"],
    slot: "field-slot-j",
  },
  {
    id: "bg-texture",
    src: "/bg.png",
    alt: "Abstract colorful texture",
    tags: ["landscape", "archive"],
    slot: "field-slot-k",
  },
  {
    id: "hero-crop",
    src: "/hero.png",
    alt: "Cropped portrait study",
    tags: ["portrait"],
    slot: "field-slot-l",
  },
];

/** Revealed at the center as the dive zooms in — surrounds the viewer. */
export const IMAGE_FIELD_INNER_ITEMS: ImageFieldItem[] = [
  {
    id: "inner-mountain",
    src: "/about-mountain.png",
    alt: "Mountain peak close view",
    tags: ["mountains"],
    slot: "field-inner-a",
    depth: "inner",
  },
  {
    id: "inner-hero",
    src: "/hero.png",
    alt: "Portrait in the inner ring",
    tags: ["portrait"],
    slot: "field-inner-b",
    depth: "inner",
  },
  {
    id: "inner-writing",
    src: "/about-writing-hand.png",
    alt: "Writing hand in the inner ring",
    tags: ["illustration"],
    slot: "field-inner-c",
    depth: "inner",
  },
  {
    id: "inner-creative",
    src: "/about-creative-hero.png",
    alt: "Creative screen in the inner ring",
    tags: ["ui"],
    slot: "field-inner-d",
    depth: "inner",
  },
  {
    id: "inner-hills",
    src: "/who-we-are-collab-bg.png",
    alt: "Hills in the inner ring",
    tags: ["landscape"],
    slot: "field-inner-e",
    depth: "inner",
  },
  {
    id: "inner-project",
    src: "/project4.png",
    alt: "Portfolio UI in the inner ring",
    tags: ["ui"],
    slot: "field-inner-f",
    depth: "inner",
  },
  {
    id: "inner-mark",
    src: "/dock-mark.png",
    alt: "Mountain mark in the inner ring",
    tags: ["mountains"],
    slot: "field-inner-g",
    depth: "inner",
  },
  {
    id: "inner-texture",
    src: "/bg.png",
    alt: "Color texture in the inner ring",
    tags: ["archive"],
    slot: "field-inner-h",
    depth: "inner",
  },
];
