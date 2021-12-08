import * as React from "react"
import RunSection from "./RunSection"
import Presets from "./Presets"
import Settings from "./Settings"

export default function Configuration() {
  return (
    <div>
      <form className="grid grid-cols-1 gap-4">
        <RunSection />
        <Presets />
        <Settings />
      </form>
    </div>
  )
}
