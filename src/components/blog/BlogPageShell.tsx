"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/portfolio/SiteFooter";

const PortfolioHeader = dynamic(
  () =>
    import("@/components/portfolio/PortfolioHeader").then(
      (module) => module.PortfolioHeader,
    ),
  { ssr: false },
);

type BlogPageShellProps = {
  children: ReactNode;
  headerOverlay?: boolean;
};

export function BlogPageShell({
  children,
  headerOverlay = true,
}: BlogPageShellProps) {
  return (
    <>
      <div className="relative min-h-screen bg-blog-bg text-white">
        <PortfolioHeader overlay={headerOverlay} />
        <main>{children}</main>
      </div>
      <SiteFooter />
    </>
  );
}
