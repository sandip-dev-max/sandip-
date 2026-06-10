import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { killScrollTriggersFor } from "@/lib/scroll-trigger";
import { scheduleRevealRefresh, setStoryVisible } from "@/lib/section-reveal";

type TestimonialsRevealRefs = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function useTestimonialsReveal(
  refs: TestimonialsRevealRefs,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      if (!section) return;

      killScrollTriggersFor(section);

      const ctx = gsap.context(() => {
        const headerItems = section.querySelectorAll("[data-testimonial-header]");
        const bubbles = section.querySelectorAll("[data-testimonial-bubble]");
        const cta = section.querySelector("[data-testimonial-cta]");

        if (reducedMotion) {
          setStoryVisible([headerItems, bubbles, cta]);
          return;
        }

        gsap.set(headerItems, { y: 36, opacity: 0 });
        gsap.set(bubbles, { y: 48, opacity: 0, scale: 0.94 });
        gsap.set(cta, { y: 24, opacity: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 86%",
            end: "top 40%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            headerItems,
            { y: 0, opacity: 1, duration: 0.2, stagger: 0.06, ease: "power3.out" },
            0,
          )
          .to(
            cta,
            { y: 0, opacity: 1, duration: 0.16, ease: "power3.out" },
            0.14,
          )
          .to(
            bubbles,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.24,
              stagger: 0.07,
              ease: "power3.out",
            },
            0.1,
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
