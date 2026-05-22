type ProjectCardActionsProps = {
  liveUrl: string;
  githubUrl: string;
  variant?: "dark" | "light";
  className?: string;
};

export function ProjectCardActions({
  liveUrl,
  githubUrl,
  variant = "dark",
  className = "",
}: ProjectCardActionsProps) {
  const codeClass =
    variant === "dark"
      ? "border-white/90 text-white hover:bg-white hover:text-black"
      : "border-brutal-fg text-brutal-fg hover:bg-brutal-fg hover:text-brutal-bg";

  return (
    <div className={`relative z-30 flex flex-wrap items-center gap-2 ${className}`}>
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-30 inline-flex cursor-pointer items-center gap-2 bg-[#e63946] px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#d62839]"
      >
        View project
        <span className="ri-external-link-line text-sm leading-none" aria-hidden />
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-30 inline-flex cursor-pointer items-center gap-2 border bg-transparent px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-widest transition-colors ${codeClass}`}
      >
        Code
        <span className="ri-github-fill text-sm leading-none" aria-hidden />
      </a>
    </div>
  );
}
