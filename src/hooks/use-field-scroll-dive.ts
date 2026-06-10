import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { pinScrollDistance, SCROLL_PIN_DEFAULTS } from "@/lib/scroll-pin";
import { scheduleScrollTriggerRefresh } from "@/lib/scroll-trigger";

type FieldDiveRefs = {
  scrollStage: RefObject<HTMLDivElement | null>;
  pinViewport: RefObject<HTMLDivElement | null>;
  canvas: RefObject<HTMLDivElement | null>;
  world: RefObject<HTMLDivElement | null>;
  core: RefObject<HTMLDivElement | null>;
  vignette: RefObject<HTMLDivElement | null>;
  hint: RefObject<HTMLParagraphElement | null>;
  header: RefObject<HTMLDivElement | null>;
  outerPieceRefs: RefObject<Record<string, HTMLDivElement | null>>;
  innerPieceRefs: RefObject<Record<string, HTMLDivElement | null>>;
};

type DiveVector = {
  nx: number;
  ny: number;
  dist: number;
};

function measureDiveVectors(
  canvas: HTMLElement,
  pieces: HTMLElement[],
): DiveVector[] {
  const cRect = canvas.getBoundingClientRect();
  const cx = cRect.width / 2;
  const cy = cRect.height / 2;
  const maxDim = Math.max(cRect.width, cRect.height);

  return pieces.map((piece) => {
    const rect = piece.getBoundingClientRect();
    const ex = rect.left - cRect.left + rect.width / 2;
    const ey = rect.top - cRect.top + rect.height / 2;
    const dx = ex - cx;
    const dy = ey - cy;
    const len = Math.hypot(dx, dy) || 1;

    return {
      nx: dx / len,
      ny: dy / len,
      dist: len / maxDim,
    };
  });
}

function setInnerStart(innerPieces: HTMLElement[]) {
  gsap.set(innerPieces, {
    autoAlpha: 0,
    scale: 0.12,
    z: -900,
    rotationX: 18,
    rotationY: 0,
  });
}

