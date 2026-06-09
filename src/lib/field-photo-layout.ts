import type { CSSProperties } from "react";

type FieldLayout = {
  left: string;
  top: string;
  width: string;
  height: string;
  rotate: string;
  zIndex: number;
};

function seededOffset(index: number, channel: number): number {
  const value = Math.sin(index * 12.9898 + channel * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function getSurfaceFieldLayout(index: number, total: number): FieldLayout {
  const t = total <= 1 ? 0 : index / total;
  const angle = t * Math.PI * 2 + index * 0.47;
  const radius = 10 + seededOffset(index, 1) * 38;
  const left = 50 + Math.cos(angle) * radius * 0.46;
  const top = 48 + Math.sin(angle) * radius * 0.4;
  const size = 4.2 + seededOffset(index, 2) * 3.8;
  const aspect = 0.82 + seededOffset(index, 3) * 0.48;

  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}rem`,
    height: `${size * aspect}rem`,
    rotate: `${-10 + seededOffset(index, 4) * 20}deg`,
    zIndex: 1 + Math.floor(seededOffset(index, 5) * 8),
  };
}

export function getInnerFieldLayout(index: number, total: number): FieldLayout {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2;
  const size = 4.5 + seededOffset(index, 6) * 3.5;
  const aspect = 0.9 + seededOffset(index, 7) * 0.35;

  return {
    left: "50%",
    top: "50%",
    width: `${size}rem`,
    height: `${size * aspect}rem`,
    rotate: `${-6 + seededOffset(index, 8) * 12}deg`,
    zIndex: 10 + (index % 6),
  };
}

export function fieldLayoutToStyle(
  layout: FieldLayout,
  depth: "surface" | "inner",
): CSSProperties {
  const base: CSSProperties = {
    left: layout.left,
    top: layout.top,
    width: layout.width,
    height: layout.height,
    zIndex: layout.zIndex,
    transform: `rotate(${layout.rotate})`,
  };

  if (depth === "inner") {
    return {
      ...base,
      marginLeft: `calc(${layout.width} / -2)`,
      marginTop: `calc(${layout.height} / -2)`,
    };
  }

  return {
    ...base,
    marginLeft: `calc(${layout.width} / -2)`,
    marginTop: `calc(${layout.height} / -2)`,
  };
}
