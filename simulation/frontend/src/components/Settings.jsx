import React from "react"
import Collapsed from "./utilities/Collapsed"
import BasicInput from "./utilities/BasicInput"
import { PlusCircleIcon } from "@heroicons/react/solid"

export default function Settings() {
  return (
    <div className="bg-bluegray-100 p-4 rounded-xl w-full space-y-2 mx-auto">
      <Collapsed open={false} color="bluegray" headline="General">
        <div className="grid gap-2">
          <BasicInput placeholder="Start Machine ID" />
          <BasicInput placeholder="Start Machine Input (x: {a, b}, y: {c, d})" />
          <BasicInput placeholder="Expected Output (goal: {a, b})" />
        </div>
      </Collapsed>
      <Collapsed open={false} color="bluegray" headline="Extra Settings">
        <BasicInput placeholder="Max Temperature (ºC)" />
        <BasicInput placeholder="Breakpoints (format TBD)" />
      </Collapsed>
      {/* <div className="grid grid-cols-2 space-x-2">
        <Collapsed color="bluegray" headline="Setting C">
          Settings
        </Collapsed>
        <Collapsed color="bluegray" headline="Setting D">
          Settings
        </Collapsed>
      </div> */}
      <div className="flex items-end justify-end">
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-white bg-bluegray-700 rounded-xl bg-opacity-30 hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add settings as preset&nbsp;
          <PlusCircleIcon className="w-4 h-4 mb-0.5 inline-flex" />
        </button>
      </div>
    </div>
  )
}
