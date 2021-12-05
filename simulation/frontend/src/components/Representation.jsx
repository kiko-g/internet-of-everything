import * as React from "react"
import Tabs from "./utilities/Tabs"
import Machine from "./Machine"
import FactoryData from "../factory.json"
import ReactJson from "react-json-view"

const Tab = (props) => {
  return <div>{props.children}</div>
}

export default class Representation extends React.Component {
  startingPoint = FactoryData[0]
  representation = FactoryData.slice(1, FactoryData.length)

  render() {
    return (
      <Tabs>
        <Tab label="JSON">
          <ReactJson
            indentWidth={4}
            iconStyle="circle"
            name={false}
            collapsed={false}
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
            src={this.representation}
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
        </Tab>
        <Tab label="Representation">
          <div className="grid grid-cols-4 space-x-4">
            {this.representation.map((item, index) => (
              <Machine key={index} data={item} />
            ))}
          </div>
        </Tab>
      </Tabs>
    )
  }
}
