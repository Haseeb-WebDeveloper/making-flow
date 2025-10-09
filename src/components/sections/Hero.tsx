"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Black background fades to blue
  const blackOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Logo slides from center to top-left and scales down
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.15]);
  const logoX = useTransform(scrollYProgress, [0, 0.5], [0, -580]);
  const logoY = useTransform(scrollYProgress, [0, 0.5], [0, -420]);
  const logoOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  // Brand text fades out
  const brandTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Hero text fades in from bottom (with stagger and smoother transition)
  const heroText1Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const heroText1Y = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);

  const heroText2Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const heroText2Y = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  return (
    <section ref={containerRef} className="relative h-[150vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Black background layer */}
        <motion.div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: blackOpacity }}
        />

        {/* Blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A68E4] to-[#5891EA]" />

        {/* Logo that moves from center to top-left */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            style={{
              scale: logoScale,
              x: logoX,
              y: logoY,
              opacity: logoOpacity,
            }}
            className="flex flex-col items-center gap-6"
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            {/* Brand text - fades out */}
            <motion.div
              style={{ opacity: brandTextOpacity }}
              className="text-center"
            >
              <Image
                src="/7.svg"
                alt="Making Flow Logo"
                width={400}
                height={400}
                className="w-[300px] md:w-[400px] h-[300px] md:h-[400px]"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero text - fades in from bottom with stagger and smoother transition */}
        <div className="absolute inset-0 flex items-end justify-center  z-15 px-8">
          <div className="text-center max-w-6xl">
            <motion.h2
              className="text-white text-5xl md:text-[86px] font-normal uppercase mb-16 leading-[150%] tracking-[-1.884px] font-['Space_Grotesk']"
              style={{
                opacity: heroText1Opacity,
                y: heroText1Y,
              }}
              transition={{ ease: "easeInOut", duration: 0.7 }}
            >
              We don&apos;t write code.
            </motion.h2>
            <motion.h3
              className="text-white text-6xl md:text-[164px] font-bold uppercase we-make-flow-line-height tracking-[-3.96px] font-['Space_Grotesk']"
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
