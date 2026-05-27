import Lenis from "lenis";
import { useEffect } from "react";

export function useScrollLock(locked: boolean, lenis: Lenis | null) {
  useEffect(() => {
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";

    if (locked) lenis?.stop();
    else lenis?.start();

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [locked, lenis]);
}
