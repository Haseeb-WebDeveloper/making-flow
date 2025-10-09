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
import { motion, useScroll, useTransform } from "framer-motion";
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

  // Hero section is 200vh, calculate scroll progress within that range
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight * 2 : 2000;

  // All header elements slide in together from right during Hero animation
  const headerOpacity = useTransform(scrollY, [0, heroHeight * 0.4], [0, 1]);
  const headerX = useTransform(scrollY, [0, heroHeight * 0.4], [200, 0]);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is 200vh tall
      const heroSectionHeight = window.innerHeight * 2;

      // Change background to white after scrolling past Hero section
      if (window.scrollY > heroSectionHeight) {
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
    <motion.header
      className={`fixed py-4 top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-0" : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo - Top Left - slides in from right */}
        <motion.div
          className="flex items-center z-50"
          style={{
            opacity: headerOpacity,
            x: headerX
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={scrolled ? "/7 (1).svg" : "/7.svg"}
            alt="Logo"
            width={scrolled ? 50 : 100}
            height={scrolled ? 50 : 100}
            className={`transition-all duration-300 ${scrolled ? "w-[150px] h-[150px]" : "w-[150px] h-[150px]"}`}
          />
        </motion.div>

        {/* Desktop Navigation - Top Right - slides in from right */}
        <motion.nav
          className="hidden lg:flex items-center gap-4 lg:gap-6"
          style={{
            opacity: headerOpacity,
            x: headerX
          }}
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
            className={`rounded-[42px] px-6 lg:px-20 py-2.5 h-auto text-sm lg:text-base font-bold transition-all hover:scale-105 border-[7px] ${
              scrolled
                ? "bg-[#1A68E433] text-blue-600 border-blue-600/30 hover:bg-blue-50"
                : "bg-white text-[#1A68E4] border-white/20 hover:bg-gray-100"
            }`}
          >
            Schedule a call
          </Button>
        </motion.nav>

        {/* Mobile & Tablet Navigation - Hamburger Menu */}
        <div className="lg:hidden">
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
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  className="text-white text-left font-medium hover:bg-white/10 transition-all px-6 py-4 rounded-xl border border-white/30"
                  onClick={() => handleNavClick("whatWeDo")}
                >
                  What We Do
                </button>
                <button
                  className="text-white text-left font-medium hover:bg-white/10 transition-all px-6 py-4 rounded-xl border border-white/30"
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
        </div>
      </div>
    </motion.header>
  );
}
