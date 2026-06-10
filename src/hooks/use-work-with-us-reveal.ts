import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { killScrollTriggersFor } from "@/lib/scroll-trigger";
import { scheduleRevealRefresh, setStoryVisible } from "@/lib/section-reveal";

type WorkWithUsRevealRefs = {
  sectionRef: RefObject<HTMLElement | null>;
};

const REVEAL_TARGETS = [
  "[data-wwu-header]",
  "[data-wwu-intro]",
  "[data-wwu-board]",
  "[data-wwu-offering]",
  "[data-wwu-footer]",
] as const;

export function useWorkWithUsReveal(
  refs: WorkWithUsRevealRefs,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      if (!section) return;

      killScrollTriggersFor(section);

      const ctx = gsap.context(() => {
        const header = section.querySelector("[data-wwu-header]");
        const intro = section.querySelector("[data-wwu-intro]");
        const board = section.querySelector("[data-wwu-board]");
        const offerings = section.querySelectorAll<HTMLElement>("[data-wwu-offering]");
        const footer = section.querySelector("[data-wwu-footer]");

        if (reducedMotion) {
          const allTargets = REVEAL_TARGETS.flatMap((selector) =>
            Array.from(section.querySelectorAll(selector)),
          );
          setStoryVisible(allTargets);
          return;
        }

        gsap.set(header, { y: 28, opacity: 0 });
        gsap.set(intro, { y: 20, opacity: 0 });
        gsap.set(board, { y: 40, opacity: 0 });
        gsap.set(offerings, { y: 24, opacity: 0 });
        gsap.set(footer, { y: 16, opacity: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "top 35%",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(header, { y: 0, opacity: 1, duration: 0.12, ease: "power3.out" }, 0)
          .to(intro, { y: 0, opacity: 1, duration: 0.1, ease: "power3.out" }, 0.06)
          .to(board, { y: 0, opacity: 1, duration: 0.14, ease: "power3.out" }, 0.1)
          .to(
            offerings,
            {
              y: 0,
              opacity: 1,
              duration: 0.12,
              stagger: 0.05,
              ease: "power3.out",
            },
            0.18,
          )
          .to(footer, { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" }, 0.34);

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
