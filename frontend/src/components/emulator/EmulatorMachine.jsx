import React, { useEffect, useState } from "react"
import { StatusOnlineIcon } from "@heroicons/react/outline"
import axios from "axios"

function getSensorType(type) {
  return type.replace("Sensor", "")
}

function getUnits(type) {
  switch (type) {
    case "vibration":
      return "Hz"
    case "temperature":
      return "ºC"
    case "position":
      return "m"
    case "energy":
      return "W"
    case "velocity":
      return "m/s"
    case "orientation":
      return "º"
    default:
      return ""
  }
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

const instance = axios.create({
  timeout: process.env.TIMEOUT || 10000,
  baseURL: "http://localhost:8083/machine",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})

export default function Machine({ id, on, ok, classnames, isDetailed }) {
  const TIME_BETWEEN_FETCH = 1000
  const [, setInput] = useState("")
  const [, setOutput] = useState("")
  const [sensors, setSensors] = useState([])
  const [updateSensors, setUpdateSensors] = useState(true)
  const isOn = on

  useEffect(() => {
    if (!updateSensors) return

    setUpdateSensors(false)

    instance
      .get(`/${id}`)
      .then((res) => {
        let data = res.data
        setInput(data.input)
        setOutput(data.output)
        let sensors = data.sensors
        sensors.sort((a, b) => (a.type > b.type ? 1 : -1))
        setSensors(sensors)
      })
      .catch((err) => console.log(err))
  }, [id, updateSensors])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUpdateSensors(true)
    }, TIME_BETWEEN_FETCH)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [sensors])

  return (
    <div
      key={`machine-${id}`}
      className={`relative group bg-white border-2 dark:bg-slate-600 text-slate-700 dark:text-white p-3 rounded-xl shadow-lg dark:shadow-slate-400/50 ${classnames} `}
    >
      {/* Headline */}
      <div className="flex items-start justify-between border-b-2 pb-0.5 mb-2">
        <h5 className="mt-0 uppercase tracking-wide text-lg font-mono">{id}</h5>
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

      {/* Sensors */}

      <ul className="space-y-[-3px]">
        {sensors.map((sensor, index) => (
          <ul key={`sensor-${id}-${index}`}>
            <li className="flex justify-between" key={`sensor-type-${sensor.id}-${index}`}>
              <div className="space-x-1">
                <span
                  className="uppercase bg-slate-400 text-white dark:bg-slate-400 dark:text-white text-xs font-medium px-2 py-0.5 rounded"
                  key={`sensor-type-span-${sensor.id}-${index}`}
                >
                  {getSensorType(sensor.type)}
                </span>
                <span
                  className="lowercase text-right bg-gray-100 text-gray-700 text-xs font-normal px-1 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700"
                  key={`sensor-id-${sensor.id}-${index}`}
                >
                  {`${sensor.id}`}
                </span>
              </div>
              <div className="space-x-1">
                {sensor.error ? (
                  sensor.latest_reading ? (
                    Object.keys(sensor.latest_reading).map((key, val) => (
                      <span
                        className="text-right bg-red-300 text-gray-700 text-xs font-normal px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700"
                        key={`sensor-reading-${sensor.id}-${key}`}
                      >
                        {`${round(sensor.latest_reading[key], 1)} ${getUnits(key)}`}
                      </span>
                    ))
                  ) : (
                    <span
                      className="text-right bg-red-300 text-gray-700 text-xs font-normal px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700"
                      key={`sensor-reading-${sensor.id}-null`}
                    >
                      {"null"}
                    </span>
                  )
                ) : sensor.latest_reading ? (
                  Object.keys(sensor.latest_reading).map((key, val) => (
                    <span
                      className="text-right bg-gray-100 text-gray-700 text-xs font-normal px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700"
                      key={`sensor-reading-${sensor.id}-${key}`}
                    >
                      {`${round(sensor.latest_reading[key], 1)} ${getUnits(key)}`}
                    </span>
                  ))
                ) : (
                  <span
                    className="text-right bg-gray-100 text-gray-700 text-xs font-normal px-2 py-0.5 rounded dark:bg-gray-100 dark:text-gray-700"
                    key={`sensor-reading-${sensor.id}-null`}
                  >
                    {"null"}
                  </span>
                )}
              </div>
            </li>
          </ul>
        ))}
      </ul>
    </div>
  )
}
