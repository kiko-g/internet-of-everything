import * as React from "react"
import Machine from "./Machine"
import ReactJson from "react-json-view"
import Tabs from "./utilities/Tabs"
import BasicInput from "./utilities/BasicInput"
import SimSettings from "../data/config.json"
import FactoryFloor from "../data/factory.json"
import { PlusCircleIcon, DocumentDownloadIcon } from "@heroicons/react/solid"

export default function Representation() {
  const schema = FactoryFloor
  const settings = SimSettings
  const Tab = (props) => <div>{props.children}</div>

  return (
    <Tabs>
      {/* Graph schema */}
      <Tab label="Schema">
        <div className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {console.log(settings)}
          {schema.map((item, index) => (
            <Machine data={item} key={`schema-${index}`} propClasses="col-span-1 min-w-full" />
          ))}
        </div>
      </Tab>
      {/* Detailed list view */}
      <Tab label="Detailed">
        <div className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {schema.map((item, index) => (
            <Machine data={item} key={`detailed-${index}`} propClasses="col-span-1 min-w-full" detailed={true} />
          ))}
        </div>
      </Tab>
      {/* Inspect view with search */}
      <Tab label="Inspect">
        <div className="grid w-full grid-cols-1 gap-4">
          <BasicInput label="Search" types={["Machine Name", "Machine ID"]} />
          {schema.map((item, index) => (
            <Machine data={item} key={`inspect-${index}`} propClasses="min-w-full col-span-1" detailed={true} />
          ))}
        </div>
      </Tab>
      {/* JSON Representations */}
      <Tab label="JSON">
        <div className="grid w-full grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center text-white tracking-wider capitalize bg-bluegray-400 p-3 rounded-lg ">Initial State</div>
            <div className="text-center text-white tracking-wider capitalize bg-bluegray-400 p-3 rounded-lg ">Final State</div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl">
              <button className="absolute right-8 top-4 z-50 bg-gradient-to-br from-teal-300 via-blue-300 to-violet-300 hover:opacity-80 duration-200 text-white p-1.5 rounded-full">
                <span className="flex">
                  &nbsp;Export&nbsp;
                  <DocumentDownloadIcon className="w-6 h-6" />
                </span>
              </button>
              <ReactJson
                indentWidth={4}
                iconStyle="triangle"
                name={false}
                collapsed={false}
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                src={schema}
                theme="threezerotwofour"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "1em",
                  width: "100%",
                  maxHeight: "60vh",
                  borderRadius: "0.5rem",
                  fontSize: "small",
                  lineHeight: 1,
                  fontFamily: "JetBrains Mono, Consolas, sans-serif",
                  backgroundColor: "#3c4553", //334155
                }}
              />
            </div>
            <div className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl">
              <button className="absolute right-8 top-4 z-50 bg-gradient-to-br from-teal-300 via-blue-300 to-violet-300 hover:opacity-80 duration-200 text-white p-1.5 rounded-full">
                <span className="flex">
                  &nbsp;Export&nbsp;
                  <DocumentDownloadIcon className="w-6 h-6" />
                </span>
              </button>
              <ReactJson
                indentWidth={4}
                iconStyle="triangle"
                name={false}
                collapsed={false}
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                src={schema}
                theme="threezerotwofour"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "1em",
                  width: "100%",
                  maxHeight: "60vh",
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
