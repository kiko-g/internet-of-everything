import React from "react"
import { Switch } from "@headlessui/react"

export default function DetailedSwitch(props) {
  const [detailed] = props.hook
  const toggleDetailed = props.toggle

  return (
    <Switch.Group title={`Toggle details on machine (current: ${detailed})`}>
      <div className="flex items-center">
        <Switch.Label passive className="mr-2">
          <span className="capitalize font-medium text-slate-500">Details</span>
        </Switch.Label>
        <Switch
          checked={detailed}
          onChange={toggleDetailed}
          className={`${
            detailed ? "bg-blue-300" : "bg-slate-400"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
        >
          <span
            className={`${
              detailed ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
