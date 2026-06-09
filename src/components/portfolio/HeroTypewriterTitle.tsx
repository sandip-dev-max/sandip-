"use client";

import { useHeroTypewriter } from "@/hooks/use-hero-typewriter";

export function HeroTypewriterTitle() {
  const { text } = useHeroTypewriter();
  const lines = text.split("\n");

  return (
    <h1
      className="font-sans text-4xl font-black uppercase leading-[0.88] tracking-tighter md:text-7xl lg:text-8xl"
      aria-live="polite"
      aria-atomic="true"
    >
      {lines.map((line, index) => (
        <span key={`${index}-${line}`}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
      <span className="hero-typewriter-cursor" aria-hidden="true">
        _
      </span>
    </h1>
  );
}
