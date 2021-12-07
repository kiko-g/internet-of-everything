import * as React from "react"
import FlowbiteButton from "./utilities/FlowbiteButton"

export default function RunSection() {
  return (
    <div className="relative group bg-bluegray-100 w-full p-4 rounded-md space-y-3">
      <h5 className="text-coolgray-700 font-bold text-2xl tracking-tight">
        Run Section
      </h5>
      <span className="text-sm">
        Here the user should control the simulaion.
      </span>

      <div className="grid grid-cols-1">
        <div className="bg-gray-200 rounded-md dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white 
            w-1/3 text-xs font-medium text-center p-1 leading-none tracking-normal rounded-l-md"
          >
            33%
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-2">
        <FlowbiteButton color="teal" text="Run" />
        <FlowbiteButton color="amber" text="Pause" />
        <FlowbiteButton color="rose" text="Stop" />
      </div>
    </div>
  )
}
