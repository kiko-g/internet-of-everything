import * as React from "react"

export default function Machine(props) {
  const data = props.data || []
  const propClasses = props.propClasses || ""
  const properties = data.properties

  return (
    <div
      key={`machine-${data.machineID}`}
      className={`${propClasses} p-3 rounded-lg shadow-md duration-200
      bg-bluegray-200 hover:bg-bluegray-300 border-0`}
    >
      <div className="flex items-center justify-between space-x-8">
        <h5 class="text-bluegray-800 font-bold text-lg tracking-tight mb-2">
          Machine#{data.machineID}
        </h5>
        <div className="flex flex-col text-right">
          <span className="text-xxs hover:text-coolgray-600">
            {data.readingTime.split(" ")[0]}
          </span>
          <span className="text-xxs hover:text-coolgray-600">
            {data.readingTime.split(" ")[1]}
          </span>
        </div>
      </div>
      <ul>
        {Object.keys(properties).map((key, index) => (
          <li
            className="flex justify-between my-1"
            key={`attribute-${data.machineID}-${index}`}
          >
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
              {key.toUpperCase()}
            </span>
            <span class="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
              {properties[key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
