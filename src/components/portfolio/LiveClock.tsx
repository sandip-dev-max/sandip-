"use client";

import { useEffect, useState } from "react";

type LiveClockProps = {
  variant?: "default" | "24h";
};

function formatClock(date: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "P.M." : "A.M.";
  const h = hours % 12 || 12;

  return `${day} ${h}:${minutes} ${period}`;
}

function formatClock24(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function LiveClock({ variant = "default" }: LiveClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        variant === "24h" ? formatClock24(new Date()) : formatClock(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1_000);
    return () => window.clearInterval(id);
  }, [variant]);

  return (
    <span suppressHydrationWarning className="tabular-nums">
      {time ?? "—"}
    </span>
  );
}
