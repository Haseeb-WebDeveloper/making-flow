"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: "Wella", logo: "/sm-67d67918f10df-Wella-Professionals 1.svg" },
  { name: "Veuve Clicquot", logo: "/Veuve-Clicquot-Logo 1.svg" },
  { name: "Davines", logo: "/Davines_logo_black.png" },
  { name: "LVMH", logo: "/LVMH-black.png" },
  { name: "Oral-B", logo: "/oral-b 1.svg" },
  { name: "Jeep", logo: "/Jeep_logo.svg 1.svg" },
  { name: "Braun", logo: "/Braun_Logo.svg.png" },
  { name: "Burger King", logo: "/burger-king-logo-black-and-white-1.png" },
];

export default function VideoBrands() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create parallax effect - section moves faster and overlaps hero
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        yPercent: -35, // Moves up by 20% - increase for more overlap
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-white relative z-10 -mb-70">
      {/* About Section */}
      <section className="pt-60 pb-12 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
              We Are Figmenta&apos;s AI-First Solutions Hub, Responsible For
              Engineering And Implementing AI-Powered Products And Systems
              Tailored To Our Clients&apos; Needs.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="pb-8 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Video Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-video max-w-2xl mx-auto rounded-3xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/KATY.png"
                  alt="Video preview"
                  width={800}
                  height={450}
                  className="w-full h-full object-contain bg-white/30 backdrop-blur-sm"
                />
                <motion.button
                  className="absolute w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-0 h-0 border-l-[18px] border-l-white border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent ml-1" />
                </motion.button>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Brands Section */}
          <div className="relative">
            {/* Title - Fades in from bottom to top */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Brands that trust us
            </motion.h2>

            {/* Logos Grid - Fade in from bottom to top */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {brands.map((brand, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 flex items-center justify-center aspect-square group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.08,
                    transition: {
                      type: "spring",
                      stiffness: 1000,
                      damping: 50,
                    },
                  }}
                >
                  <Image
                    width={100}
                    height={100}
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain opacity-40 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
