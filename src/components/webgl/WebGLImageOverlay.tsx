"use client";

import { useRef } from "react";
import { useWebGLImageOverlay } from "@/hooks/use-webgl-image-overlay";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type WebGLImageOverlayProps = {
  active?: boolean;
};

export function WebGLImageOverlay({ active = true }: WebGLImageOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const enabled = active && !reducedMotion && isDesktop;

  useWebGLImageOverlay(canvasRef, enabled);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="webgl-image-overlay pointer-events-none fixed inset-0 z-[60]"
      aria-hidden="true"
    />
  );
}
