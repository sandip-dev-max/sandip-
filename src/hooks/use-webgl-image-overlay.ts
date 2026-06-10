import { useGSAP } from "@gsap/react";
import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { scrollVelocityStore } from "@/lib/scroll-velocity-store";
import { WebGLImageEngine } from "@/lib/webgl-image-engine";

export function useWebGLImageOverlay(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  enabled: boolean,
) {
  const engineRef = useRef<WebGLImageEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const engine = new WebGLImageEngine({ canvas, enabled: true });
    engineRef.current = engine;

    const onResize = () => {
      engine.resize();
      engine.scanImages();
    };

    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => engine.scanImages());
    const earlyScan = window.setTimeout(() => engine.scanImages(), 400);
    const lateScan = window.setTimeout(() => engine.scanImages(), 1200);

    return () => {
      window.clearTimeout(earlyScan);
      window.clearTimeout(lateScan);
      window.removeEventListener("resize", onResize);
      engine.dispose();
      engineRef.current = null;
    };
  }, [canvasRef, enabled]);

  useEffect(() => {
    engineRef.current?.setEnabled(enabled);
  }, [enabled]);

  useGSAP(
    () => {
      if (!enabled) return;

      const tick = (time: number) => {
        const engine = engineRef.current;
        if (!engine) return;
        engine.update(scrollVelocityStore.normalized, time);
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
      };
    },
    { dependencies: [enabled] },
  );
}
