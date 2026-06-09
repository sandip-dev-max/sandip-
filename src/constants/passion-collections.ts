export type PassionCollectionLayout = "note" | "square" | "wide" | "tall";

export type PassionCollectionItem = {
  id: string;
  layout: PassionCollectionLayout;
  title?: string;
  description: string;
  caption?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
};

export type PassionCollection = {
  id: string;
  title: string;
  items: PassionCollectionItem[];
};

export const PASSION_COLLECTIONS: PassionCollection[] = [
  {
    id: "collections-mountains",
    title: "Obsession with mountains & light",
    items: [
      {
        id: "ridge-grid",
        layout: "note",
        caption: "Fig 9: Elevation lines from a valley field sketch",
        description:
          "Before I shoot, I draw quick horizon studies — spacing, weight, and where the eye should rest.",
      },
      {
        id: "misplaced-ridge",
        layout: "square",
        title: "Ridge Studies",
        description:
          "A personal series that isolates Himalayan ridgelines from context — only snow, rock, and negative space. The frame becomes the story.",
        imageSrc: "/about-mountain.png",
        imageAlt: "Snow-covered peaks rising above a cloud inversion",
        href: "/passion#chapter-3",
      },
      {
        id: "scroll-room",
        layout: "wide",
        title: "Scroll Rooms",
        description:
          "Experimental browser scenes where each scroll step opens a new room — part portfolio, part comic, part spatial essay about how we read interfaces.",
        imageSrc: "/about-creative-hero.png",
        imageAlt: "Laptop displaying a bold digital experience with warm lighting",
      },
      {
        id: "facades",
        layout: "tall",
        title: "Facades",
        description:
          "Photographing concrete, brick, and temple timber without perspective drama. Straight lines, honest materials, and the quiet geometry of Kathmandu alleys.",
        imageSrc: "/project3.png",
        imageAlt: "Industrial building facade with structured materials catalog",
      },
    ],
  },
  {
    id: "collections-design",
    title: "Obsession with design and space",
    items: [
      {
        id: "street-signs",
        layout: "tall",
        title: "Street Signs of Kathmandu",
        description:
          "Hand-painted shop boards, rusted wayfinding, and improvised typography on corrugated metal. A growing archive of urban vernacular.",
        imageSrc: "/hero.png",
        imageAlt: "Portrait with lake and mountains near Kathmandu",
        caption: "Field notes from Thamel to Patan",
      },
      {
        id: "blindsight",
        layout: "wide",
        title: "Night Interfaces",
        description:
          "Dark UI studies inspired by cinema — memory panels, glowing accents, and interfaces that feel like scenes instead of dashboards.",
        imageSrc: "/project1.png",
        imageAlt: "Education platform UI with dark cinematic panels",
      },
      {
        id: "form-field",
        layout: "wide",
        title: "Form & Field",
        description:
          "I collect visual rhymes. I photograph ordinary spaces and pair frames that complete each other — hills with grids, handwriting with wireframes.",
        imageSrc: "/about-writing-hand.png",
        imageAlt: "Illustrated hand writing with a pen",
      },
    ],
  },
];
