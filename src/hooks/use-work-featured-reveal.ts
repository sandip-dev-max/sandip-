import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { killScrollTriggersFor } from "@/lib/scroll-trigger";
import { scheduleRevealRefresh, setStoryVisible } from "@/lib/section-reveal";

type WorkFeaturedRefs = {
  sectionRef: RefObject<HTMLElement | null>;
  heroRef: RefObject<HTMLDivElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
};

export function useWorkFeaturedReveal(
  refs: WorkFeaturedRefs,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const { sectionRef, heroRef, galleryRef } = refs;
      const section = sectionRef.current;
      if (!section) return;

      killScrollTriggersFor(section);

      const ctx = gsap.context(() => {
        const heroLines = section.querySelectorAll("[data-work-line]");
        const heroSub = section.querySelector("[data-work-sub]");
        const galleryLabel = section.querySelector("[data-work-label]");
        const cards = section.querySelectorAll("[data-work-card]");

        if (reducedMotion) {
          setStoryVisible([heroLines, heroSub, galleryLabel, cards]);
          return;
        }

        gsap.set(heroLines, { yPercent: 115, opacity: 0 });
        gsap.set(heroSub, { y: 32, opacity: 0 });
        gsap.set(galleryLabel, { y: 20, opacity: 0 });
        gsap.set(cards, { y: 72, opacity: 0, scale: 0.96 });

        if (heroRef.current) {
          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 82%",
              end: "top 38%",
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          });

          heroTimeline
            .to(heroLines, {
              yPercent: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.12,
              ease: "power4.out",
            })
            .to(
              heroSub,
              { y: 0, opacity: 1, duration: 0.28, ease: "power3.out" },
              0.18,
            );
        }

        if (galleryRef.current) {
          const galleryTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 88%",
              end: "top 42%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });

          galleryTimeline
            .to(
              galleryLabel,
              { y: 0, opacity: 1, duration: 0.22, ease: "power3.out" },
              0,
            )
            .to(
              cards,
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.32,
                stagger: 0.08,
                ease: "power3.out",
              },
              0.08,
            );
        }

        scheduleRevealRefresh();
      }, section);

      return () => ctx.revert();
    },
    { scope: refs.sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );
}
