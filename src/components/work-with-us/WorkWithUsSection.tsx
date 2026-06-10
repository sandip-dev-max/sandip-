"use client";

import Link from "next/link";
import { useRef } from "react";
import { WORK_WITH_US } from "@/constants/work-with-us";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWorkWithUsReveal } from "@/hooks/use-work-with-us-reveal";
import "./work-with-us.css";

export function WorkWithUsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useWorkWithUsReveal({ sectionRef }, reducedMotion);

  const { eyebrow, headline, intro, offerings, cta, location } = WORK_WITH_US;

  return (
    <section
      ref={sectionRef}
      id="work-with-us"
      className="wwu-section scroll-story-section border-t border-brutal-fg/10"
      aria-labelledby="work-with-us-heading"
    >
      <div className="wwu-inner">
        <header className="wwu-header" data-wwu-header>
          <p className="wwu-eyebrow">{eyebrow}</p>
          <h2 id="work-with-us-heading" className="wwu-headline">
            {headline}
          </h2>
          <p className="wwu-intro" data-wwu-intro>
            {intro}
          </p>
        </header>

        <div className="wwu-board" data-wwu-board>
          <div className="wwu-board-lip" aria-hidden="true" />
          <ul className="wwu-offerings">
            {offerings.map((offering) => (
              <li
                key={offering.id}
                className="wwu-offering"
                data-wwu-offering
              >
                <span className="wwu-offering-number">{offering.number}</span>
                <div className="wwu-offering-body">
                  <h3 className="wwu-offering-title">{offering.title}</h3>
                  <p className="wwu-offering-desc">{offering.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <footer className="wwu-footer" data-wwu-footer>
          <Link href={cta.href} className="wwu-cta">
            {cta.label}
          </Link>
          <span className="wwu-location">{location}</span>
        </footer>
      </div>
    </section>
  );
}
