"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for coordinated animations
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Moon entrance animation
      tl.fromTo(
        moonRef.current,
        {
          x: 200,
          y: -100,
          opacity: 0,
          scale: 0.8,
          rotation: -15
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 2,
          ease: "power2.out"
        }
      );

      // this part is used to ai
      const headlineText = headlineRef.current?.textContent || "";
      if (headlineRef.current) {
        headlineRef.current.innerHTML = "";

        const chars = headlineText
          .split("")
          .map((char) => (char === " " ? "&nbsp;" : char));

        chars.forEach((char) => {
          const span = document.createElement("span");
          span.innerHTML = char;
          span.style.opacity = "0";
          span.style.transform = "translateY(50px)";
          span.style.display = "inline-block";
          headlineRef.current?.appendChild(span);
        });

        gsap.to(headlineRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          delay: 0.5,
          ease: "power2.out"
        });
      }

      tl.fromTo(
        subtitleRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.5"
      );

      tl.fromTo(
        buttonRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      );

      gsap.to(".star", {
        y: -20,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: "power2.inOut"
      });

      gsap.to(moonRef.current, {
        y: -100,
        rotation: 5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Subtle moon glow animation
      gsap.to(moonRef.current, {
        boxShadow: "0 0 50px rgba(255,255,255,0.1)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen bg-black flex items-center overflow-hidden sm:py-7"
    >
      {/* Crescent Moon - Large and detailed on the right */}
      <div
        ref={moonRef}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 lg:translate-x-1/4 md:translate-x-1/3 sm:translate-x-1/2"
      >
        <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] relative">
          {/* Main moon circle with realistic texture */}
          <div
            className="w-full h-full rounded-full bg-gradient-radial from-gray-300 via-gray-400 to-gray-500 shadow-2xl"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, #f0f0f0 0%, #d0d0d0 25%, #b0b0b0 50%, #909090 75%, #707070 100%),
                radial-gradient(circle at 60% 70%, rgba(160,160,160,0.8) 0%, transparent 30%),
                radial-gradient(circle at 80% 40%, rgba(140,140,140,0.6) 0%, transparent 25%)
              `,
              boxShadow:
                "inset -50px -50px 100px rgba(0,0,0,0.4), inset 20px 20px 40px rgba(255,255,255,0.1)"
            }}
          >
            {/* Moon craters and details */}
            <div className="absolute top-[20%] left-[25%] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-600/60 shadow-inner"></div>
            <div className="absolute top-[35%] right-[30%] w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-gray-600/50 shadow-inner"></div>
            <div className="absolute bottom-[30%] left-[35%] w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-600/65 shadow-inner"></div>
            <div className="absolute top-[50%] right-[25%] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-gray-600/45 shadow-inner"></div>
            <div className="absolute top-[15%] right-[15%] w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gray-600/40 shadow-inner"></div>
            <div className="absolute bottom-[35%] right-[45%] w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-gray-600/35 shadow-inner"></div>
            <div className="absolute top-[60%] left-[15%] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full bg-gray-600/55 shadow-inner"></div>
            <div className="absolute bottom-[20%] right-[20%] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gray-600/30 shadow-inner"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-10 lg:py-20 relative z-10 ">
        <div className="flex items-center min-h-[60vh] sm:min-h-[70vh]">
          {/*  Left side */}
          <div className="w-full lg:w-2/3 xl:w-3/5 space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Main Headline - Two lines as in image */}
              <h1
                ref={headlineRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight max-w-3xl lg:max-w-4xl"
              >
                FROM DARKNESS TO THE
                <br />
                DAWN, IDEAS TAKE FLIGHT.
              </h1>

              <p
                ref={subtitleRef}
                className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-sm md:max-w-md"
              >
                Hi, I am{" "}
                <span className="text-white font-semibold">John Doe</span>.
                Welcome to my portfolio.
              </p>
            </div>

            <button
              ref={buttonRef}
              className="bg-transparent border border-gray-400 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 sm:space-x-3 group hover:scale-105 text-sm sm:text-base"
              style={{
                borderRadius: "0 25px 25px 0",
                borderLeft: "1px solid #9ca3af",
                borderTop: "1px solid #9ca3af",
                borderRight: "1px solid #9ca3af",
                borderBottom: "1px solid #9ca3af"
              }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              <span className="font-medium">Download resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star absolute w-0.5 h-0.5 bg-white rounded-full opacity-0 sm:opacity-100"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: i < 50 ? Math.random() * 0.7 + 0.3 : 0
            }}
          />
        ))}
      </div>
    </section>
  );
}
