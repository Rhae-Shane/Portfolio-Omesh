"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github } from "lucide-react";
import ProjectCard from "../components/Projects/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const projectsData = [
    {
      id: 1,
      title: "Pull-Quest",
      description: `PullQuest solves the major problem of unrecognized and poorly managed open-source contributions.
Contributors do not have a ranking based profile system(Like leetcode,codeforces) , Maintainers struggle to evaluate code quality and engagement due to overwhelming no of PRs(Some blatantly created with low quality).
PullQuest fixes this with a transparent, measurable, and rewarding system.
Recruiters do not have direct access to a developer's genuine contribution and quality

It thus empowers recruiters, contributors and Repository maintainers`,
      tags: [
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Github RestAPIs",
        "Zustand",
      ],
      images: [
        "/assets/projects/pullQuest/hero.png",
        "/assets/projects/pullQuest/repo.png",
        "/assets/projects/pullQuest/hire.png",
        "/assets/projects/pullQuest/issue.png",
        "/assets/projects/pullQuest/merge.png",
      ],
      accentColor: "bg-blue-500/20",
      githubUrl: "https://github.com/Rhae-Shane/Aptos-PullQuest-Frontend",
      liveUrl: "",
      year: "2025",
      projectType: "3 Developers",
      status: "Active",
    },
    {
      id: 2,
      title: "VIRBIKE E-Commerce Website",
      description:
        "A responsive e-commerce style website built for VIRBIKE to showcase and sell premium electric cycles. The platform allows users to explore models, view detailed specifications, and request test rides. Developed with React and Tailwind CSS for the frontend, and Node.js with Express.js for backend integration. Features include product catalog, dynamic pages, and chatbot integration for customer support. Designed to provide a smooth, scalable, and engaging customer experience.",
      tags: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Recoil",
        "REST APIs"
      ],
      images: [
        "/assets/projects/virbike/home.png",
        "/assets/projects/virbike/products.png",
        "/assets/projects/virbike/cart.png",
        "/assets/projects/virbike/checkout.png"
      ],
      accentColor: "bg-green-500/20",
      githubUrl: "",
      liveUrl: "https://www.virbike.com/",
      year: "2024",
      projectType: "Company Project",
      status: "Production"
    },
    {
      id: 3,
      title: "VIRBIKE WhatsApp Chatbot",
      description:
        "A WhatsApp chatbot developed for VIRBIKE to handle customer queries and provide quick product information. The bot helps users explore e-cycle models, view pricing, and request test ride details directly through WhatsApp. Integrated with backend APIs to fetch real-time product data, enabling seamless interaction and improving customer engagement.",
      tags: [
        "Node.js",
        "Express.js",
        "WhatsApp API",
        "REST APIs",
        "Aisency",
        "Razorpay Api"
      ],
      images: [
        "/assets/projects/chatbot/direct.png",
        "/assets/projects/chatbot/conversation.png",
      ],
      accentColor: "bg-purple-500/20",
      githubUrl: "",
      liveUrl: "https://api.whatsapp.com/send/?phone=9119440258&text=Hello%2C+I+need+assistance%21&type=phone_number&app_absent=0",
      year: "2024",
      projectType: "Company Project",
      status: "Production"
    },
    {
      id: 4,
      title: "CalcAI",
      description:
        "CalcAI is an intelligent calculator app that blends traditional math operations with AI-powered problem solving. Built with React, Vite, and TypeScript, it offers a fast, modern user experience with real-time computation, natural language expression parsing, and history tracking. The clean, responsive UI works seamlessly across devices. On the backend, CalcAI is powered by Python and integrates the Gemini API to handle complex AI-driven calculations. Designed with developer efficiency in mind, it features hot module replacement, ESLint for code quality, and modern styling for a smooth UX.",
      tags: [
        "React",
        "Typescript",
        "Mantine",
        "Python",
        "Gemini API",
      ],
      images: [
        "/assets/projects/calcai/frontend.png",
        "/assets/projects/calcai/eg1.png",
        "/assets/projects/calcai/sol1.png",
        "/assets/projects/calcai/backend.png",
        "/assets/projects/calcai/eg2.png",
        "/assets/projects/calcai/sol2.png",
      ],
      accentColor: "bg-cyan-500/20",
      githubUrl: "https://github.com/ArunKushhhh/CalcAI",
      liveUrl: "https://calc-ai-rosy.vercel.app/",
      year: "2025",
      projectType: "Solo Project",
      status: "Production",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const cardsContainer = cardsContainerRef.current;
    const section = sectionRef.current;
    const header = headerRef.current;

    if (!container || !cardsContainer || !section || !header) return;

    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Calculate when to start pinning (20% from top)
    const pinStartOffset = viewportHeight * 0.15;
    
    // Set up horizontal scroll
    const totalWidth = projectsData.length * viewportWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Set the width of the cards container
    gsap.set(cardsContainer, {
      width: totalWidth,
      display: "flex",
    });

    // Create horizontal scroll trigger with pinning at 20% from top
    ScrollTrigger.create({
      trigger: container,
      start: `top ${pinStartOffset}px`, // Start pinning when container top is 20% from viewport top
      end: () => `+=${scrollDistance + viewportHeight}`, // Extended end for better completion
      pin: container, // Pin the container
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const moveX = -progress * scrollDistance;

        gsap.set(cardsContainer, {
          x: moveX,
        });
      },
    });

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projectsData.length]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen bg-black"
    >
      {/* Section Header - Stays visible during scroll */}
      <div 
        ref={headerRef}
        className="container mx-auto px-4 md:px-8 max-w-7xl pt-16 md:pt-20 pb-8 md:pb-12"
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-playball leading-tight">
            {">>"} Featured{" "}
            <span className="text-blue-400">Projects</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Side quests that became power moves.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative overflow-hidden min-h-[70vh] md:min-h-[80vh]">
        <div
          ref={cardsContainerRef}
          className="flex"
          style={{ width: `${projectsData.length * 100}vw` }}
        >
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="w-screen flex items-center justify-center px-4 md:px-8"
            >
              <div className="w-full max-w-6xl">
                <ProjectCard project={project} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with GitHub link */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 md:py-16 flex justify-center">
        <a
          href="https://github.com/Rhae-Shane"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 items-center gap-2 cursor-pointer"
        >
          <Github size={20} />
          <p className="text-sm md:text-base">View More Projects</p>
        </a>
      </div>
    </section>
  );
};

export default Projects;