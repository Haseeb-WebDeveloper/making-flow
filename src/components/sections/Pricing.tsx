"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
  return (
    <section id="pricing" className="relative bg-white">
      {/* Top Wave - White to Black */}
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 C320,20 480,80 720,50 C960,20 1120,80 1440,50 L1440,100 L0,100 Z"
          fill="#000000"
        />
      </svg>

      {/* Black Section with Rotating Background */}
      <div className="relative bg-black py-20 px-8">
        <motion.div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          initial={{ rotate: 180 }}
          whileInView={{ rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, type: "spring", stiffness: 50, damping: 20 }}
        >
          <svg
            width="1440"
            height="1900"
            viewBox="0 0 1440 1900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
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
            className="text-5xl md:text-6xl font-bold text-center mb-20 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Pricing
          </motion.h2>

          {/* Pricing Cards Container */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 justify-center items-stretch"
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative flex-1 max-w-sm ${
                  plan.isPopular ? "md:scale-105 md:-mt-4" : ""
                }`}
              >
                {/* Most Popular Badge */}
                {plan.isPopular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold z-20 shadow-lg">
                    Most popular
                  </Badge>
                )}

                {/* Pricing Card */}
                <Card
                  className={`h-full bg-white rounded-3xl border-0 shadow-2xl transition-all hover:shadow-3xl hover:-translate-y-2 duration-300 ${
                    plan.isPopular
                      ? "ring-4 ring-blue-600 bg-gradient-to-br from-white to-blue-50"
                      : ""
                  }`}
                >
                  <CardHeader className="text-center pb-8 pt-10">
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-6">
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-6xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-xl text-gray-600 ml-2">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-10">
                    {/* Features List */}
                    <ul className="space-y-5 mb-10">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                            <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                          </div>
                          <span className="text-gray-700 text-base leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className={`w-full rounded-full py-7 text-lg font-semibold transition-all duration-300 ${
                        plan.isPopular
                          ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:scale-105"
                          : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:scale-105"
                      }`}
                    >
                      Get started
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave - Black to White */}
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 C320,80 480,20 720,50 C960,80 1120,20 1440,50 L1440,0 L0,0 Z"
          fill="#000000"
        />
      </svg>
    </section>
  );
}
