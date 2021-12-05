import * as React from "react"
import "./animation.css"

const SpecialButton = (props) => {
  const text = props.text || "Default btn txt"
  const icon = props.icon || "Default icon txt"

  return (
    <button className="relative p-2 rounded-md leading-none flex items-center anim ">
      <span className="text-bluegray-50 transition duration-200 text-xl font-medium">
        {text}&nbsp;{icon}
      </span>
    </button>
  )
}

export default SpecialButton
