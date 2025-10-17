"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Hero text fades in from bottom (with stagger and smoother transition)
  // "We don't write code" fades out when scrolling past the hero section
  const heroText1Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.5, 0.7],
    [0, 1, 1, 0]
  );
  const heroText1Y = useTransform(scrollYProgress, [0.15, 0.35], [80, 0]);

  // "We make flow" remains visible (no fade-out)
  const heroText2Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const heroText2Y = useTransform(scrollYProgress, [0.2, 0.4], [80, 0]);

  return (
    <section ref={containerRef} className="relative h-[155vh]">
      {/* Sticky container - remains sticky throughout */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A68E4] to-[#5891EA]" />
        {/* Hero text - fades in from bottom with stagger and smoother transition */}
        <div className="absolute inset-0 flex items-end justify-center z-30 px-8">
          <div className="text-center max-w-6xl pb-16 md:pb-0">
            <motion.h2
              className="text-white text-2xl md:text-[86px] font-normal uppercase mb-6 leading-[150%] tracking-[-1.884px] font-['Space_Grotesk']"
              style={{
                opacity: heroText1Opacity,
                y: heroText1Y,
              }}
              transition={{ ease: "easeInOut", duration: 0.7 }}
            >
              We don&apos;t write code.
            </motion.h2>
            <motion.h3
              className="text-white text-5xl md:text-[164px] font-bold uppercase we-make-flow-line-height tracking-[-3.96px] font-['Space_Grotesk']"
              style={{
                opacity: heroText2Opacity,
                y: heroText2Y,
              }}
              transition={{ ease: "easeInOut", duration: 0.7 }}
            >
              We make flow
            </motion.h3>
          </div>
        </div>
      </div>
    </section>
  );
}
