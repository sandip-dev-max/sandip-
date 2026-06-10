import { THE_LONG_LEGGED_BIRD_CHAPTERS } from "@/constants/writer-stories/the-long-legged-bird";

export type WriterStoryBlock =
  | { kind: "prose"; text: string }
  | { kind: "verse"; title?: string; lines: string[] };

export type WriterStoryChapter = {
  number: number;
  title: string;
  status: "published" | "upcoming";
  blocks: WriterStoryBlock[];
};

export type WriterStory = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  isNew?: boolean;
  isOngoing?: boolean;
  chapters: WriterStoryChapter[];
};

export const WRITER_STORIES: WriterStory[] = [
  {
    id: "story-long-legged-bird",
    slug: "the-long-legged-bird",
    title: "The Long Legged Bird",
    excerpt:
      "An ongoing novel — a long-legged bird, a puny god, Christ at tea, and a love named Maine told to a riverbank listener.",
    date: "June 10, 2026",
    publishedAt: "2026-06-10",
    image: "/about-mountain.png",
    imageAlt: "Mist over hills at dusk",
    isNew: true,
    isOngoing: true,
    chapters: THE_LONG_LEGGED_BIRD_CHAPTERS,
  },
];
