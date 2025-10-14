"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface UseCase {
  title: string;
  description: string;
  details: string;
  image: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
  useCases: UseCase[];
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
    useCases: [
      {
        title: "AI-First Product Launches",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/1 1.svg",
      },
      {
        title: "Experimentation & Prototyping",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/2 1.svg",
      },
      {
        title: "Community-Driven Experiences",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/3 1.svg",
      },
    ],
  },
  {
    title: "Agentic development & integrated workflows",
    description:
      "We build high-performance websites and applications using cutting-edge technologies. Our solutions are scalable, secure, and designed to drive engagement and conversions.",
    icon: "M12 2s8 4 8 12c0 8-8 12-8 12s-8-4-8-12c0-8 8-12 8-12zm0 15a3 3 0 100-6 3 3 0 000 6z",
    bgColor: "bg-[#EDC2FF]", // Light purple
    textColor: "text-gray-900",
    iconColor: "text-purple-600",
    useCases: [
      {
        title: "AI-First Product Launches",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/4 1.svg",
      },
      {
        title: "Experimentation & Prototyping",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/5 1.svg",
      },
      {
        title: "Community-Driven Experiences",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/6 1.svg",
      },
    ],
  },
  {
    title: "AI Gen Engineering",
    description:
      "We create tailored digital solutions that align with your business goals. From strategy to execution, we deliver innovative approaches that solve real-world challenges.",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-5-8a5 5 0 005 5 5 5 0 005-5 5 5 0 00-5-5 5 5 0 00-5 5z",
    bgColor: "bg-[#FFDAC2]", // Light orange/peach
    textColor: "text-gray-900",
    iconColor: "text-orange-600",
    useCases: [
      {
        title: "AI-First Product Launches",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/7 1.svg",
      },
      {
        title: "Experimentation & Prototyping",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/8 1.svg",
      },
      {
        title: "Community-Driven Experiences",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/1 1.svg",
      },
    ],
  },
];

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [hoveredUseCase, setHoveredUseCase] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create progress segments for each service - ALWAYS create all hooks
  const service0Progress = useTransform(scrollYProgress, [0, 1 / 3], [0, 1]);
  const service1Progress = useTransform(
    scrollYProgress,
    [1 / 3, 2 / 3],
    [0, 1]
  );
  const service2Progress = useTransform(scrollYProgress, [2 / 3, 1], [0, 1]);

  const serviceProgress = [
    service0Progress,
    service1Progress,
    service2Progress,
  ];

  // Track if cursor is within the What We Do section
  const [isInSection, setIsInSection] = useState(false);

  // Track mouse position for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    if (selectedService === null && isInSection) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [selectedService, isInSection]);

  // Auto-scroll to use cases after card expansion
  useEffect(() => {
    if (
      selectedService !== null &&
      expandedCardRef.current &&
      useCasesRef.current
    ) {
      setTimeout(() => {
        const useCasesTop = useCasesRef.current!.offsetTop;
        expandedCardRef.current?.scrollTo({
          top: useCasesTop - 100,
          behavior: "smooth",
        });
      }, 500);
    }
  }, [selectedService]);

  // Prevent body scroll when card is expanded (but allow scroll within the card)
  useEffect(() => {
    if (selectedService !== null) {
      // Prevent scroll on the body, but the fixed overlay will have its own scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedService]);

  // Handle scroll down button click
  const handleScrollDown = () => {
    if (expandedCardRef.current && useCasesRef.current) {
      const useCasesTop = useCasesRef.current.offsetTop;

      expandedCardRef.current.scrollTo({
        top: useCasesTop - 100, // Offset by 100px for better visibility
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (index: number) => {
    setSelectedService(index);
    setIsHoveringCard(false);
  };

  const handleBackClick = () => {
    setSelectedService(null);
    setHoveredUseCase(null);
  };

  // Pre-calculate all transformations for each service (avoid hooks in conditionals/loops)
  const service0Transforms = {
    yPosition: useTransform(serviceProgress[0], [0, 1], [100, 0]),
    opacity: useTransform(serviceProgress[0], [0, 0.3, 1], [0, 1, 1]),
    scale: useTransform(serviceProgress[0], [0, 1], [0.9, 0.9]),
    iconRotate: useTransform(serviceProgress[0], [0, 0.5, 1], [0, 10, 0]),
    iconScale: useTransform(serviceProgress[0], [0, 0.5, 1], [0.8, 1.2, 1]),
  };

  const service1Transforms = {
    yPosition: useTransform(serviceProgress[1], [0, 1], [100, 0]),
    opacity: useTransform(serviceProgress[1], [0, 0.3, 1], [0, 1, 1]),
    scale: useTransform(serviceProgress[1], [0, 1], [0.9, 0.9]),
    iconRotate: useTransform(serviceProgress[1], [0, 0.5, 1], [0, 10, 0]),
    iconScale: useTransform(serviceProgress[1], [0, 0.5, 1], [0.8, 1.2, 1]),
  };

  const service2Transforms = {
    yPosition: useTransform(serviceProgress[2], [0, 1], [100, 0]),
    opacity: useTransform(serviceProgress[2], [0, 0.3, 1], [0, 1, 1]),
    scale: useTransform(serviceProgress[2], [0, 1], [0.9, 0.9]),
    iconRotate: useTransform(serviceProgress[2], [0, 0.5, 1], [0, 10, 0]),
    iconScale: useTransform(serviceProgress[2], [0, 0.5, 1], [0.8, 1.2, 1]),
  };

  const allServiceTransforms = [
    service0Transforms,
    service1Transforms,
    service2Transforms,
  ];

  return (
    <>
      <section
        ref={ref}
        id="what-we-do"
        className="relative h-[300vh] bg-white"
        onMouseEnter={() => setIsInSection(true)}
        onMouseLeave={() => setIsInSection(false)}
      >
        {/* Custom Cursor - Only on desktop */}
        <AnimatePresence>
          {isHoveringCard && selectedService === null && isInSection && (
            <motion.div
              className="fixed pointer-events-none z-50 flex items-center justify-center"
              style={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                {/* Arrow pointer */}
                <svg
                  className="absolute -top-16 left-1/2 -translate-x-1/2"
                  width="40"
                  height="52"
                  viewBox="0 0 58 70"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M43.3435 69.593L58.9766 0.335449L97.8464 61.9163L67.3451 55.0314L66.5699 55.42L43.3435 69.593Z"
                    fill="white"
                    transform="scale(0.6)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M61.0586 11.2676L50.1155 59.7479L65.7703 50.2297L66.5989 49.7837L88.3897 54.7398L61.0586 11.2676Z"
                    fill="black"
                    transform="scale(0.6)"
                  />
                </svg>
                {/* Blue circle with text */}
                <div className="w-36 h-36 rounded-full bg-[#1A68E4] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    Know More
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            key="cards"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-7xl font-bold mb-16 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                What <span className="text-blue-600">We Do</span>
              </motion.h2>
            </div>

            <div className="absolute inset-0 mt-12 px-4">
              {[...services].reverse().map((service, reverseIndex) => {
                const index = services.length - 1 - reverseIndex;
                const transforms = allServiceTransforms[index];

                return (
                  <motion.div
                    key={index}
                    className={`absolute inset-0 ${service.bgColor} rounded-3xl flex items-center justify-center md:cursor-none`}
                    style={{
                      y: transforms.yPosition,
                      opacity: transforms.opacity,
                      scale: transforms.scale,
                      zIndex: index,
                    }}
                    onMouseEnter={() => setIsHoveringCard(true)}
                    onMouseLeave={() => setIsHoveringCard(false)}
                  >
                    <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-10 px-8 relative">
                      <div
                        className={`${service.textColor} max-w-2xl md:cursor-none cursor-default`}
                        onClick={() => handleCardClick(index)}
                      >
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

                        {/* Mobile Know More Button */}
                        <motion.button
                          className="md:hidden mt-8 relative inline-flex items-center"
                          onClick={() => handleCardClick(index)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="relative">
                            {/* Arrow pointer */}
                            <svg
                              className="absolute -top-12 left-1/2 -translate-x-1/2 rotate-90"
                              width="30"
                              height="40"
                              viewBox="0 0 58 70"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M43.3435 69.593L58.9766 0.335449L97.8464 61.9163L67.3451 55.0314L66.5699 55.42L43.3435 69.593Z"
                                fill="white"
                                transform="scale(0.5)"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M61.0586 11.2676L50.1155 59.7479L65.7703 50.2297L66.5989 49.7837L88.3897 54.7398L61.0586 11.2676Z"
                                fill="black"
                                transform="scale(0.5)"
                              />
                            </svg>
                            {/* Blue circle with text */}
                            <div className="w-32 h-32 rounded-full bg-[#1A68E4] flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-base">
                                Know More
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      </div>
                      <motion.div
                        className={`${service.iconColor} text-6xl md:text-8xl md:cursor-none`}
                        style={{
                          rotate: transforms.iconRotate,
                          scale: transforms.iconScale,
                        }}
                        onClick={() => handleCardClick(index)}
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
          </motion.div>
        </div>
      </section>

      {/* Expanded view - Rendered as a fixed overlay outside the section */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            key={`expanded-${selectedService}`}
            ref={expandedCardRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed inset-0 z-[9999] ${services[selectedService].bgColor} overflow-y-scroll overscroll-contain`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="max-w-7xl mx-auto px-8 py-8 min-h-full">
              {/* Back button */}
              <button
                onClick={handleBackClick}
                className="mb-8 w-14 h-14 rounded-full bg-[#1A68E4] bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#1A68E4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Title and description section (no "What we do" header) */}
              <div className="mb-12">
                <div className="flex items-start justify-between gap-8">
                  <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0E3067]">
                      {services[selectedService].title}
                    </h2>
                    <p className="text-lg text-black opacity-80">
                      {services[selectedService].description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="/7.png"
                      alt="Icon"
                      width={172}
                      height={182}
                      className="w-40 h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* "Scroll Down" cursor indicator - clickable */}
              <div className="relative mb-8">
                <motion.button
                  onClick={handleScrollDown}
                  className="mx-auto w-fit block cursor-pointer hover:opacity-80 transition-opacity"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative flex flex-col items-center">
                    <svg width="40" height="52" viewBox="0 0 58 70" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M43.3435 69.593L58.9766 0.335449L97.8464 61.9163L67.3451 55.0314L66.5699 55.42L43.3435 69.593Z"
                        fill="white"
                        transform="scale(0.6)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M61.0586 11.2676L50.1155 59.7479L65.7703 50.2297L66.5989 49.7837L88.3897 54.7398L61.0586 11.2676Z"
                        fill="black"
                        transform="scale(0.6)"
                      />
                    </svg>
                    <div className="w-36 h-36 rounded-full bg-[#1A68E4] flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        Scroll Down
                      </span>
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Use cases section */}
              <div ref={useCasesRef} className="space-y-0 pb-20">
                {services[selectedService].useCases.map((useCase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className={`border-t border-black border-opacity-20 pt-12 pb-12 transition-all duration-300 ${
                      hoveredUseCase === idx
                        ? "bg-white bg-opacity-40 rounded-3xl px-8"
                        : ""
                    }`}
                    onMouseEnter={() => setHoveredUseCase(idx)}
                    onMouseLeave={() => setHoveredUseCase(null)}
                  >
                    <div className="flex items-start justify-between gap-12">
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-medium mb-6 text-[#0E3067]">
                          {useCase.title}
                        </h3>
                        <p className="text-base text-black opacity-80 mb-4">
                          {useCase.description}
                        </p>
                        <p className="text-base text-black opacity-80">
                          {useCase.details}
                        </p>
                      </div>
                      <motion.div
                        className="flex-shrink-0"
                        animate={{
                          scale: hoveredUseCase === idx ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative w-52 h-52 rounded-full overflow-hidden bg-gray-200">
                          <Image
                            src={useCase.image}
                            alt={useCase.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
