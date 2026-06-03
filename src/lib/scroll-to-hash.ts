import type Lenis from "lenis";

export function scrollToHash(lenis: Lenis | null, href: string): void {
  if (href === "#hero" || href === "#" || href === "") {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.1, offset: -96 });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
