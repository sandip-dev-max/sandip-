import { PASSION_PROFILE } from "@/constants/passion-story";

export function PassionProfileIntro() {
  return (
    <section
      data-passion-profile
      className="passion-profile relative border-b border-brutal-fg/[0.07] py-10 sm:py-16 lg:py-20"
      aria-labelledby="passion-profile-heading"
    >
      <div className="mx-auto max-w-[96rem] px-0 sm:px-0 lg:px-10">
        <h2
          id="passion-profile-heading"
          data-story-reveal
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/45"
        >
          {PASSION_PROFILE.title}
        </h2>

        <div className="passion-profile-grid mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {PASSION_PROFILE.sections.map((section, index) => (
            <article
              key={section.label}
              data-story-reveal
              className="passion-profile-card border-t border-brutal-fg/12 pt-4 sm:pt-5"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-brutal-fg/40 sm:text-[10px] sm:tracking-[0.16em]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-sans text-[0.9375rem] font-semibold tracking-[-0.03em] text-brutal-fg sm:mt-3 sm:text-[1.125rem]">
                {section.label}
              </h3>
              <p className="mt-2 font-sans text-[0.8125rem] leading-[1.65] tracking-[-0.015em] text-brutal-fg/72 sm:mt-3 sm:text-[1rem] sm:leading-[1.72]">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
