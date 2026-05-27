import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const REVEAL_DURATION = 1;
const REVEAL_EASE = "power2.inOut";
const GALLERY_INTERACTIVE_AT = 0.55;

export type HeroRevealRefs = {
  scrollSection: RefObject<HTMLDivElement | null>;
  stickyContainer: RefObject<HTMLDivElement | null>;
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
        heroContent.current?.style.setProperty(
          "pointer-events",
          interactive ? "none" : "auto",
        );
        galleryGrid.current?.classList.toggle(
          "pointer-events-none",
          !interactive,
        );
      };

      setGalleryInteractive(false);

      const projectImages =
        galleryGrid.current.querySelectorAll<HTMLImageElement>(".project-img");

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
        .to(heroBackdrop.current, { opacity: 0, ...fade }, 0)
        .to(heroContent.current, { opacity: 0, ...fade }, 0)
        .to(leftColumn.current, { xPercent: -120, opacity: 0, ...fade }, 0)
        .to(rightColumn.current, { xPercent: 120, opacity: 0, ...fade }, 0)
        .to(footer.current, { yPercent: 100, opacity: 0, ...fade }, 0)
        .to(galleryGrid.current, { opacity: 1, scale: 1, ...fade }, 0)
        .to(
          projectImages,
          { scale: 1.05, yPercent: -6, duration: REVEAL_DURATION, ease: "none" },
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
