import "./css/sensor.css"
import React from "react"

export default function Stat({ color = "teal", statName = "Stat", statValue, statUnit }) {
  return (
    <div className="relative bg-white flex items-center justify-between rounded-xl shadow text-sm h-16">
      <div className={`absolute card-${color} rounded-l-xl h-full w-2 z-50`} />
      <div className="px-5 py-3 flex-1 flex flex-col items-start space-y-2 justify-between h-full">
        <div className={`px-1.5 py-0.5 text-xs lowercase rounded-xl pill-${color}`}>{statName}</div>
        <div>
          <div className="text-gray-500">
            <span className={`font-bold text-${color}-600`}>{statValue}</span>
            <span aria-hidden="true">&nbsp;</span>
            <span className="font-normal">{statUnit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

Stat.defaultProps = {
  color: "teal",
  statName: "Stat",
  statValue: "0.00",
  statUnit: "unit",
}
