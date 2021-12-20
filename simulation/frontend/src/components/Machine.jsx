import * as React from "react"
import { getStatus } from "../utils/utils"

export default function Machine(props) {
  const data = props.data || []
  const propClasses = props.propClasses || ""
  const isDetailed = props.detailed || false
  const properties = data.properties || []
  const summary = {
    name: data.name,
    status: getStatus(data.status),
    temperature: data.temperature,
  }
  return (
    <div key={`machine-${data.id}`} className={`${propClasses} bg-bluegray-500 text-white p-3 border-0 rounded-xl shadow-md`}>
      <div className="flex items-center justify-between space-x-3">
        <h5 className="text-coolgray-50 text-lg tracking-tight mb-2">Machine #{data.id}</h5>
        <div className="flex flex-col text-right">
          <span className="text-xxs">{data.readingTime.split(" ")[0]}</span>
          <span className="text-xxs">{data.readingTime.split(" ")[1]}</span>
        </div>
      </div>

      <ul>
        {Object.keys(summary).map((key, index) => (
          <li className="flex justify-between my-1" key={`property-${data.id}-${index}`}>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
              {key.toUpperCase().slice(0, 6)}
            </span>
            <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
              {summary[key]}
            </span>
          </li>
        ))}
      </ul>

      {isDetailed ? (
        <ul>
          {Object.keys(properties).map((key, index) => (
            <li className="flex justify-between my-1" key={`property-${data.id}-${index}`}>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {key.toUpperCase().slice(0, 6)}
              </span>
              <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                {properties[key]}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
