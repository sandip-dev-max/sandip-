import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WriterPoemReader } from "@/components/writer/WriterPoemReader";
import { SITE_BRAND_NAME } from "@/constants/site";
import {
  getAllWriterPoems,
  getWriterPoemBySlug,
  getWriterPoemSlugs,
} from "@/lib/writer-poems";

type WriterPoemPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWriterPoemSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WriterPoemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const poem = getWriterPoemBySlug(slug);

  if (!poem) {
    return { title: `Poem not found — ${SITE_BRAND_NAME}` };
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

export default async function WriterPoemPage({ params }: WriterPoemPageProps) {
  const { slug } = await params;
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
