import axios from "axios"
import React from "react"
import { PlayIcon } from "@heroicons/react/solid"
import { factories } from "../data"
import AboutModal from "./utilities/AboutModal"

export default function RunSection() {
  const instance = axios.create({
    timeout: 10000,
    baseURL: "http://localhost:8080",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })

  const requestStart = () => {
    instance
      .post("/run", {
        settings: {
          batches: 1000,
          startMachineID: "0",
          machines: factories[0],
        },
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
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

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-2">
        <button
          type="button"
          onClick={requestStart}
          className={`text-white bg-teal-500 hover:opacity-80 focus:shadow-lg font-medium rounded text-lg px-4 py-3 text-center duration-150`}
        >
          Run&nbsp;
          <PlayIcon className="w-7 h-7 mb-0.5 inline-flex" />
        </button>
      </div>
    </div>
  )
}
