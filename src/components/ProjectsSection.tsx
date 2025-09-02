"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, Edit, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/contexts/ProjectsContext";
import { useAuth } from "@/contexts/AuthContext";
import AdminLogin from "./AdminLogin";
// import Image from "next/image";

export default function ProjectsSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { projects } = useProjects();
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards on scroll
      gsap.fromTo(
        ".project-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
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
  }, [projects]);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      router.push("/admin");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <section ref={sectionRef} id="work" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 space-y-6 lg:space-y-0">
          {/* Left side - Branding */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                THE SIMPLE
              </h2>
              <div className="relative inline-block mt-2">
                <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-xl"></div>
                <h3 className="relative text-base sm:text-lg lg:text-xl text-gray-300 bg-gray-700 px-4 sm:px-6 py-2 rounded-full border border-gray-600">
                  EASY WORK
                </h3>
              </div>
            </div>
          </div>

          {/* Right side - Section title and admin */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-8 w-full lg:w-auto">
            <div className="text-left sm:text-right">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                See the Portfolio
              </h2>
              <div className="flex items-center justify-start sm:justify-end mt-2">
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {isAuthenticated && (
                <div className="text-gray-300 text-xs sm:text-sm">
                  Welcome, {user?.username}!
                </div>
              )}
              <button
                onClick={handleAdminClick}
                className="text-pink-400 hover:text-pink-300 transition-colors duration-300 flex items-center space-x-2 text-sm lg:text-base"
              >
                <Edit className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>
                  {isAuthenticated ? "Admin Dashboard" : "Admin Login"}
                </span>
              </button>
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center space-x-2 text-sm lg:text-base"
                >
                  <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Website Design Card */}
          <div className="project-card group bg-gray-800 rounded-xl p-4 sm:p-6 hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg">
            {/* Project Image - Website Design */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <div className="w-full h-40 sm:h-48 bg-gray-100 rounded-lg flex items-center justify-center relative">
                {/* Website screenshot */}
                <div className="w-full h-full bg-white rounded-lg p-2 sm:p-4">
                  {/* Header with wavy background */}
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-2 sm:p-4 mb-2 sm:mb-4">
                    <h3 className="text-white font-semibold text-center text-xs sm:text-sm">
                      We build products to solve your problems
                    </h3>
                  </div>

                  {/* Content sections */}
                  <div className="space-y-2 sm:space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-xs sm:text-sm">
                        What can we do for you?
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 text-xs text-gray-600">
                        <div>Project Engineering</div>
                        <div className="hidden sm:block">UI/UX methodology</div>
                        <div className="hidden sm:block">
                          Project Engineering
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:block">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                        Our Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span>Infrastructure development</span>
                        <span>Mobile app development</span>
                        <span>Web technology</span>
                        <span>Quality assurance</span>
                        <span>E-commerce</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-white/80 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  Website
                </div>
              </div>
            </div>

            {/* Project Info */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300">
              Site design for IT company
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-2 text-sm sm:text-base">
              Modern website design with clean interface and professional layout
            </p>

            {/* View Detail Link */}
            <a
              href="#"
              className="inline-flex items-center text-gray-400 hover:text-pink-400 transition-colors duration-300 group/link text-sm sm:text-base"
            >
              <span>view detail</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* App Design Card */}
          <div className="project-card group bg-gray-800 rounded-xl p-4 sm:p-6 hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg">
            {/* Project Image - App Design */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <div className="w-full h-40 sm:h-48 bg-gray-900 rounded-lg flex items-center justify-center relative">
                {/* Mobile app screenshots */}
                <div className="absolute inset-2 sm:inset-4 flex space-x-1 sm:space-x-2">
                  <div className="w-12 sm:w-16 h-16 sm:h-24 bg-gray-800 rounded-lg p-1 sm:p-2 transform rotate-3 border border-gray-600">
                    <div className="w-full h-2 sm:h-3 bg-gray-700 rounded mb-1 sm:mb-2"></div>
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-blue-500 rounded-full mx-auto mb-1 sm:mb-2"></div>
                    <div className="w-full h-1 sm:h-2 bg-gray-600 rounded mb-1"></div>
                    <div className="w-3/4 h-1 sm:h-2 bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-12 sm:w-16 h-16 sm:h-24 bg-gray-800 rounded-lg p-1 sm:p-2 transform -rotate-2 border border-gray-600">
                    <div className="w-full h-2 sm:h-3 bg-gray-700 rounded mb-1 sm:mb-2"></div>
                    <div className="w-full h-6 sm:h-8 bg-green-500 rounded mb-1 sm:mb-2"></div>
                    <div className="w-full h-1 sm:h-2 bg-gray-600 rounded mb-1"></div>
                    <div className="w-1/2 h-1 sm:h-2 bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-12 sm:w-16 h-16 sm:h-24 bg-gray-800 rounded-lg p-1 sm:p-2 transform rotate-1 border border-gray-600">
                    <div className="w-full h-2 sm:h-3 bg-gray-700 rounded mb-1 sm:mb-2"></div>
                    <div className="w-4 sm:w-6 h-4 sm:h-6 bg-purple-500 rounded-full mx-auto mb-1 sm:mb-2"></div>
                    <div className="w-full h-1 sm:h-2 bg-gray-600 rounded mb-1"></div>
                    <div className="w-2/3 h-1 sm:h-2 bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-white/80 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  App Design
                </div>
              </div>
            </div>

            {/* Project Info */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300">
              Travel app design
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-2 text-sm sm:text-base">
              Mobile application design for travel and exploration
            </p>

            {/* View Detail Link */}
            <a
              href="#"
              className="inline-flex items-center text-gray-400 hover:text-pink-400 transition-colors duration-300 group/link text-sm sm:text-base"
            >
              <span>view detail</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* "Couldn't find what you need?" Card */}
          <div className="project-card bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-600 hover:border-gray-500 transition-colors duration-300 shadow-lg">
            <div className="text-center space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Couldn&apos;t find what you need?
              </h3>
              <p className="text-gray-300 text-left leading-relaxed text-sm sm:text-base">
                Suggest a tutorial, course or video. I read seek
                feedback/suggestion!
              </p>
              <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 mx-auto text-sm sm:text-base">
                <span className="font-medium">Request Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
    </section>
  );
}
