import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { STORY_EASE, STORY_ENTER_START } from "@/lib/section-reveal";
import { scheduleScrollTriggerRefresh } from "@/lib/scroll-trigger";

export function useWriterPageMotion(
  rootRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
        const reveals = root.querySelectorAll<HTMLElement>("[data-writer-reveal]");
        const heroLines = root.querySelectorAll<HTMLElement>(
          "[data-writer-hero] [data-writer-line]",
        );
        const scrollLines = root.querySelectorAll<HTMLElement>(
          "[data-writer-reveal] [data-writer-line]",
        );
        const stats = root.querySelectorAll<HTMLElement>("[data-writer-stat]");
        const inverted = root.querySelector<HTMLElement>("[data-writer-inverted]");
        const stamp = root.querySelector<HTMLElement>("[data-writer-stamp]");
        const pixelImage = root.querySelector<HTMLElement>("[data-writer-pixel-image]");
        const pixelType = root.querySelectorAll<HTMLElement>("[data-writer-pixel-type]");
        const ctaBlock = root.querySelector<HTMLElement>("[data-writer-cta]");
        const header = root.querySelector<HTMLElement>("[data-writer-header]");

        if (reducedMotion) {
          gsap.set(
            [reveals, heroLines, scrollLines, inverted, stamp, pixelImage, pixelType, ctaBlock, header],
            {
            clearProps: "all",
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            clipPath: "none",
            },
          );
          return;
        }

        if (header) {
          gsap.from(header.children, {
            y: 18,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: STORY_EASE,
            delay: 0.15,
          });
        }

        heroLines.forEach((line) => {
          gsap.set(line, { yPercent: 110, opacity: 0 });
        });

        gsap.to(heroLines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: STORY_EASE,
          delay: 0.35,
        });

        scrollLines.forEach((line) => {
          const trigger = line.closest<HTMLElement>("[data-writer-reveal]");
          if (!trigger) return;

          gsap.from(line, {
            yPercent: 110,
            opacity: 0,
            duration: 0.8,
            ease: STORY_EASE,
            scrollTrigger: {
              trigger,
              start: STORY_ENTER_START,
              toggleActions: "play none none none",
            },
          });
        });

        reveals.forEach((el) => {
          gsap.set(el, { y: 36, opacity: 0 });
        });

        reveals.forEach((el) => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: STORY_EASE,
            scrollTrigger: {
              trigger: el,
              start: STORY_ENTER_START,
              toggleActions: "play none none none",
            },
          });
        });

        if (inverted) {
          gsap.set(inverted, { clipPath: "inset(0 50% 0 50%)" });
          gsap.to(inverted, {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: inverted,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          });
        }

        if (stamp) {
          gsap.from(stamp, {
            rotation: -8,
            scale: 0.88,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: stamp,
              start: STORY_ENTER_START,
              toggleActions: "play none none none",
            },
          });
        }

        stats.forEach((cell) => {
          const valueEl = cell.querySelector<HTMLElement>("[data-writer-stat-value]");
          if (!valueEl) return;
          const target = Number.parseInt(valueEl.dataset.writerStatValue ?? "0", 10);
          const counter = { val: 0 };

          gsap.to(counter, {
            val: target,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cell,
              start: STORY_ENTER_START,
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              valueEl.textContent = String(Math.round(counter.val));
            },
          });
        });

        if (pixelImage) {
          gsap.fromTo(
            pixelImage,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: pixelImage,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        }

        pixelType.forEach((line, index) => {
          gsap.from(line, {
            x: index % 2 === 0 ? -48 : 48,
            opacity: 0,
            duration: 0.9,
            ease: STORY_EASE,
            scrollTrigger: {
              trigger: line,
              start: STORY_ENTER_START,
              toggleActions: "play none none none",
            },
          });
        });

        if (ctaBlock) {
          gsap.from(ctaBlock, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: STORY_EASE,
            scrollTrigger: {
              trigger: ctaBlock,
              start: STORY_ENTER_START,
              toggleActions: "play none none none",
            },
          });
        }

        scheduleScrollTriggerRefresh();
      }, root);

      return () => ctx.revert();
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );
}
