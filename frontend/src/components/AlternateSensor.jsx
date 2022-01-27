import React from "react"
import { findColor } from "../utils"
import "./css/sensor.css"

export default function AlternateSensor({ data, parent, classnames, isDetailed }) {
  const id = data.id
  const type = data.type
  const fails = data.failureTimes
  const attributes = data.attributes
  const color = findColor(type)

  return isDetailed ? (
    <div className="bg-white flex flex-col justify-between rounded-xl shadow text-sm">
      <div className="flex items-center justify-between border-b-2">
        <div className={`card-${color} rounded-tl-xl h-full w-2`}></div>
        <div className="p-3 flex-1 flex flex-col items-start space-y-2 justify-between h-full">
          <div className="flex items-center justify-between w-full">
            <div className={`px-1.5 py-0.5 text-xs lowercase rounded-xl pill-${color}`}>{type}</div>
            <div className={`px-1.5 py-0.5 text-xs lowercase rounded-xl pill-fail font-normal`}>Fails: {fails}</div>
          </div>
          <div>
            <div className="text-gray-500 capitalize">{id}</div>
            <div className="text-gray-400 font-normal">
              Associated with <span className="text-gray-600 font-medium">{parent}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-b-xl h-full">
        {Object.keys(attributes).map((attribute, attributeIdx) =>
          Object.keys(attributes).length === 1 ? (
            <div key={`sensor-final-${id}-attribute-${attribute}`} className="flex h-full">
              <div className="rounded-bl-xl bg-slate-400 w-2 flex items-center"></div>
              <div
                title="Minimum, Maximum, Average and Standard Deviation"
                className="flex items-center text-gray-700 space-x-1 p-1 font-normal text-xs"
              >
                <span className="font-medium text-slate-400 px-1 py-0.5 rounded-xl">{attribute}</span>
                <span>{parseFloat(attributes[attribute]).toFixed(2)}</span>
              </div>
            </div>
          ) : attributeIdx !== Object.keys(attributes).length - 1 ? (
            <div key={`sensor-final-${id}-attribute-${attribute}`} className="flex">
              <div className="bg-slate-400 w-2"></div>
              <div
                title="Minimum, Maximum, Average and Standard Deviation"
                className="flex items-center text-gray-700 space-x-1 p-1 font-normal text-xs"
              >
                <span className="font-medium text-slate-400 px-1 py-0.5 rounded-xl">{attribute}</span>
                <span>{parseFloat(attributes[attribute]).toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div key={`sensor-final-${id}-attribute-${attribute}`} className="flex">
              <div className="bg-slate-400 w-2 rounded-bl-xl"></div>
              <div
                title="Minimum, Maximum, Average and Standard Deviation"
                className="flex items-center text-gray-700 space-x-1 p-1 font-normal text-xs"
              >
                <span className="font-medium text-slate-400 px-1 py-0.5 rounded-xl">{attribute}</span>
                <span>{parseFloat(attributes[attribute]).toFixed(2)}</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  ) : (
    <div className="bg-white flex items-center justify-between rounded-xl shadow text-sm">
      <div className={`card-${color} rounded-l-xl h-full w-2`}></div>
      <div className="p-3 flex-1 flex flex-col items-start space-y-2 justify-between h-full">
        <div className="flex items-center justify-between w-full">
          <div className={`px-1.5 py-0.5 text-xs lowercase rounded-xl pill-${color}`}>{type}</div>
          <div className={`px-1.5 py-0.5 text-xs lowercase rounded-xl pill-fail font-normal`}>Fails: {fails}</div>
        </div>
        <div>
          <div className="text-gray-500 capitalize">{id}</div>
          <div className="text-gray-400 font-normal">
            Associated with <span className="text-gray-600 font-medium">{parent}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
