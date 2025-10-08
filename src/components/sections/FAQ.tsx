"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

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
  return (
    <section className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked <span className="text-blue-600">Questions</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FAQ Accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible defaultValue="item-0">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-blue-50 rounded-2xl mb-4 px-6 border-0"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 pb-6">
                      {faq.answer}
                      <a
                        href="#"
                        className="text-blue-600 underline mt-2 inline-block hover:text-blue-700"
                      >
                        Want to learn more?
                      </a>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-blue-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center h-fit md:sticky md:top-24"
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💬
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have doubts?
            </h3>
            <p className="text-gray-700 mb-8">
              Connect with our customer support now!
            </p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-12 py-6 font-semibold transition-all hover:scale-105">
              Schedule A Call
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
