import React from "react"
import { Switch } from "@headlessui/react"

export default function DetailedSwitch(props) {
  const compact = props.compact || false
  const [detailed] = props.hook
  const toggleDetailed = props.toggle

  return (
    <Switch.Group title={`Toggle details on machine (current: ${detailed})`}>
      <div className={`flex items-center ${compact ? `flex-col space-y-1` : ``}`}>
        {compact ? (
          <Switch.Label passive className="font-medium text-xxs text-slate-600">
            <span>{detailed ? `Detailed` : `Compact`}</span>
          </Switch.Label>
        ) : (
          <Switch.Label passive className="mr-1.5">
            <span className={`tracking-tight font-medium ${props.alt ? `text-slate-800` : `text-slate-600`}`}>
              {detailed ? `Detailed` : `Compact`}
            </span>
          </Switch.Label>
        )}

        <Switch
          checked={detailed}
          onChange={toggleDetailed}
          className={`${
            detailed ? "bg-teal-500" : "bg-slate-300"
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
