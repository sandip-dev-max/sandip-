const SMOOTHING = 0.88;
const DECAY = 0.92;
const NORMALIZE_PX = 42;

export type ScrollVelocityState = {
  raw: number;
  smooth: number;
  normalized: number;
};

export function createScrollVelocityState(): ScrollVelocityState {
  return { raw: 0, smooth: 0, normalized: 0 };
}

export function updateScrollVelocity(
  state: ScrollVelocityState,
  currentScroll: number,
  lastScroll: number,
): ScrollVelocityState {
  const raw = currentScroll - lastScroll;
  const incoming = Math.abs(raw);
  const smooth =
    incoming > state.smooth
      ? state.smooth * SMOOTHING + incoming * (1 - SMOOTHING)
      : state.smooth * DECAY;

  return {
    raw,
    smooth,
    normalized: Math.min(smooth / NORMALIZE_PX, 1),
  };
}
