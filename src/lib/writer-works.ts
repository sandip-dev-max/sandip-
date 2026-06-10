import { WRITER_POEMS, type WriterPoem } from "@/constants/writer-poems";
import { WRITER_STORIES, type WriterStory } from "@/constants/writer-stories";

export type WriterWorkKind = "poem" | "story";

export type WriterWorkRef = {
  slug: string;
  title: string;
  kind: WriterWorkKind;
};

export function getAllWriterWorks(): WriterWorkRef[] {
  const stories = WRITER_STORIES.map((story) => ({
    slug: story.slug,
    title: story.title,
    kind: "story" as const,
  }));
  const poems = WRITER_POEMS.map((poem) => ({
    slug: poem.slug,
    title: poem.title,
    kind: "poem" as const,
  }));

  return [...stories, ...poems];
}

export function getAllWriterSlugs(): string[] {
  return getAllWriterWorks().map((work) => work.slug);
}

export function getWriterPoemBySlug(slug: string): WriterPoem | undefined {
  return WRITER_POEMS.find((poem) => poem.slug === slug);
}

export function getWriterStoryBySlug(slug: string): WriterStory | undefined {
  return WRITER_STORIES.find((story) => story.slug === slug);
}

export function getWriterWorkKind(slug: string): WriterWorkKind | undefined {
  if (getWriterStoryBySlug(slug)) return "story";
  if (getWriterPoemBySlug(slug)) return "poem";
  return undefined;
}

export function getAdjacentWriterWorks(slug: string): {
  previous: WriterWorkRef | null;
  next: WriterWorkRef | null;
} {
  const works = getAllWriterWorks();
  const index = works.findIndex((work) => work.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? works[index - 1] : null,
    next: index < works.length - 1 ? works[index + 1] : null,
  };
}
