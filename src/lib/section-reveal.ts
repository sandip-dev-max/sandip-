import { gsap } from "@/lib/gsap";
import { scheduleScrollTriggerRefresh } from "@/lib/scroll-trigger";

export const STORY_EASE = "power3.out";
export const STORY_ENTER_START = "top 84%";

type StoryTarget =
  | Element
  | Element[]
  | NodeListOf<Element>
  | null
  | undefined;

function toStoryElements(
  elements: StoryTarget | StoryTarget[],
): Element[] {
  const raw = Array.isArray(elements)
    ? elements.flatMap((item) => (item ? gsap.utils.toArray<Element>(item) : []))
    : elements
      ? gsap.utils.toArray<Element>(elements)
      : [];

  return raw.filter((item): item is Element => item instanceof Element);
}

export function setStoryVisible(
  elements: StoryTarget | StoryTarget[],
): void {
  const list = toStoryElements(elements);
  if (!list.length) return;
  gsap.set(list, {
    clearProps: "all",
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
  });
}

export function scheduleRevealRefresh(): void {
  requestAnimationFrame(() => scheduleScrollTriggerRefresh());
  window.setTimeout(() => scheduleScrollTriggerRefresh(), 400);
}
