"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-black min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-32">
          <div className="relative">
            {/* Top dividing line */}
            <div className="h-px bg-gray-500 w-full mb-20"></div>

            {/* Moon in center */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full relative"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, #a0a0a0 0%, #808080 25%, #606060 50%, #404040 75%, #2a2a2a 100%)
                  `,
                  boxShadow:
                    "inset -20px -20px 40px rgba(0,0,0,0.6), inset 10px 10px 20px rgba(255,255,255,0.1)"
                }}
              >
                {/* Moon craters */}
                <div className="absolute top-[25%] left-[30%] w-4 h-4 md:w-6 md:h-6 bg-gray-700/80 rounded-full shadow-inner"></div>
                <div className="absolute top-[40%] right-[25%] w-3 h-3 md:w-4 md:h-4 bg-gray-700/70 rounded-full shadow-inner"></div>
                <div className="absolute bottom-[30%] left-[40%] w-5 h-5 md:w-7 md:h-7 bg-gray-700/85 rounded-full shadow-inner"></div>
                <div className="absolute top-[60%] right-[35%] w-2 h-2 md:w-3 md:h-3 bg-gray-700/60 rounded-full shadow-inner"></div>
              </div>
            </div>

            {/* Text on left and right */}
            <div className="flex justify-between items-center relative z-20">
              <div className="text-left">
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                  LESS DOUBT
                </h2>
              </div>
              <div className="text-right">
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                  MORE OUTPUT
                </h2>
              </div>
            </div>

            <div className="h-px bg-gray-500 w-full mt-20"></div>
          </div>
        </div>

        {/* Bottom Section - NAMASTE */}
        <div className="about-content">
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6">
            NAMASTE 🙏
          </h2>
          <h3 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8">
            I&apos;M JOHN DOE
          </h3>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-md">
            Tell about your intro and story
          </p>

          {/* Dotted lines */}
          <div className="space-y-3 max-w-4xl mb-12">
            <div className="border-b border-dotted border-gray-500 h-8"></div>
            <div className="border-b border-dotted border-gray-500 h-8 w-4/5"></div>
          </div>

          <div>
            <button className="group text-white hover:text-gray-300 transition-colors duration-300 flex items-center space-x-3 text-xl">
              <span>Let&apos;s know more</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
