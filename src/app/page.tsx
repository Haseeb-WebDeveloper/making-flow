"use client";

import { useState, useRef, useEffect } from "react";
import LoadingScreen from "@/components/sections/LoadingScreen";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import VideoBrands from "@/components/sections/VideoBrands";
import WhatWeDo from "@/components/sections/WhatWeDo";
import WhyFlow from "@/components/sections/WhyFlow";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Refs for sections
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  // Track scroll position to show loading screen when at top
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear any existing timeout
      clearTimeout(scrollTimeout);

      // Only trigger after initial load is complete
      if (!isInitialLoad) {
        const scrollPosition = window.scrollY;

        // Show loading screen when scrolled to the very top (within 50px)
        if (scrollPosition < 50) {
          scrollTimeout = setTimeout(() => {
            setShowLoadingScreen(true);
          }, 100);
        } else {
          setShowLoadingScreen(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isInitialLoad]);

  // Handle initial load completion
  const handleInitialLoadComplete = () => {
    setLoadingComplete(true);
    setIsInitialLoad(false);
    setShowLoadingScreen(false);
  };

  // Scroll to section function
  const scrollToSection = (section: string) => {
    if (section === "whatWeDo" && whatWeDoRef.current) {
      whatWeDoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (section === "pricing" && pricingRef.current) {
      pricingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Loading Screen - Always rendered, visibility controlled by props */}
      <LoadingScreen
        isVisible={showLoadingScreen}
        isInitialLoad={isInitialLoad}
        onComplete={isInitialLoad ? handleInitialLoadComplete : undefined}
      />

      {/* Main Content */}
      {loadingComplete && (
        <>
          {/* Header */}
          <Header onNavigate={scrollToSection} />

          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <section className="bg-white py-20 px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
                We Are Figmenta&apos;s AI-First Solutions Hub, Responsible For
                Engineering And Implementing AI-Powered Products And Systems
                Tailored To Our Clients&apos; Needs.
              </p>
            </div>
          </section>

          {/* Video and Brands Section */}
          <VideoBrands />

          {/* What We Do Section */}
          <div ref={whatWeDoRef}>
            <WhatWeDo />
          </div>

          {/* Why Flow Section */}
          <WhyFlow />

          {/* Pricing Section */}
          <div ref={pricingRef}>
            <Pricing />
          </div>

          {/* FAQ Section */}
          <FAQ />

          {/* CTA Section */}
          <CTA />

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
