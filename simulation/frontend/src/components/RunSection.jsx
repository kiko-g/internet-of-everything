import axios from "axios"
import React, { useEffect, useState } from "react"
import { PlayIcon } from "@heroicons/react/solid"
import { factories } from "../data"
import AboutModal from "./utilities/AboutModal"
import InputBox from "./utilities/InputBox"

export default function RunSection() {
  const [alert, setAlert] = useState(false)
  const [batches, setBatches] = useState(0)

  useEffect(() => {
    if (alert)
      setTimeout(() => {
        setAlert(false)
      }, 5000)
  }, [alert, setAlert])

  const instance = axios.create({
    timeout: 10000,
    baseURL: "http://localhost:8080",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })

  const getStartMachineID = () => {
    let result
    factories[0].forEach((machine, index) => {
      if (machine.prevMachineID === "null") {
        result = machine.id
      }
    })
    return result
  }

  const requestStart = () => {
    let startMachineID = getStartMachineID()
    if (!Number.isInteger(parseInt(batches))) {
      setAlert(true)
      return
    }

    console.log(parseInt(batches))
    console.log(startMachineID)

    instance
      .post("/run", {
        settings: {
          batches: parseInt(batches),
          startMachineID: startMachineID,
          machines: factories[0],
        },
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {})
  }

  return (
    <div className="relative group bg-slate-100 w-full p-4 rounded-xl space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h5 className="text-slate-700 font-bold text-2xl">Run Section</h5>
          <p className="font-normal text-gray-500 text-sm">Start your simulation by hitting the big green button</p>
        </div>
        <AboutModal />
      </div>

      <div className="grid grid-cols-12 gap-2 w-full">
        <div className="col-span-3">
          <InputBox classnames="flex-shrink" state={[batches, setBatches]} placeholder="#Batches" title="Amount of batches" />
        </div>
        <div className="col-span-9">
          <button
            type="button"
            onClick={requestStart}
            className={`w-full text-white bg-teal-500 hover:opacity-80 focus:shadow-lg font-medium rounded text-lg px-4 py-3 text-center duration-150`}
          >
            Run&nbsp;
            <PlayIcon className="w-7 h-7 mb-0.5 inline-flex" />
          </button>
        </div>
        {alert ? (
          <div className="col-span-12">
            <p className="text-xs text-red-400">Batches amount should be an integer value!</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
