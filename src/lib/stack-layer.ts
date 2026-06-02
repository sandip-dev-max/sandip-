export type StackLayerKey = "front" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export function setStackLayer(
  el: HTMLElement,
  options: { interactive: boolean; stack: StackLayerKey },
): void {
  el.classList.toggle("pointer-events-none", !options.interactive);
  el.classList.toggle("pointer-events-auto", options.interactive);
  el.dataset.stack =
    options.stack === "front" ? "front" : String(options.stack);
}
