import * as React from "react"
import { PlayIcon } from "@heroicons/react/solid"
import { factories } from "../data"
import axios from "axios"

export default function RunSection() {
  const instance = axios.create({
    timeout: 1000,
    baseURL: "http://localhost:8080",
    headers: { "Access-Control-Allow-Origin": "*" },
  })

  const requestStart = () => {
    instance
      .post("/run", {
        settings: factories[0],
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
    <div className="relative group bg-slate-100 w-full p-4 rounded-xl space-y-3">
      <h5 className="text-zinc-700 font-bold text-2xl tracking-tight">Run Section</h5>
      <span className="text-sm">Here the user should control the simulaion.</span>

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