export function useFieldScrollDive(
  refs: FieldDiveRefs,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const {
        scrollStage,
        pinViewport,
        canvas,
        world,
        core,
        vignette,
        hint,
        header,
        outerPieceRefs,
        innerPieceRefs,
      } = refs;

      if (
        !scrollStage.current ||
        !pinViewport.current ||
        !canvas.current ||
        !world.current ||
        !core.current ||
        !vignette.current
      ) {
        return;
      }

      const outerPieces = Object.values(outerPieceRefs.current).filter(
        (el): el is HTMLDivElement => el !== null,
      );
      const innerPieces = Object.values(innerPieceRefs.current).filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (!outerPieces.length) return;

      const ctx = gsap.context(() => {
        gsap.set(core.current, { autoAlpha: 0, scale: 0.88 });
        gsap.set(vignette.current, { autoAlpha: 0 });
        setInnerStart(innerPieces);

        if (reducedMotion) {
          gsap.set(core.current, { autoAlpha: 1, scale: 1 });
          gsap.set(innerPieces, { autoAlpha: 1, scale: 1, z: 0 });
          if (hint.current) gsap.set(hint.current, { autoAlpha: 0 });
          return;
        }

        let vectors: DiveVector[] = [];
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const measure = () => {
            vectors = measureDiveVectors(canvas.current!, outerPieces);
          };

          measure();
          window.addEventListener("resize", measure);

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scrollStage.current,
              start: "top top",
              end: pinScrollDistance(3, 90),
              pin: pinViewport.current,
              scrub: 0.85,
              ...SCROLL_PIN_DEFAULTS,
            },
          });

          if (header.current) {
            timeline.to(
              header.current,
              { autoAlpha: 0, y: -24, duration: 0.15, ease: "power2.in" },
              0,
            );
          }

          if (hint.current) {
            timeline.to(
              hint.current,
              { autoAlpha: 0, y: 12, duration: 0.12, ease: "power2.in" },
              0.08,
            );
          }

          outerPieces.forEach((piece, index) => {
            const vector = vectors[index] ?? { nx: 0, ny: 0, dist: 0.5 };
            const push = 48 + vector.dist * 110;
            const scale = 2 + vector.dist * 3.2;
            const tiltY = vector.nx * (28 + vector.dist * 42);
            const tiltX = -vector.ny * (22 + vector.dist * 32);
            const depth = -vector.dist * 520;

            timeline.to(
              piece,
              {
                x: vector.nx * push + "vw",
                y: vector.ny * push + "vh",
                z: depth,
                scale,
                rotationY: tiltY,
                rotationX: tiltX,
                transformPerspective: 1200,
                duration: 1,
                ease: "power2.inOut",
              },
              0,
            );
          });

          timeline.to(
            world.current,
            { z: 180, scale: 1.08, duration: 1, ease: "power2.inOut" },
            0,
          );

          innerPieces.forEach((piece, index) => {
            const ringAngle = (index / innerPieces.length) * Math.PI * 2;
            const ringX = Math.cos(ringAngle) * 12;
            const ringY = Math.sin(ringAngle) * 9;
            const depth = -120 + (index % 3) * 140;

            timeline.to(
              piece,
              {
                autoAlpha: 1,
                scale: 1.15 + (index % 2) * 0.2,
                z: depth,
                x: ringX + "vw",
                y: ringY + "vh",
                rotationY: Math.cos(ringAngle) * -18,
                rotationX: Math.sin(ringAngle) * 12,
                transformPerspective: 1200,
                duration: 0.55,
                ease: "power3.out",
              },
              0.22 + index * 0.04,
            );
          });

          timeline.to(
            innerPieces,
            {
              scale: 1.45,
              z: (index) => -80 + (index % 4) * 90,
              duration: 0.35,
              ease: "power1.inOut",
              stagger: 0.03,
            },
            0.72,
          );

          timeline.to(
            vignette.current,
            { autoAlpha: 1, duration: 0.55, ease: "power2.out" },
            0.35,
          );

          timeline.to(
            core.current,
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out" },
            0.62,
          );

          return () => {
            window.removeEventListener("resize", measure);
          };
        });

        mm.add("(max-width: 767px)", () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scrollStage.current,
              start: "top top",
              end: pinScrollDistance(2, 90),
              pin: pinViewport.current,
              scrub: 0.85,
              ...SCROLL_PIN_DEFAULTS,
            },
          });

          if (header.current) {
            timeline.to(header.current, { autoAlpha: 0, duration: 0.2 }, 0);
          }
          if (hint.current) {
            timeline.to(hint.current, { autoAlpha: 0, duration: 0.15 }, 0.05);
          }

          outerPieces.forEach((piece, index) => {
            timeline.to(
              piece,
              {
                scale: 1.6 + index * 0.05,
                rotationY: index % 2 === 0 ? 14 : -14,
                z: -index * 40,
                duration: 1,
                ease: "power2.inOut",
              },
              0,
            );
          });

          timeline.to(
            world.current,
            { scale: 2.2, duration: 1, ease: "power2.inOut" },
            0,
          );

          timeline.to(
            innerPieces,
            {
              autoAlpha: 1,
              scale: 1,
              z: 0,
              stagger: 0.06,
              duration: 0.5,
              ease: "power2.out",
            },
            0.35,
          );

          timeline.to(
            vignette.current,
            { autoAlpha: 1, duration: 0.5 },
            0.4,
          );

          timeline.to(
            core.current,
            { autoAlpha: 1, scale: 1, duration: 0.45 },
            0.55,
          );
        });

        requestAnimationFrame(() => scheduleScrollTriggerRefresh());
      }, scrollStage);

      return () => ctx.revert();
    },
    { scope: refs.scrollStage, dependencies: [reducedMotion] },
  );
}
