import * as React from "react"
import tw from "twin.macro"
const Pill = tw.div`p-4 rounded-lg flex items-center justify-start space-x-3`

const PillDivNest = ({ color = "bg-white", children }) => {
  return <Pill className={color}>{children}</Pill>
}

export default PillDivNest
