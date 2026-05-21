"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { PortfolioHero } from "@/components/PortfolioHero";

export function GtaExperience() {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const splashDoneRef = useRef(false);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      if (!showSplash) return;

      const timeline = gsap.timeline();

      timeline
        .to(".vi-mask-group", {
          rotate: 10,
          duration: 2,
          ease: "power4.inOut",
          transformOrigin: "50% 50%",
        })
        .to(".vi-mask-group", {
          scale: 10,
          duration: 2,
          delay: -1.8,
          ease: "expo.inOut",
          transformOrigin: "50% 50%",
          opacity: 0,
          onUpdate: function () {
            if (this.progress() >= 0.9 && !splashDoneRef.current) {
              splashDoneRef.current = true;
              setShowSplash(false);
              setShowContent(true);
              this.kill();
            }
          },
        });

      return () => timeline.kill();
    },
    { scope: splashRef, dependencies: [showSplash] },
  );

  useGSAP(
    () => {
      if (!showContent) return;

      gsap.from(".hero-content", {
        opacity: 0,
        y: 24,
        duration: 1.1,
        ease: "power3.out",
      });
    },
    { dependencies: [showContent] },
  );

  return (
    <>
      {showSplash && (
        <div
          ref={splashRef}
          className="splash-screen fixed inset-0 z-[100] flex h-screen w-full items-center justify-center overflow-hidden bg-black"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id="viMask">
                <rect width="100%" height="100%" fill="black" />
                <g className="vi-mask-group">
                  <text
                    x="50%"
                    y="50%"
                    fontSize="250"
                    textAnchor="middle"
                    fill="white"
                    dominantBaseline="middle"
                    fontFamily="Arial Black, sans-serif"
                  >
                    AT
                  </text>
                </g>
              </mask>
            </defs>
            <image
              href="/bg.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#viMask)"
            />
          </svg>
        </div>
      )}

      {showContent && <PortfolioHero />}
    </>
  );
}
