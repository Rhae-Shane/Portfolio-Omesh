"use client"

const MonthGrid = ({ year }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const getMonthPositions = () => {
    const positions = []
    const startDate = new Date(year, 0, 1)

    // Start from the first Sunday of the year or before
    const firstSunday = new Date(startDate)
    firstSunday.setDate(startDate.getDate() - startDate.getDay())

    const currentDate = new Date(firstSunday)
    let weekIndex = 0
    let currentMonth = -1

    while (currentDate.getFullYear() <= year) {
      if (currentDate.getMonth() !== currentMonth && currentDate.getFullYear() === year) {
        currentMonth = currentDate.getMonth()
        positions.push({
          month: months[currentMonth],
          position: weekIndex,
        })
      }

      currentDate.setDate(currentDate.getDate() + 7)
      weekIndex++

      if (currentDate.getFullYear() > year) break
    }

    return positions
  }

  const monthPositions = getMonthPositions()

  return (
    <div className="relative h-4 mb-1">
      <div className="grid grid-cols-53 gap-1 text-xs text-gray-400">
        {Array.from({ length: 53 }).map((_, weekIndex) => {
          const monthData = monthPositions.find((m) => m.position === weekIndex)
          return (
            <div key={weekIndex} className="text-center">
              {monthData ? monthData.month : ""}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthGrid
