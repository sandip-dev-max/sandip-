import { Pinyon_Script } from "next/font/google";
import Link from "next/link";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type PortfolioHeaderProps = {
  overlay?: boolean;
};

export function PortfolioHeader({ overlay = false }: PortfolioHeaderProps) {
  const fg = overlay ? "text-white" : "text-brutal-fg";
  const border = overlay ? "border-white/25" : "border-brutal-border";
  const muted = overlay ? "text-white/70" : "text-brutal-fg/60";
  const headerBorder = overlay ? "border-transparent" : "border-b border-brutal-border";

  return (
    <header
      className={`relative z-30 flex shrink-0 items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5 lg:px-10 ${headerBorder}`}
    >
      <span
        className={`${pinyonScript.className} text-2xl leading-none sm:text-3xl ${overlay ? "text-white" : "text-brutal-fg"}`}
      >
        Yudeat
      </span>

      <div className="flex items-center gap-2 sm:gap-3">
        <span
          className={`hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest md:inline-flex ${muted}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          1 active users
        </span>

        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${border} ${fg} ${overlay ? "hover:bg-white/10" : "hover:border-brutal-fg"}`}
        >
          Messages
        </button>

        <Link
          href="https://www.linkedin.com/in/yudeat/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={`hidden items-center justify-center rounded-full border px-3 py-1.5 transition-colors sm:inline-flex ${border} ${fg} ${overlay ? "hover:bg-white/10" : "hover:border-brutal-fg"}`}
        >
          <span className="ri-linkedin-fill text-base" aria-hidden />
        </Link>

        <Link
          href="https://github.com/yudeat"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors sm:h-9 sm:w-9 ${border} ${fg} ${overlay ? "hover:bg-white/10" : "hover:border-brutal-fg"}`}
        >
          <span className="ri-github-fill text-base" aria-hidden />
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          className={`flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-full border sm:h-9 sm:w-9 ${border}`}
        >
          <span className={`block h-px w-3.5 ${overlay ? "bg-white" : "bg-brutal-fg"}`} />
          <span className={`block h-px w-3 ${overlay ? "bg-white" : "bg-brutal-fg"}`} />
          <span className={`block h-px w-2 ${overlay ? "bg-white" : "bg-brutal-fg"}`} />
        </button>
      </div>
    </header>
  );
}
