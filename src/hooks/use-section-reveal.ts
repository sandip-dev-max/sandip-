import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import {
  killScrollTriggersFor,
} from "@/lib/scroll-trigger";
import {
  scheduleRevealRefresh,
  setStoryVisible,
  STORY_EASE,
  STORY_ENTER_START,
} from "@/lib/section-reveal";

type RevealBatch = {
  selector: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  triggerSelector?: string;
  start?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
};

type SectionRevealOptions = {
  batches: RevealBatch[];
};

export function useSectionReveal(
  sectionRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
  options: SectionRevealOptions,
) {
  const { batches } = options;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      killScrollTriggersFor(section);

      const ctx = gsap.context(() => {
        const allTargets = batches.flatMap((batch) =>
          Array.from(section.querySelectorAll(batch.selector)),
        );

        if (reducedMotion) {
          setStoryVisible(allTargets);
          return;
        }

        batches.forEach((batch) => {
          const elements = section.querySelectorAll(batch.selector);
          if (!elements.length) return;

          const trigger =
            (batch.triggerSelector
              ? section.querySelector(batch.triggerSelector)
              : null) ?? section;

          const from: gsap.TweenVars = {
            y: 28,
            opacity: 0,
            ...batch.from,
          };
          const to: gsap.TweenVars = {
            y: 0,
            opacity: 1,
            duration: batch.duration ?? 0.9,
            stagger: batch.stagger ?? 0.09,
            ease: STORY_EASE,
            delay: batch.delay ?? 0,
            ...batch.to,
          };

          gsap.set(elements, from);
          gsap.to(elements, {
            ...to,
            scrollTrigger: {
              trigger,
              start: batch.start ?? STORY_ENTER_START,
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          });
        });

        scheduleRevealRefresh();
      }, section);

      return () => ctx.revert();
    },
    {
      scope: sectionRef,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  );
}
