"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ImageFieldItem } from "@/constants/image-field";
import { gsap } from "@/lib/gsap";

type FieldPieceViewerProps = {
  item: ImageFieldItem;
  onClose: () => void;
};

export function FieldPieceViewer({ item, onClose }: FieldPieceViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      if (!panel || !backdrop) return;

      gsap.fromTo(
        panel,
        { xPercent: -8, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" },
      );
      gsap.fromTo(
        backdrop,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
    },
    { scope: dialogRef, dependencies: [item.id] },
  );

  return (
    <div
      ref={dialogRef}
      className="field-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      <aside ref={panelRef} className="field-viewer-panel">
        <button
          type="button"
          className="field-viewer-close"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          ×
        </button>

        <figure className="field-viewer-figure">
          <div className="field-viewer-image-wrap">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="field-viewer-image object-contain"
              priority
            />
          </div>
          <figcaption className="field-viewer-caption">
            <p className="field-viewer-title">{item.alt}</p>
            <p className="field-viewer-meta">
              {item.tags.join(" · ")}
            </p>
          </figcaption>
        </figure>
      </aside>

      <button
        ref={backdropRef}
        type="button"
        className="field-viewer-backdrop"
        onClick={onClose}
        aria-label="Close image viewer"
      />
    </div>
  );
}
