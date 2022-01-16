import React from "react"

export default function Sensor({ data, parent, classnames, isDetailed }) {
  const id = data.id
  const type = data.type
  const attributes = data.attributes

  return (
    <div className="flex items-center justify-between rounded-2xl shadow">
      <div className="bg-emerald-500 rounded-l-2xl h-24 w-24"></div>
      <div className="p-2 flex-1">
        <div className="w-min px-1 text-xs lowercase rounded-md bg-emerald-200 text-emerald-800">{type}</div>
        <div className="text-gray-800 capitalize">{id}</div>
        <div className="text-gray-400 font-normal">
          Associated with <span className="text-gray-500 font-medium">{parent}</span>
        </div>
      </div>
      {Object.keys(attributes).map((attribute, attributeIdx) => console.log(attribute))}
    </div>
  )
}
