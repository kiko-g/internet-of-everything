import * as React from "react"
import FlowbiteButton from "./utilities/FlowbiteButton"

export default function RunSection() {
  return (
    <div className="relative group bg-coolgray-100 w-full p-4 rounded-md space-y-3 mb-2">
      <h5 className="text-coolgray-700 font-bold text-2xl tracking-tight">
        Run Section
      </h5>
      <span className="absolute top-0 right-5">
        <button
          type="button"
          className={`text-sky-600 font-medium rounded-md text-sm py-2 text-center hover:opacity-50`}
        >
          Save JSON
        </button>
      </span>
      <span>Here the user should control the simulaion.</span>
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-2">
        <FlowbiteButton color="teal" text="Run" />
        <FlowbiteButton color="amber" text="Pause" />
        <FlowbiteButton color="rose" text="Stop" />
      </div>
    </div>
  )
}
