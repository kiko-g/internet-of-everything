import * as React from "react"

export default function CustomButton(props) {
  const color = props.color || "purple"
  const text = props.text || "Button"
  const icon = props.icon || ""
  const py = props.py || "2"
  const fontsize = props.fontsize || "lg"
  const action =
    props.action ||
    function () {
      console.log("Default")
    }

  return (
    <button
      type="button"
      onClick={action}
      className={`text-white bg-${color}-400 hover:bg-${color}-500 focus:shadow-lg font-medium rounded text-${fontsize} px-4 py-${py} text-center duration-150`}
    >
      {text}&nbsp;{icon}
    </button>
  )
}
