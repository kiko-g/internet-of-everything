import React, { useMemo, useState } from "react"
import Machine from "./Machine"
import ReactJson from "react-json-view"
import Tabs from "./utilities/Tabs"
import InputBox from "./utilities/InputBox"
import DetailedSwitch from "./utilities/switches/DetailedSwitch"
import CopyClipboard from "./utilities/CopyClipboard"
import ForceGraph from "./ForceGraph"
import PhaseSwitch from "./utilities/switches/PhaseSwitch"
import { TrashIcon } from "@heroicons/react/outline"
import { jsonStyle } from "../utils"
import AlternateMachine from "./AlternateMachine"

export default function Representation({ factoryInitialState, factoryFinalState }) {
  const [factoryInitial] = factoryInitialState //used for presets
  const [factoryFinal] = factoryFinalState //used for result
  const [phase, setPhase] = useState(false) //false is initial, true is final
  const [detailed, setDetailed] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const factory = useMemo(() => {
    if (phase) return factoryFinal
    else return factoryInitial
  }, [factoryFinal, factoryInitial, phase])

  const Tab = (props) => <>{props.children}</>

  return (
    <Tabs>
      {/* Graph schema */}
      <Tab label="Graph">
        <ForceGraph factory={factory} phaseHook={[phase, setPhase]} />
        <div className={`absolute top-8 right-8 z-50`}>
          <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} alt={true} />
        </div>
      </Tab>

      {/* Detailed list view */}
      <Tab label="Detailed">
        <div className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          <div className="px-1 flex items-center justify-end space-x-6 col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-4 min-w-full">
            <DetailedSwitch hook={[detailed, setDetailed]} toggle={() => setDetailed(!detailed)} />
            <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} />
          </div>
          {phase
            ? factory.length === 0
              ? null
              : factory.machines.map((machine, index) => (
                  <AlternateMachine
                    data={machine}
                    key={`detailed-final-${index}`}
                    classnames="col-span-1 min-w-full"
                    isDetailed={detailed}
                  />
                ))
            : factory.map((machine, index) => (
                <Machine
                  data={machine}
                  key={`detailed-initial-${index}`}
                  classnames="col-span-1 min-w-full"
                  isDetailed={detailed}
                />
              ))}
        </div>
      </Tab>

      {/* Inspect view with search */}
      <Tab label="Inspect">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-2 col-span-1 lg:col-span-2 min-w-full">
            <InputBox
              label=""
              classnames="flex-1"
              types={["Machine ID"]}
              placeholder={`What are you searching for?`}
              state={[searchValue, setSearchValue]}
            />
            <button
              type="button"
              title="Clear input"
              onClick={() => setSearchValue("")}
              className="h-full bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 hover:opacity-75 p-3 rounded text-white font-semibold duration-200"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
            <DetailedSwitch hook={[detailed, setDetailed]} toggle={() => setDetailed(!detailed)} compact={true} />
            <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} compact={true} />
          </div>
          {phase
            ? factory.length === 0
              ? null
              : factory.machines
                  .filter((machine) => {
                    if (searchValue === "") return true
                    else return machine.id.toUpperCase().includes(searchValue.toUpperCase())
                  })
                  .map((machine, index) => {
                    return (
                      <AlternateMachine
                        data={machine}
                        key={`inspect-final-${index}`}
                        classnames="col-span-1 min-w-full"
                        isDetailed={detailed}
                      />
                    )
                  })
            : factory
                .filter((machine) => {
                  if (searchValue === "") return true
                  else return machine.id.toUpperCase().includes(searchValue.toUpperCase())
                })
                .map((machine, index) => {
                  return (
                    <Machine
                      data={machine}
                      key={`inspect-initial-${index}`}
                      classnames="col-span-1 min-w-full"
                      isDetailed={detailed}
                    />
                  )
                })}
        </div>
      </Tab>

      {/* JSON Representations */}
      <Tab label="JSON">
        <div className="grid w-full grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center text-white tracking-wider capitalize bg-slate-400 p-3 rounded-lg ">Initial State</div>
            <div className="text-center text-white tracking-wider capitalize bg-slate-400 p-3 rounded-lg ">Final State</div>
          </div>

          {/* Initial JSON */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl">
              <CopyClipboard json={factoryInitial} />
              <ReactJson
                indentWidth={4}
                iconStyle="triangle"
                name={false}
                collapsed={true}
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                src={factoryInitial}
                theme="threezerotwofour"
                style={jsonStyle}
              />
            </div>

            {/* Final JSON */}
            <div className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl">
              <CopyClipboard json={factoryFinal} />
              <ReactJson
                indentWidth={4}
                iconStyle="triangle"
                name={false}
                collapsed={true}
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                src={factoryFinal}
                theme="threezerotwofour"
                style={jsonStyle}
              />
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>
  )
}
