type BlogArticleBodyProps = {
  paragraphs: string[];
};

export function BlogArticleBody({ paragraphs }: BlogArticleBodyProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="font-sans text-[1.0625rem] leading-[1.75] tracking-[-0.015em] text-brutal-fg/85 not-first:mt-6"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
