"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const brands = [
  { name: "Wella", logo: "/1 1.svg" },
  { name: "Veuve Clicquot", logo: "/4 1.svg" },
  { name: "Davines", logo: "/2 1.svg" },
  { name: "LVMH", logo: "/3 1.svg" },
  { name: "Oral-B", logo: "/7 1.svg" },
  { name: "Jeep", logo: "/6 1.svg" },
  { name: "Braun", logo: "/8 1.svg" },
  { name: "Burger King", logo: "/5 1.svg" },
];

export default function VideoBrands() {
  return (
    <>
      {/* About Section */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
              We Are Figmenta&apos;s AI-First Solutions Hub, Responsible For
              Engineering And Implementing AI-Powered Products And Systems
              Tailored To Our Clients&apos; Needs.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="bg-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Video Section */}
          <motion.div
            className="mb-20"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-600">
              Brands that trust us
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brands.map((brand, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-8 flex items-center justify-center aspect-square transition-colors group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    width={100}
                    height={100}
                    src={brand.logo}
                    alt={brand.logo}
                    className="w-full h-full object-contain group-hover:saturate-100 group-hover:contrast-900 group-hover:brightness-100"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
