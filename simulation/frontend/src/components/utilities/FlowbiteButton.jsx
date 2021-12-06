import * as React from "react"

export default function FlowbiteButton(props) {
  const color = props.color || "purple"
  const text = props.text || "Button"
  const icon = props.icon || ""
  const propStyles = props.propStyles || ""

  return (
    <button
      type="button"
      className={`${propStyles} text-white bg-${color}-600 hover:bg-${color}-700 focus:ring-4 focus:ring-${color}-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-${color}-500 dark:hover:bg-${color}-600 dark:focus:ring-${color}-700`}
    >
      {text}&nbsp;{icon}
    </button>
  )
}
