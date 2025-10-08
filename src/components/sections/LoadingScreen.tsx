"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
  isVisible: boolean;
  isInitialLoad?: boolean;
}

export default function LoadingScreen({
  onComplete,
  isVisible,
  isInitialLoad = false
}: LoadingScreenProps) {
  useEffect(() => {
    if (isInitialLoad && isVisible) {
      // After 2 seconds on initial load, trigger the logo animation to header
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad, isVisible, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
      initial={{ opacity: isInitialLoad ? 1 : 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={
          isInitialLoad
            ? { scale: 1, x: 0, y: 0 }
            : {
                scale: 0.35,
                x: typeof window !== "undefined" ? -window.innerWidth / 2.5 : -580,
                y: typeof window !== "undefined" ? -window.innerHeight / 2.5 : -320,
              }
        }
        animate={
          isVisible
            ? { scale: 1, x: 0, y: 0 }
            : {
                scale: 0.35,
                x: typeof window !== "undefined" ? -window.innerWidth / 2.5 : -580,
                y: typeof window !== "undefined" ? -window.innerHeight / 2.5 : -320,
              }
        }
        transition={{ duration: 1 }}
      >
        <Image src="/7.svg" alt="MakING FLOW Logo" width={200} height={200} priority />
        <motion.h1
          className="text-white text-4xl font-bold mt-6 text-center"
          initial={{ opacity: isInitialLoad ? 1 : 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
