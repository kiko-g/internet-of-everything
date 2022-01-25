import React, { useEffect, useState } from "react"
import { StatusOnlineIcon } from "@heroicons/react/outline"
import axios from 'axios';
import { resolveStatus } from "../../utils"

export default function Machine({ id, on, ok, classnames, isDetailed }) {
  const TIME_BETWEEN_FETCH = 300000
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [sensors, setSensors] = useState([])
  const isOn = on
  const isOk = ok

  const instance = axios.create({
    timeout: process.env.TIMEOUT || 10000,
    baseURL: "https://emulator-backend/machine/" + id,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })

  // useEffect(() => {
  //   instance.get()
  //   .then((res) => {
  //     let data = res.data
  //     setInput(data.input)
  //     setOutput(data.output)
  //     setSensors(data.sensors)
  //   })
  //   .catch(err=>console.log(err))

  //   setTimeout(() => {}, TIME_BETWEEN_FETCH)
  // })


  return (
    <div
      key={`machine-${id}`}
      className={`relative group bg-white border-2 dark:bg-slate-600 text-slate-700 dark:text-white p-3 rounded-xl shadow-lg dark:shadow-slate-400/50 ${classnames} `}
    >
      {/* Headline */}
      <div className="flex items-start justify-between border-b-2 pb-0.5 mb-2">
        <h5 className="mt-0 uppercase tracking-wide text-lg font-mono">{id}</h5>
        {console.log(isOn)}
        {isOn ? (
          <span className="flex items-start text-sm">
            {"online"}
            <StatusOnlineIcon className="h-6 w-6 ml-1 pb-0.5 text-teal-400 dark:text-teal-400" />
          </span>
        ) : (
          <span className="flex items-start text-sm">
            {"offline"}
            <StatusOnlineIcon className="h-6 w-6 ml-1 pb-0.5 text-rose-400 dark:text-rose-500" />
            </span>
        )}
      </div>

      {/* Sensors 
      {isDetailed ? (
        <ul className="space-y-[-3px]">
          {Object.keys(sensors).map((key, index) => (
            <ul key={`sensor-${id}-${index}`}>
              {Object.keys(sensors[key])
                .filter((k, i) => k === "type")
                .map((k, i) => (
                  <li className="flex justify-between" key={`sensor-type-${id}-${index}-${k}`}>
                    <div className="space-x-1">
                      <span className="uppercase bg-slate-400 text-white dark:bg-slate-400 dark:text-white text-xs font-medium px-2 py-0.5 rounded">
                        {`sensor`}
                      </span>
                      <span className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-normal px-1 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                        {`${sensors[key][k]}`}
                      </span>
                    </div>
                    <div className="space-x-1">
                      <span className="lowercase bg-violet-600/50 text-white dark:bg-violet-400 dark:text-white text-xs font-medium px-1 py-0.5 rounded">
                        {`id`}
                      </span>
                      <span className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-normal px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700">
                        {`${sensors[key]["id"][0]}${sensors[key]["id"][sensors[key]["id"].length - 1]}`}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          ))}
        </ul>
      ) : null}
      */}
    </div>
  )
}
