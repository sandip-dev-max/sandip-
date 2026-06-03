"use client";

import { useState } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import { PortfolioHero } from "@/components/PortfolioHero";
import { BlogSection } from "@/components/blog/BlogSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { WorkSection } from "@/components/work/WorkSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { ScrollMaskSection } from "@/components/scroll/ScrollMaskSection";
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

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {showContent && (
        <>
          <PortfolioHero />
          <ScrollMaskSection />
          <WorkSection />
          <ServicesSection />
          <TestimonialsSection />
          <BlogSection />
        
          <SiteFooter />
        </>
      )}
    </>
  );
}
