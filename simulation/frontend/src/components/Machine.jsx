import * as React from "react"

export default function Machine(props) {
  const data = props.data || []
  const propClasses = props.propClasses || ""
  const isDetailed = props.detailed || false
  const properties = data.properties
  const moreProperties = data.moreProperties || []

  return (
    <div
      key={`machine-${data.machineID}`}
      className={`${propClasses}
      bg-sky-900 bg-opacity-75 text-white
      w-52 p-3 border-0 rounded-lg shadow-md duration-200 hover:opacity-90`}
    >
      <div className="flex items-center justify-between space-x-3">
        <h5 class="text-coolgray-50 font-bold text-lg tracking-tight mb-2">
          Machine#{data.machineID}
        </h5>
        <div className="flex flex-col text-right">
          <span className="text-xxs">{data.readingTime.split(" ")[0]}</span>
          <span className="text-xxs">{data.readingTime.split(" ")[1]}</span>
        </div>
      </div>
      <ul>
        {Object.keys(properties).map((key, index) => (
          <li
            className="flex justify-between my-1"
            key={`attribute-${data.machineID}-${index}`}
          >
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
              {key.toUpperCase().slice(0, 6)}
            </span>
            <span class="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
              {properties[key]}
            </span>
          </li>
        ))}
      </ul>
      {isDetailed ? (
        <ul>
          {Object.keys(moreProperties).map((key, index) => (
            <li
              className="flex justify-between my-1"
              key={`attribute-${data.machineID}-${index}`}
            >
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {key.toUpperCase().slice(0, 6)}
              </span>
              <span class="text-right bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                {moreProperties[key]}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
