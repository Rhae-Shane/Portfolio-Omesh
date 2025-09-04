"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const categoriesRef = useRef([]);

  const skillsData = [
   {
      category: "Languages",
      skills: [
        "Java",
        "JavaScript",
        "TypeScript",
        "Python",
        "C++",
        "C (Embedded C)",
        "HTML",
        "SQL",
      ],
    },
    {
      category: "Libraries & Frameworks",
      skills: [
        "Spring Boot",
        "React",
        "Next.js",
        "Express",
        "Node.js",
       
        "Tailwind CSS",
        "Bootstrap",
        "Material UI",
       
        "React Router v7",
        "Recoil",
        
        
      ],
    },
    {
      category: "Databases & ORMs",
      skills: ["MongoDB", "Redis", "MySQL"],
    },
    {
      category: "Computer Science Fundamentals",
      skills: [
        "DBMS",
        "OOPs",
        "Computer Networks (CN)",
        "Operating Systems (OS)",
        "DSA",
      ],
    },
    {
      category: "Tools & Platforms",
      skills: [
        "GitHub Actions",
        "Postman",
        "Ubuntu",
        
        "Figma",
        "Adobe Illustrator",
        "Canva",
      ],
    },
    {
      category: "Soft Skills",
      skills: [
        "English",
        "Hindi",
        "Problem Solving",
        "Public Speaking",
        "Teamwork",
        "Idea Presentation",
        "Organizing",
      ],
    },

  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const categories = categoriesRef.current;

    if (!section || !title || !categories.length) return;

    // Create timeline for section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate title
    tl.fromTo(
      title,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate categories with stagger
    tl.fromTo(
      categories,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !categoriesRef.current.includes(el)) {
      categoriesRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen bg-black py-20"
    >
      <div className="container mx-auto px-8 max-w-6xl">
        {/* Section Title */}
        <div className="mb-16 flex flex-col gap-6">
          <h2
            ref={titleRef}
            className="text-7xl md:text-8xl text-white  font-playball"
          >
            {">>"} My
            <span className=" text-blue-400"> Skills</span>
          </h2>
          <p className="text-gray-500 text-base">
            Tools I don’t just list—I wield.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="flex flex-col gap-12 items-start justify-center">
          {skillsData.map((category, index) => (
            <div key={category.category} ref={addToRefs} className="group">
              {/* Category Title */}
              <h3 className="text-xl font-light text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {category.category}
              </h3>

              {/* Skills List */}
              <div className="flex flex-wrap gap-x-2 gap-y-1 mb-8">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skill} className="group/skill">
                    <span className="text-white font-light hover:text-blue-400 transition-colors duration-300 cursor-default text-sm md:text-base">
                      {skill}
                    </span>
                    {skillIndex < category.skills.length - 1 && (
                      <span className="text-gray-600 ml-2">,</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Divider Line */}
              {index < skillsData.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
