import React, { useMemo } from "react"
import Machine from "./Machine"
import ReactJson from "react-json-view"
import Tabs from "./utilities/Tabs"
import InputBox from "./utilities/InputBox"
import DetailedSwitch from "./utilities/switches/DetailedSwitch"
import CopyClipboard from "./utilities/CopyClipboard"
import ForceGraph from "./ForceGraph"
import { factories } from "../data"
import PhaseSwitch from "./utilities/switches/PhaseSwitch"
import { TrashIcon } from "@heroicons/react/outline"

export default function Representation() {
  const factoryInitial = factories[0]
  const [factory, setFactory] = React.useState([])
  const [displayFactory, setDisplayFactory] = React.useState(factoryInitial)
  const [phase, setPhase] = React.useState(false) //false is initial, true is final
  const [detailed, setDetailed] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  useMemo(() => {
    if (phase) setDisplayFactory(factory)
    else setDisplayFactory(factoryInitial)
  }, [factory, factoryInitial, phase])

  const Tab = (props) => <>{props.children}</>

  return (
    <Tabs>
      {/* Graph schema */}
      <Tab label="Graph">
        <ForceGraph factory={displayFactory} phaseHook={[phase, setPhase]} />
        <div className={`absolute top-8 right-8 z-50`}>
          <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} alt={true} />
        </div>
      </Tab>

      {/* Detailed list view */}
      <Tab label="Detailed">
        <div className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          <div className="p-1 flex items-center justify-between col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-4 min-w-full">
            <DetailedSwitch hook={[detailed, setDetailed]} toggle={() => setDetailed(!detailed)} />
            <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} />
          </div>
          {displayFactory.map((machine, index) => (
            <Machine data={machine} key={`detailed-${index}`} classnames="col-span-1 min-w-full" isDetailed={detailed} />
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
              className="h-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 hover:opacity-75 p-3 rounded text-white font-semibold duration-200"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
            <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} compact={true} />
          </div>
          {displayFactory
            .filter((machine, index) => {
              if (searchValue === "") return true
              else {
                let a = searchValue.toUpperCase()
                let b = machine.id.toUpperCase()
                return b.includes(a)
              }
            })
            .map((machine, index) => {
              return <Machine data={machine} key={`inspect-${index}`} classnames="col-span-1 min-w-full" isDetailed={true} />
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
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "1em",
                  width: "100%",
                  height: "60vh",
                  borderRadius: "0.5rem",
                  fontSize: "small",
                  lineHeight: 1,
                  fontFamily: "JetBrains Mono, Consolas, sans-serif",
                  backgroundColor: "#3c4553", //334155
                }}
              />
            </div>
            {/* Final JSON */}
            <div className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl">
              <CopyClipboard json={factory} />
              <ReactJson
                indentWidth={4}
                iconStyle="triangle"
                name={false}
                collapsed={true}
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                src={factory}
                theme="threezerotwofour"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "1em",
                  width: "100%",
                  height: "60vh",
                  borderRadius: "0.5rem",
                  fontSize: "small",
                  lineHeight: 1,
                  fontFamily: "JetBrains Mono, Consolas, sans-serif",
                  backgroundColor: "#3c4553", //334155
                }}
              />
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>
  )
}
