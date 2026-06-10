import Image from "next/image";
import Link from "next/link";
import { WRITER_STATEMENT } from "@/constants/writer";

export function WriterStatementSection() {
  return (
    <section
      className="writer-newspaper-grid writer-rule-x writer-statement"
      aria-label="Think create deliver"
    >
      <div className="writer-grid-cell writer-grid-cell--feature" data-writer-reveal>
        <div className="writer-media-frame relative aspect-square">
          <Image
            src={WRITER_STATEMENT.featureSrc}
            alt={WRITER_STATEMENT.featureAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover object-[center_68%]"
          />
        </div>
      </div>

      <div className="writer-grid-cell writer-grid-cell--statement" data-writer-reveal>
        <div className="writer-statement-lines">
          {WRITER_STATEMENT.lines.map((line) => (
            <p key={line} className="writer-line-mask">
              <span className="writer-statement-line" data-writer-line>
                {line}
              </span>
            </p>
          ))}
        </div>
        <p className="writer-dropcap writer-body-lg mt-8 max-w-lg">
          {WRITER_STATEMENT.bio}
        </p>
        <Link href={WRITER_STATEMENT.ctaHref} className="writer-cta-pill mt-8">
          {WRITER_STATEMENT.ctaLabel}
        </Link>
      </div>

      <div className="writer-grid-cell writer-grid-cell--statement-portrait" data-writer-reveal>
        <div className="writer-media-frame relative aspect-[3/4]">
          <Image
            src={WRITER_STATEMENT.portraitSrc}
            alt={WRITER_STATEMENT.portraitAlt}
            fill
            sizes="20vw"
            className="object-cover object-[center_72%]"
          />
        </div>
      </div>
    </section>
  );
}
