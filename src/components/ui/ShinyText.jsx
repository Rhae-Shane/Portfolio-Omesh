"use client"

import { useEffect, useRef } from "react"

const ShinyText = ({ children, className = "", shimmerWidth = 20 }) => {
  const textRef = useRef(null)

  useEffect(() => {
    const textElement = textRef.current
    if (!textElement) return

    // Create the shimmer animation
    const shimmerAnimation = textElement.animate(
      [
        {
          backgroundPosition: `-${shimmerWidth}% 0`,
        },
        {
          backgroundPosition: `${shimmerWidth}% 0`,
        },
      ],
      {
        duration: 3000,
        iterations: Number.POSITIVE_INFINITY,
        easing: "ease-in-out",
      },
    )

    return () => {
      shimmerAnimation.cancel()
    }
  }, [shimmerWidth])

  return (
    <span
      ref={textRef}
      className={`inline-block bg-gradient-to-r from-gray-800 via-white to-gray-800 bg-clip-text text-transparent bg-[length:200%_100%] ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, #9ca3af 0%, #ffffff 50%, #9ca3af 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  )
}

export default ShinyText
