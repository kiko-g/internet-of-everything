import React from "react"
import RunSection from "./RunSection"
import Presets from "./Presets"

export default function Sidebar({ factoryInitialState, factoryFinalState, presetsState }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <RunSection factoryInitialState={factoryInitialState} factoryFinalState={factoryFinalState} />
        <Presets factoryInitialState={factoryInitialState} presetsState={presetsState} />
      </div>
    </div>
  )
}
