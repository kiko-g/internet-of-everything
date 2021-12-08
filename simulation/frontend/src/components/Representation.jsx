import * as React from "react"
import Tabs from "./utilities/Tabs"
import Machine from "./Machine"
import FactoryData from "../factory.json"
import ReactJson from "react-json-view"
import BasicInput from "./utilities/BasicInput"
import FlowbiteButton from "./utilities/FlowbiteButton"

const Tab = (props) => {
  return <div>{props.children}</div>
}

export default class Representation extends React.Component {
  startingPoint = FactoryData[0]
  schema = FactoryData.slice(1, FactoryData.length)

  render() {
    return (
      <Tabs>
        <Tab label="Schema">
          <div className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {this.schema.map((item, index) => (
              <Machine
                propClasses="col-span-1 min-w-full"
                key={index}
                data={item}
              />
            ))}
          </div>
        </Tab>
        <Tab label="Detailed">
          <div className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {this.schema.map((item, index) => (
              <Machine
                detailed={true}
                propClasses="col-span-1 min-w-full"
                key={index}
                data={item}
              />
            ))}
          </div>
        </Tab>
        <Tab label="Inspect">
          <div className="grid w-full grid-cols-1 gap-4">
            <BasicInput label="Search" types={["Machine Name", "Machine ID"]} />
            {this.schema.map((item, index) => (
              <Machine
                propClasses="min-w-full col-span-1"
                detailed={true}
                key={index}
                data={item}
              />
            ))}
          </div>
        </Tab>
        <Tab label="JSON">
          <div className="grid w-full grid-cols-1 gap-4">
            <div className="grid grid-cols-3 gap-4 w-full">
              <FlowbiteButton
                color="violet"
                text="Export Initial JSON"
                py="3"
              />
              <FlowbiteButton
                color="blue"
                text="Export Simulation JSON"
                py="3"
              />
              <FlowbiteButton
                color="teal"
                text="Export Simulation JSON"
                py="3"
              />
            </div>
            <ReactJson
              indentWidth={4}
              iconStyle="circle"
              name={false}
              collapsed={false}
              displayObjectSize={false}
              displayDataTypes={false}
              enableClipboard={false}
              src={this.schema}
              theme="harmonic"
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                padding: "1em",
                width: "100%",
                borderRadius: "0.5rem",
                fontSize: "large",
                lineHeight: 1,
                fontFamily: "Consolas, sans-serif",
                backgroundColor: "#334155",
              }}
            />
          </div>
        </Tab>
      </Tabs>
    )
  }
}
