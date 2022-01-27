import React, { useEffect, useState } from "react"
import Graph from "react-graph-vis"
import EmulatorMachine from "./EmulatorMachine"
import axios from "axios"

const instance = axios.create({
  timeout: process.env.TIMEOUT || 10000,
  baseURL: "http://localhost:8083",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})

export default function EmulatorGraph() {
  const TIME_BETWEEN_FETCH = 2000
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [id, setId] = useState(0)
  const [update, setUpdate] = useState(true)

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
    if (!update) return

    setUpdate(false)

    instance
      .get("/graph")
      .then((res) => {
        let data = res.data
        let machines = data.machines

        if (machines.length === 0) {
          setNodes([])
        }
        let nodes = []
        machines.forEach((machine, index) => {
          let color = "#009900"
          if (!machine.ok) color = "#990000"
          if (!machine.on) color = "#4d4d4d"
          nodes.push({
            id: index,
            label: machine.id,
            color: color,
            isOn: machine.on,
            isOK: machine.ok,
          })
        })
        setNodes(nodes)

        if (data.edges.length === 0) {
          setEdges([])
        }
        let edges = []
        data.edges.forEach((edge, index) => {
          let from
          let to
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].label === edge.from) {
              from = nodes[i].id
            }
            if (nodes[i].label === edge.to) {
              to = nodes[i].id
            }
          }
          edges.push({ id: index, from: from, to: to })
        })
        setEdges(edges)
      })
      .catch((err) => console.log(err))
  }, [update])

  // when edges are updated (graph is displayed), wait some
  // time and then change update to true, so that new data
  // can be fetched
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUpdate(true)
    }, TIME_BETWEEN_FETCH)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [edges])

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
                  setId(properties.nodes[0])
                } else {
                  let drawer = document.getElementById("drawer")
                  if (!drawer.classList.contains("hidden")) drawer.classList.add("hidden")
                }
              })
            }}
          />
          <div id="drawer" className={`hidden absolute bottom-4 left-4 min-w-1/4 opacity-80`}>
            <EmulatorMachine
              id={nodes[id].label}
              on={nodes[id].isOn}
              ok={nodes[id].isOk}
              key={`graph-props-${id}`}
              classnames="col-span-1 min-w-full"
              isDetailed={true}
            />
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="">No machines online!</p>
        </div>
      )}
    </div>
  )
}
