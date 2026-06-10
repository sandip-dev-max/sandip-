import Link from "next/link";
import type { WriterPoem } from "@/constants/writer-poems";
import { WriterPoemBody } from "@/components/writer/WriterPoemBody";
import { WRITER_SITE_TITLE } from "@/constants/writer";

type WriterPoemReaderProps = {
  poem: WriterPoem;
  previousPoem: WriterPoem | null;
  nextPoem: WriterPoem | null;
};

export function WriterPoemReader({
  poem,
  previousPoem,
  nextPoem,
}: WriterPoemReaderProps) {
  return (
    <div className="writer-poem-reader">
      <header className="writer-poem-header">
        <Link href="/writer" className="writer-poem-back">
          <span aria-hidden="true">←</span>
          {WRITER_SITE_TITLE}
        </Link>
        <time className="writer-poem-date" dateTime={poem.publishedAt}>
          {poem.date}
        </time>
        <h1 className="writer-display writer-poem-title">{poem.title}</h1>
      </header>

      <article className="writer-poem-article">
        <WriterPoemBody stanzas={poem.stanzas} />
      </article>

      <nav className="writer-poem-nav" aria-label="Poem navigation">
        {previousPoem ? (
          <Link href={`/writer/${previousPoem.slug}`} className="writer-poem-nav-link">
            <span className="writer-poem-nav-label">Previous</span>
            <span className="writer-poem-nav-title">{previousPoem.title}</span>
          </Link>
        ) : (
          <span />
        )}

        {nextPoem ? (
          <Link
            href={`/writer/${nextPoem.slug}`}
            className="writer-poem-nav-link writer-poem-nav-link--next"
          >
            <span className="writer-poem-nav-label">Next</span>
            <span className="writer-poem-nav-title">{nextPoem.title}</span>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
