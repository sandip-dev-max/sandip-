import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WriterPoemReader } from "@/components/writer/WriterPoemReader";
import { WriterStoryReader } from "@/components/writer/WriterStoryReader";
import { SITE_BRAND_NAME } from "@/constants/site";
import {
  getAdjacentWriterWorks,
  getAllWriterSlugs,
  getWriterPoemBySlug,
  getWriterStoryBySlug,
  getWriterWorkKind,
} from "@/lib/writer-works";
import { getAllWriterPoems } from "@/lib/writer-poems";

type WriterWorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllWriterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WriterWorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const kind = getWriterWorkKind(slug);

  if (kind === "story") {
    const story = getWriterStoryBySlug(slug);
    if (!story) {
      return { title: `Work not found — ${SITE_BRAND_NAME}` };
    }

    return {
      title: `${story.title} — ${SITE_BRAND_NAME}`,
      description: story.excerpt,
      openGraph: {
        title: story.title,
        description: story.excerpt,
        images: [{ url: story.image, alt: story.imageAlt }],
      },
    };
  }

  const poem = getWriterPoemBySlug(slug);
  if (!poem) {
    return { title: `Work not found — ${SITE_BRAND_NAME}` };
  }

  return {
    title: `${poem.title} — ${SITE_BRAND_NAME}`,
    description: poem.excerpt,
    openGraph: {
      title: poem.title,
      description: poem.excerpt,
      images: [{ url: poem.image, alt: poem.imageAlt }],
    },
  };
}

export default async function WriterWorkPage({ params }: WriterWorkPageProps) {
  const { slug } = await params;
  const kind = getWriterWorkKind(slug);

  if (!kind) {
    notFound();
  }

  const { previous, next } = getAdjacentWriterWorks(slug);

  if (kind === "story") {
    const story = getWriterStoryBySlug(slug);
    if (!story) {
      notFound();
    }

    return (
      <WriterStoryReader
        story={story}
        previousWork={previous}
        nextWork={next}
      />
    );
  }

  const poem = getWriterPoemBySlug(slug);
  if (!poem) {
    notFound();
  }

  const allPoems = getAllWriterPoems();
  const currentIndex = allPoems.findIndex((item) => item.slug === slug);
  const previousPoem = currentIndex > 0 ? allPoems[currentIndex - 1] : null;
  const nextPoem =
    currentIndex < allPoems.length - 1 ? allPoems[currentIndex + 1] : null;

  return (
    <WriterPoemReader
      poem={poem}
      previousPoem={previousPoem}
      nextPoem={nextPoem}
    />
  );
}
