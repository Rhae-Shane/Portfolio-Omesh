"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const GridBackground = () => {
  const gridRef = useRef(null)
  const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0, cols: 0, rows: 0 })

  useEffect(() => {
    const updateGridDimensions = () => {
      const cellSize = 40
      const cols = Math.ceil(window.innerWidth / cellSize)
      const rows = Math.ceil(window.innerHeight / cellSize)
      
      setGridDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        cols,
        rows
      })
    }

    updateGridDimensions()
    window.addEventListener('resize', updateGridDimensions)
    
    return () => window.removeEventListener('resize', updateGridDimensions)
  }, [])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || gridDimensions.cols === 0) return

    const squares = grid.querySelectorAll(".grid-square")

    // Animate random squares
    const animateSquares = () => {
      const randomSquares = Array.from(squares)
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 12) + 8)

      randomSquares.forEach((square, index) => {
        gsap.to(square, {
          opacity: Math.random() * 0.6 + 0.3,
          duration: 2 + Math.random() * 3,
          delay: index * 0.1,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
        })
      })
    }

    const interval = setInterval(animateSquares, 4000)
    animateSquares() // Initial animation

    return () => clearInterval(interval)
  }, [gridDimensions])

  const cellSize = 40

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        ref={gridRef}
        className="relative w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      >
        {/* Create filled squares */}
        {Array.from({ length: gridDimensions.cols * gridDimensions.rows }).map((_, i) => {
          const row = Math.floor(i / gridDimensions.cols)
          const col = i % gridDimensions.cols

          // Skip some squares to make it more sparse
          if (Math.random() > 0.15) return null

          return (
            <div
              key={i}
              className="grid-square absolute bg-gray-600/60 opacity-0 transition-opacity duration-1000"
              style={{
                left: `${col * cellSize}px`,
                top: `${row * cellSize}px`,
                width: `${cellSize - 1}px`,
                height: `${cellSize - 1}px`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default GridBackground