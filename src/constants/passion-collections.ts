export type EditorialLayout = "note" | "square" | "wide" | "tall";

export type EditorialItem = {
  id: string;
  layout: EditorialLayout;
  title?: string;
  description: string;
  caption?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
};

export type EditorialCollection = {
  id: string;
  title: string;
  items: EditorialItem[];
};

export const PASSION_COLLECTIONS: EditorialCollection[] = [
  {
    id: "collections-fashion",
    title: "Obsession with fashion & identity",
    items: [
      {
        id: "street-style-notes",
        layout: "note",
        caption: "Fig 9: Everyday style observations",
        description:
          "I study how people dress in real environments — layering, color balance, and confidence in simple outfits.",
      },
      {
        id: "minimal-aesthetic",
        layout: "square",
        title: "Minimal Aesthetic",
        description:
          "A personal focus on clean silhouettes, neutral tones, and structured fits. Less noise, more presence.",
        imageSrc: "/min.jpeg",
        imageAlt: "Minimal fashion aesthetic styling",
        href: "/passion#chapter-3",
      },
      {
        id: "photography-mood",
        layout: "wide",
        title: "Fashion Photography",
        description:
          "Short-form visual experiments capturing movement, fabric flow, and cinematic lighting inspired by street culture and modern brands.",
        imageSrc: "/max.jpeg",
        imageAlt: "Cinematic fashion photography frame",
      },
      {
        id: "urban-fit-stories",
        layout: "tall",
        title: "Urban Fit Stories",
        description:
          "Every outfit is a narrative — captured in Kathmandu streets, where culture, weather, and mood shape personal style.",
        imageSrc: "/minimal.jpeg",
        imageAlt: "Street fashion in urban Kathmandu environment",
      },
    ],
  },

  {
    id: "collections-creative-lens",
    title: "Obsession with visuals & storytelling",
    items: [
      {
        id: "fashion-signage",
        layout: "tall",
        title: "Visual Identity in Streets",
        description:
          "Typography, posters, shopfronts — I look at how visual communication in public spaces influences modern branding and fashion identity.",
        imageSrc: "/field/IMG_6659.jpg",
        imageAlt: "Street typography and visual culture",
        caption: "Found design language in real environments",
      },
      {
        id: "cinematic-ui",
        layout: "wide",
        title: "Cinematic Interfaces",
        description:
          "UI inspired by fashion films and editorial shoots — dark tones, bold contrast, and storytelling through layout rhythm.",
        imageSrc: "/explore.jpg",
        imageAlt: "Cinematic digital interface design",
      },
      // {
      //   id: "style-fragments",
      //   layout: "wide",
      //   title: "Fragments of Style",
      //   description:
      //     "I don’t just capture outfits — I capture fragments: hands adjusting sleeves, shadows on fabric, movement between frames.",
      //   imageSrc: "/field/IMG_6704.jpg",
      //   imageAlt: "Fashion detail and movement study",
      // },
    ],
  },
];
