import { useEffect, type RefObject } from "react";

const FRICTION = 0.92;
const MIN_VELOCITY = 0.4;

export function useHorizontalDrag(
  trackRef: RefObject<HTMLElement | null>,
  onProgress?: (progress: number) => void,
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let rafId = 0;

    const maxScroll = () => track.scrollWidth - track.clientWidth;

    const emitProgress = () => {
      const max = maxScroll();
      onProgress?.(max > 0 ? track.scrollLeft / max : 0);
    };

    const applyInertia = () => {
      if (Math.abs(velocity) < MIN_VELOCITY) {
        cancelAnimationFrame(rafId);
        return;
      }

      track.scrollLeft -= velocity;
      velocity *= FRICTION;

      const max = maxScroll();
      if (track.scrollLeft <= 0 || track.scrollLeft >= max) {
        velocity *= 0.5;
      }

      emitProgress();
      rafId = requestAnimationFrame(applyInertia);
    };

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true;
      startX = event.clientX;
      scrollLeft = track.scrollLeft;
      lastX = event.clientX;
      lastTime = performance.now();
      velocity = 0;
      cancelAnimationFrame(rafId);
      track.setPointerCapture(event.pointerId);
      track.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const delta = event.clientX - startX;

      if (isDragging) {
        track.scrollLeft = scrollLeft - delta;
        const frameDelta = event.clientX - lastX;
        const dt = Math.max(now - lastTime, 1);
        velocity = (frameDelta / dt) * 16;
        lastX = event.clientX;
        lastTime = now;
        emitProgress();
      }
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
      track.classList.remove("is-dragging");
      rafId = requestAnimationFrame(applyInertia);
    };

    const onScroll = () => emitProgress();

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointerleave", endDrag);
    track.addEventListener("scroll", onScroll, { passive: true });
    emitProgress();

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointerleave", endDrag);
      track.removeEventListener("scroll", onScroll);
    };
  }, [trackRef, onProgress]);
}
