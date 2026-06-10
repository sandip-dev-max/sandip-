/** Shared ScrollTrigger pin defaults for Lenis + GSAP. */
export const SCROLL_PIN_DEFAULTS = {
  anticipatePin: 1,
  invalidateOnRefresh: true,
  pinSpacing: true,
} as const;

export function pinScrollDistance(steps: number, vhPerStep: number): string {
  return `+=${steps * vhPerStep}%`;
}
