"use client";

import { homePageLogos } from "@/constants/media";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomePageLogos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Set initial state
    gsap.set(container, { opacity: 0 });

    // Create animation
    gsap.to(container, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 justify-center items-center"
    >
      {homePageLogos.map((logo, index) => {
        return (
          <div
            key={index}
            className={`
                            flex justify-center items-center aspect-square md:p-[3.5vw] py-[5vw] px-[8vw] border-[#2112d4]/70
                            ${index == 0 ? "border-b-[0.5px] border-r-[0.5px]" : ""}
                            ${index == 1 ? "border-b-[0.5px] md:border-r-[0.5px] border-r-0" : ""}
                            ${index == 2 ? "border-b-[0.5px]  border-r-[0.5px]" : ""}
                            ${index == 3 ? "border-b-[0.5px] md:border-r-0 border-r-0" : ""}
                            ${index == 4 ? "md:border-b-0 border-b-[0.5px] border-r-[0.5px]" : ""}
                            ${index == 5 ? "md:border-b-0 border-b-[0.5px] md:border-r-[0.5px] border-r-0" : ""}
                            ${index == 6 ? "md:border-b-0 border-r-[0.5px]" : ""}
                            ${index == 7 ? "md:border-b-0 md:border-r-0" : ""}
                        `}
          >
            <Image
              src={logo}
              alt={`Logo ${index + 1}`}
              width={800}
              height={800}
              className="w-full object-contain md:h-[10vw] h-[20vw]"
            />
          </div>
        );
      })}
    </div>
  );
}
