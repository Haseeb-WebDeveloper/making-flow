"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for Hero section animation
  const { scrollY } = useScroll();

  // Add spring physics for smoother animations regardless of scroll speed
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const smoothScrollY = useSpring(scrollY, springConfig);

  // Hero section is 150vh (based on Hero.tsx), calculate scroll progress within that range
  const heroHeight =
    typeof window !== "undefined" ? window.innerHeight * 1.5 : 1500;

  // Black screen animation - fades out smoothly as user scrolls with spring physics
  const blackScreenOpacity = useTransform(
    smoothScrollY,
    [0, heroHeight * 0.4],
    [1, 0]
  );

  // Logo animation - moves from center to top-left with spring physics
  const logoScale = useTransform(
    smoothScrollY,
    [0, heroHeight * 0.5],
    [1, 0.25]
  );
  const logoX = useTransform(smoothScrollY, [0, heroHeight * 0.5], [0, -650]);
  const logoY = useTransform(smoothScrollY, [0, heroHeight * 0.5], [0, -380]);

  // Logo color - white on black, then normal colors with smoother transition
  const logoInvert = useTransform(smoothScrollY, [0, heroHeight * 0.4], [1, 0]);
  const logoBrightness = useTransform(
    smoothScrollY,
    [0, heroHeight * 0.4],
    [10, 1]
  );

  // All header elements appear when Hero logo fades out with spring physics
  const headerOpacity = useTransform(
    smoothScrollY,
    [heroHeight * 0.3, heroHeight * 0.4],
    [0, 1]
  );
  const headerX = useTransform(
    smoothScrollY,
    [heroHeight * 0.3, heroHeight * 0.6],
    [50, 0]
  );

  // Hide hamburger menu during black screen (0 to 0.3 scroll progress) with spring physics
  const mobileMenuOpacity = useTransform(
    smoothScrollY,
    [0, heroHeight * 0.2, heroHeight * 0.4],
    [0, 0, 1]
  );

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is 150vh tall, header should turn white when user scrolls past it
      const heroEnd = window.innerHeight * 1.4;

      // Change background to white when scrolled past hero section
      if (window.scrollY > heroEnd) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Black screen overlay - fades out smoothly as user scrolls with spring physics */}
      <motion.div
        className="fixed inset-0 bg-black z-40 pointer-events-none"
        style={{ opacity: blackScreenOpacity }}
      />

      {/* Animated Logo - moves from center to header position with spring physics */}
      {!scrolled && (
        <motion.div
          style={{
            scale: logoScale,
            x: logoX,
            y: logoY,
          }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <motion.div
            style={{
              filter: `invert(${logoInvert}) brightness(${logoBrightness})`,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
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
      )}

      {/* Static Header Logo - appears when scrolled past hero */}
      {scrolled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-3 left-8 z-[100]"
        >
          <Image
            src="/7 (1).svg"
            alt="Making Flow Logo"
            width={80}
            height={80}
            className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] ml-50"
            priority
          />
        </motion.div>
      )}

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-2 sm:py-2"
        }`}
      >
        <div
          className={`container mx-auto ${scrolled ? "py-2" : "py-10"} px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-50`}
        >
          {/* Empty space for logo alignment */}
          <div className="flex items-center">
            <div className={scrolled ? "w-[100px]" : "w-[150px]"} />
          </div>

          {/* Desktop Navigation - Top Right - slides in from right */}
          <motion.nav
            className="hidden lg:flex items-center gap-4 lg:gap-6"
            style={{
              opacity: headerOpacity,
              x: headerX,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <button
              className={`text-sm lg:text-base font-bold transition-all px-4 lg:px-6 py-2 lg:py-3 rounded-[49px] border ${
                scrolled
                  ? "text-blue-600 bg-[#1A68E433] border-blue-600/30 hover:bg-blue-50"
                  : "text-white bg-white/20 border-white/20 hover:bg-white/10"
              }`}
              onClick={() => handleNavClick("whatWeDo")}
            >
              what we do
            </button>
            <button
              className={`text-sm lg:text-base font-bold transition-all px-4 lg:px-6 py-2 lg:py-3 rounded-[49px] border ${
                scrolled
                  ? "text-blue-600 bg-[#1A68E433] border-blue-600/30 hover:bg-blue-50"
                  : "text-white bg-white/20 border-white/20 hover:bg-white/10"
              }`}
              onClick={() => handleNavClick("pricing")}
            >
              Pricing
            </button>
            <Button
              className={`rounded-[42px] px-6 lg:px-20 py-3 h-auto text-sm lg:text-base font-bold transition-all hover:scale-105 border hover:border-[7px] ${
                scrolled
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : "bg-white text-[#1A68E4] border-white/20 hover:bg-gray-100"
              }`}
            >
              Schedule a call
            </Button>
          </motion.nav>

          {/* Mobile & Tablet Navigation - Hamburger Menu */}
          <motion.div
            className="lg:hidden"
            style={{
              opacity: mobileMenuOpacity,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 transition-colors ${
                    scrolled
                      ? "text-blue-600 hover:bg-blue-50"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gradient-to-b from-[#1D4ED8] to-[#2563EB] border-0 w-[85vw] sm:w-[400px] max-w-[400px]"
              >
                <SheetHeader className="border-b border-white/20 pb-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-white text-xl font-bold">
                      Menu
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 h-8 w-8"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <nav className="flex flex-col gap-4 m-8 mt-8">
                  <button
                    className="text-white text-left font-medium hover:bg-white/10 transition-all px-6 py-4 rounded-xl "
                    onClick={() => handleNavClick("whatWeDo")}
                  >
                    What We Do
                  </button>
                  <button
                    className="text-white text-left font-medium hover:bg-white/10 transition-all px-6 py-4 rounded-xl "
                    onClick={() => handleNavClick("pricing")}
                  >
                    Pricing
                  </button>
                  <Button
                    className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl px-6 py-6 font-semibold text-base mt-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Schedule A Call
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
}
