import { useGSAP } from "@gsap/react";
import { useCallback, useRef } from "react";
import type { RefObject } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import { SERVICES } from "@/constants/services";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  killScrollTriggersFor,
  scheduleScrollTriggerRefresh,
} from "@/lib/scroll-trigger";
import { pinScrollDistance, SCROLL_PIN_DEFAULTS } from "@/lib/scroll-pin";
import { setStackLayer, type StackLayerKey } from "@/lib/stack-layer";

const SERVICE_COUNT = SERVICES.length;
const SERVICE_SCROLL_VH = 48;
const DESKTOP_MQ = "(min-width: 1024px)";
const MAX_SETUP_FRAMES = 120;

export type ServicesScrollRefs = {
  sectionRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLDivElement | null>;
  imageLayerRefs: RefObject<(HTMLDivElement | null)[]>;
  descriptionRefs: RefObject<(HTMLParagraphElement | null)[]>;
};

function layersReady(refs: ServicesScrollRefs): boolean {
  return refs.imageLayerRefs.current.filter(Boolean).length === SERVICE_COUNT;
}

function applyMobileState(refs: ServicesScrollRefs, index: number) {
  refs.imageLayerRefs.current.forEach((layer, i) => {
    if (!layer) return;
    const visible = i === index;
    gsap.set(layer, {
      opacity: visible ? 1 : 0,
      scale: 1,
      y: 0,
    });
    setStackLayer(layer, {
      interactive: visible,
      stack: visible ? "front" : ((i + 1) as StackLayerKey),
    });
  });

  refs.descriptionRefs.current.forEach((desc, i) => {
    if (!desc) return;
    gsap.set(desc, {
      opacity: i === index ? 1 : 0,
      y: 0,
    });
  });
}

export function useServicesScroll(
  refs: ServicesScrollRefs,
  onActiveIndexChange: (index: number) => void,
  reducedMotion: boolean,
  motionReady: boolean,
) {
  const { lenis } = useLenis();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const scrollScrubRef = useRef(false);
  const activeIndexRef = useRef(0);
  const onIndexChangeRef = useRef(onActiveIndexChange);
  onIndexChangeRef.current = onActiveIndexChange;

  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      const pin = refs.pinRef.current;

      if (!section || !pin || !motionReady || !layersReady(refs)) {
        return;
      }

      let cancelled = false;
      let mm: gsap.MatchMedia | null = null;
      let frame = 0;

      const setup = () => {
        if (cancelled) return;

        if (!layersReady(refs)) {
          frame += 1;
          if (frame < MAX_SETUP_FRAMES) {
            requestAnimationFrame(setup);
          }
          return;
        }

        killScrollTriggersFor(section);
        mm?.revert();
        mm = gsap.matchMedia();
        scrollScrubRef.current = false;

        const images = refs.imageLayerRefs.current.filter(
          (layer): layer is HTMLDivElement => layer !== null,
        );
        const descriptions = refs.descriptionRefs.current.filter(
          (desc): desc is HTMLParagraphElement => desc !== null,
        );

        mm.add(DESKTOP_MQ, () => {
          if (reducedMotion) {
            scrollScrubRef.current = false;
            applyMobileState(refs, activeIndexRef.current);
            return () => {};
          }

          scrollScrubRef.current = true;

          const ctx = gsap.context(() => {
            images.forEach((layer, index) => {
              gsap.set(layer, {
                opacity: index === 0 ? 1 : 0,
                scale: 1,
                y: 0,
              });
              setStackLayer(layer, {
                interactive: index === 0,
                stack: index === 0 ? "front" : ((index + 1) as StackLayerKey),
              });
            });

            descriptions.forEach((desc, index) => {
              gsap.set(desc, {
                opacity: index === 0 ? 1 : 0,
                y: index === 0 ? 0 : 12,
              });
            });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: pinScrollDistance(SERVICE_COUNT, SERVICE_SCROLL_VH),
                pin,
                scrub: 0.75,
                ...SCROLL_PIN_DEFAULTS,
                onUpdate: (self) => {
                  const index = Math.min(
                    SERVICE_COUNT - 1,
                    Math.max(0, Math.floor(self.progress * SERVICE_COUNT)),
                  );
                  if (index === activeIndexRef.current) return;
                  activeIndexRef.current = index;
                  onIndexChangeRef.current(index);

                  images.forEach((layer, i) => {
                    setStackLayer(layer, {
                      interactive: i === index,
                      stack: i === index ? "front" : ((i + 1) as StackLayerKey),
                    });
                  });
                },
              },
            });

            scrollTriggerRef.current = timeline.scrollTrigger ?? null;

            for (let i = 1; i < SERVICE_COUNT; i += 1) {
              const position = i / SERVICE_COUNT;
              const incoming = images[i];
              const outgoing = images[i - 1];
              const inDesc = descriptions[i];
              const outDesc = descriptions[i - 1];

              if (incoming && outgoing) {
                timeline.fromTo(
                  incoming,
                  { opacity: 0, scale: 1.04, y: 24 },
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.45,
                    ease: "power2.out",
                  },
                  position,
                );

                timeline.to(
                  outgoing,
                  {
                    opacity: 0,
                    scale: 0.98,
                    y: -16,
                    duration: 0.45,
                    ease: "power2.out",
                  },
                  position,
                );
              }

              if (inDesc && outDesc) {
                timeline.fromTo(
                  inDesc,
                  { opacity: 0, y: 14 },
                  { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                  position,
                );

                timeline.to(
                  outDesc,
                  { opacity: 0, y: -10, duration: 0.35, ease: "power2.out" },
                  position,
                );
              }
            }
          }, section);

          scheduleScrollTriggerRefresh();

          return () => {
            scrollTriggerRef.current = null;
            ctx.revert();
          };
        });

        mm.add("(max-width: 1023px)", () => {
          scrollScrubRef.current = false;
          scrollTriggerRef.current = null;

          const ctx = gsap.context(() => {
            applyMobileState(refs, activeIndexRef.current);
          }, section);

          return () => ctx.revert();
        });

        scheduleScrollTriggerRefresh();
      };

      setup();

      return () => {
        cancelled = true;
        scrollScrubRef.current = false;
        scrollTriggerRef.current = null;
        killScrollTriggersFor(section);
        mm?.revert();
      };
    },
    {
      scope: refs.sectionRef,
      dependencies: [reducedMotion, motionReady],
      revertOnUpdate: true,
    },
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(SERVICE_COUNT - 1, Math.max(0, index));

      if (!scrollScrubRef.current || reducedMotion) {
        applyMobileState(refs, clamped);
        activeIndexRef.current = clamped;
        onIndexChangeRef.current(clamped);
        return;
      }

      const trigger = scrollTriggerRef.current;
      if (!trigger || !lenis) return;

      const progress = (clamped + 0.5) / SERVICE_COUNT;
      const scrollPosition =
        trigger.start + progress * (trigger.end - trigger.start);

      lenis.scrollTo(scrollPosition, { duration: 1.1 });
    },
    [lenis, reducedMotion, refs],
  );

  const selectIndex = useCallback(
    (index: number) => {
      if (scrollScrubRef.current && !reducedMotion) {
        scrollToIndex(index);
        return;
      }
      applyMobileState(refs, index);
      activeIndexRef.current = index;
      onIndexChangeRef.current(index);
    },
    [reducedMotion, refs, scrollToIndex],
  );

  return { selectIndex, scrollScrubEnabled: () => scrollScrubRef.current };
}
