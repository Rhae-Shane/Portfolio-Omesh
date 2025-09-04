"use client"

const StatsCard = ({ number, label, icon }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
      <div className="text-center">
        <div className="text-xl md:text-5xl font-bold bg-gradient-to-b from-gray-500/50 to-gray-950 bg-clip-text text-transparent">
  {number}
</div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-gray-400 text-sm font-medium">{label}</span>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
