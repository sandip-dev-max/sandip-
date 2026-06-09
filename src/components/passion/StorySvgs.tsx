import type { SVGProps } from "react";

type StorySvgProps = SVGProps<SVGSVGElement>;

export function StoryGlobeSvg({ className = "", ...props }: StorySvgProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        className="story-draw"
        cx="110"
        cy="110"
        r="88"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        className="story-draw"
        cx="110"
        cy="110"
        rx="34"
        ry="88"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        className="story-draw"
        d="M22 88h176M22 132h176M42 42c24 24 36 68 36 68s12-44 36-68M142 42c-24 24-36 68-36 68s-12-44-36-68"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        className="story-draw"
        d="M110 22v176"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function StoryClockSvg({ className = "", ...props }: StorySvgProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        className="story-draw"
        cx="110"
        cy="110"
        r="78"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        className="story-draw"
        d="M110 48v62l42 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className="story-draw"
        d="M34 72c18-10 40-16 76-16s58 6 76 16M34 148c18 10 40 16 76 16s58-6 76-16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className="story-draw"
        d="M48 34c12 18 18 40 18 76s-6 58-18 76M172 34c-12 18-18 40-18 76s6 58 18 76"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StoryStudioSvg({ className = "", ...props }: StorySvgProps) {
  return (
    <svg
      viewBox="0 0 260 200"
      className={className}
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="story-draw"
        d="M36 164 88 92l44 28 52-56 40 48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        className="story-draw"
        d="M36 164h188"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        className="story-draw"
        d="M88 92v72M132 120v44M184 64v100"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        className="story-draw"
        x="118"
        y="34"
        width="44"
        height="28"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        className="story-draw"
        d="M126 48h28M126 54h20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
