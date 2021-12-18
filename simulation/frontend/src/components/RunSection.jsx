import * as React from "react"
import Button from "./utilities/CustomButton"
import { PlayIcon } from "@heroicons/react/solid"
import axios from "axios"

const instance = axios.create({
  timeout: 1000,
  baseURL: "http://localhost:8080",
  headers: { "Access-Control-Allow-Origin": "*" },
})

export default function RunSection() {
  return (
    <div className="relative group bg-bluegray-100 w-full p-4 rounded-md space-y-3">
      <h5 className="text-coolgray-700 font-bold text-2xl tracking-tight">
        Run Section
      </h5>
      <span className="text-sm">
        Here the user should control the simulaion.
      </span>

      <div className="grid grid-cols-1">
        <div className="bg-coolgray-200 dark:bg-coolgray-300 rounded-md">
          <div
            className="bg-gradient-to-r from-teal-300 via-blue-300 to-violet-300 text-white  
            w-1/3 text-sm font-medium text-center p-1 leading-none tracking-normal rounded-l-md"
          >
            33%
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-2">
        <Button
          color="teal"
          text="Run"
          icon={<PlayIcon className="w-7 h-7 mb-0.5 inline-flex" />}
          action={requestStart}
        />
      </div>
    </div>
  )
}

const requestStart = () => {
  instance
    .post("/startSimulation", {
      piecesQty: 100,
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
