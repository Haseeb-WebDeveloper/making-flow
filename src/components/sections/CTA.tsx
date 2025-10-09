"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="bg-white pt-20 px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center pb-20 relative z-10">
        {/* Animated background semi-circle */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100 rounded-t-full -z-10"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-[#0E3067]">Ready To</span>
            <br />
            <span className="text-[#0E3067]">Make It Flow?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Let&apos;s Turn Complexity Into Clarity And Build What Matters Most.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 rounded-full px-12 py-6 font-semibold text-lg shadow-lg">
              ⚡ Start Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
