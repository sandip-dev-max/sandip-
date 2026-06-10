import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

const DRAG_SENSITIVITY = 0.42;
const MAX_ROTATE_Y = 42;
const MAX_ROTATE_X = 26;

export function useAboutMountainScene(
  sceneRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
) {
  useGSAP(
    () => {
      const scene = sceneRef.current;
      if (!scene || reducedMotion) return;

      const world = scene.querySelector<HTMLElement>("[data-mountain-world]");
      const stack = scene.querySelector<HTMLElement>("[data-mountain-stack]");
      const orbitCards =
        scene.querySelectorAll<HTMLElement>("[data-orbit-card]");

      if (!world || !stack) return;

      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let rotX = -6;
      let rotY = 14;
      const applyRotation = (immediate = false) => {
        const clampedY = gsap.utils.clamp(-MAX_ROTATE_Y, MAX_ROTATE_Y, rotY);
        const clampedX = gsap.utils.clamp(-MAX_ROTATE_X, MAX_ROTATE_X, rotX);

        gsap.to(world, {
          rotateX: clampedX,
          rotateY: clampedY,
          duration: immediate ? 0 : 0.55,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        scene.setPointerCapture(event.pointerId);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) {
          const rect = scene.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          rotY = nx * MAX_ROTATE_Y * 1.4;
          rotX = -ny * MAX_ROTATE_X * 1.2 - 4;
          applyRotation();
          return;
        }

        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;

        rotY += dx * DRAG_SENSITIVITY;
        rotX -= dy * DRAG_SENSITIVITY * 0.65;
        applyRotation(true);
      };

      const onPointerUp = (event: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        if (scene.hasPointerCapture(event.pointerId)) {
          scene.releasePointerCapture(event.pointerId);
        }
        applyRotation();
      };

      scene.addEventListener("pointerdown", onPointerDown);
      scene.addEventListener("pointermove", onPointerMove);
      scene.addEventListener("pointerup", onPointerUp);
      scene.addEventListener("pointerleave", onPointerUp);

      gsap.set(world, { rotateX: rotX, rotateY: rotY, transformPerspective: 1200 });
      gsap.set(stack, { transformOrigin: "50% 62%" });

      gsap.to(orbitCards, {
        y: "+=10",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
      });

      return () => {
        scene.removeEventListener("pointerdown", onPointerDown);
        scene.removeEventListener("pointermove", onPointerMove);
        scene.removeEventListener("pointerup", onPointerUp);
        scene.removeEventListener("pointerleave", onPointerUp);
      };
    },
    { scope: sceneRef, dependencies: [reducedMotion] },
  );
}
