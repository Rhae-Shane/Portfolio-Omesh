"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from "../components/About/ProfileCard";
import StatsCard from "../components/About/StatsCard";
import ContactCard from "../components/About/ContactCard";
import WorkflowCard from "../components/About/WorkflowCard";
import ContributionGraph from "../components/ContributionGraph";
import { ChevronsLeftRightEllipsis, Sparkles, Target } from "lucide-react";
import OnlinePresence from "../components/About/OnlinePresence";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  const statsData = [
    {
      number: "Few",
      label: "Projects",
      icon: <Target size={16} color="gray" />,
    },
    {
      number: "4+",
      label: "Hackathons",
      icon: <ChevronsLeftRightEllipsis color="gray" size={16} />,
    },
    { number: "2+", label: "Years", icon: <Sparkles size={16} color="gray" /> },
  ];

  useEffect(() => {
    const grid = gridRef.current;
    const cards = cardsRef.current;

    if (!grid || !cards.length) return;

    // Create timeline for grid animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate cards with stagger
    tl.fromTo(
      cards,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="about" className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        {/* Mobile Layout - Single Column */}
        <div className="block lg:hidden">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {statsData.map((stat, index) => (
                <div key={stat.label} ref={addToRefs}>
                  <StatsCard {...stat} />
                </div>
              ))}
            </div>

            {/* Profile Card */}
            <div ref={addToRefs}>
              <ProfileCard />
            </div>

            {/* GitHub Contribution Graph */}
            <div ref={addToRefs}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 sm:p-6 hover:border-gray-700/50 transition-all duration-300">
                <ContributionGraph username="Rhae-Shane" />
              </div>
            </div>

            {/* Online Presence */}
            <div ref={addToRefs}>
              <OnlinePresence />
            </div>

            {/* Contact Card */}
            <div ref={addToRefs}>
              <ContactCard type="telegram" />
            </div>

            {/* Workflow Card */}
            <div ref={addToRefs}>
              <WorkflowCard />
            </div>
          </div>
        </div>

        {/* Desktop Layout - Bento Grid */}
        <div className="hidden lg:block">
          <div
            ref={gridRef}
            className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-6 auto-rows-min"
          >
            {/* Top Row - Stats Cards */}
            {statsData.map((stat, index) => (
              <div key={stat.label} ref={addToRefs} className="lg:col-span-1">
                <StatsCard {...stat} />
              </div>
            ))}

            {/* GitHub Contribution Graph - Merged top right section */}
            <div ref={addToRefs} className="lg:col-span-4 lg:row-span-2">
              <div className="h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300">
                <ContributionGraph username="Rhae-Shane" />
              </div>
            </div>

            {/* Second Row - Profile Card */}
            <div ref={addToRefs} className="lg:col-span-3 lg:row-span-2">
              <ProfileCard />
            </div>

            {/* Second Row - Online Presence */}
            <div ref={addToRefs} className="lg:col-span-2 lg:row-span-3">
              <OnlinePresence />
            </div>

            {/* Third Row - Contact Cards */}
            <div ref={addToRefs} className="lg:col-span-2 lg:row-span-3">
              <ContactCard type="telegram" />
            </div>

            {/* Third Row - Workflow */}
            <div ref={addToRefs} className="lg:col-span-3 lg:row-span-2">
              <WorkflowCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;