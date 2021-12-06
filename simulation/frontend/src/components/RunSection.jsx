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

      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        <div class="bg-gray-200 rounded-full dark:bg-gray-700">
          <div class="bg-sky-600 w-1/3 text-md font-medium text-bluegray-200 text-center p-1.5 leading-none tracking-normal rounded-l-full">
            33%
          </div>
        </div>
        <FlowbiteButton
          color="bluegray"
          text="Export JSON"
          fontsize="xs"
          py="1"
        />
      </div> */}
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-2">
        <FlowbiteButton color="teal" text="Run" />
        <FlowbiteButton color="amber" text="Pause" />
        <FlowbiteButton color="rose" text="Stop" />
      </div>
    </div>
  )
}
