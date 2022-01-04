import * as React from "react"
import RunSection from "./RunSection"
import Presets from "./Presets"

export default function Configuration() {
  return (
    <div>
      <form className="grid grid-cols-1 gap-4">
        <RunSection />
        <Presets />
      </form>
    </div>
  )
}
