import React from "react"
import PresetsRadio from "./utilities/PresetsRadio"
import { PlusCircleIcon } from "@heroicons/react/solid"

export default function Presets() {
  return (
    <div className="bg-bluegray-100 p-4 rounded-xl">
      <PresetsRadio />
      <div className="mt-2 flex items-end justify-end">
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-white bg-bluegray-700 rounded-xl bg-opacity-30 hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add preset&nbsp;
          <PlusCircleIcon className="w-4 h-4 mb-0.5 inline-flex" />
        </button>
      </div>
    </div>
  )
}
