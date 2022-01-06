import React from "react"
import RunSection from "./RunSection"
import Presets from "./Presets"

export default function Sidebar() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <RunSection />
        <Presets />
      </div>
    </div>
  )
}
