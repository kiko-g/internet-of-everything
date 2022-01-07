import React from "react"
import { Switch } from "@headlessui/react"

export default function PhaseSwitch(props) {
  const [phase, setPhase] = props.hook
  const compact = props.compact || false

  return (
    <Switch.Group title={`Toggle factory state (current: ${phase ? `result` : `initial`})`}>
      <div className={`flex items-center ${compact ? `flex-col space-y-1` : ``}`}>
        {compact ? (
          <Switch.Label passive className="font-medium text-xs text-slate-500">
            <span>{phase ? `Result` : `Initial`}</span>
          </Switch.Label>
        ) : (
          <Switch.Label passive className="mr-2">
            <span className={`font-medium ${props.alt ? `text-slate-800` : `text-slate-500`}`}>
              {phase ? `Result` : `Initial`}
            </span>
          </Switch.Label>
        )}

        <Switch
          checked={phase}
          onChange={() => setPhase(!phase)}
          className={`${
            phase ? "bg-blue-300" : "bg-slate-400"
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
