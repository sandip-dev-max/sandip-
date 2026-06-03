import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const REVEAL_DURATION = 1;
const REVEAL_EASE = "power2.inOut";
const GALLERY_INTERACTIVE_AT = 0.55;

export type HeroRevealRefs = {
  scrollSection: RefObject<HTMLDivElement | null>;
  stickyContainer: RefObject<HTMLDivElement | null>;
  header: RefObject<HTMLDivElement | null>;
  leftColumn: RefObject<HTMLDivElement | null>;
  rightColumn: RefObject<HTMLDivElement | null>;
  footer: RefObject<HTMLElement | null>;
  heroBackdrop: RefObject<HTMLDivElement | null>;
  heroContent: RefObject<HTMLDivElement | null>;
  galleryGrid: RefObject<HTMLDivElement | null>;
};

export function useHeroScrollReveal(refs: HeroRevealRefs) {
  useGSAP(
    () => {
      const {
        scrollSection,
        stickyContainer,
        header,
        leftColumn,
        rightColumn,
        footer,
        heroBackdrop,
        heroContent,
        galleryGrid,
      } = refs;

      if (
        !scrollSection.current ||
        !stickyContainer.current ||
        !header.current ||
        !leftColumn.current ||
        !rightColumn.current ||
        !footer.current ||
        !heroBackdrop.current ||
        !heroContent.current ||
        !galleryGrid.current
      ) {
        return;
      }

      const setGalleryInteractive = (interactive: boolean) => {
        header.current?.classList.toggle("pointer-events-none", interactive);
        heroContent.current?.classList.toggle(
          "pointer-events-none",
          interactive,
        );
        heroContent.current?.classList.toggle(
          "pointer-events-auto",
          !interactive,
        );
        galleryGrid.current?.classList.toggle(
          "pointer-events-none",
          !interactive,
        );
      };

      setGalleryInteractive(false);

      const bentoCards =
        galleryGrid.current.querySelectorAll<HTMLElement>(".reveal-bento-card");

      const fade = { duration: REVEAL_DURATION, ease: REVEAL_EASE };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSection.current,
          start: "top top",
          end: "+=120%",
          pin: stickyContainer.current,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setGalleryInteractive(self.progress >= GALLERY_INTERACTIVE_AT);
          },
          onLeave: () => setGalleryInteractive(true),
          onEnterBack: () => setGalleryInteractive(false),
        },
      });

      timeline
        .to(header.current, { opacity: 0, y: -16, ...fade }, 0)
        .to(heroBackdrop.current, { opacity: 0, ...fade }, 0)
        .to(heroContent.current, { opacity: 0, ...fade }, 0)
        .to(leftColumn.current, { xPercent: -120, opacity: 0, ...fade }, 0)
        .to(rightColumn.current, { xPercent: 120, opacity: 0, ...fade }, 0)
        .to(footer.current, { yPercent: 100, opacity: 0, ...fade }, 0)
        .to(galleryGrid.current, { opacity: 1, scale: 1, ...fade }, 0)
        .fromTo(
          bentoCards,
          { yPercent: 8, opacity: 0.85 },
          {
            yPercent: 0,
            opacity: 1,
            duration: REVEAL_DURATION,
            ease: "none",
            stagger: 0.08,
          },
          0,
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        setGalleryInteractive(false);
      };
    },
    { scope: refs.scrollSection },
  );
}
