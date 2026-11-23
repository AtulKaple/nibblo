import React, { useState, useEffect, useRef } from "react";
import IntroLoader from "./components/IntroLoader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WhyWeExist from "./components/WhyWeExist";
import MarqueeTicker from "./components/MarqueeTicker";
import BiteBuilder from "./components/BiteBuilder";
import NutritionFacts from "./components/NutritionFacts";
import LifestyleMoments from "./components/LifestyleMoments";
import ProductGallery from "./components/ProductGallery";
import Footer from "./components/Footer";
import LegalModal from "./components/LegalModal";
import { startNibbloEngine } from "./modules/app-engine.js";

export default function App() {
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const engineRef = useRef(null);

  useEffect(() => {
    // Start the full NIBBLO 3D WebGL engine & GSAP animations
    const engine = startNibbloEngine();
    engineRef.current = engine;

    // Delegated click handler for legal/nutrition modal, and easter eggs
    const handleClick = (e) => {
      // Prevent all anchor tag clicks throughout the application
      const anchor = e.target.closest("a");
      if (anchor) {
        e.preventDefault();
      }

      // Legal & Nutrition modal trigger
      const legalTrigger = e.target.closest(
        'a[href*="mentions-legales"], a[href="#nutrition"], [data-open-nutrition]',
      );
      if (legalTrigger) {
        e.preventDefault();
        setIsLegalOpen(true);
        return;
      }

      // Rain trigger (footer hint or skewer)
      const rainTrigger = e.target.closest(
        "[data-trigger-rain], .s-end__hint, .s-end__trad, [data-end-big]",
      );
      if (rainTrigger) {
        if (window.__nibblo && window.__nibblo.rain) {
          window.__nibblo.rain.active = !window.__nibblo.rain.active;
        }
      }
    };

    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLegalOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      if (engineRef.current?.destroy) {
        engineRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* Accessibility skip link */}
      <a className="skip" href="#" onClick={(e) => e.preventDefault()}>
        Skip to content
      </a>

      {/* Intro curtain & loader */}
      <IntroLoader />

      {/* Interactive cursor */}
      <CustomCursor />

      {/* Sticky top navigation */}
      <Navbar />

      <main id="contenu">
        {/* 1. Hero Section with 3D Center Product & Floating Ingredients */}
        <HeroSection />

        {/* Marquee Ticker */}
        <MarqueeTicker />

        {/* 2. SweetTape "Why We Exist" Section with Horizontal Scroll & 3D Cards */}
        <WhyWeExist />

        {/* 3. Product Showcase: 5-Layer Assembly & Ingredients */}
        <BiteBuilder />

        {/* 4. Nutrition Facts */}
        <NutritionFacts />

        {/* 5. Lifestyle Section: Everyday Snacking Moments */}
        <LifestyleMoments />

        {/* 6. Product Gallery */}
        <ProductGallery />
      </main>

      {/* 7. Final CTA & Interactive Footer */}
      <Footer
        onOpenNutrition={() => setIsLegalOpen(true)}
      />

      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
    </>
  );
}
