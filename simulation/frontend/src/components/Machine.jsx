import * as React from "react"
import { getStatus } from "../utils/utils"

export default function Machine(props) {
  const data = props.data || []
  const classnames = props.propClasses || ""
  const isDetailed = props.detailed || false
  const info = {
    name: data.name,
    status: getStatus(data.status),
    temperature: data.temperature,
  }
  const io = {
    input: data.input,
    output: data.output,
  }
  const links = data.links
  const properties = data.properties || []

  return (
    <div
      key={`machine-${data.id}`}
      className={`${classnames} bg-bluegray-500 dark:bg-bluegray-600 text-white p-3 border-0 rounded-xl shadow-md`}
    >
      {/* Headline */}
      <div className="flex items-center justify-between space-x-3">
        <h5 className="text-coolgray-50 text-lg tracking-tight mb-2">Machine #{data.id}</h5>
        <div className="flex flex-col text-right">
          <span className="text-xxs">{data.readingTime.split(" ")[0]}</span>
          <span className="text-xxs">{data.readingTime.split(" ")[1]}</span>
        </div>
      </div>

      {/* Info */}
      <ul>
        {Object.keys(info).map((key, index) => (
          <li className="flex justify-between my-1" key={`property-${data.id}-${index}`}>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
              {key.toUpperCase().slice(0, 6)}
            </span>
            <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
              {info[key]}
            </span>
          </li>
        ))}
      </ul>

      {/* Extra properties */}
      {isDetailed ? (
        <ul>
          {Object.keys(properties).map((key, index) => (
            <li className="flex justify-between my-1" key={`property-${data.id}-${index}`}>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {key.toUpperCase().slice(0, 6)}
              </span>
              <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                {properties[key]}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Links */}
      <ul>
        <li className="flex justify-between my-1" key={`links-machine-${data.id}`}>
          <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-rose-100 dark:text-rose-800">
            {"links".toUpperCase().slice(0, 6)}
          </span>
          <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
            {links.length === 0 ? (
              <span className="text-rose-700">none</span>
            ) : (
              <span>{links.map((key, index) => (index + 1 < links.length ? `${key},` : key))}</span>
            )}
          </span>
        </li>
      </ul>

      {/* IO */}
      <ul>
        {Object.keys(io).map((key, index) => (
          <li className="flex justify-between my-1" key={`property-${data.id}-${index}`}>
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-teal-100 dark:text-teal-800 flex items-center">
              {key.toUpperCase().slice(0, 6)}
            </span>
            <span className="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
              {Object.keys(io[key]).map((k, i) => (
                <span key={`io-${k}-${i}`} className="flex">{`${k} {}`}</span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
