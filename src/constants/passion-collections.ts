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
        imageSrc: "/field/IMG_6730.jpg",
        imageAlt: "Snow-covered peaks rising above a cloud inversion",
        href: "/passion#chapter-3",
      },
      {
        id: "scroll-room",
        layout: "wide",
        title: "Scroll Rooms",
        description:
          "Experimental browser scenes where each scroll step opens a new room — part portfolio, part comic, part spatial essay about how we read interfaces.",
        imageSrc: "/field/IMG_6689.jpg",
        imageAlt: "Warm light across a mountain landscape",
      },
      {
        id: "facades",
        layout: "tall",
        title: "Facades",
        description:
          "Photographing concrete, brick, and temple timber without perspective drama. Straight lines, honest materials, and the quiet geometry of Kathmandu alleys.",
        imageSrc: "/field/IMG_6664.jpg",
        imageAlt: "Concrete and timber geometry in Kathmandu alleys",
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
        imageSrc: "/field/IMG_6659.jpg",
        imageAlt: "Street typography and urban vernacular in Kathmandu",
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
        imageSrc: "/field/IMG_6704.jpg",
        imageAlt: "Field frame pairing landscape with visual rhythm",
      },
    ],
  },
];
