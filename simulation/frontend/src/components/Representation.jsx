import * as React from "react"
import Machine from "./Machine"
import ReactJson from "react-json-view"
import Tabs from "./utilities/Tabs"
import BasicInput from "./utilities/BasicInput"
import FactoryFloor from "../data/factory.json"
import DetailedSwitch from "./utilities/DetailedSwitch"
import CopyClipboard from "./utilities/CopyClipboard"
import ForceGraph from "./ForceGraph"

export default function Representation() {
  const [detailed, setDetailed] = React.useState(false)
  const factoryInitial = FactoryFloor
  const factorySimulation = []
  const Tab = (props) => <div>{props.children}</div>

  return (
    <Tabs>
      {/* Graph schema */}
      <Tab label="Graph">
        <ForceGraph factory={factoryInitial} />
      </Tab>
      {/* Detailed list view */}
      <Tab label="Detailed">
        <div className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          <div className="col-span-4 min-w-full">
            <DetailedSwitch hook={[detailed, setDetailed]} toggle={() => setDetailed(!detailed)} />
          </div>
          {factoryInitial.map((item, index) => (
            <Machine data={item} key={`detailed-${index}`} propClasses="col-span-1 min-w-full" detailed={detailed} />
          ))}
        </div>
      </Tab>
      {/* Inspect view with search */}
      <Tab label="Inspect">
        <div className="grid w-full grid-cols-1 gap-4">
          <BasicInput label="Search" types={["Machine Name", "Machine ID"]} />
          {factoryInitial.map((item, index) => (
            <Machine data={item} key={`inspect-${index}`} propClasses="col-span-1 min-w-full" detailed={true} />
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
          {/* Initial JSON */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl">
              <CopyClipboard json={factoryInitial} />
              <ReactJson
                indentWidth={4}
                iconStyle="triangle"
                name={false}
                collapsed={false}
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
              <CopyClipboard json={factorySimulation} />
              <ReactJson
                indentWidth={4}
                iconStyle="triangle"
                name={false}
                collapsed={false}
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false}
                src={factorySimulation}
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
