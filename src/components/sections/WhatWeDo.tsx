"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

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
    icon: "/card1.svg",
    bgColor: "bg-[#CBFFC2]", // Light green
    textColor: "0E3067",
    iconColor: "text-green-600",
    useCases: [
      {
        title: "AI-First Product Launches",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle1.svg",
      },
      {
        title: "Experimentation & Prototyping",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle2.svg",
      },
      {
        title: "Community-Driven Experiences",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle3.svg",
      },
    ],
  },
  {
    title: "Agentic development & integrated workflows",
    description:
      "We build high-performance websites and applications using cutting-edge technologies. Our solutions are scalable, secure, and designed to drive engagement and conversions.",
    icon: "/card2.svg",
    bgColor: "bg-[#EDC2FF]", // Light purple
    textColor: "0E3067",
    iconColor: "text-purple-600",
    useCases: [
      {
        title: "AI-First Product Launches",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle1.svg",
      },
      {
        title: "Experimentation & Prototyping",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle2.svg",
      },
      {
        title: "Community-Driven Experiences",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle3.svg",
      },
    ],
  },
  {
    title: "AI Gen Engineering",
    description:
      "We create tailored digital solutions that align with your business goals. From strategy to execution, we deliver innovative approaches that solve real-world challenges.",
    icon: "/card3.svg",
    bgColor: "bg-[#FFDAC2]", // Light orange/peach
    textColor: "0E3067",
    iconColor: "text-orange-600",
    useCases: [
      {
        title: "AI-First Product Launches",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle1.svg",
      },
      {
        title: "Experimentation & Prototyping",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle2.svg",
      },
      {
        title: "Community-Driven Experiences",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan lacus. Vestibulum id nisi aliquet, commodo lacus nec, convallis orci.",
        image: "/Rectangle3.svg",
      },
    ],
  },
];

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState(0);
  const [hoveredUseCase, setHoveredUseCase] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isInSection, setIsInSection] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [shouldGiggle, setShouldGiggle] = useState(false);
  const [giggleCardIndex, setGiggleCardIndex] = useState<number | null>(null);

  // Initialize GSAP ScrollTrigger animation
  useEffect(() => {
    if (typeof window === "undefined" || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,
          pin: true,
          pinSpacing: true,
          start: "top-=120px top",
          end: "+=2000",
          scrub: 1,
        },
      });

      // Card 1 animations
      tl.addLabel("card1");
      tl.to(".card1", {
        yPercent: 0,
        opacity: 1,
      });

      // Card 2 entrance
      tl.from(".card2", {
        yPercent: 110,
        // opacity: 0,
      });
      tl.addLabel("card2");

      // Update active nav for card 2
      tl.add(() => {
        const direction = tl.scrollTrigger?.direction || 1;
        setActiveNav(direction > 0 ? 1 : 0);
      }, "-=0.15");

      // Card 1 scales down and fades
      tl.to(
        ".card1",
        {
          scale: 0.95,
          yPercent: -0.5,
          opacity: 0,
        },
        "-=0.3"
      );

      // Card 2 fully visible
      tl.to(".card2", {
        yPercent: 0,
        opacity: 1,
      });

      // Card 3 entrance
      tl.from(".card3", {
        yPercent: 110,
        // opacity: 0,
      });
      tl.addLabel("card3");

      // Update active nav for card 3
      tl.add(() => {
        const direction = tl.scrollTrigger?.direction || 1;
        setActiveNav(direction > 0 ? 2 : 1);
      }, "-=0.15");

      // Card 2 scales down and fades
      tl.to(
        ".card2",
        {
          scale: 0.98,
          yPercent: -0.4,
          opacity: 0,
        },
        "-=0.3"
      );

      // Card 3 fully visible
      tl.to(".card3", {
        yPercent: 0,
        opacity: 1,
      });

      tl.to(".card3", {});

      timelineRef.current = tl;
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

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

  // Handle navigation circle clicks
  const handleNavClick = (index: number) => {
    if (!timelineRef.current) return;

    const tl = timelineRef.current;
    const st = tl.scrollTrigger;
    if (!st) return;

    const labels = ["card1", "card2", "card3"];
    const label = labels[index];
    const progress = tl.labels[label] / tl.duration();
    const scrollPosition = st.start + (st.end - st.start) * progress;
    const pad = index === 0 ? 0 : st.direction > 0 ? 2 : -2;

    gsap.to(window, {
      scrollTo: scrollPosition + pad,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const handleCardClick = (index: number) => {
    setSelectedService(index);
    setIsHoveringCard(false);
  };

  const handleBackClick = () => {
    // Store the current card index before closing
    setGiggleCardIndex(selectedService);

    // Trigger giggle animation
    setShouldGiggle(true);

    // Close the expanded card immediately to show the main card
    setSelectedService(null);
    setHoveredUseCase(null);

    // Reset giggle state after animation completes
    setTimeout(() => {
      setShouldGiggle(false);
      setGiggleCardIndex(null);
    }, 600);
  };

  // Handle scroll events within expanded card
  const handleExpandedCardScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    // Ensure scroll events are captured by the expanded card
    e.stopPropagation();

    // Additional scroll handling if needed
    if (expandedCardRef.current) {
      expandedCardRef.current.scrollTop += e.deltaY * 0.5;
    }
  };

  // Auto-scroll to use cases after card expansion
  useEffect(() => {
    // Removed automatic scrolling to allow user to scroll manually
    // This effect is now empty but kept for potential future use
  }, [selectedService]);

  // Prevent body scroll when card is expanded
  useEffect(() => {
    if (selectedService !== null) {
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
    // Scroll to second use case in mobile view, first use case in desktop view
    if (expandedCardRef.current && useCasesRef.current) {
      const isMobile = window.innerWidth < 768;
      const useCases = services[selectedService!].useCases;

      if (isMobile && useCases.length > 1) {
        // For mobile, scroll to the second use case
        const secondUseCaseElement = useCasesRef.current
          .children[1] as HTMLElement;
        if (secondUseCaseElement) {
          const offsetTop = secondUseCaseElement.offsetTop;
          expandedCardRef.current.scrollTo({
            top: offsetTop - 80,
            behavior: "smooth",
          });
        }
      } else {
        // For desktop, scroll to first use case as before
        const useCasesTop = useCasesRef.current.offsetTop;
        expandedCardRef.current.scrollTo({
          top: useCasesTop - 80,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      {/* Custom Cursor - Only on desktop - Rendered outside to avoid DOM issues */}
      <AnimatePresence>
        {isHoveringCard && selectedService === null && isInSection && (
          <motion.div
            className="fixed pointer-events-none z-50 hidden md:flex items-center justify-center"
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
              <div className="w-36 h-36 rounded-full bg-[#1A68E4] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">Know More</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        ref={containerRef}
        id="what-we-do"
        className="relative bg-white"
        onMouseEnter={() => setIsInSection(true)}
        onMouseLeave={() => setIsInSection(false)}
      >
        <div ref={cardsRef} className="relative h-screen overflow-hidden">
          {/* Header */}
          <div className="absolute top-8 left-0 right-0 z-10 px-4">
            <div className="max-w-[90vw] mx-auto">
              <motion.h2
                className="text-4xl md:text-6xl font-bold text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                What <span className="text-blue-600">We Do</span>
              </motion.h2>
            </div>
          </div>

          {/* Navigation circles */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 space-y-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index)}
                className="block"
              >
                {/* <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${
                    activeNav === index
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-transparent border-gray-900 text-gray-900"
                  }`}
                >
                  <span className="text-sm font-medium">{index + 1}</span>
                </div> */}
              </button>
            ))}
          </div>

          {/* Cards container */}
          <div className="absolute inset-0 px-4 pt-32">
            <div className="relative h-full max-w-8xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className={`card${index + 1} h-[60vh] md:h-full absolute inset-0 ${
                    service.bgColor
                  } rounded-[40px] shadow-xl cursor-pointer md:cursor-none `}
                  style={{
                    zIndex: index + 1,
                    top: "0px",
                    pointerEvents: index === activeNav ? "auto" : "none",
                  }}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => setIsHoveringCard(true)}
                  onMouseLeave={() => setIsHoveringCard(false)}
                  animate={
                    shouldGiggle && giggleCardIndex === index
                      ? {
                          // rotate: [0, -2, 2, -2, 2, 0],
                          scale: [1, 1.06, 0.94, 1.06, 0.94, 1],
                          // x: [0, 10, -10, 10, -10, 0],
                          // y: [0, 10, -10, 10, -10, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    ease: "easeInOut",
                  }}
                >
                  {/* Desktop view - keep existing layout without constant "Know More" button */}
                  <div className="hidden md:flex flex-col h-full px-8">
                    {/* Icon positioned at top right for desktop */}
                    <div className="absolute top-12 right-12">
                      <motion.div
                        className={`${service.iconColor} text-6xl md:text-8xl`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Image
                          src={service.icon}
                          alt={service.title}
                          width={180}
                          height={180}
                        />
                      </motion.div>
                    </div>

                    <div className="flex-grow flex items-center justify-center px-8 pointer-events-none">
                      <div className="px-10 max-w-8xl w-full flex flex-col-reverse md:flex-row items-center md:items-baseline justify-between gap-10">
                        <div
                          className={`${service.textColor} text-[#0E3067] max-w-4xl`}
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
                            className="text-lg md:text-xl leading-relaxed opacity-90 text-[#00050D]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {service.description}
                          </motion.p>
                        </div>
                        {/* Removed the duplicated icon from here since it's now positioned absolutely above */}
                      </div>
                    </div>
                  </div>

                  {/* Mobile view - new layout as described */}
                  <div className="md:hidden h-full relative flex flex-col">
                    {/* Icon positioned at top right */}
                    <div className="absolute top-6 right-6">
                      <motion.div
                        className={`${service.iconColor} text-3xl`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Image
                          src={service.icon}
                          alt={service.title}
                          width={70}
                          height={70}
                        />
                      </motion.div>
                    </div>

                    {/* Content area - properly aligned with padding for button */}
                    <div className="h-[80%] md:h-full flex flex-col justify-end p-6">
                      <div className={`$service.textColor} max-w-2xl`}>
                        <motion.h3
                          className="text-2xl font-bold mb-3 text-[#0E3067]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {service.title}
                        </motion.h3>
                        <motion.p
                          className="text-sm leading-relaxed opacity-90 text-[#00050D]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {service.description}
                        </motion.p>
                      </div>
                    </div>
                    {/* Know More Button - Positioned at bottom right with partial circle extending beyond card - No onClick, purely decorative */}
                    <div className="absolute -bottom-2 right-0 pointer-events-none z-30 overflow-visible">
                      <motion.div
                        className="relative inline-flex items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {/* Button with partial circle design that extends beyond the card */}
                        <div className="relative w-32 h-32 rounded-tl-full bg-[#1A68E4] flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xs absolute top-14 right-8 text-center leading-tight">
                            Know
                            <br />
                            More
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expanded view - Rendered as a fixed overlay outside the section */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            key={`expanded-${selectedService}`}
            ref={expandedCardRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
                mass: 1,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                mass: 1,
              },
            }}
            className={`fixed inset-0 z-[9999] ${services[selectedService].bgColor} overflow-y-auto overflow-x-hidden`}
            style={{ WebkitOverflowScrolling: "touch", maxHeight: "130vh" }}
            onWheel={handleExpandedCardScroll}
          >
            <div
              ref={scrollContainerRef}
              className="max-w-7xl mx-auto px-8 py-8 h-full"
              style={{ minHeight: "150vh" }}
            >
              {/* Back button */}
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={handleBackClick}
                  className="w-14 h-14 rounded-full bg-[#1A68E4]/30 bg-opacity-40 flex items-center justify-center hover:bg-opacity-30 transition-all"
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16."
                      fill="#1A68E4"
                    />
                  </svg>
                </button>
                <div className="md:hidden">
                  <Image
                    src={services[selectedService].icon}
                    alt="Icon"
                    width={172}
                    height={182}
                    className="w-20 h-auto object-contain"
                  />
                </div>
              </div>

              {/* Title and description section */}
              <div className="mb-12">
                <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-8">
                  <div className="max-w-5xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0E3067]">
                      {services[selectedService].title}
                    </h2>
                    <p className="text-lg text-black opacity-80">
                      {services[selectedService].description}
                    </p>
                  </div>
                  <div className="items-start ml-auto md:-mt-18 hidden md:block">
                    <Image
                      src={services[selectedService].icon}
                      alt="Icon"
                      width={172}
                      height={182}
                      className="w-40 h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Use cases section */}
              <div ref={useCasesRef} className="space-y-0 pb-20">
                {services[selectedService].useCases.map((useCase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="border-t border-black border-opacity-20 pt-12 pb-12 transition-all duration-300"
                    onMouseEnter={() => setHoveredUseCase(idx)}
                    onMouseLeave={() => setHoveredUseCase(null)}
                  >
                    <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-12">
                      <div className="flex-1 max-w-3xl">
                        <h3 className="text-3xl md:text-4xl  font-medium mb-6 text-[#0E3067]">
                          {useCase.title}
                        </h3>
                        <p className="text-base text-black opacity-80 mb-4">
                          {useCase.description}
                        </p>
                        <p className="text-base text-black opacity-80">
                          {useCase.details}
                        </p>
                      </div>

                      {/* "Scroll Down" button - Only shown for first use case (idx === 0) */}
                      {idx === 0 && (
                        <motion.button
                          onClick={handleScrollDown}
                          className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <div className="relative flex flex-col items-center">
                            <svg
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
                            <div className="w-36 h-36 rounded-full bg-[#1A68E4] flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                Scroll Down
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      )}
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative w-52 h-52 overflow-hidden">
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
