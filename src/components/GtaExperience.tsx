"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import { scheduleScrollTriggerRefresh } from "@/lib/scroll-trigger";
import { DockMenu } from "@/components/portfolio/DockMenu";
import { PortfolioHero } from "@/components/PortfolioHero";
import { BlogSection } from "@/components/blog/BlogSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { WorkWithUsSection } from "@/components/work-with-us/WorkWithUsSection";
import { WorkSection } from "@/components/work/WorkSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { useScrollLock } from "@/hooks/use-scroll-lock";

export function GtaExperience() {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { lenis } = useLenis();

  useScrollLock(showSplash && !showContent, lenis);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowContent(true);
  };

  useEffect(() => {
    if (!showContent) return;

    const refresh = () => scheduleScrollTriggerRefresh();
    const frame = requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 350);
    const lateTimer = window.setTimeout(refresh, 900);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearTimeout(lateTimer);
    };
  }, [showContent]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {showContent && (
        <>
          <PortfolioHero />
          <DockMenu />
          <ServicesSection />
          <WorkWithUsSection />
          <WorkSection />
          <TestimonialsSection />
          <BlogSection />
        
          <SiteFooter />
        </>
      )}
    </>
  );
}
