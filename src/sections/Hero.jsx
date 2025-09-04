"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import GridBackground from "../components/Hero/GridBackground";
import PolaroidCard from "../components/Hero/PolaroidCard";
import ShinyText from "../components/ui/ShinyText";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      );
  }, []);

  // Smooth scroll function
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const polaroidImages = [
    {
      image: "/assets/ecell.jpeg",
      title: "E-Cell Family 🤍",
      rotation: -12,
      position: { left: "15%", top: "60%", zIndex: 4 },
    },
    {
      image: "/assets/dp.jpeg",
      title: "Coder. Builder. Dreamer",
      rotation: 8,
      position: { left: "35%", top: "55%", zIndex: 2 },
    },
    {
      image: "/assets/friends.jpeg",
      title: "Build on Aptos",
      rotation: -5,
      position: { right: "30%", top: "58%", zIndex: 3 },
    },
    {
      image: "/assets/basketball.jpeg",
      title: "📍Techfest, Hyderabad",
      rotation: 15,
      position: { right: "10%", top: "52%", zIndex: 1 },
    },
  ];

  return (
    <div id="home" className="min-h-screen relative">
      <GridBackground />

      <div ref={heroRef} className="container mx-auto pt-32 relative z-10">
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col gap-4">
            <h1
              ref={titleRef}
              className="text-7xl text-center lg:text-9xl text-white font-playball"
            >
              I develop <span className="text-blue-400">moments,</span>{" "}
              <span className="text-blue-400">decisions,</span> and{" "}
              <span className="text-blue-400">defaults</span>.
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              <ShinyText className="text-sm md:text-xl">
                No fluff. No Noise. Just Intentional Coding.
              </ShinyText>
            </p>
          </div>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={handleScrollToProjects}
              className="bg-black/70 border-t-[0.5px] border-white shadow-[inset_0px_4px_8px_rgba(255,255,255,0.6)] hover:shadow-[inset_0px_2px_4px_rgba(255,255,255,0.6)] text-white px-8 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 hover:scale-105"
            >
              View Projects
            </button>
            <a
              href="mailto:omeshkumar9813499778@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 hover:scale-105 flex justify-center items-center"
            >
              Say Hi!
            </a>
          </div>

          {/* Polaroid Photos Container */}
          <div className="relative flex flex-wrap justify-center gap-2">
            {polaroidImages.map((polaroid, index) => (
              <PolaroidCard
                key={index}
                image={polaroid.image}
                title={polaroid.title}
                rotation={polaroid.rotation}
                position={polaroid.position}
                delay={index * 0.15 + 1.5}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional sections for navigation */}
    </div>
  );
};

export default Hero;