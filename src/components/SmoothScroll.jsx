"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll setup
    const smoother = ScrollTrigger.normalizeScroll(true)

    // Add smooth scrolling animations
    gsap.set("body", { overflow: "hidden" })

    const scrollContainer = document.querySelector("#scroll-container")
    if (scrollContainer) {
      gsap.to(scrollContainer, {
        y: () => -(scrollContainer.scrollHeight - window.innerHeight),
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })
    }

    return () => {
      smoother && smoother.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}

export default SmoothScroll
