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
    <section id="pricing" className="relative bg-white my-90 " ref={sectionRef}>
      {/* Black Section with Rotating Background */}
      <div className="relative  sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Display dimensions in development mode */}
        {/* {process.env.NODE_ENV === "development" && (
          // <div className="absolute top-4 right-4 bg-black text-white p-2 rounded z-50 text-xs">
          //   W: {Math.round(dimensions.width)}px, H:{" "}
          //   {Math.round(dimensions.height)}px
          // </div>
        )} */}

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
            style={{ width: "160%", height: "160%" }}
            // preserveAspectRatio="none" // Ensure the SVG fits within the container"

          >
            <path
              d="M0.300049 117.577C542.32 -209.113 864.832 264.427 1440.35 117.577C2015.88 -29.2731 2007.88 1326.06 1440.35 1760.77C872.833 2195.49 653.825 1444.1 0.300049 1760.77C-653.225 2077.45 -541.72 444.267 0.300049 117.577Z"
              fill="#090909"
            />
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Pricing Title */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold  text-center mb-26 text-white"
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
              {/* Left Card - Fade in from left */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full bg-white rounded-2xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
                  
                  <CardHeader className="text-center pb-6 pt-8">
                    <CardTitle className="text-xl font-bold text-gray-800 mb-3">
                      Basic
                    </CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        $19
                      </span>
                      <span className="text-base text-gray-600">/month</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-8 pt-4 px-6">
                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Consequat ex prsident
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Deserunt sit cupidatat
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Amet id ea et nisi cillum
                        </span>
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg py-5 text-base font-semibold transition-all duration-300 hover:shadow-lg">
                      Get started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Card - Fade in from right */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full rounded-2xl border-2 border-blue-500 bg-gradient-to-b from-white to-gray-50 shadow-xl ring-2 ring-blue-500 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative">
                  {/* Most Popular Badge */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-30 py-3 text-lg rounded-lg font-semibold shadow-lg">
                      Most Popular ✨
                    </Badge>
                  </div>

              
                  <CardHeader className="text-center pb-6 pt-10 relative">
                    

                    <CardTitle className="text-xl font-bold text-blue-600 mb-3">
                      Essential
                    </CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-blue-600">
                        $59
                      </span>
                      <span className="text-lg text-blue-500">/month</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-8 pt-4 px-6">
                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-gray-800 font-medium">
                          Consequat ex prsident
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-gray-800 font-medium">
                          Deserunt sit cupidatat
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-gray-800 font-medium">
                          Amet id ea et nisi cillum
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-gray-800 font-medium">
                          Extra feature included
                        </span>
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-5 text-base font-semibold transition-all duration-300 hover:shadow-lg">
                      Get started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Bottom Row with One Card - Fade up from bottom */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full max-w-md"
              >
                <Card className="h-full bg-white rounded-2xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
               
                  <CardHeader className="text-center pb-6 pt-8">
                    <CardTitle className="text-xl font-bold text-gray-800 mb-3">
                      Premium
                    </CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        $119
                      </span>
                      <span className="text-base text-gray-600">/month</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-8 pt-4 px-6">
                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Consequat ex prsident
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Deserunt sit cupidatat
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Amet id ea et nisi cillum
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Premium support 24/7
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-gray-700">
                          Advanced analytics
                        </span>
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg py-5 text-base font-semibold transition-all duration-300 hover:shadow-lg">
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
