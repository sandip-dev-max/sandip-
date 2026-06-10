import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { killScrollTriggersFor } from "@/lib/scroll-trigger";
import { scheduleRevealRefresh, setStoryVisible } from "@/lib/section-reveal";

type FooterRevealRefs = {
  footerRef: RefObject<HTMLElement | null>;
};

export function useFooterReveal(
  refs: FooterRevealRefs,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const footer = refs.footerRef.current;
      if (!footer) return;

      killScrollTriggersFor(footer);

      const ctx = gsap.context(() => {
        const heroBlock = footer.querySelectorAll("[data-footer-hero]");
        const contactBlock = footer.querySelectorAll("[data-footer-contact]");
        const faqBlock = footer.querySelectorAll("[data-footer-faq]");
        const newsletter = footer.querySelector("[data-footer-newsletter]");
        const brand = footer.querySelector("[data-footer-brand]");

        if (reducedMotion) {
          setStoryVisible([heroBlock, contactBlock, faqBlock, newsletter, brand]);
          return;
        }

        gsap.set(heroBlock, { y: 40, opacity: 0 });
        gsap.set(contactBlock, { y: 48, opacity: 0 });
        gsap.set(faqBlock, { y: 36, opacity: 0 });
        gsap.set(newsletter, { y: 28, opacity: 0 });
        gsap.set(brand, { y: 24, opacity: 0, scale: 0.98 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 92%",
            end: "top 55%",
            scrub: 0.42,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            heroBlock,
            { y: 0, opacity: 1, duration: 0.2, stagger: 0.05, ease: "power3.out" },
            0,
          )
          .to(
            contactBlock,
            { y: 0, opacity: 1, duration: 0.22, stagger: 0.04, ease: "power3.out" },
            0.08,
          )
          .to(
            faqBlock,
            { y: 0, opacity: 1, duration: 0.18, stagger: 0.04, ease: "power3.out" },
            0.16,
          )
          .to(
            newsletter,
            { y: 0, opacity: 1, duration: 0.16, ease: "power3.out" },
            0.24,
          )
          .to(
            brand,
            { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: "power3.out" },
            0.3,
          );

        scheduleRevealRefresh();
      }, footer);

      return () => ctx.revert();
    },
    {
      scope: refs.footerRef,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  );
}
