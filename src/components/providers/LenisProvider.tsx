"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  createScrollVelocityState,
  updateScrollVelocity,
  type ScrollVelocityState,
} from "@/lib/scroll-velocity";
import { writeScrollVelocity } from "@/lib/scroll-velocity-store";
import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type LenisContextValue = {
  lenis: Lenis | null;
  /** Snapshot of velocity — for React consumers; WebGL reads the live store each frame. */
  scrollVelocity: number;
  velocityState: ScrollVelocityState;
};

const defaultVelocity = createScrollVelocityState();

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollVelocity: 0,
  velocityState: defaultVelocity,
});

export function useLenis() {
  return useContext(LenisContext);
}

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [velocitySnapshot, setVelocitySnapshot] =
    useState<ScrollVelocityState>(defaultVelocity);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("lenis", "lenis-smooth");

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    setLenis(instance);

    let lastScroll = instance.scroll;
    let localVelocity = createScrollVelocityState();
    let frame = 0;

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: root });

    const ticker = (time: number) => {
      instance.raf(time * 1000);
      localVelocity = updateScrollVelocity(
        localVelocity,
        instance.scroll,
        lastScroll,
      );
      lastScroll = instance.scroll;
      writeScrollVelocity(localVelocity);

      frame += 1;
      if (frame % 4 === 0) {
        setVelocitySnapshot({ ...localVelocity });
      }
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      instance.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
      instance.destroy();
      ScrollTrigger.scrollerProxy(root, {});
      ScrollTrigger.defaults({ scroller: window });
      ScrollTrigger.clearScrollMemory?.();
      root.classList.remove("lenis", "lenis-smooth");
      setLenis(null);
      writeScrollVelocity(createScrollVelocityState());
      setVelocitySnapshot(createScrollVelocityState());
    };
  }, []);

  return (
    <LenisContext.Provider
      value={{
        lenis,
        scrollVelocity: velocitySnapshot.normalized,
        velocityState: velocitySnapshot,
      }}
    >
      {children}
    </LenisContext.Provider>
  );
}
