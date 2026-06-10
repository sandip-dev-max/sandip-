import Link from "next/link";
import type { WriterStory } from "@/constants/writer-stories";
import type { WriterWorkRef } from "@/lib/writer-works";
import { WriterNavActions } from "@/components/writer/WriterNavActions";
import { WriterStoryBody } from "@/components/writer/WriterStoryBody";
import { WRITER_SITE_TITLE } from "@/constants/writer";

type WriterStoryReaderProps = {
  story: WriterStory;
  previousWork: WriterWorkRef | null;
  nextWork: WriterWorkRef | null;
};

export function WriterStoryReader({
  story,
  previousWork,
  nextWork,
}: WriterStoryReaderProps) {
  const publishedChapters = story.chapters.filter(
    (chapter) => chapter.status === "published",
  );

  return (
    <div className="writer-poem-reader writer-story-reader">
      <header className="writer-poem-header">
        <div className="writer-poem-header-row">
          <Link href="/writer" className="writer-poem-back">
            <span aria-hidden="true">←</span>
            {WRITER_SITE_TITLE}
          </Link>
          <WriterNavActions variant="dark" />
        </div>
        <time className="writer-poem-date" dateTime={story.publishedAt}>
          {story.date}
          {story.isOngoing ? (
            <span className="writer-story-ongoing"> · Ongoing</span>
          ) : null}
        </time>
        <h1 className="writer-display writer-poem-title">{story.title}</h1>
        <p className="writer-story-deck">{story.excerpt}</p>

        {publishedChapters.length > 1 ? (
          <nav className="writer-story-toc" aria-label="Chapters">
            {story.chapters.map((chapter) => (
              <a
                key={chapter.number}
                href={`#chapter-${chapter.number}`}
                className={`writer-story-toc-link${
                  chapter.status === "upcoming"
                    ? " writer-story-toc-link--upcoming"
                    : ""
                }`}
              >
                <span className="writer-story-toc-num">
                  {String(chapter.number).padStart(2, "0")}
                </span>
                <span>{chapter.title}</span>
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <article className="writer-poem-article writer-story-article">
        <WriterStoryBody chapters={story.chapters} />
      </article>

      <nav className="writer-poem-nav" aria-label="Work navigation">
        {previousWork ? (
          <Link
            href={`/writer/${previousWork.slug}`}
            className="writer-poem-nav-link"
          >
            <span className="writer-poem-nav-label">Previous</span>
            <span className="writer-poem-nav-title">{previousWork.title}</span>
          </Link>
        ) : (
          <span />
        )}

        {nextWork ? (
          <Link
            href={`/writer/${nextWork.slug}`}
            className="writer-poem-nav-link writer-poem-nav-link--next"
          >
            <span className="writer-poem-nav-label">Next</span>
            <span className="writer-poem-nav-title">{nextWork.title}</span>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
