"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import ContributionCell from "./ContributionCell"
import MonthGrid from "./MonthGrid"
import YearSelector from "./YearSelector"

const ContributionGraph = ({ username = "Rhane-Shane" }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [contributionData, setContributionData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalContributions, setTotalContributions] = useState(0)
  const [error, setError] = useState(null)
  const graphRef = useRef(null)

  // Fetch real GitHub contribution data
  const fetchGitHubContributions = async (year) => {
    try {
      setLoading(true)
      setError(null)

      // Using GitHub's contribution API endpoint
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub data")
      }

      const data = await response.json()

      // Transform the data to our format
      const contributions = []
      let total = 0

      data.contributions.forEach((week) => {
        week.days.forEach((day) => {
          total += day.count
          contributions.push({
            date: new Date(day.date),
            count: day.count,
            level: getContributionLevel(day.count),
          })
        })
      })

      setTotalContributions(total)
      return contributions
    } catch (err) {
      console.error("Error fetching GitHub contributions:", err)
      setError(err.message)
      return []
    }
  }

  const getContributionLevel = (count) => {
    if (count === 0) return 0
    if (count <= 3) return 1
    if (count <= 6) return 2
    if (count <= 9) return 3
    return 4
  }

  useEffect(() => {
    const loadContributions = async () => {
      const data = await fetchGitHubContributions(selectedYear)
      setContributionData(data)
      setLoading(false)
    }

    loadContributions()
  }, [selectedYear, username])

  useEffect(() => {
    if (!loading && graphRef.current && contributionData.length > 0) {
      const cells = graphRef.current.querySelectorAll(".contribution-cell")
      gsap.fromTo(
        cells,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.05,
          stagger: {
            amount: 1.5,
            from: "start",
          },
          ease: "back.out(1.7)",
        },
      )
    }
  }, [loading, contributionData])

  const getAvailableYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    // GitHub was founded in 2008, but let's go back 6 years from current year
    for (let year = currentYear; year >= Math.max(2008, currentYear - 6); year--) {
      years.push(year)
    }
    return years
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-53 gap-1">
            {Array.from({ length: 371 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-800 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium">Unable to load GitHub contributions</h3>
            <p className="text-gray-400 mt-2">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-medium text-white mb-1">
              {totalContributions.toLocaleString()} contributions in {selectedYear}
            </h3>
            <p className="text-gray-400 text-sm">GitHub activity for @{username}</p>
          </div>
          <YearSelector
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            availableYears={getAvailableYears()}
          />
        </div>
      </div>

      <div ref={graphRef} className="relative">
        <MonthGrid year={selectedYear} />

        <div className="grid grid-cols-53 gap-1 mt-2">
          {contributionData.map((day, index) => (
            <ContributionCell
              key={`${day.date.toISOString()}-${index}`}
              date={day.date}
              count={day.count}
              level={day.level}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${
                  level === 0
                    ? "bg-gray-800"
                    : level === 1
                      ? "bg-green-900"
                      : level === 2
                        ? "bg-green-700"
                        : level === 3
                          ? "bg-green-500"
                          : "bg-green-400"
                }`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

export default ContributionGraph
