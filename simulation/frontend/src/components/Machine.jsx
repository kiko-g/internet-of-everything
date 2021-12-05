import * as React from "react"

export default function Machine(props) {
  const data = props.data

  return (
    <div
      key={`machine-${data.machineID}`}
      className="bg-gray-300 p-2 my-2 rounded-sm"
    >
      <ul>
        <li key={`attribute-id-${data.machineID}`}>
          <strong>ID</strong>&nbsp;{data.machineID}
        </li>
        <li key={`attribute-readtime-${data.machineID}`}>
          <strong>Reading Time</strong>&nbsp;{data.readingTime}
        </li>
        {Object.keys(data.properties).map((key, index) => (
          <li key={`attribute-${data.machineID}-${index}`}>
            <strong>{key}</strong>&nbsp;{data.properties[key]}
          </li>
        ))}
      </ul>
    </div>
  )
}
