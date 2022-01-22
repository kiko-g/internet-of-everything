import React from "react"
import { resolveStatus } from "../utils"
import { StatusOnlineIcon } from "@heroicons/react/outline"

export default function Machine({ data, classnames, isDetailed }) {
  const status = data.status
  const info = {
    input: data.input,
    output: data.output,
    defect: data.defectProbability + " %",
    batchTime: data.timePerBatch + " ms",
    sensors: data.sensors.length,
  }
  const links = {
    prev: data.prevMachineID,
    next: data.nextMachineID,
  }
  const sensors = data.sensors

  return (
    <div
      key={`machine-${data.id}`}
      className={`relative group bg-white border-2 dark:bg-slate-600 text-slate-700 dark:text-white p-3 rounded-xl shadow-lg dark:shadow-slate-400/50 ${classnames} `}
    >
      {/* Headline */}
      <div className="flex items-start justify-between border-b-2 pb-0.5 mb-2">
        <h5 className="mt-0 uppercase tracking-wide text-lg font-mono">{data.id}</h5>
        <span className="flex items-start text-sm">
          {resolveStatus(status)}
          {status ? (
            <StatusOnlineIcon className="h-6 w-6 ml-1 pb-0.5 text-teal-400 dark:text-teal-400" />
          ) : (
            <StatusOnlineIcon className="h-6 w-6 ml-1 pb-0.5 text-rose-400 dark:text-rose-500" />
          )}
        </span>
      </div>

      {/* Links */}
      <ul>
        {Object.keys(links).map((link, index) => (
          <li className="flex items-center justify-between mt-1" key={`${link}-machine-${data.id}`}>
            <span className="uppercase bg-teal-400/75 text-teal-50 dark:bg-teal-400/75 dark:text-sky-50 text-xs font-medium px-2 py-0.5 rounded">
              {link.slice(0, 6)}
            </span>
            {links[link] === "null" ? (
              <span className="lowercase text-right bg-rose-600 text-gray-50 text-xs font-medium px-2 py-0.5 rounded dark:bg-rose-700 dark:text-gray-50">
                <span>none</span>
              </span>
            ) : (
              <span className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-normal px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                <span>{links[link]}</span>
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Info */}
      <ul>
        {Object.keys(info).map((key, index) => (
          <li className="flex justify-between mt-1" key={`info-machine-${data.id}-${key}`}>
            <span className="uppercase bg-blue-400/75 text-sky-50 dark:bg-blue-400/75 dark:text-sky-50 text-xs font-medium px-2 py-0.5 rounded">
              {key.slice(0, 9)}
            </span>
            <span className="lowercase bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700 text-right text-xs font-normal px-2 py-0.5 rounded">
              {info[key]}
            </span>
          </li>
        ))}
      </ul>

      {/* Sensors */}
      {isDetailed ? (
        <ul className="space-y-[-3px]">
          {Object.keys(sensors).map((key, index) => (
            <ul key={`sensor-${data.id}-${index}`}>
              {Object.keys(sensors[key])
                .filter((k, i) => k === "type")
                .map((k, i) => (
                  <li className="flex justify-between" key={`sensor-type-${data.id}-${index}-${k}`}>
                    <div className="space-x-1">
                      <span className="uppercase bg-slate-400 text-white dark:bg-slate-400 dark:text-white text-xs font-medium px-2 py-0.5 rounded">
                        {`sensor`}
                      </span>
                      <span className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-normal px-1 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                        {`${sensors[key][k]}`}
                      </span>
                    </div>
                    <div className="space-x-1">
                      <span className="lowercase bg-violet-600/50 text-white dark:bg-violet-400 dark:text-white text-xs font-medium px-1 py-0.5 rounded">
                        {`id`}
                      </span>
                      <span className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-normal px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                        {`${sensors[key]["id"][0]}${sensors[key]["id"][sensors[key]["id"].length - 1]}`}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
