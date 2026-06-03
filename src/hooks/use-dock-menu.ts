import { useEffect, useState } from "react";
import {
  DOCK_SECTION_IDS,
  type DockSectionId,
} from "@/constants/dock-menu";

const HERO_ID = "hero";

export function useDockVisibility(): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-15% 0px 0px 0px",
      },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return visible;
}

export function useActiveDockSection(): DockSectionId {
  const [active, setActive] = useState<DockSectionId>("hero");

  useEffect(() => {
    const sections = DOCK_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId: DockSectionId = "hero";
        let bestRatio = 0;

        for (const id of DOCK_SECTION_IDS) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0) {
          setActive(bestId);
        }
      },
      {
        threshold: [0, 0.15, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}
