"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

const DigitalClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="fixed left-4 top-6 md:top-12 md:left-12 z-50 flex items-center gap-2 text-gray-400">
      <Clock size={20} />
      <span className="font-mono text-sm md:text-lg">{formatTime(time)}</span>
    </div>
  )
}

export default DigitalClock
