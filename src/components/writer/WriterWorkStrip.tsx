"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  WRITER_FEATURED_WORK,
  WRITER_HERO,
  type WriterWorkItem,
} from "@/constants/writer";
import { useHorizontalDrag } from "@/hooks/use-horizontal-drag";
import { gsap } from "@/lib/gsap";

function WorkCard({ item }: { item: WriterWorkItem }) {
  return (
    <article className="writer-work-card writer-rule-y" data-writer-reveal>
      <Link href={item.href} className="writer-work-card-image group block">
        <div className="writer-work-card-media">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <span className="writer-work-card-shade" aria-hidden="true" />
      </Link>
      <div>
        <h2 className="writer-display writer-work-card-title">
          {item.title}
          {item.isNew ? (
            <span className="writer-work-badge">New</span>
          ) : null}
        </h2>
        <p className="writer-work-card-copy">{item.excerpt}</p>
      </div>
    </article>
  );
}

function chunkWork<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function SplitTitle({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <h2 className="writer-display writer-work-center-title">
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="writer-line-mask">
          <span data-writer-line>{word}</span>
        </span>
      ))}
    </h2>
  );
}

export function WriterWorkStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const panels = chunkWork(WRITER_FEATURED_WORK, 2);

  useHorizontalDrag(trackRef, setProgress);

  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    gsap.to(bar, {
      scaleX: Math.max(progress, 0.02),
      duration: 0.4,
      ease: "power2.out",
    });
  }, [progress]);

  return (
    <section id="work" className="writer-work-section" aria-label="Featured writing and work">
      <div className="writer-work-progress" aria-hidden="true">
        <span ref={progressBarRef} className="writer-work-progress-bar" />
      </div>

      <div ref={trackRef} className="writer-work-strip writer-rule-x">
        {panels.map((pair, panelIndex) => {
          const left = pair[0];
          const right = pair[1];

          return (
            <div key={panelIndex} className="writer-work-panel">
              {left ? <WorkCard item={left} /> : <div className="writer-rule-y" />}

              <div className="writer-work-center writer-rule-y" data-writer-hero>
                <div>
                  <SplitTitle text={WRITER_HERO.centerTitle} />
                  <p className="writer-work-center-copy" data-writer-reveal>
                    {WRITER_HERO.centerSubtitle}
                  </p>
                </div>
                <p className="writer-work-tip writer-work-tip--pulse">
                  {WRITER_HERO.dragTip}
                </p>
              </div>

              {right ? (
                <WorkCard item={right} />
              ) : (
                <div className="writer-rule-y" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
