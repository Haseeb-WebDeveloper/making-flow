"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineItem {
  title: string;
  description: string;
  backgroundText: string;
  position: "left" | "right";
  icon: string;
}

const timeline: TimelineItem[] = [
  {
    title: "We Are Obsessed With Efficiency.",
    description:
      "We use AI to save time, turning that speed into a tangible cost reduction for our clients.",
    backgroundText: "Adapt.",
    position: "left",
    icon: "⏱️",
  },
  {
    title: "We are pioneers in innovation and research,",
    description:
      "With a team that has been working with AI since the very start of the revolution and has always been an early adopter in the evolution of new products.",
    backgroundText: "Build.",
    position: "right",
    icon: "🔬",
  },
  {
    title: "We Are Part Of A Multidisciplinary Group,",
    description:
      "That enables us to deliver complete products with strong UX, fully ready to go to market.",
    backgroundText: "Flow.",
    position: "left",
    icon: "💻",
  },
];

export default function WhyFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the timeline section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  // Transform scroll progress to timeline height (0% to 100%)
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Transform scroll progress for each background text opacity
  // Each item fades in and out at different scroll positions
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.35], [0.2, 1, 0.2]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.65],
    [0.2, 1, 0.2]
  );
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0.2, 1, 0.3]);

  const opacities = [opacity1, opacity2, opacity3];

  // Transform scroll progress for each dot color
  // Dots turn blue as the timeline line reaches them
  const dotColor1 = useTransform(
    scrollYProgress,
    [0, 0.33],
    ["#d1d5db", "#2563eb"]
  );
  const dotColor2 = useTransform(
    scrollYProgress,
    [0.33, 0.66],
    ["#d1d5db", "#2563eb"]
  );
  const dotColor3 = useTransform(
    scrollYProgress,
    [0.66, 1],
    ["#d1d5db", "#2563eb"]
  );

  const dotColors = [dotColor1, dotColor2, dotColor3];

  return (
    <section ref={sectionRef} className="bg-white py-20 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-20 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why <span className="text-blue-600">Flow</span>
        </motion.h2>

        <div ref={timelineRef} className="relative">
          {/* Central Timeline Line - Background (gray) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2" />

          {/* Central Timeline Line - Animated (blue) */}
          <motion.div
            className="absolute left-1/2 top-0 w-1 bg-blue-600 transform -translate-x-1/2 origin-top"
            style={{ height: timelineHeight }}
          />

          <div className="space-y-32">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex items-center justify-between">
                {/* Background Text with scroll-based opacity */}
                <motion.div
                  className={`absolute text-[8rem] md:text-[12rem] font-bold text-gray-200 leading-none pointer-events-none ${
                    item.position === "left" ? "left-1/2 ml-16" : "right-1/2 mr-16"
                  }`}
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: opacities[index],
                  }}
                >
                  {item.backgroundText}
                </motion.div>

                {/* Left Content */}
                {item.position === "left" ? (
                  <div className="w-1/2 pr-16">
                    <motion.div
                      className="flex flex-col items-end text-right"
                      initial={{
                        opacity: 0,
                        x: -50,
                        y: 30,
                      }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2,
                      }}
                    >
                      {/* Icon */}
                      <div className="text-6xl mb-6">{item.icon}</div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-700 text-base md:text-lg">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="w-1/2"></div>
                )}

                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-1/2 top-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ backgroundColor: dotColors[index] }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ backgroundColor: dotColors[index] }}
                  ></motion.div>
                </motion.div>

                {/* Right Content */}
                {item.position === "right" ? (
                  <div className="w-1/2 pl-16">
                    <motion.div
                      className="flex flex-col items-start text-left"
                      initial={{
                        opacity: 0,
                        x: 50,
                        y: 30,
                      }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2,
                      }}
                    >
                      {/* Icon */}
                      <div className="text-6xl mb-6">{item.icon}</div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-700 text-base md:text-lg">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="w-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
