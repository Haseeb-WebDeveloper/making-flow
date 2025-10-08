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
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0 }}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
        {/* Logo - Top Left */}
        <motion.div
          className="flex items-center z-50"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/7.svg"
            alt="Logo"
            width={60}
            height={60}
            className="sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
          />
        </motion.div>

        {/* Desktop Navigation - Top Right */}
        <nav className="hidden lg:flex items-center gap-4 lg:gap-6">
          <button
            className="text-white text-sm lg:text-base font-medium hover:opacity-80 transition-opacity px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/30"
            onClick={() => handleNavClick("whatWeDo")}
          >
            What We Do
          </button>
          <button
            className="text-white text-sm lg:text-base font-medium hover:opacity-80 transition-opacity px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/30"
            onClick={() => handleNavClick("pricing")}
          >
            Pricing
          </button>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-6 lg:px-8 py-4 lg:py-6 text-sm lg:text-base font-semibold transition-all hover:scale-105">
            Schedule A Call
          </Button>
        </nav>

        {/* Mobile & Tablet Navigation - Hamburger Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-10 w-10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gradient-to-b from-[#1D4ED8] to-[#2563EB] border-0 w-[85vw] sm:w-[400px]"
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
