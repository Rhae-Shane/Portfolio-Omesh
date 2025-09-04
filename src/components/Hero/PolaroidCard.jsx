"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PolaroidCard = ({ image, title, rotation = 0, delay = 0 }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
        rotation: rotation + (Math.random() - 0.5) * 20,
      },
      {
        opacity: 1,
        y: 0,
        rotation: rotation,
        duration: 1.2,
        delay: delay,
        ease: "back.out(1.7)",
      }
    );

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        rotation: 0,
        y: -70,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        rotation: rotation,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rotation, delay]);

  return (
    <div
      ref={cardRef}
      className="bg-[#1C1C1C] text-white p-3 cursor-pointer transform-gpu rounded-3xl border-t-[0.5px] border-white shadow-[inset_0px_0px_2px_rgba(255,255,255,0.4)]"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-56 h-52 mb-3 overflow-hidden rounded-2xl">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-base text-center font-polaroid">{title}</p>
    </div>
  );
};

export default PolaroidCard;
