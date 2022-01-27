import React, { useEffect, useState } from "react"
import Graph from "react-graph-vis"
import { colors } from "../utils"
import Machine from "./Machine"

export default function SimulationGraph({ factory }) {
  const [machine, setMachine] = useState(factory[0])
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const options = {
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
  }

  useEffect(() => {
    let nodesArr = []
    let edgesArr = []
    if (factory.length === 0) return []
    let order = 0
    let startMachine
    factory.forEach((machine, index) => {
      if (machine.prevMachineID === "null") {
        startMachine = machine
        nodesArr.push({ id: order, label: machine.id, color: colors[order % colors.length] })
      }
    })

    let nextID = startMachine.nextMachineID
    while (nextID !== "null") {
      edgesArr.push({ from: order, to: order + 1 })

      for (let i = 0; i < factory.length; i++) {
        if (nextID !== factory[i].id) continue
        else {
          order++
          nextID = factory[i].nextMachineID
          nodesArr.push({
            id: order,
            label: factory[i].id,
            color: colors[order % colors.length],
          })
          break
        }
      }
    }

    setNodes(nodesArr)
    setEdges(edgesArr)

    return function cleanup() {
      let drawer = document.getElementById("drawer")
      if (drawer) if (!drawer.classList.contains("hidden")) drawer.classList.add("hidden")
    }
  }, [factory])

  return (
    <div id="graph" className="relative group w-full bg-slate-200 dark:bg-slate-300 rounded-md" style={{ height: "65vh" }}>
      {nodes.length !== 0 ? (
        <>
          <Graph
            graph={{ nodes: nodes, edges: edges }}
            options={options}
            getNetwork={(network) => {
              network.on("click", function (properties) {
                if (properties.nodes[0] !== undefined) {
                  document.getElementById("drawer").classList.remove("hidden")
                  setMachine(factory[properties.nodes[0]])
                } else {
                  let drawer = document.getElementById("drawer")
                  if (!drawer.classList.contains("hidden")) drawer.classList.add("hidden")
                }
              })
            }}
          />
          {machine ? (
            <div id="drawer" className={`hidden absolute bottom-4 left-4 min-w-1/4 opacity-80`}>
              <Machine data={machine} key={`graph-props-${machine.id}`} classnames="col-span-1 min-w-full" isDetailed={false} />
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="">Graph is empty!</p>
        </div>
      )}
    </div>
  )
}
