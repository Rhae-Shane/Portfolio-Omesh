"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ShinyText from "../ui/ShinyText";

const DeveloperSquiggle = () => {
  const squiggleRef = useRef(null);
  const labelsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the squiggle image
    tl.fromTo(
      squiggleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 2, ease: "power3.out" }
    );

    // Animate labels with stagger
    tl.fromTo(
      labelsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.3, ease: "back.out(1.7)" },
      "-=1.5"
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !labelsRef.current.includes(el)) {
      labelsRef.current.push(el);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {/* Title */}
      <div className="absolute top-16 md:right-52 bg-[#1c1c1c] backdrop-blur-sm border-t-[0.5px] border-white shadow-[inset_0px_4px_6px_rgba(255,255,255,0.6)] hover:shadow-[inset_0px_2px_4px_rgba(255,255,255,0.6)]  rounded-2xl px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-light text-gray-300">
          The Full Stack
        </h2>
        <h3 className="text-2xl md:text-3xl font-light text-blue-400">
          Development Journey
        </h3>
      </div>

      {/* Main Container */}
      <div className="w-full relative">
        {/* Squiggle Image */}
        <div className="w-full flex justify-center items-center">
          <img
            ref={squiggleRef}
            src="/assets/designsquiggle-outline.svg"
            alt="Development Squiggle"
            className="w-full max-w-6xl h-auto object-contain"
            style={{
              filter: "invert(1) brightness(0.9)",
            }}
          />
        </div>

        {/* Labels positioned over the squiggle */}
        <div className="hidden absolute inset-0 lg:flex items-center font-polaroid">
          <div
            ref={addToRefs}
            className="absolute left-[17%] -top-32 text-center"
          >
            <div className="text-[#1c1c1c] text-lg font-light border-y border-gray-600 py-1 relative">
              <ShinyText className="text-lg md:text-xl">
                Requirements / Ideas / Research
              </ShinyText>
              <img
                src="/assets/Arrow.svg"
                alt="arrow"
                className="absolute top-0 w-24 left-[110%] opacity-60"
              />
            </div>
          </div>

          <div
            ref={addToRefs}
            className="absolute left-[40%] -top-[20%] text-center"
          >
            <div className="text-[#1c1c1c] text-lg font-light border-y border-gray-600 py-1 relative">
              <ShinyText className="text-lg md:text-xl">
                Architecture / Planning
              </ShinyText>
              <img
                src="/assets/Arrow.svg"
                alt="arrow"
                className="absolute top-0 w-24 left-[110%] opacity-60"
              />
            </div>
          </div>

          <div
            ref={addToRefs}
            className="absolute left-[60%] top-[0%] text-center"
          >
            <div className="text-[#1c1c1c] text-lg font-light border-y border-gray-600 py-1 relative">
              <ShinyText className="text-lg md:text-xl">
                Implementation / Testing
              </ShinyText>
              <img
                src="/assets/Arrow.svg"
                alt="arrow"
                className="absolute top-0 w-24 left-[110%] opacity-60"
              />
            </div>
          </div>

          <div
            ref={addToRefs}
            className="absolute left-[80%] top-[20%] text-center"
          >
            <div className="text-[#1c1c1c] text-lg font-light border-y border-gray-600 py-1">
              <ShinyText className="text-lg md:text-xl">Deployment</ShinyText>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom description */}
      <div className="absolute bottom-16 text-center md:text-left md:left-52 max-w-md">
        <p className="text-gray-500 text-sm leading-relaxed">
          The development process isn't linear. It starts chaotic with scattered
          requirements and ideas, gradually becomes more structured through
          planning and architecture, then smooths out during implementation,
          finally reaching clarity at deployment.
        </p>
      </div>
    </div>
  );
};

export default DeveloperSquiggle;
