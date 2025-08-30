"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade-in animation for navigation items
      gsap.fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 py-2 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Navigation Bar - White rounded rectangle */}
        <div className="relative">
          {/* White rounded navigation bar */}
          <div className="bg-white rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between shadow-lg">
            {/* Left section - Logo space */}
            <div className="flex-1 sm:flex-none">
              <div className="text-lg font-bold text-black">Portfolio</div>
            </div>

            {/* Middle section - Desktop Navigation links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {/* Home - Active with triangle indicator */}
              <div className="nav-item relative">
                <a
                  href="#home"
                  className="text-black font-medium hover:text-gray-700 transition-colors duration-300"
                >
                  Home
                </a>
                {/* Active triangle indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-black"></div>
              </div>

              {/* Work */}
              <div className="nav-item">
                <a
                  href="#work"
                  className="text-black font-medium hover:text-gray-700 transition-colors duration-300"
                >
                  Work
                </a>
              </div>

              {/* About */}
              <div className="nav-item">
                <a
                  href="#about"
                  className="text-black font-medium hover:text-gray-700 transition-colors duration-300"
                >
                  About
                </a>
              </div>

              {/* Play */}
              <div className="nav-item">
                <a
                  href="#contact"
                  className="text-black font-medium hover:text-gray-700 transition-colors duration-300"
                >
                  Play
                </a>
              </div>
            </div>

            {/* Right section - Follow me button (Desktop) */}
            <div className="hidden sm:flex flex-1 lg:flex-none justify-end">
              <div className="nav-item">
                <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base">
                  Follow me
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-black p-2 hover:text-gray-700 transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 lg:hidden">
              <div className="bg-white rounded-2xl shadow-lg py-4 px-6 border">
                <nav className="space-y-4">
                  <a
                    href="#home"
                    className="block text-black font-medium hover:text-gray-700 transition-colors duration-300 py-2"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </a>
                  <a
                    href="#work"
                    className="block text-black font-medium hover:text-gray-700 transition-colors duration-300 py-2"
                    onClick={closeMobileMenu}
                  >
                    Work
                  </a>
                  <a
                    href="#about"
                    className="block text-black font-medium hover:text-gray-700 transition-colors duration-300 py-2"
                    onClick={closeMobileMenu}
                  >
                    About
                  </a>
                  <a
                    href="#contact"
                    className="block text-black font-medium hover:text-gray-700 transition-colors duration-300 py-2"
                    onClick={closeMobileMenu}
                  >
                    Play
                  </a>
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
                      Follow me
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
