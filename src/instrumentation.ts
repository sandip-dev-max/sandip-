/**
 * Next.js dev attaches multiple HTTP/HMR close handlers to the same socket.
 * Node warns at 10 listeners by default — harmless in development, noisy in the terminal.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;
  if (process.env.NODE_ENV !== "development") return;

  const events = await import("node:events");
  events.defaultMaxListeners = 20;
}
