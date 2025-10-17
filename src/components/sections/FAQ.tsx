"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Lorem ipsum dolor sit amet",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, aenean ultrices accumsan locus. Vestibulum id nisi aliquet, commodo loque nec, convallis orci. Lorem ipsum dolor sit amet.",
  },
  {
    question: "Lorem ipsum dolor sit amet",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultrices accumsan locus.",
  },
  {
    question: "Lorem ipsum dolor sit amet",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id nisi aliquet.",
  },
  {
    question: "Lorem ipsum dolor sit amet",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo loque nec, convallis orci.",
  },
  {
    question: "Lorem ipsum dolor sit amet",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Want to learn more about our services?",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string>("item-0");

  const handleValueChange = (value: string) => {
    setOpenItem(value);
  };

  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked <span className="text-blue-600">Questions</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* FAQ Accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={handleValueChange}
            >
              {faqs.map((faq, index) => {
                const itemId = `item-${index}`;
                const isExpanded = openItem === itemId;
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <AccordionItem
                      value={itemId}
                      className={`rounded-2xl mb-4 px-6 border-0 transition-colors duration-300 ${
                        isExpanded ? "bg-[#1A68E433]" : "bg-[#F5F5F5]"
                      }`}
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-4 md:py-6 text-sm md:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 pb-4 md:pb-6 text-sm md:text-base">
                        {faq.answer}
                        <a
                          href="#"
                          className="text-blue-600 underline mt-2 inline-block hover:text-blue-700 text-sm"
                        >
                          Want to learn more?
                        </a>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1A68E433] border border-blue-400 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center h-full md:sticky md:top-24"
          >
            <motion.div
              className="text-4xl md:text-6xl mb-4 md:mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/rectangle.svg"
                alt="FAQ Icon"
                width={120}
                height={120}
                className="w-24 h-24 md:w-[200px] md:h-[200px]"
              />
            </motion.div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Still have doubts?
            </h3>
            <p className="text-gray-700 mb-6 md:mb-8 text-sm md:text-base">
              Connect with our customer support now!
            </p>
            <Button className="bg-[#1A68E433] border border-blue-600 text-blue-600 hover:bg-blue-700 rounded-full px-6 py-4 md:px-18 md:py-8 font-semibold transition-all hover:scale-105 text-sm md:text-base">
              Schedule A Call
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
