import * as React from "react"
import { getStatus } from "../utils"

export default function Machine({ data, classnames, isDetailed }) {
  const info = {
    status: getStatus(data.status),
    input: data.input,
    output: data.output,
  }
  const next = data.nextMachineID
  const sensors = data.sensors

  return (
    <div
      key={`machine-${data.id}`}
      className={`${classnames} bg-slate-500 dark:bg-slate-600 text-white p-3 border-0 rounded-xl shadow-md`}
    >
      {/* Headline */}
      <div className="flex items-center justify-between space-x-3">
        <h5 className="text-zinc-50 text-lg tracking-tight mb-2">Machine #{data.id}</h5>
        <div className="flex flex-col text-right">
          <span className="text-xs">{data.defectProbability}%</span>
        </div>
      </div>

      {/* Info */}
      <ul>
        {Object.keys(info).map((key, index) => (
          <li className="flex justify-between my-1" key={`info-machine-${data.id}-${key}`}>
            <span className="bg-blue-100 text-sky-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-100 dark:text-sky-800">
              {key.toUpperCase().slice(0, 6)}
            </span>
            <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
              {info[key]}
            </span>
          </li>
        ))}
      </ul>

      {/* Next */}
      <ul>
        <li className="flex justify-between my-1" key={`next-machine-${data.id}`}>
          <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-rose-50 dark:text-rose-800">
            {"next".toUpperCase().slice(0, 6)}
          </span>
          <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
            {next === "" ? <span className="text-rose-700">none</span> : <span>{next}</span>}
          </span>
        </li>
      </ul>

      {/* Sensors */}
      {isDetailed ? (
        <ul>
          {Object.keys(sensors).map((key, index) => (
            <ul key={`sensor-${data.id}-${index}`}>
              {Object.keys(sensors[key])
                .filter((k, i) => k === "type")
                .map((k, i) => (
                  <li className="flex justify-between my-1" key={`sensor-${data.id}-${index}-${k}`}>
                    <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-teal-50 dark:text-teal-800">
                      {`sensor|${k}`.toUpperCase().slice(0, 12)}
                    </span>
                    <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                      {sensors[key][k].toLowerCase().slice(0, 12)}
                    </span>
                  </li>
                ))}
            </ul>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
