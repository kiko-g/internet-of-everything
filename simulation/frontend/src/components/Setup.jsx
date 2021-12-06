import * as React from "react"
import RunSection from "./RunSection"
import Collapsed from "./utilities/Collapsed"
import PresetsRadio from "./utilities/PresetsRadio"
import { PlusCircleIcon } from "@heroicons/react/solid"

export default function Setup() {
  return (
    <div>
      <form className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <RunSection content="aaaa" />
        </div>

        <div className="col-span-2">
          <div className="bg-bluegray-100 p-4 rounded-lg">
            <PresetsRadio />
            <div className="mt-2 flex items-end justify-end">
              <button
                type="button"
                onClick=""
                className="px-3 py-2 text-sm font-medium text-white bg-bluegray-700 rounded-md bg-opacity-30 hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Add preset&nbsp;
                <PlusCircleIcon className="w-4 h-4 mb-0.5 inline-flex" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="bg-bluegray-100 p-4 rounded-lg w-full space-y-4 mx-auto">
            <Collapsed color="bluegray" headline="Setting A">
              Settings
            </Collapsed>
            <Collapsed color="bluegray" headline="Setting B">
              Settings
            </Collapsed>
            <div className="grid grid-cols-2 space-x-2">
              <Collapsed color="bluegray" headline="Setting C">
                Settings
              </Collapsed>
              <Collapsed color="bluegray" headline="Setting D">
                Settings
              </Collapsed>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
