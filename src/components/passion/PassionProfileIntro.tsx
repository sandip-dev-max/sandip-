import { PASSION_PROFILE } from "@/constants/passion-story";

export function PassionProfileIntro() {
  return (
    <section
      data-passion-profile
      className="passion-profile relative border-b border-brutal-fg/[0.07] py-14 sm:py-16 lg:py-20"
      aria-labelledby="passion-profile-heading"
    >
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
        <h2
          id="passion-profile-heading"
          data-story-reveal
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-brutal-fg/45"
        >
          {PASSION_PROFILE.title}
        </h2>

        <div className="passion-profile-grid mt-10 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {PASSION_PROFILE.sections.map((section, index) => (
            <article
              key={section.label}
              data-story-reveal
              className="passion-profile-card border-t border-brutal-fg/12 pt-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brutal-fg/40">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-sans text-[1.125rem] font-semibold tracking-[-0.03em] text-brutal-fg">
                {section.label}
              </h3>
              <p className="mt-3 font-sans text-[1rem] leading-[1.72] tracking-[-0.015em] text-brutal-fg/72">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
