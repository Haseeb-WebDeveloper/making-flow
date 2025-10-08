"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getSectionDimensions } from "@/lib/getSectionDimensions";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$19",
    period: "/month",
    features: [
      "Consequat ex prsident",
      "Deserunt sit cupidatat",
      "Amet id ea et nisi cillum",
    ],
    isPopular: false,
  },
  {
    name: "Essential",
    price: "$59",
    period: "/month",
    features: [
      "Consequat ex prsident",
      "Deserunt sit cupidatat",
      "Amet id ea et nisi cillum",
      "Extra feature included",
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: "$119",
    period: "/month",
    features: [
      "Consequat ex prsident",
      "Deserunt sit cupidatat",
      "Amet id ea et nisi cillum",
      "Premium support 24/7",
      "Advanced analytics",
    ],
    isPopular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const newDimensions = getSectionDimensions(sectionRef.current);
      setDimensions(newDimensions);
    };

    // Initial measurement
    updateDimensions();

    // Set up observers
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    // Update on scroll and resize
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", updateDimensions);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", updateDimensions);
    };
  }, []);

  return (
    <section id="pricing" className="relative bg-white my-30 " ref={sectionRef}>
      {/* Black Section with Rotating Background */}
      <div className="relative  sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Display dimensions in development mode */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute top-4 right-4 bg-black text-white p-2 rounded z-50 text-xs">
            W: {Math.round(dimensions.width)}px, H:{" "}
            {Math.round(dimensions.height)}px
          </div>
        )}

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ rotate: 180 }}
          whileInView={{ rotate: 0 }}
         
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.5,
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        >
          <svg
            viewBox="0 0 1440 1900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "120%", height: "120%" }}
            preserveAspectRatio="null" // Ensure the SVG fits within the container"
          >
            <path
              d="M0.300049 117.577C542.32 -209.113 864.832 264.427 1440.35 117.577C2015.88 -29.2731 2007.88 1326.06 1440.35 1760.77C872.833 2195.49 653.825 1444.1 0.300049 1760.77C-653.225 2077.45 -541.72 444.267 0.300049 117.577Z"
              fill="#090909"
            />
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Pricing Title */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Pricing
          </motion.h2>

          {/* Pricing Cards Container */}
          <div className="max-w-6xl mx-auto">
            {/* Top Row with Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {pricingPlans.slice(0, 2).map((plan, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                  }}
                >
                  {/* Pricing Card */}
                  <Card
                    className={`h-full bg-white rounded-2xl border border-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl  ${
                      plan.isPopular ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <div
                      className={`h-2 ${plan.isPopular ? "bg-blue-600" : "bg-gray-300"}`}
                    ></div>
                    <CardHeader className="text-center pb-6 pt-8">
                      <CardTitle className="text-xl font-bold text-gray-800 mb-3">
                        {plan.name}
                      </CardTitle>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-lg text-gray-600 ml-1">
                          {plan.period}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-8 pt-4 px-6">
                      {/* Features List */}
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 text-blue-600" />
                            </div>
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Button
                        className={`w-full rounded-lg py-5 text-base font-semibold transition-all duration-300 ${
                          plan.isPopular
                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                            : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                        }`}
                      >
                        Get started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row with One Card (Most Popular) */}
            <div className="flex justify-center">
              <motion.div
                className="relative w-full max-w-md"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
              >
                {/* Most Popular Badge */}
                {pricingPlans[2].isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full text-base font-bold shadow-xl transform transition-all duration-300 hover:scale-105">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Pricing Card - Enhanced for Popular Plan */}
                <Card
                  className={`h-full bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 shadow-2xl transition-all duration-300 hover:shadow-2xl  transform transition-transform duration-300 hover:-translate-y-2 ${
                    pricingPlans[2].isPopular ? "ring-4 ring-blue-500" : ""
                  }`}
                >
                  {/* Enhanced header for popular plan */}
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-700"></div>

                  <CardHeader className="text-center pb-6 pt-10 relative">
                    {/* Popular star icon for popular plan */}
                    {pricingPlans[2].isPopular && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </div>
                    )}

                    <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                      {pricingPlans[2].name}
                    </CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {pricingPlans[2].price}
                      </span>
                      <span className="text-xl text-gray-600 ml-1">
                        {pricingPlans[2].period}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-8 pt-4 px-6">
                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {pricingPlans[2].features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                            <Check className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-800 font-medium text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button - Enhanced for popular plan */}
                    <Button
                      className={`w-full rounded-xl py-6 text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
                        pricingPlans[2].isPopular
                          ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 hover:shadow-xl"
                          : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                      }`}
                    >
                      Get started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
