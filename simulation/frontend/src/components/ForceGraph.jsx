import React, { Component } from "react"
import Graph from "react-graph-vis"
import { colors } from "../utils"
import Machine from "./Machine"

let id = 0

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
      open: false,
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
          forceAtlas2Based: {
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
            roundness: 20,
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

  componentDidMount() {
    document.addEventListener("click", (e) => {
      this.setState({
        open: !this.state.open,
      })
    })
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  createNodes() {
    if (this.factory.length === 0) return []
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
    if (this.factory.length === 0) return []
    return this.edges
  }

  render() {
    return (
      <div id="graph" className="relative group w-full bg-slate-200 dark:bg-slate-300 rounded-md" style={{ height: "65vh" }}>
        {this.state.graph.nodes.length !== 0 ? (
          <>
            <Graph
              graph={this.state.graph}
              options={this.state.options}
              events={this.state.events}
              getNetwork={(network) => {
                network.on("click", function (properties) {
                  if (properties.nodes[0] !== undefined) {
                    document.getElementById("drawer").classList.remove("hidden")
                    id = properties.nodes[0]
                  } else {
                    let drawer = document.getElementById("drawer")
                    if (!drawer.classList.contains("hidden")) drawer.classList.add("hidden")
                  }
                })
              }}
            />
            <div id="drawer" className={`hidden absolute bottom-4 left-4 min-w-1/4 opacity-80`}>
              <Machine data={this.factory[id]} key={`graph-props-${id}`} classnames="col-span-1 min-w-full" isDetailed={false} />
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="">Graph is empty!</p>
          </div>
        )}
      </div>
    )
  }
}
