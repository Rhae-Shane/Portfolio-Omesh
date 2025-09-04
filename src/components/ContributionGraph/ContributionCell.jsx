"use client"

import { useState } from "react"

const ContributionCell = ({ date, count, level }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const getLevelColor = (level) => {
    switch (level) {
      case 0:
        return "bg-gray-800 hover:bg-gray-700"
      case 1:
        return "bg-green-900 hover:bg-green-800"
      case 2:
        return "bg-green-700 hover:bg-green-600"
      case 3:
        return "bg-green-500 hover:bg-green-400"
      case 4:
        return "bg-green-400 hover:bg-green-300"
      default:
        return "bg-gray-800"
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getContributionText = (count) => {
    if (count === 0) return "No contributions"
    if (count === 1) return "1 contribution"
    return `${count} contributions`
  }

  return (
    <div className="relative">
      <div
        className={`contribution-cell w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 ${getLevelColor(level)}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap border border-gray-700 z-50">
          <div className="font-medium">{getContributionText(count)}</div>
          <div className="text-gray-400">{formatDate(date)}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  )
}

export default ContributionCell
