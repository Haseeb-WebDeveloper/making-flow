"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";

interface Service {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
}

const services: Service[] = [
  {
    title: "Vibe-focused development",
    description:
      "We craft distinctive brand identities that connect with your audience and leave a lasting impression. From logo design to brand guidelines, we ensure consistency across all touchpoints.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    bgColor: "bg-[#CBFFC2]", // Light green
    textColor: "text-gray-900",
    iconColor: "text-green-600",
  },
  {
    title: "Agentic development & integrated workflows",
    description:
      "We build high-performance websites and applications using cutting-edge technologies. Our solutions are scalable, secure, and designed to drive engagement and conversions.",
    icon: "M12 2s8 4 8 12c0 8-8 12-8 12s-8-4-8-12c0-8 8-12 8-12zm0 15a3 3 0 100-6 3 3 0 000 6z",
    bgColor: "bg-[#EDC2FF]", // Light purple
    textColor: "text-gray-900",
    iconColor: "text-purple-600",
  },
  {
    title: "AI Gen Engineering",
    description:
      "We create tailored digital solutions that align with your business goals. From strategy to execution, we deliver innovative approaches that solve real-world challenges.",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-5-8a5 5 0 005 5 5 5 0 005-5 5 5 0 00-5-5 5 5 0 00-5 5z",
    bgColor: "bg-[#FFDAC2]", // Light orange/peach
    textColor: "text-gray-900",
    iconColor: "text-orange-600",
  },
];

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create progress segments for each service
  const serviceProgress = services.map((_, i) => {
    const start = i / services.length;
    const end = (i + 1) / services.length;
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  return (
    <section ref={ref} id="what-we-do" className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="max-w-6xl mx-auto ">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What <span className="text-blue-600">We Do</span>
          </motion.h2>
        </div>

        <div className="absolute inset-0 mt-12">
          {services.map((service, index) => {
            // Calculate the y position based on scroll progress

            const yPosition = useTransform(
              serviceProgress[index],
              [0, 1],
              [100, 0]
            );
            // Calculate opacity for fade-in effect
            const opacity = useTransform(
              serviceProgress[index],
              [0, 0.3, 1],
              [0, 1, 1]
            );
            // Calculate scale for slight zoom effect
            const scale = useTransform(
              serviceProgress[index],
              [0, 1],
              [0.9, 0.9]
            );
            // Calculate icon animation
            const iconRotate = useTransform(
              serviceProgress[index],
              [0, 0.5, 1],
              [0, 10, 0]
            );
            const iconScale = useTransform(
              serviceProgress[index],
              [0, 0.5, 1],
              [0.8, 1.2, 1]
            );

            return (
              <motion.div
                key={index}
                className={`absolute inset-0 ${service.bgColor} rounded-3xl  flex items-center justify-center`}
                style={{
                  y: yPosition,
                  opacity,
                  scale,
                }}
              >
                <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className={`${service.textColor} max-w-2xl`}>
                    <motion.h3
                      className="text-3xl md:text-5xl font-bold mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p
                      className="text-lg md:text-xl leading-relaxed opacity-90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                  <motion.div
                    className={`${service.iconColor} text-6xl md:text-8xl`}
                    style={{
                      rotate: iconRotate,
                      scale: iconScale,
                    }}
                  >
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={service.icon} />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
