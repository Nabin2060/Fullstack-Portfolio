"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CollaborationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stars
      gsap.to(".star", {
        y: -20,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: "power2.inOut"
      });

      // Animate content
      gsap.fromTo(
        ".contact-content",
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
      id="contact"
      className="relative py-20 bg-black overflow-hidden"
    >
      {/* Animated stars background  used ai this */}
      <div className="absolute inset-0">
        {Array.from({ length: 400 }).map((_, i) => (
          <div
            key={i}
            className="star absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main container */}
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[60vh]">
          {/* Left Section - Want to collaborate */}
          <div className="lg:w-3/5 flex items-center justify-center lg:justify-start mb-16 lg:mb-0">
            <div className="contact-content text-center lg:text-left">
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-tight">
                Want to
                <br />
                collaborate??
              </h2>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gray-600 h-40 mx-8"></div>

          {/* Right Section - Let's Connect */}
          <div className="lg:w-2/5 flex items-center justify-center lg:justify-start">
            <div className="contact-content text-center lg:text-left space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Let&apos;s Connect
              </h3>
              <p className="text-lg text-gray-400 max-w-xs leading-relaxed">
                Feel free to reach out for collaborations or just a friendly
                hello
              </p>
              <div className="text-4xl">👋</div>
              <button
                className="bg-transparent border border-gray-400 text-white px-8 py-4 hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2"
                style={{
                  borderRadius: "0 50px 50px 0",
                  borderLeft: "1px solid #9ca3af",
                  borderTop: "1px solid #9ca3af",
                  borderRight: "1px solid #9ca3af",
                  borderBottom: "1px solid #9ca3af"
                }}
              >
                <span>Send an Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
