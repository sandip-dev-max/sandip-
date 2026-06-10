import Image from "next/image";
import Link from "next/link";
import { WRITER_ABOUT, WRITER_INVERTED } from "@/constants/writer";

export function WriterAboutSection() {
  return (
    <>
      <section id="about" className="writer-newspaper-grid writer-rule-x" aria-label="About the writer">
        <div
          className="writer-grid-cell writer-grid-cell--upcoming"
          data-writer-reveal
        >
          <p className="writer-eyebrow">{WRITER_ABOUT.upcomingLabel}</p>
          <p className="writer-body-sm mt-2">{WRITER_ABOUT.upcomingNote}</p>
          <p className="writer-work-tip mt-6">{WRITER_ABOUT.clickTip}</p>
          <Link href={WRITER_ABOUT.upcomingHref} className="writer-media-frame mt-8 block">
            <div className="relative aspect-[16/10]">
              <Image
                src="/about-creative-hero.png"
                alt="Featured writing preview"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </Link>
          <h3 className="writer-display writer-subhead mt-4">
            {WRITER_ABOUT.upcomingTitle}
          </h3>
          <p className="writer-body-sm mt-2">{WRITER_ABOUT.upcomingExcerpt}</p>
        </div>

        <div className="writer-grid-cell writer-grid-cell--roles" data-writer-reveal>
          <div className="space-y-1">
            {WRITER_ABOUT.roles.map((role) => (
              <p key={role} className="writer-role-line">
                {role}
              </p>
            ))}
          </div>
        </div>

        <div className="writer-grid-cell writer-grid-cell--stamp" data-writer-reveal>
          <div className="writer-stamp" data-writer-stamp>
            <div className="writer-stamp-sun" aria-hidden="true" />
            <p className="writer-display writer-stamp-name mt-4">
              {WRITER_ABOUT.stampName}
            </p>
            <p className="writer-stamp-meta mt-2">Name: {WRITER_ABOUT.stampName}</p>
            <p className="writer-stamp-meta">Date: {WRITER_ABOUT.stampDate}</p>
          </div>
        </div>

        <div className="writer-grid-cell writer-grid-cell--bio" data-writer-reveal>
          <div className="writer-bio-stack">
            <p className="writer-dropcap writer-body-lg">{WRITER_ABOUT.bioLead}</p>

            {WRITER_ABOUT.bioParagraphs.map((paragraph) => (
              <p key={paragraph} className="writer-body-lg writer-bio-paragraph">
                {paragraph}
              </p>
            ))}

            <blockquote className="writer-pull-quote">
              <p className="writer-pull-quote-text">“{WRITER_ABOUT.pullQuote.text}”</p>
              <footer className="writer-pull-quote-source">
                — from{" "}
                <Link href={WRITER_ABOUT.pullQuote.href} className="writer-pull-quote-link">
                  {WRITER_ABOUT.pullQuote.source}
                </Link>
              </footer>
            </blockquote>

            <div className="writer-theme-row">
              <p className="writer-eyebrow">Themes</p>
              <ul className="writer-theme-list" aria-label="Writing themes">
                {WRITER_ABOUT.themes.map((theme) => (
                  <li key={theme} className="writer-theme-chip">
                    {theme}
                  </li>
                ))}
              </ul>
            </div>

            <div className="writer-work-index">
              <p className="writer-eyebrow">{WRITER_ABOUT.indexLabel}</p>
              <ol className="writer-work-index-list">
                {WRITER_ABOUT.selectedWorks.map((work, index) => (
                  <li key={work.slug} className="writer-work-index-item">
                    <span className="writer-work-index-num" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="writer-work-index-copy">
                      <Link href={`/writer/${work.slug}`} className="writer-work-index-title">
                        {work.title}
                      </Link>
                      <p className="writer-work-index-note">{work.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="writer-grid-cell writer-grid-cell--portrait" data-writer-reveal>
          <div className="writer-media-frame writer-portrait-frame relative">
            <Image
              src="/about-writing-hand.png"
              alt="Writing by hand"
              fill
              sizes="25vw"
              className="object-cover object-[center_72%]"
            />
          </div>
          <p className="writer-portrait-caption">
            Ink, paper, and the long habit of putting feeling into form.
          </p>
        </div>
      </section>

      <div className="writer-inverted-band" data-writer-inverted>
        <p className="writer-display writer-inverted-word">{WRITER_INVERTED.word}</p>
      </div>
    </>
  );
}
