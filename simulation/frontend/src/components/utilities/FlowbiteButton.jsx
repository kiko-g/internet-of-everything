import * as React from "react"

export default function FlowbiteButton(props) {
  const color = props.color || "purple"
  const text = props.text || "Button"
  const icon = props.icon || ""
  const py = props.py || "2"
  const fontsize = props.fontsize || "sm"

  return (
    <button
      type="button"
      className={`text-white bg-${color}-600 hover:bg-${color}-700 focus:ring-2 focus:shadow-md focus:ring-${color}-300 font-medium rounded text-${fontsize} px-4 py-${py} text-center dark:bg-${color}-500 dark:hover:bg-${color}-600 dark:focus:ring-${color}-700`}
    >
      {text}&nbsp;{icon}
    </button>
  )
}
