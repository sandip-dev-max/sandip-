import { WRITER_POEMS } from "@/constants/writer-poems";
import {
  SITE_BRAND_NAME,
  SITE_CONTACT_EMAIL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
  SITE_LOCATION,
} from "@/constants/site";

export const WRITER_SITE_TITLE = "The Writer's Desk";

export const WRITER_NAV = {
  location: SITE_LOCATION,
  menuLabel: "Menu",
  messagesLabel: "Messages",
  homeHref: "/",
  blogHref: "/blog",
} as const;

export const WRITER_HERO = {
  centerTitle: "All writing!",
  centerSubtitle:
    "Original poetry and prose — letters, stations, shadows, and the long walk home.",
  dragTip: "Tip! Drag sideways to navigate",
} as const;

export type WriterWorkItem = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
  isNew?: boolean;
};

export const WRITER_FEATURED_WORK: WriterWorkItem[] = WRITER_POEMS.map((poem) => ({
  id: poem.id,
  title: poem.title,
  excerpt: poem.excerpt,
  image: poem.image,
  imageAlt: poem.imageAlt,
  href: `/writer/${poem.slug}`,
  isNew: poem.isNew,
}));

export const WRITER_ABOUT = {
  upcomingLabel: "Latest poem",
  upcomingNote: "Fresh from the desk — a letter written in verse.",
  clickTip: "Tip! Click to read the full poem",
  upcomingTitle: "Mama — I will be gone",
  upcomingExcerpt:
    "A letter to a mother — crossing rivers, mountains, and the long distance between leaving and returning.",
  upcomingHref: "/writer/mama-i-will-be-gone",
  roles: ["Writer", "Design strategist", `Based in ${SITE_LOCATION}`],
  bioLead:
    "As a multidisciplinary freelancer, I believe the digital product must be an intelligent dialogue between the writer and the reader — clarity first, then rhythm, then surprise.",
  bioParagraphs: [
    "By day I shape interfaces, case studies, and product language. By night the desk turns toward verse — letters home, stations waited at, minds adrift in shadow. Both practices share the same rule: every line must earn its place.",
    "These poems are not polished for a syllabus. They are witness — to departure and return, to love at the edge of sanity, to standing still while the world rushes past. I write them the way I write code: revise until the feeling lands.",
  ],
  pullQuote: {
    text: "Mama don’t cry now , I will be there — in the warmth hug of yours.",
    source: "Mama — I will be gone",
    href: "/writer/mama-i-will-be-gone",
  },
  themes: [
    "Letters home",
    "Passenger stations",
    "Memory & shadow",
    "Love & sanity",
    "Departure",
    "Verse",
  ],
  indexLabel: "Selected works",
  selectedWorks: WRITER_POEMS.map((poem) => ({
    slug: poem.slug,
    title: poem.title,
    note: poem.excerpt,
  })),
  stampName: SITE_BRAND_NAME,
  stampDate: "Est. 2024",
} as const;

export const WRITER_INVERTED = {
  word: "Website",
} as const;

export const WRITER_STATEMENT = {
  lines: ["Think,", "Create", "Deliver"],
  bio: "A strong project is created by deep collaboration. I write the briefs, the interfaces, and the case studies — so the story and the system stay in the same voice.",
  ctaLabel: "All work",
  ctaHref: "/#work",
  portraitSrc: "/about-writing-hand.png",
  portraitAlt: "Illustrated hand writing with a pen",
  featureSrc: "/hero.png",
  featureAlt: "Yudeat in the mountains",
} as const;

export const WRITER_STATS = [
  { label: "Poems published", value: "4", suffix: "pieces" },
  { label: "Stanzas written", value: "24", suffix: "verses" },
  { label: "Letters home", value: "1", suffix: "to mama" },
  { label: "Stations stood", value: "1", suffix: "forever" },
] as const;

export const WRITER_PIXEL = {
  lineOne: "The",
  lineTwo: "Pixel",
  portraitSrc: "/about-creative-hero.png",
  portraitAlt: "Digital craft on screen",
  detailSrc: "/about-mountain.png",
  detailAlt: "Mountain light",
} as const;

export const WRITER_MARQUEE = {
  phrase: "Let's write something together",
  ctaLabel: "Email me",
  ctaHref: `mailto:${SITE_CONTACT_EMAIL}`,
} as const;

export const WRITER_FOOTER = {
  brand: SITE_BRAND_NAME,
  legal: "Legal",
  social: [
    { label: "LinkedIn", href: SITE_LINKEDIN_URL },
    { label: "GitHub", href: SITE_GITHUB_URL },
    { label: "Instagram", href: SITE_INSTAGRAM_URL },
    { label: "Blog", href: "/blog" },
  ],
} as const;

export const WRITER_MARQUEE_TICKER = [
  "Mama — I will be gone",
  "The Passenger Station",
  "Obsidian shadow's mind",
  "Love at Sanity",
  "Original poetry",
  "Letters in verse",
] as const;
