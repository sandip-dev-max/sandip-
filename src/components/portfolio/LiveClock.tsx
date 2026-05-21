"use client";

export function LiveClock() {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[now.getDay()];
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "P.M." : "A.M.";
  const h = hours % 12 || 12;

  return (
    <span suppressHydrationWarning>
      {day} {h}:{minutes} {period}
    </span>
  );
}
