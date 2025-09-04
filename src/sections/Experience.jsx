"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const experiencesRef = useRef([]);
  const [activeAccordion, setActiveAccordion] = useState(1);

  const experienceData = [
    {
      id: 1,
      role: "Software Engineer Intern",
      company: "VIR BIKE",
      duration: "07/2024 - 11/2025",
      type: "On-Site Internship",
      technologies: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Redux",
        "AiSency",
        "REST APIs",
        "Git",
      ],
      keyPoints: [
        "Developed and integrated a chatbot to handle customer queries and improve engagement.",
        "Built and deployed an e-commerce style website for VIRBIKE to showcase and sell premium e-cycles.",
        "Contributed to the company’s internal software solutions, streamlining workflow and data management.",
        "Worked on frontend and backend integration, ensuring a smooth and scalable system.",
      ],
    },
    {
      id: 2,
      role: "Technical Design Intern",
      company: "KVtek",
      duration: "06/2024 - 07/2024",
      type: "On-Site Internship",
      technologies: [
        "Altium Designer",
        "Eagle PCB",
        "KiCad",
        "Embedded C",
        "Arduino",
        
      ],
      keyPoints: [
        "Designed and optimized PCB layouts for electronic circuits using Altium, Eagle, and KiCad.",
        "Contributed to embedded system development by coding microcontroller logic in Embedded C and Arduino.",
        "Assisted in prototyping and testing PCB + firmware integration for hardware development cycles.",
        "Created technical schematics and documentation to support engineering and R&D teams.",
      ],
    },
    {
      id: 3,
      role: "Campus Ambassador",
      company: "Microsoft – GroupMe",
      duration: "02/2025 - 04/2025",
      type: "Remote Engagement",
      technologies: [
        "Community Outreach",
        "Technical Evangelism",
        "Communication",
        "Leadership",
      ],
      keyPoints: [
        "Promoted GroupMe’s platform across campus, driving awareness and adoption among students.",
        "Conducted technical workshops and info sessions to showcase features and encourage usage.",
        "Collaborated with peers and faculty to integrate GroupMe into student communities for better communication.",
        "Developed leadership, public speaking, and technical advocacy skills while representing Microsoft."
      ],
    },
    {
      id: 4,
      role: "Startup Coordinator",
      company: "Innovation & Entrepreneurship Cell (I&E Cell)",
      duration: "08/2023 - Present",
      type: "On-Campus Leadership Role",
      technologies: [
        "Startup Ecosystem",
        "Event Management",
        "Leadership",
        "Community Building",
        "Pitching",
        "Networking",
        "Tech Guidance"
      ],
      keyPoints: [
        "Coordinated and organized entrepreneurship-focused events, including hackathons, business plan competitions, and pitch sessions.",
        "Worked with startups and mentors to provide students with exposure to real-world business challenges.",
        "Guided students in technical aspects and entrepreneurship, supporting them in idea validation, prototyping, and innovation projects.",
        "Enhanced organizational visibility by collaborating with external judges, investors, and industry professionals."
      ],
    },
    {
      id: 5,
      role: "Technical Lead",
      company: "Research & Development Cell",
      duration: "08/2023 - Present",
      type: "On-Campus Leadership Role",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "Tailwind CSS",
        "REST APIs",
        "Web3",
        "Blockchain",
        "Embedded Systems",
        "Arduino",
        "IoT",
        "Robotics"
      ],
      keyPoints: [
        "Led multiple projects across web development, embedded systems, IoT, and blockchain-based applications.",
        "Built functional prototypes including robotics and automation projects using Arduino and IoT modules.",
        "Explored Web3 and blockchain technology for innovative campus projects and research initiatives.",
        "Organized workshops and technical sessions to foster hands-on learning in IoT, robotics, and Web3."
      ],
    }


  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const experiences = experiencesRef.current;

    if (!section || !title || !experiences.length) return;

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

    // Animate experiences with stagger
    tl.fromTo(
      experiences,
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
    if (el && !experiencesRef.current.includes(el)) {
      experiencesRef.current.push(el);
    }
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-screen bg-black py-20"
    >
      <div className="container mx-auto px-8 max-w-7xl">
        {/* Section Title */}
        <div className="mb-16 flex flex-col gap-6">
          <h2
            ref={titleRef}
            className="text-7xl md:text-8xl text-white  font-playball"
          >
            {">>"} My
            <span className="text-blue-400"> Experience</span>
          </h2>
          <p className="text-gray-500 text-base">
            Where learning met doing—and deadlines were just the start.
          </p>
        </div>

        {/* Experience Accordions */}
        <div className="flex flex-col gap-0">
          {experienceData.map((experience, index) => (
            <div key={experience.id} ref={addToRefs} className="group">
              {/* Accordion Header */}
              <div
                className="flex justify-between items-start py-6 cursor-pointer transition-colors duration-300 rounded-lg"
                onMouseEnter={() => toggleAccordion(experience.id)}
              >
                {/* Left Side - Role */}
                <div className="flex items-center gap-4">
                  <h3 className="text-lg md:text-3xl text-white group-hover:text-blue-400 transition-colors duration-300">
                    {experience.role}
                  </h3>
                  <ChevronDown
                    className={`hidden md:flex w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      activeAccordion === experience.id ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Right Side - Company & Duration */}
                <div className="text-right flex flex-col gap-1 items-end">
                  <div className="text-gray-400 group-hover:text-white text-base md:text-xl">
                    {experience.company}
                  </div>
                  <div className="text-gray-500 text-xs md:text-sm flex items-center gap-2">
                    <Calendar size={16} />
                    {experience.duration}
                  </div>
                </div>
              </div>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeAccordion === experience.id
                    ? "max-h-[500px] opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="md:px-6 space-y-6">
                  {/* Work Type */}
                  <div>
                    <span className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full  text-xs md:text-sm font-light">
                      {experience.type}
                    </span>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-gray-400 text-sm font-light mb-3 uppercase tracking-wider">
                      Key Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-white bg-gray-800/50 px-2 py-1 rounded text-sm font-light hover:bg-gray-700/50 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h4 className="text-gray-400 text-sm font-light mb-3 uppercase tracking-wider">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2 text-sm md:text-base">
                      {experience.keyPoints.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="text-gray-300 font-light flex items-start"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Divider Line */}
              {index < experienceData.length - 1 && (
                <div className="w-full h-[0.5px] bg-gray-500 mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
