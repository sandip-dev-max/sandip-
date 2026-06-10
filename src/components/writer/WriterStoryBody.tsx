import type { WriterStoryChapter } from "@/constants/writer-stories";

type WriterStoryBodyProps = {
  chapters: WriterStoryChapter[];
};

export function WriterStoryBody({ chapters }: WriterStoryBodyProps) {
  return (
    <div className="writer-story-body">
      {chapters.map((chapter) => (
        <section
          key={chapter.number}
          id={`chapter-${chapter.number}`}
          className="writer-story-chapter"
          aria-labelledby={`chapter-${chapter.number}-title`}
        >
          <header className="writer-story-chapter-header">
            <p className="writer-story-chapter-label">
              Chapter {chapter.number}
              {chapter.status === "upcoming" ? (
                <span className="writer-story-chapter-badge">In progress</span>
              ) : null}
            </p>
            <h2
              id={`chapter-${chapter.number}-title`}
              className="writer-story-chapter-title"
            >
              {chapter.title}
            </h2>
          </header>

          {chapter.status === "upcoming" ? (
            <p className="writer-story-upcoming">
              Still to be written — this chapter is part of the ongoing draft.
            </p>
          ) : (
            <div className="writer-story-chapter-content">
              {chapter.blocks.map((block, blockIndex) => {
                if (block.kind === "verse") {
                  return (
                    <figure
                      key={blockIndex}
                      className="writer-story-verse"
                    >
                      {block.title ? (
                        <figcaption className="writer-story-verse-title">
                          {block.title}
                        </figcaption>
                      ) : null}
                      <blockquote className="writer-story-verse-lines">
                        {block.lines.map((line, lineIndex) =>
                          line ? (
                            <p key={lineIndex} className="writer-story-verse-line">
                              {line}
                            </p>
                          ) : (
                            <span
                              key={lineIndex}
                              className="writer-story-verse-break"
                              aria-hidden="true"
                            />
                          ),
                        )}
                      </blockquote>
                    </figure>
                  );
                }

                return (
                  <p key={blockIndex} className="writer-story-paragraph">
                    {block.text}
                  </p>
                );
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
