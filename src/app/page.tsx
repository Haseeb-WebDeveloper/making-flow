"use client";

import { useRef, useEffect } from "react";
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
  // Refs for sections
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Scroll to top on page load/refresh
  useEffect(() => {
    // Scroll to top immediately on mount
    window.scrollTo(0, 0);

    // Also handle page refresh/reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

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
    } else if (section === "faq" && faqRef.current) {
      faqRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header - Fixed at top */}
      <Header onNavigate={scrollToSection} />

      {/* Hero Section - Unified intro + hero animation */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* Video and Brands Section - Overlapping section */}
      <div className="relative z-20">
        <VideoBrands />
      </div>
      <hr className="border-1px w-[90vw] justify-center mx-auto border-gray-300 mt-20 mb-10"/>

      {/* What We Do Section */}
      <div ref={whatWeDoRef}>
        <WhatWeDo />
      </div>

<hr className="border-1px w-[90vw] justify-center mx-auto border-gray-300 mt-10 mb-10"/>


      {/* Why Flow Section */}
      <WhyFlow />




      {/* Pricing Section */}
      <div ref={pricingRef}>
        <Pricing />
      </div>

      <hr className="border-1px w-[90vw] justify-center mx-auto border-gray-300 my-20"/>


      {/* FAQ Section */}
      <div ref={faqRef}>
        <FAQ />
      </div>

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
