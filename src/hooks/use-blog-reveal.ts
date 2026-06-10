import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { killScrollTriggersFor } from "@/lib/scroll-trigger";
import { scheduleRevealRefresh, setStoryVisible } from "@/lib/section-reveal";

type BlogRevealRefs = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useBlogReveal(
  refs: BlogRevealRefs,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      if (!section) return;

      killScrollTriggersFor(section);

      const ctx = gsap.context(() => {
        const headerItems = section.querySelectorAll("[data-blog-header]");
        const cards = section.querySelectorAll("[data-blog-card]");
        const cta = section.querySelector("[data-blog-cta]");

        if (reducedMotion) {
          setStoryVisible([headerItems, cards, cta]);
          return;
        }

        gsap.set(headerItems, { y: 32, opacity: 0 });
        gsap.set(cards, { y: 56, opacity: 0, scale: 0.97 });
        gsap.set(cta, { y: 20, opacity: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 38%",
            scrub: 0.48,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            headerItems,
            { y: 0, opacity: 1, duration: 0.18, stagger: 0.05, ease: "power3.out" },
            0,
          )
          .to(
            cards,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.22,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.1,
          )
          .to(
            cta,
            { y: 0, opacity: 1, duration: 0.14, ease: "power3.out" },
            0.28,
          );

        scheduleRevealRefresh();
      }, section);

      return () => ctx.revert();
    },
    {
      scope: refs.sectionRef,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  );
}
