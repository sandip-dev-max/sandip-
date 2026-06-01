import { ScrollTrigger } from "@/lib/gsap";

let refreshRaf = 0;

/** Debounced refresh — safe to call from GSAP setup / resize handlers. */
export function scheduleScrollTriggerRefresh(): void {
  if (typeof window === "undefined") return;
  cancelAnimationFrame(refreshRaf);
  refreshRaf = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

/** Remove ScrollTriggers scoped to a section (avoids duplicates on Fast Refresh). */
export function killScrollTriggersFor(element: HTMLElement): void {
  ScrollTrigger.getAll().forEach((trigger) => {
    const triggerEl = trigger.trigger;
    if (
      triggerEl === element ||
      (triggerEl instanceof HTMLElement && element.contains(triggerEl))
    ) {
      trigger.kill();
    }
  });
}
