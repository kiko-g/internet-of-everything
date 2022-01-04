import React, { Component } from "react"
import Graph from "react-graph-vis"
import { colors } from "../utils"

export default class ForceGraph extends Component {
  constructor(props) {
    super(props)
    this.factory = this.props.factory
    this.colors = colors.sort(() => Math.random() - 0.5)
    this.getRandomColor = () => {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
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
            face: "JetBrains Mono, Fira Code, Consolas",
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
    let order = 0
    let nodes = []
    let startMachine
    this.links = []
    this.factory.forEach((machine, index) => {
      if (machine.prevMachineID === "null") {
        startMachine = machine
        nodes.push({ id: order, label: machine.id, color: this.colors[order % this.colors.length] })
      }
    })

    let nextID = startMachine.nextMachineID
    while (nextID !== "null") {
      this.links.push({ from: order + 1, to: order })
      for (let i = 0; i < this.factory.length; i++) {
        if (nextID !== this.factory[i].id) continue
        else {
          order++
          nextID = this.factory[i].nextMachineID
          nodes.push({
            id: order,
            label: this.factory[i].id,
            color: this.colors[order % this.colors.length],
          })
          break
        }
      }
    }

    return nodes
  }

  createEdges() {
    return this.links
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
