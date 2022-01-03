import React, { Component } from "react"
import Graph from "react-graph-vis"

export default class ForceGraph extends Component {
  constructor(props) {
    super(props)
    this.factory = this.props.factory
    this.state = {
      options: {
        layout: {
          hierarchical: false,
        },
        edges: {
          color: "#28303b",
          smooth: {
            enabled: true,
            type: "dynamic",
            roundness: 1,
          },
          arrows: {
            from: {
              enabled: true,
              scaleFactor: 0.7,
            },
            to: {
              enabled: false,
            },
          },
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
    let nodes = []
    this.factory.forEach((element) => {
      nodes.push({ id: element.id, label: `M${element.id}` })
    })

    return nodes
  }

  createEdges() {
    let edges = []
    this.factory.forEach((element) => {
      element.links.forEach((node) => {
        edges.push({ from: element.id, to: node })
      })
    })

    return edges
  }

  events = {
    dragStart: (event) => {},
    dragEnd: (event) => {},
  }

  render() {
    return (
      <div id="graph" className="w-full bg-slate-300 rounded-md" style={{ height: "65vh" }}>
        <Graph graph={this.state.graph} options={this.state.options} events={this.state.events} />
      </div>
    )
  }
}
