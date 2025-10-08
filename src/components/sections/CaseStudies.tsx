"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const VideoCard = ({ videoUrl }: { videoUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      className="video-content aspect-video w-full h-full min-h-[90vw] md:min-h-full md:rounded-lg rounded-none object-cover"
      autoPlay
      preload="metadata"
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
};

const HomePageCaseStudies = ({ caseStudies }: { caseStudies: any[] }) => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const mmRef = useRef<gsap.MatchMedia | null>(null);
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    // Check if we need to restore scroll position
    const storedPosition = sessionStorage.getItem("caseStudyScrollPosition");
    if (storedPosition) {
      const index = parseInt(storedPosition);
      if (cardsRef.current[index]) {
        setTimeout(() => {
          cardsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
          // Clear the stored position after scrolling
          sessionStorage.removeItem("caseStudyScrollPosition");
        }, 100);
      }
    }
  }, []);

  const handleCaseStudyClick = (
    e: React.MouseEvent,
    caseStudy: any,
    index: number
  ) => {
    e.preventDefault();
    // Store the navigation info in sessionStorage
    sessionStorage.setItem("caseStudySource", "home");
    sessionStorage.setItem("caseStudyPosition", index.toString());
    // Navigate to the case study
    router.push(`/works/${caseStudy.slug}`);
  };

  const initializeAnimations = useRef((elements: HTMLDivElement[]) => {
    elements.forEach((card, index) => {
      const createScrollTrigger = (card: HTMLDivElement, index: number) => {
        const isLast = index === elements.length - 1;
        return {
          trigger: card,
          start: "top top",
          endTrigger: isLast ? card : elements[index + 1],
          end: "top isMobile ? top+=120 : top+=120",
          pin: true,
          pinSpacing: false,
          id: `card-pin-${index}`,
          anticipatePin: 1,
        };
      };

      ScrollTrigger.create({
        ...createScrollTrigger(card, index),
        scrub: true, // Add scrub for smoother pinning
      });

      const animElements = {
        title: {
          selector: ".title",
          props: { y: -80, x: 0, scale: 1 },
        },
        video: {
          selector: ".video-container video",
          props: { y: 0, x: 0, scale: 0.6 },
        },
        description: {
          selector: ".description",
          props: { y: 0, x: 500, scale: 1 },
        },
      };

      Object.entries(animElements).forEach(([_, { selector, props }]) => {
        const element = card.querySelector(selector);
        if (!element) return;

        gsap.fromTo(
          element,
          { opacity: 0, ...props },
          {
            ease: "power1.inOut",
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card.querySelector(".content"),
              scrub: true,
              start: "top-=40% top+=80%",
              end: "bottom-=40% top+=60%",
              id: `animation-${index}`,
            },
          }
        );
      });
    });
  }).current;

  useEffect(() => {
    mmRef.current = gsap.matchMedia();

    mmRef.current.add("(min-width: 320px)", () => {
      if (cardsRef.current.length > 0) {
        initializeAnimations(cardsRef.current);
      }
    });

    return () => {
      if (mmRef.current) {
        mmRef.current.revert();
      }
    };
  }, []);

  return (
    <section className="case-studies overflow-hidden bg-background">
      <div className="w-full">
        {caseStudies?.map((caseStudy: any, index: number) => (
          <div
            key={caseStudy.slug}
            className={`case-study ${isMobile ? "h-[130vh] py-[15vh] " : "md:h-[120vh] py-[12vh] "}
              ${index === 0 && "bg-[#0E0E0E]"}
              ${index === 1 && "bg-[#230E25]"}
              ${index === 2 && "bg-[#111111]"}
              ${index === 3 && "bg-[#230E25]"}
            `}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="overflow-hidden cursor-pointer"
              onClick={(e) => handleCaseStudyClick(e, caseStudy, index)}
            >
              <div className="content flex flex-col gap-[20vw] md:gap-[1.5vw] py-[6vh] mx-auto relative md:max-w-[50vw]">
                {caseStudy.featuredVideo && (
                  <div className="video-container md:max-w-[50vw] min-h-[90vw] md:min-h-full mx-auto h-full">
                    <VideoCard videoUrl={caseStudy.featuredVideo.asset.url} />
                  </div>
                )}
                <h3 className="poppins title md:text-[4.7vw] text-[10vw] absolute top-[2.5vw] md:top-[0vw] text-shadow left-[2vw] font-bold px-[2vw] md:max-w-[60vw] mx-auto">
                  {caseStudy.title}
                </h3>
                {caseStudy.description && (
                  <p className="description text-[5vw] md:text-[1.3vw] leading-[150%] md:leading-[150%] tracking-wider font-semibold pl-[11vw] pr-[4vw] md:pr-[2vw] md:max-w-[50vw] mx-auto">
                    {caseStudy.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomePageCaseStudies;
