"use client";

import { useEffect, useRef } from "react";

export function useCardTilt(reducedMotion: boolean, intensity = 1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--tilt-ry", `${px * 14 * intensity}deg`);
      node.style.setProperty("--tilt-rx", `${py * -10 * intensity}deg`);
    };

    const handleLeave = () => {
      node.style.setProperty("--tilt-ry", "0deg");
      node.style.setProperty("--tilt-rx", "0deg");
    };

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);

    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion, intensity]);

  return ref;
}
