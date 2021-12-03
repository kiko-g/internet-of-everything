import * as React from "react";
import Tabs from "./Tabs";
import Machine from "./Machine"
import FactoryData from "../factory.json"

const Tab = (props) => {
  return <div>{props.children}</div>;
};

export default class Representation extends React.Component {
  startingPoint = FactoryData[0]
  representation = FactoryData.slice(1, FactoryData.length)
  
  render() {
    return (
      <div className="p-10">
        <Tabs>
          <Tab label="Representation">
            <div>
              {this.representation.map((item, index) => (
                <Machine key={index} data={item} />
              ))}
            </div>
          </Tab>
          <Tab label="JSON">
            <pre>
              {JSON.stringify(this.representation, null, 2)}
            </pre>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
