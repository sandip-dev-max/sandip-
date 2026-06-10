import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { killScrollTriggersFor } from "@/lib/scroll-trigger";
import { scheduleRevealRefresh, setStoryVisible } from "@/lib/section-reveal";

type WorkWithUsRevealRefs = {
  sectionRef: RefObject<HTMLElement | null>;
};

const REVEAL_TARGETS = [
  "[data-wwu-eyebrow]",
  "[data-wwu-title]",
  "[data-wwu-panel]",
  "[data-wwu-orbit]",
  "[data-wwu-avatar-inner]",
  "[data-wwu-metric]",
  "[data-wwu-node]",
  "[data-wwu-connector]",
  "[data-wwu-glow]",
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
        const eyebrow = section.querySelector("[data-wwu-eyebrow]");
        const titles = section.querySelectorAll("[data-wwu-title]");
        const panels = section.querySelectorAll<HTMLElement>("[data-wwu-panel]");
        const orbits = section.querySelectorAll<HTMLElement>("[data-wwu-orbit]");
        const avatarInners = section.querySelectorAll<HTMLElement>(
          "[data-wwu-avatar-inner]",
        );
        const metrics = section.querySelectorAll<HTMLElement>("[data-wwu-metric]");
        const nodes = section.querySelectorAll<HTMLElement>("[data-wwu-node]");
        const connectors = section.querySelectorAll<HTMLElement>(
          "[data-wwu-connector]",
        );
        const glow = section.querySelector("[data-wwu-glow]");
        const teamPanel = section.querySelector("[data-wwu-team]");
        const metricsPanel = section.querySelector("[data-wwu-metrics]");

        if (reducedMotion) {
          const allTargets = REVEAL_TARGETS.flatMap((selector) =>
            Array.from(section.querySelectorAll(selector)),
          );
          setStoryVisible(allTargets);
          return;
        }

        gsap.set(eyebrow, { y: 32, opacity: 0 });
        gsap.set(titles, { y: 40, opacity: 0 });
        gsap.set(panels, { y: 72, opacity: 0, scale: 0.94 });
        gsap.set(orbits, { scale: 0.78, opacity: 0 });
        gsap.set(avatarInners, { scale: 0, opacity: 0 });
        gsap.set(metrics, { x: 36, y: 24, opacity: 0, scale: 0.92 });
        gsap.set(nodes, { y: 22, opacity: 0, scale: 0.88 });
        gsap.set(connectors, {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center",
        });
        gsap.set(glow, { opacity: 0, scale: 0.88 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 12%",
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(eyebrow, { y: 0, opacity: 1, duration: 0.08, ease: "power3.out" }, 0)
          .to(
            titles,
            { y: 0, opacity: 1, duration: 0.1, stagger: 0.04, ease: "power3.out" },
            0.04,
          )
          .to(glow, { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" }, 0.03)
          .to(
            panels,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.18,
              stagger: 0.05,
              ease: "power3.out",
            },
            0.08,
          )
          .to(
            orbits,
            { scale: 1, opacity: 1, duration: 0.2, stagger: 0.06, ease: "power2.out" },
            0.14,
          )
          .to(
            avatarInners,
            {
              scale: 1,
              opacity: 1,
              duration: 0.14,
              stagger: 0.025,
              ease: "back.out(2.4)",
            },
            0.22,
          )
          .to(
            metrics,
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.16,
              stagger: 0.055,
              ease: "power3.out",
            },
            0.34,
          )
          .to(
            nodes,
            { y: 0, opacity: 1, scale: 1, duration: 0.1, stagger: 0.04, ease: "power2.out" },
            0.5,
          )
          .to(
            connectors,
            { scaleX: 1, opacity: 1, duration: 0.12, stagger: 0.045, ease: "power2.inOut" },
            0.56,
          )
          .to(teamPanel, { y: -8, duration: 0.24, ease: "none" }, 0.4)
          .to(metricsPanel, { y: 6, duration: 0.24, ease: "none" }, 0.4);

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
