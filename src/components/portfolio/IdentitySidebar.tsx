"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IDENTITY_SIDEBAR_ITEMS,
  type IdentitySidebarItem,
} from "@/constants/identity-sidebar";

const ACCENT_CLASS: Record<IdentitySidebarItem["accent"], string> = {
  writer: "identity-sidebar-card--writer",
  mountaineer: "identity-sidebar-card--mountaineer",
};

export function IdentitySidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="identity-sidebar fixed left-2 top-1/2 z-[180] flex -translate-y-1/2 flex-col gap-1.5 sm:left-4 sm:gap-2 lg:left-5"
      aria-label="Identity navigation"
    >
      {IDENTITY_SIDEBAR_ITEMS.map((item) => {
        const isActive =
          item.id === "mountaineer"
            ? pathname === "/passion" || pathname.startsWith("/passion/")
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`identity-sidebar-card group ${ACCENT_CLASS[item.accent]} ${
              isActive ? "identity-sidebar-card--active" : ""
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="identity-sidebar-number font-mono text-[8px] uppercase tracking-[0.14em] text-white/70 sm:text-[9px]">
              {item.number}
            </span>
            <span className="identity-sidebar-label font-sans text-[10px] font-semibold uppercase leading-none tracking-[-0.02em] text-white sm:text-[11px]">
              {item.label}
            </span>
            <span
              className="identity-sidebar-dot size-1 rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100 sm:size-1.5"
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </aside>
  );
}
