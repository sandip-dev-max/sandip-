import { WRITER_POEMS, type WriterPoem } from "@/constants/writer-poems";

export function getAllWriterPoems(): WriterPoem[] {
  return WRITER_POEMS;
}

export function getWriterPoemSlugs(): string[] {
  return WRITER_POEMS.map((poem) => poem.slug);
}

export function getWriterPoemBySlug(slug: string): WriterPoem | undefined {
  return WRITER_POEMS.find((poem) => poem.slug === slug);
}

export function getRelatedWriterPoems(slug: string, limit = 2): WriterPoem[] {
  return WRITER_POEMS.filter((poem) => poem.slug !== slug).slice(0, limit);
}
