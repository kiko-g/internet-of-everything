import React, { Component } from "react"
import Graph from "react-graph-vis"
import { colors } from "../utils"

export default class ForceGraph extends Component {
  constructor(props) {
    super(props)
    this.nodes = []
    this.edges = []
    this.factory = this.props.factory
    this.colors = colors.sort(() => Math.random() - 0.5)
    this.getRandomColor = () => {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
    this.state = {
      options: {
        clickToUse: false,
        layout: {
          hierarchical: {
            enabled: false,
            direction: "UD",
            sortMethod: "hubsize",
            shakeTowards: "roots",
            levelSeparation: 150,
            nodeSpacing: 150,
            treeSpacing: 200,
          },
        },
        interaction: {
          hover: true,
          dragView: true,
          keyboard: false,
          multiselect: true,
          tooltipDelay: 10000,
          navigationButtons: true,
          hoverConnectedEdges: false,
        },
        physics: {
          enabled: true,
          orceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
            avoidOverlap: 1.5,
          },
          maxVelocity: 146,
          solver: "forceAtlas2Based",
          timestep: 0.1,
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 25,
          },
        },
        edges: {
          width: 1.5,
          length: 150,
          color: "#273241",
          smooth: {
            enabled: true,
            type: "dynamic",
            roundness: true,
          },
          arrows: {
            from: {
              enabled: false,
            },
            to: {
              enabled: true,
              scaleFactor: 1,
            },
          },
        },
        nodes: {
          color: "#334155",
          font: {
            face: "JetBrains Mono, Fira Code, Consolas",
            color: "#fff",
            size: 20,
          },
          shape: "box",
          size: 25,
          scaling: {
            type: "incomingAndOutgoingConnections",
            min: 10,
            max: 60,
            label: {
              enabled: true,
              min: 20,
              max: 32,
            },
          },
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
    let startMachine
    this.factory.forEach((machine, index) => {
      if (machine.prevMachineID === "null") {
        startMachine = machine
        this.nodes.push({ id: order, label: machine.id, color: this.colors[order % this.colors.length] })
      }
    })

    let nextID = startMachine.nextMachineID
    while (nextID !== "null") {
      this.edges.push({ from: order, to: order + 1 })

      for (let i = 0; i < this.factory.length; i++) {
        if (nextID !== this.factory[i].id) continue
        else {
          order++
          nextID = this.factory[i].nextMachineID
          this.nodes.push({
            id: order,
            label: this.factory[i].id,
            color: this.colors[order % this.colors.length],
          })
          break
        }
      }
    }

    return this.nodes
  }

  createEdges() {
    return this.edges
  }

  render() {
    return (
      <div id="graph" className="relative group w-full bg-slate-300 rounded-md" style={{ height: "65vh" }}>
        <Graph graph={this.state.graph} options={this.state.options} events={this.state.events} />
        <div className="hidden absolute top-4 right-4">Selected machine drawer content</div>
      </div>
    )
  }
}
