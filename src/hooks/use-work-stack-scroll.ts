import { useGSAP } from "@gsap/react";
import { useCallback, useRef } from "react";
import type { RefObject } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import { PROJECTS } from "@/constants/projects";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  killScrollTriggersFor,
  scheduleScrollTriggerRefresh,
} from "@/lib/scroll-trigger";
import { setStackLayer, type StackLayerKey } from "@/lib/stack-layer";

const PROJECT_COUNT = PROJECTS.length;
const STACK_Y_OFFSET = 5.5;
const STACK_SCALE_STEP = 0.034;
const STACK_ROTATION = 2.25;
const DESKTOP_MQ = "(min-width: 1024px)";
const MAX_SETUP_FRAMES = 120;

export type WorkStackScrollRefs = {
  sectionRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLDivElement | null>;
  stackRef: RefObject<HTMLDivElement | null>;
  cardRefs: RefObject<(HTMLElement | null)[]>;
};

function getCards(refs: WorkStackScrollRefs): HTMLElement[] {
  return refs.cardRefs.current.filter(
    (card): card is HTMLElement => card !== null,
  );
}

function resetCardsForMobile(cards: HTMLElement[]) {
  cards.forEach((card, index) => {
    gsap.set(card, {
      clearProps: "transform,opacity",
      opacity: index === 0 ? 1 : 0,
    });
    setStackLayer(card, {
      interactive: index === 0,
      stack: index === 0 ? "front" : ((index + 1) as StackLayerKey),
    });
  });
}

function showMobileCard(cards: HTMLElement[], index: number) {
  cards.forEach((card, i) => {
    const visible = i === index;
    gsap.to(card, {
      opacity: visible ? 1 : 0,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
    setStackLayer(card, {
      interactive: visible,
      stack: visible ? "front" : ((i + 1) as StackLayerKey),
    });
  });
}

export function useWorkStackScroll(
  refs: WorkStackScrollRefs,
  onActiveIndexChange: (index: number) => void,
  reducedMotion: boolean,
) {
  const { lenis } = useLenis();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const scrollStackEnabledRef = useRef(false);
  const activeIndexRef = useRef(0);
  const onIndexChangeRef = useRef(onActiveIndexChange);
  onIndexChangeRef.current = onActiveIndexChange;

  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      const pin = refs.pinRef.current;

      if (!section || !pin) {
        return;
      }

      let cancelled = false;
      let mm: gsap.MatchMedia | null = null;
      let frame = 0;

      const setup = () => {
        if (cancelled) return;

        const cards = getCards(refs);
        if (cards.length !== PROJECT_COUNT) {
          frame += 1;
          if (frame < MAX_SETUP_FRAMES) {
            requestAnimationFrame(setup);
          }
          return;
        }

        killScrollTriggersFor(section);
        mm?.revert();
        mm = gsap.matchMedia();
        scrollStackEnabledRef.current = false;

        mm.add(DESKTOP_MQ, () => {
          if (reducedMotion) {
            scrollStackEnabledRef.current = false;
            cards.forEach((card, index) => {
              gsap.set(card, {
                yPercent: 0,
                scale: 1,
                opacity: index === 0 ? 1 : 0,
                rotation: 0,
              });
              setStackLayer(card, {
                interactive: index === 0,
                stack: index === 0 ? "front" : ((index + 1) as StackLayerKey),
              });
            });
            return () => {};
          }

          scrollStackEnabledRef.current = true;

          const ctx = gsap.context(() => {
            cards.forEach((card, index) => {
              gsap.set(card, {
                transformOrigin: "center top",
                force3D: true,
                yPercent: index === 0 ? 0 : 115,
                scale: index === 0 ? 1 : 0.88,
                opacity: index === 0 ? 1 : 0,
                rotation: 0,
              });
              setStackLayer(card, {
                interactive: index === 0,
                stack: index === 0 ? "front" : ((index + 1) as StackLayerKey),
              });
            });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${PROJECT_COUNT * 85}%`,
                pin,
                scrub: 0.85,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const index = Math.min(
                    PROJECT_COUNT - 1,
                    Math.max(0, Math.floor(self.progress * PROJECT_COUNT)),
                  );
                  if (index === activeIndexRef.current) return;
                  activeIndexRef.current = index;
                  onIndexChangeRef.current(index);

                  cards.forEach((card, cardIndex) => {
                    setStackLayer(card, {
                      interactive: cardIndex === index,
                      stack:
                        cardIndex === index
                          ? "front"
                          : ((cardIndex + 1) as StackLayerKey),
                    });
                  });
                },
              },
            });

            scrollTriggerRef.current = timeline.scrollTrigger ?? null;

            for (let i = 1; i < PROJECT_COUNT; i += 1) {
              const position = (i - 0.12) / PROJECT_COUNT;
              const incoming = cards[i];
              if (!incoming) continue;

              timeline.to(
                incoming,
                {
                  yPercent: 0,
                  scale: 1,
                  opacity: 1,
                  rotation: 0,
                  duration: 0.4,
                  ease: "power2.out",
                },
                position,
              );

              for (let j = 0; j < i; j += 1) {
                const buried = cards[j];
                if (!buried) continue;
                const depth = i - j;

                timeline.to(
                  buried,
                  {
                    yPercent: -STACK_Y_OFFSET * depth,
                    scale: 1 - STACK_SCALE_STEP * depth,
                    rotation:
                      depth % 2 === 1 ? -STACK_ROTATION : STACK_ROTATION,
                    duration: 0.4,
                    ease: "power2.out",
                  },
                  position,
                );

                timeline.set(buried, { zIndex: 10 + j }, position);
              }

              timeline.set(incoming, { zIndex: 10 + i }, position);
            }
          }, section);

          scheduleScrollTriggerRefresh();

          return () => {
            scrollTriggerRef.current = null;
            ctx.revert();
          };
        });

        mm.add("(max-width: 1023px)", () => {
          scrollStackEnabledRef.current = false;
          scrollTriggerRef.current = null;

          const ctx = gsap.context(() => {
            resetCardsForMobile(cards);
          }, section);

          return () => ctx.revert();
        });

        scheduleScrollTriggerRefresh();
      };

      setup();

      return () => {
        cancelled = true;
        scrollStackEnabledRef.current = false;
        scrollTriggerRef.current = null;
        killScrollTriggersFor(section);
        mm?.revert();
      };
    },
    {
      scope: refs.sectionRef,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(PROJECT_COUNT - 1, Math.max(0, index));

      if (!scrollStackEnabledRef.current || reducedMotion) {
        const cards = getCards(refs);
        if (cards.length === PROJECT_COUNT) {
          showMobileCard(cards, clamped);
        }
        activeIndexRef.current = clamped;
        onIndexChangeRef.current(clamped);
        return;
      }

      const trigger = scrollTriggerRef.current;
      if (!trigger || !lenis) return;

      const progress = (clamped + 0.5) / PROJECT_COUNT;
      const scrollPosition =
        trigger.start + progress * (trigger.end - trigger.start);

      lenis.scrollTo(scrollPosition, { duration: 1.1 });
    },
    [lenis, reducedMotion],
  );

  return { scrollToIndex };
}
