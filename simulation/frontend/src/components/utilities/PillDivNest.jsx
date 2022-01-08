import * as React from "react"
const pill = "p-4 rounded-xl flex items-center justify-start space-x-3"

const PillDivNest = ({ color = "bg-white", children }) => {
  return <div className={`${pill} ${color}`}>{children}</div>
}

export default PillDivNest
