"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const YearSelector = ({ selectedYear, onYearChange, availableYears }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors duration-200"
      >
        <span>{selectedYear}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-20 min-w-[100px]">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => {
                  onYearChange(year)
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-2 text-left hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  year === selectedYear ? "bg-gray-700 text-green-400" : "text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default YearSelector
