import React from "react"
import { Switch } from "@headlessui/react"

export default function PhaseSwitch(props) {
  const [phase, setPhase] = props.hook
  const compact = props.compact || false

  return (
    <Switch.Group title={`Toggle factory state (current: ${phase ? `result` : `initial`})`}>
      <div className={`flex items-center ${compact ? `flex-col space-y-1` : ``}`}>
        {compact ? (
          <Switch.Label passive className="font-medium text-xxs text-slate-600">
            <span>{phase ? `Result` : `Initial`}</span>
          </Switch.Label>
        ) : (
          <Switch.Label passive className="mr-1.5">
            <span className={`tracking-tight font-medium ${props.alt ? `text-slate-800` : `text-slate-600`}`}>
              {phase ? `Result` : `Initial`}
            </span>
          </Switch.Label>
        )}

        <Switch
          checked={phase}
          onChange={() => setPhase(!phase)}
          className={`
          ${
            phase ? "bg-teal-500" : `${props.alt ? `bg-slate-600` : `bg-slate-300`}`
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
        >
          <span
            className={`${
              phase ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
