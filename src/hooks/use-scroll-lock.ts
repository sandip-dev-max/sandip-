import Lenis from "lenis";
import { useEffect } from "react";
import { setScrollLocked } from "@/lib/scroll-lock";

export function useScrollLock(locked: boolean, lenis: Lenis | null) {
  useEffect(() => {
    setScrollLocked(locked);

    if (locked) lenis?.stop();
    else lenis?.start();

    return () => {
      setScrollLocked(false);
      lenis?.start();
    };
  }, [locked, lenis]);
}
