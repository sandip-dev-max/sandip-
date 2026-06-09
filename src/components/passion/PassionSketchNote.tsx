type PassionSketchNoteProps = {
  caption?: string;
};

export function PassionSketchNote({ caption }: PassionSketchNoteProps) {
  return (
    <div className="passion-sketch-note flex h-full min-h-[10rem] flex-col justify-between bg-[#f1f0ed] p-4 ring-1 ring-brutal-fg/[0.06]">
      <svg
        viewBox="0 0 120 120"
        className="mx-auto h-auto w-[78%] text-brutal-fg/75"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="8"
          width="104"
          height="104"
          stroke="currentColor"
          strokeWidth="1"
        />
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((__, col) => (
            <rect
              key={`${row}-${col}`}
              x={16 + col * 18}
              y={16 + row * 18}
              width="10"
              height="10"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity={row === 2 && col === 2 ? 1 : 0.35}
              fill={row === 2 && col === 2 ? "currentColor" : "none"}
            />
          )),
        )}
        <path
          d="M16 92c18-10 34-14 52-14s34 4 52 14"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      {caption ? (
        <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-brutal-fg/42">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
