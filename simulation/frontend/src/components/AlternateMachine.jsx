import React from "react"
import { resolveStatus } from "../utils"
import { StatusOnlineIcon } from "@heroicons/react/outline"

export default function AlternateMachine({ data, classnames, isDetailed }) {
  const status = data.status
  const info = {
    sensors: data.sensors.length,
    totalWorkingTime: data.totalWorkingTime + "ms",
  }
  const links = {
    prev: "tbd",
    next: "tbd",
  }
  const sensors = data.sensors

  return (
    <div
      key={`machine-${data.id}`}
      className={`relative group bg-gray-50 border-2 dark:bg-slate-600 text-slate-700 dark:text-white p-3 rounded-xl shadow-lg dark:shadow-slate-400/50 ${classnames} `}
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

      {/* Info */}
      <ul>
        {Object.keys(info).map((key, index) => (
          <li className="flex justify-between mt-1" key={`info-machine-${data.id}-${key}`}>
            <span className="uppercase bg-opacity-60 bg-blue-400 text-sky-50 dark:bg-opacity-80 dark:bg-blue-400 dark:text-sky-50 text-xs font-semibold px-2 py-0.5 rounded">
              {key.slice(0, 7)}
            </span>
            <span className="lowercase bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700 text-right text-xs font-semibold px-2 py-0.5 rounded">
              {info[key]}
            </span>
          </li>
        ))}
      </ul>

      {/* Links */}
      <ul>
        {Object.keys(links).map((link, index) => (
          <li className="flex items-center justify-between mt-1" key={`${link}-machine-${data.id}`}>
            <span className="uppercase bg-opacity-60 bg-teal-400 text-teal-50 dark:bg-opacity-80 dark:bg-teal-400 dark:text-sky-50 text-xs font-semibold px-2 py-0.5 rounded">
              {link.slice(0, 6)}
            </span>
            {links[link] === "null" ? (
              <span className="lowercase text-right bg-rose-600 text-gray-50 text-xs font-semibold px-2 py-0.5 rounded dark:bg-rose-700 dark:text-gray-50">
                <span className="font-bold">none</span>
              </span>
            ) : (
              <span className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                <span>{links[link]}</span>
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Sensors */}
      {isDetailed ? (
        <ul>
          {Object.keys(sensors).map((key, index) => (
            <ul key={`sensor-${data.id}-${index}`}>
              {Object.keys(sensors[key])
                .filter((k, i) => k === "type")
                .map((k, i) => (
                  <>
                    <li className="flex justify-between my-1" key={`sensor-type-${data.id}-${index}-${k}`}>
                      <span className="uppercase bg-slate-400 text-white dark:bg-slate-400 dark:text-white text-xs font-semibold px-2 py-0.5 rounded">
                        {`type`}
                      </span>
                      <span className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                        {`${sensors[key][k]}`}
                      </span>
                    </li>
                    <li className="flex justify-between my-1" key={`sensor-fail-${data.id}-${index}-${k}`}>
                      <span className="uppercase bg-slate-400 text-white dark:bg-slate-400 dark:text-white text-xs font-semibold px-2 py-0.5 rounded">
                        {`failcount`}
                      </span>
                      <span className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                        {`${sensors[key]["failcount"]}`}
                      </span>
                    </li>
                  </>
                ))}
            </ul>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
