"use client";

import { useState, useRef, useEffect } from "react";
import {
  Home,
  FolderOpen,
  Edit3,
  Sparkles,
  FileText,
  Linkedin,
  Github,
  MessageCircleMore ,
} from "lucide-react";
import Tooltip from "./Tooltip";

const FloatingNav = ({ aboutPicture = null }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dockRef = useRef(null);

  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "#home" },
    {
      id: "experience",
      icon: Sparkles,
      label: "Experience",
      href: "#experience",
    },
    { id: "projects", icon: FolderOpen, label: "Projects", href: "#projects" },
    { id: "skills", icon: Edit3, label: "Skills", href: "#skills" },
    { id: "about", label: "About", href: "#about", isPicture: true },
    {
      id: "resume",
      icon: FileText,
      label: "Resume",
      href: "https://drive.google.com/file/d/1mnzX8v5SFz7llZeNAA62iS9-MC5sgbcS/view?usp=sharing",
      external: true,
    },
    {
      id: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/omeshxkumar/",
      external: true,
    },
    {
      id: "Whatsapp",
      icon: MessageCircleMore ,
      label: "Whatsapp",
      href: "https://api.whatsapp.com/send/?phone=9813499778&text=Hi+there%21&type=phone_number&app_absent=0",
      external: true,
    },
    {
      id: "github",
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Rhae-Shane",
      external: true,
    },
  ];

  // Get only the internal navigation items (exclude external links)
  const internalNavItems = navItems.filter((item) => !item.external);

  // Intersection Observer to detect active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -80% 0px", // Adjust margins for better detection
      threshold: [0, 0.1, 0.3, 0.5],
    };

    const observerCallback = (entries) => {
      // Sort entries by intersection ratio (highest first)
      const sortedEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (sortedEntries.length > 0) {
        const mostVisible = sortedEntries[0];
        const sectionId = mostVisible.target.id;
        setActiveSection(sectionId);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all internal sections
    internalNavItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Enhanced scroll-based detection as primary method
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      const windowHeight = window.innerHeight;

      // Special handling for home section (top of page)
      if (window.scrollY < windowHeight * 0.5) {
        setActiveSection("home");
        return;
      }

      let activeSection = "home";
      let maxVisibleArea = 0;

      internalNavItems.forEach((item) => {
        const element = document.querySelector(item.href);

        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          const viewportTop = window.scrollY;
          const viewportBottom = viewportTop + windowHeight;

          // Calculate visible area of the section
          const visibleTop = Math.max(viewportTop, elementTop);
          const visibleBottom = Math.min(viewportBottom, elementBottom);
          const visibleArea = Math.max(0, visibleBottom - visibleTop);

          // Consider section active if it has the most visible area
          if (
            visibleArea > maxVisibleArea &&
            visibleArea > windowHeight * 0.1
          ) {
            maxVisibleArea = visibleArea;
            activeSection = item.id;
          }
        }
      });

      setActiveSection(activeSection);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Call once on mount to set initial active section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  const handleNavClick = (item) => {
    if (item.external) {
      window.open(item.href, "_blank");
      return;
    }

    setActiveSection(item.id);
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseMove = (e) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const calculateScale = (itemIndex, itemWidth = 60) => {
    if (!mousePosition.x) return 1;

    const itemCenter = itemIndex * (itemWidth + 8) + itemWidth / 2 + 16; // 16px padding
    const distance = Math.abs(mousePosition.x - itemCenter);
    const maxDistance = 100;
    const maxScale = 1.4;
    const minScale = 1;

    if (distance > maxDistance) return minScale;

    const scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
    return Math.max(minScale, scale);
  };

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        ref={dockRef}
        className="bg-white/10 backdrop-blur-xl border-t border-white/20 rounded-full px-6 py-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-end gap-2 h-16">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const scale = calculateScale(index);
            const isActive = activeSection === item.id;

            const isHiddenOnMobile = ["resume", "linkedin", "github"].includes(
              item.id
            );
            const buttonClass = isHiddenOnMobile ? "hidden sm:flex" : "flex";

            return (
              <Tooltip key={item.id} content={item.label}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={`relative ${buttonClass} items-center justify-center transition-all duration-300 ease-out`}
                  style={{
                    transform: `scale(${scale}) translateY(${
                      (scale - 1) * -10
                    }px)`,
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <div
                    className={`
            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden
            ${
              isActive
                ? "bg-white/30 shadow-lg"
                : "bg-white/10 hover:bg-white/20"
            }
          `}
                  >
                    {item.isPicture && aboutPicture ? (
                      <img
                        src={aboutPicture}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : item.isPicture ? (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                        A
                      </div>
                    ) : (
                      <Icon
                        size={20}
                        className={`transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-300 group-hover:text-white"
                        }`}
                      />
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full opacity-100" />
                  )}
                </button>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default FloatingNav;
