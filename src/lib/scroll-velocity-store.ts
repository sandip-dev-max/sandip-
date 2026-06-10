import type { ScrollVelocityState } from "@/lib/scroll-velocity";

export const scrollVelocityStore: ScrollVelocityState = {
  raw: 0,
  smooth: 0,
  normalized: 0,
};

export function writeScrollVelocity(state: ScrollVelocityState): void {
  scrollVelocityStore.raw = state.raw;
  scrollVelocityStore.smooth = state.smooth;
  scrollVelocityStore.normalized = state.normalized;
}
