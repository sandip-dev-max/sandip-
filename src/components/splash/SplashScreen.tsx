"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

type SplashScreenProps = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useGSAP(
    () => {
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
            if (this.progress() >= 0.9 && !completedRef.current) {
              completedRef.current = true;
              onComplete();
              this.kill();
            }
          },
        });

      return () => timeline.kill();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
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
  );
}
