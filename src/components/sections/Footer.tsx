"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function Footer() {
  return (
    <footer className="bg-[#1D4ED8] py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-3 gap-12 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo and Description */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/7.svg" alt="Logo" width={100} height={100} />
              <div className="text-white font-bold text-2xl tracking-tight">
                
              </div>
            </div>
            
            <p className="text-white/80 text-sm max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
              nunc ante aliquet etiam. Est tellus vitae, nullam lobortis enim.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-bold text-xl mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="#what-we-do"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  What we do
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="#why-flow"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Why Flow
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="#pricing"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="#faq"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-bold text-xl mb-6">CONTACT</h3>
            <ul className="space-y-3 text-white/90 text-sm">
              <li>Email: info@makingflow.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Flow Street, Design City</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/60 text-sm text-center md:text-left">
            © 2025 MakingFlow is a division of Figmenta group | All Rights
            Reserved
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Terms and conditions
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
