import React, { Component } from "react"
import Graph from "react-graph-vis"

export default class ForceGraph extends Component {
  constructor() {
    super()
    this.state = {
      options: {
        layout: {
          hierarchical: false,
        },
        edges: {
          color: "#28303b",
        },
        nodes: {
          shape: "box",
          font: {
            face: "Consolas",
            color: "#fff",
            size: 20,
          },
          color: "#334155",
        },
        physics: {
          enabled: true,
        },
        interaction: {
          multiselect: true,
          dragView: true,
        },
      },
      graph: {
        nodes: this.createNodes(),
        edges: this.createEdges(),
      },
    }
  }

  createNodes() {
    return [
      { id: 1, label: "1" },
      { id: 2, label: "2" },
      { id: 3, label: "3" },
      { id: 4, label: "4" },
      { id: 5, label: "5" },
    ]
  }

  createEdges() {
    return [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ]
  }

  events = {
    dragStart: (event) => {},
    dragEnd: (event) => {},
  }

  render() {
    return (
      <div id="graph" className="w-full bg-bluegray-300 rounded-md" style={{ height: "65vh" }}>
        <Graph graph={this.state.graph} options={this.state.options} events={this.state.events} />
      </div>
    )
  }
}
