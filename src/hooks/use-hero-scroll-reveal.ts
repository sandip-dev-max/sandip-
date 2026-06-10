import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { pinScrollDistance, SCROLL_PIN_DEFAULTS } from "@/lib/scroll-pin";
import { killScrollTriggersFor } from "@/lib/scroll-trigger";
import { scheduleRevealRefresh } from "@/lib/section-reveal";

const REVEAL_DURATION = 1;
const REVEAL_EASE = "power2.inOut";
const GALLERY_INTERACTIVE_AT = 0.55;
const HERO_SCROLL_STEPS = 1;
const HERO_SCROLL_VH = 115;
const ABOUT_REVEAL_AT = 0.38;

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

export function useHeroScrollReveal(
  refs: HeroRevealRefs,
  reducedMotion: boolean,
) {
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

      killScrollTriggersFor(scrollSection.current);

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

      if (reducedMotion) {
        gsap.set(galleryGrid.current, { opacity: 0, pointerEvents: "none" });
        gsap.set(bentoCards, { clearProps: "all" });
        gsap.set(
          [
            header.current,
            leftColumn.current,
            rightColumn.current,
            footer.current,
            heroBackdrop.current,
            heroContent.current,
          ],
          { clearProps: "all" },
        );
        setGalleryInteractive(false);
        return;
      }

      gsap.set(galleryGrid.current, { opacity: 0, scale: 1 });
      gsap.set(bentoCards, { y: 28, opacity: 0 });

      const fade = { duration: REVEAL_DURATION, ease: REVEAL_EASE };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSection.current,
          start: "top top",
          end: pinScrollDistance(HERO_SCROLL_STEPS, HERO_SCROLL_VH),
          pin: stickyContainer.current,
          scrub: 0.6,
          ...SCROLL_PIN_DEFAULTS,
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
        .to(
          galleryGrid.current,
          { opacity: 1, duration: REVEAL_DURATION * 0.7, ease: "power2.out" },
          ABOUT_REVEAL_AT,
        )
        .to(
          bentoCards,
          {
            y: 0,
            opacity: 1,
            duration: REVEAL_DURATION * 0.65,
            ease: "power3.out",
            stagger: 0.06,
          },
          ABOUT_REVEAL_AT + 0.04,
        );

      scheduleRevealRefresh();

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        setGalleryInteractive(false);
      };
    },
    { scope: refs.scrollSection, dependencies: [reducedMotion], revertOnUpdate: true },
  );
}
