const SCROLL_LOCK_CLASS = "scroll-locked";

export function setScrollLocked(locked: boolean): void {
  document.documentElement.classList.toggle(SCROLL_LOCK_CLASS, locked);
}
