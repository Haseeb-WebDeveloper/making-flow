"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#1A68E4] to-[#5891EA] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Headline - Center */}
      <div className="text-center max-w-6xl mx-auto px-8">
        <motion.h1
          className="text-white pb-12 text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 leading-tight"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
        >
          WE DON&apos;T WRITE CODE.
        </motion.h1>
        <motion.h2
          className="mt-12 text-white text-6xl md:text-8xl lg:text-9xl font-bold leading-tight"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
        >
          <span className="">WE MAKE FLOW.</span>
        </motion.h2>
      </div>
    </section>
  );
}
