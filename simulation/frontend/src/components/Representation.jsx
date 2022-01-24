import Stat from "./Stat"
import Select from "./Select"
import Sensor from "./Sensor"
import Machine from "./Machine"
import Tabs from "./utilities/Tabs"
import ForceGraph from "./ForceGraph"
import ReactJson from "react-json-view"
import InputBox from "./utilities/InputBox"
import Scrollbar from "react-scrollbars-custom"
import AlternateSensor from "./AlternateSensor"
import AlternateMachine from "./AlternateMachine"
import { TrashIcon } from "@heroicons/react/outline"
import CopyClipboard from "./utilities/CopyClipboard"
import PhaseSwitch from "./utilities/switches/PhaseSwitch"
import DetailedSwitch from "./utilities/switches/DetailedSwitch"
import React, { useEffect, useMemo, useState } from "react"
import SelectProduction from "./SelectProduction"
import {
  jsonStyle,
  productionMockArray,
  productionStateMockArray,
  sensorFailureMockArray,
  options,
  productionOptions,
} from "../utils"

export default function Representation({ factoryInitialState, factoryFinalState }) {
  const [factoryInitial] = factoryInitialState //used for presets
  const [factoryFinal] = factoryFinalState //used for result
  const [phase, setPhase] = useState(false) //false is initial, true is final
  const [detailed, setDetailed] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [displayType, setDisplayType] = useState(options[0])
  const [production, setProduction] = useState(productionMockArray)
  const [sensorFailure, setSensorFailure] = useState(sensorFailureMockArray)
  const [productionState, setProductionState] = useState(null)
  const [searchProductValue, setSearchProductValue] = useState("")
  const [productionSelect, setProductionSelect] = useState(productionOptions[0])

  useEffect(() => {}, [displayType])

  const factory = useMemo(() => {
    if (phase) return factoryFinal
    else return factoryInitial
  }, [factoryFinal, factoryInitial, phase])

  const Tab = (props) => <>{props.children}</>

  const requestFindProduct = () => {
    if (searchProductValue === "") return
    let found = productionStateMockArray.find((element) => element.productID === searchProductValue) // replace this logic with request
    if (found) setProductionState(found)
  }

  /**
   * @brief installs 2 periodic production fetches when component is mounted
   * TODO: uncomment lines below and deal with request to container
   */
  // useEffect(() => {
  //   setInterval(() => {
  //     fetch("/production")
  //       .then((response) => {
  //         // parse response
  //         // setProduction(parsedProductionArray)
  //       })
  //       .catch((error) => console.error(error))
  //   }, 5000) // maybe these 5000 ms could be an env var
  //
  //   setInterval(() => {
  //     fetch("/failure")
  //       .then((response) => {
  //         // parse response
  //         // setSensorFailure(parsedSensorFailureArray)
  //       })
  //       .catch((error) => console.error(error))
  //   }, 10000) // maybe these 10000 ms could be an env var
  // }, [])

  return (
    <Tabs activeIndex={1}>
      {/* Graph schema */}
      <Tab label="Graph">
        <ForceGraph factory={factoryInitial} phaseHook={[phase, setPhase]} />
        <div className={`absolute bottom-8 right-6 z-50`}>
          {/* <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} alt={true} /> */}
          <span className="p-2 rounded bg-indigo-400/50 text-white">Displaying initial state</span>
        </div>
      </Tab>

      {/* Detailed list view */}
      <Tab label="Detailed">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div className="px-1 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-4 min-w-full">
            <div className="flex self-start">
              <Select selectedHook={[displayType, setDisplayType]} options={options} />
            </div>
            <div className="flex items-center justify-start md:justify-end space-x-6 w-full">
              <DetailedSwitch hook={[detailed, setDetailed]} toggle={() => setDetailed(!detailed)} />
              <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} />
            </div>
          </div>
          {displayType.name === "Machines"
            ? phase
              ? factory.length === 0
                ? null
                : factory.machines.map((machine, machineIdx) => (
                    <AlternateMachine
                      data={machine}
                      key={`detailed-final-${machineIdx}`}
                      classnames="col-span-1 min-w-full"
                      isDetailed={detailed}
                    />
                  ))
              : factory.map((machine, machineIdx) => (
                  <Machine
                    data={machine}
                    key={`detailed-initial-${machineIdx}`}
                    classnames="col-span-1 min-w-full"
                    isDetailed={detailed}
                  />
                ))
            : null}
          {displayType.name === "Sensors"
            ? factory.length === 0
              ? null
              : phase
              ? factory.machines.map((machine, machineIdx) =>
                  machine.sensors.map((sensor, sensorIdx) => (
                    <AlternateSensor
                      data={sensor}
                      parent={machine.id}
                      key={`sensor-final-${machineIdx}-${sensorIdx}`}
                      classnames="col-span-1 min-w-full"
                      isDetailed={detailed}
                    />
                  ))
                )
              : factory.map((machine, machineIdx) =>
                  machine.sensors.map((sensor, sensorIdx) => (
                    <Sensor
                      data={sensor}
                      parent={machine.id}
                      key={`sensor-initial-${machineIdx}-${sensorIdx}`}
                      classnames="col-span-1 min-w-full"
                      isDetailed={detailed}
                    />
                  ))
                )
            : null}
        </div>
      </Tab>

      {/* Inspect view with search */}
      <Tab label="Inspect">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-2 col-span-1 lg:col-span-2 min-w-full">
            <Select selectedHook={[displayType, setDisplayType]} options={options} />
            <InputBox
              label=""
              classnames="flex-1"
              types={[
                displayType.name === "Sensors" ? "Sensor ID" : "",
                displayType.name === "Machines" ? "Machine ID" : "",
              ].filter((item) => item !== "")}
              placeholder={`What are you searching for?`}
              state={[searchValue, setSearchValue]}
            />
            <button
              type="button"
              title="Clear input"
              onClick={() => setSearchValue("")}
              className="flex items-center h-12 p-3 rounded text-sm duration-200
               bg-rose-500 hover:bg-rose-500/80 text-white"
            >
              <span>Clear&nbsp;</span>
              <TrashIcon className="h-4 w-4" />
            </button>
            <DetailedSwitch hook={[detailed, setDetailed]} toggle={() => setDetailed(!detailed)} compact={true} />
            <PhaseSwitch hook={[phase, setPhase]} toggle={() => setPhase(!phase)} compact={true} />
          </div>
          {displayType.name === "Machines"
            ? phase
              ? factory.length === 0
                ? null
                : factory.machines
                    .filter((machine) => {
                      if (searchValue === "") return true
                      else return machine.id.toUpperCase().includes(searchValue.toUpperCase())
                    })
                    .map((machine, index) => {
                      return (
                        <AlternateMachine
                          data={machine}
                          key={`inspect-final-${index}`}
                          classnames="col-span-1 min-w-full"
                          isDetailed={detailed}
                        />
                      )
                    })
              : factory
                  .filter((machine) => {
                    if (searchValue === "") return true
                    else return machine.id.toUpperCase().includes(searchValue.toUpperCase())
                  })
                  .map((machine, index) => {
                    return (
                      <Machine
                        data={machine}
                        key={`inspect-initial-${index}`}
                        classnames="col-span-1 min-w-full"
                        isDetailed={detailed}
                      />
                    )
                  })
            : null}
          {displayType.name === "Sensors"
            ? phase && factory.length !== 0
              ? factory.machines.map((machine, machineIdx) =>
                  machine.sensors
                    .filter((sensor) => {
                      if (searchValue === "") return true
                      else return sensor.id.toUpperCase().includes(searchValue.toUpperCase())
                    })
                    .map((sensor, sensorIdx) => (
                      <AlternateSensor
                        data={sensor}
                        parent={machine.id}
                        key={`sensor-${machineIdx}-${sensorIdx}`}
                        classnames="col-span-1 min-w-full"
                        isDetailed={detailed}
                      />
                    ))
                )
              : factory.map((machine, machineIdx) =>
                  machine.sensors
                    .filter((sensor) => {
                      if (searchValue === "") return true
                      else return sensor.id.toUpperCase().includes(searchValue.toUpperCase())
                    })
                    .map((sensor, sensorIdx) => (
                      <Sensor
                        data={sensor}
                        parent={machine.id}
                        key={`sensor-${machineIdx}-${sensorIdx}`}
                        classnames="col-span-1 min-w-full"
                        isDetailed={detailed}
                      />
                    ))
                )
            : null}
        </div>
      </Tab>

      <Tab label="Production">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div className="px-1 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-4 min-w-full">
            <div className="flex items-center justify-between space-x-4 w-full">
              <SelectProduction selectedHook={[productionSelect, setProductionSelect]} options={productionOptions} />
              {productionSelect.name === "Production" ? (
                <Stat
                  color="purple"
                  statName="Production Rate"
                  statValue={parseFloat(production[0].productionRate).toFixed(3)}
                  statUnit="products per 10 seconds"
                />
              ) : null}
              {productionSelect.name === "State Tracking" ? (
                <>
                  <InputBox
                    label=""
                    classnames="flex-1 h-16"
                    placeholder={`Type your product ID`}
                    state={[searchProductValue, setSearchProductValue]}
                  />
                  <button
                    type="button"
                    title="Clear input"
                    onClick={requestFindProduct}
                    className="flex items-center h-16 p-3 rounded text-sm duration-200
                  bg-cyan-500/80 hover:bg-cyan-400 text-white"
                  >
                    <span>Find product</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {productionSelect.name === "Production" ? (
            <div className="shadow overflow-hidden border-b border-gray-200 bg-gray-50 dark:bg-slate-600 sm:rounded col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-4 min-w-full">
              <table className="w-full divide-y divide-gray-200">
                <thead className="w-full">
                  <tr className="text-center text-xs text-gray-500 dark:text-white uppercase tracking-wide">
                    <th scope="col" className="px-6 py-3 font-medium text-left">
                      Machine
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Defect Rate <span className="normal-case dark:text-gray-100">(%)</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Mean Production Time <span className="normal-case dark:text-gray-100">(ms)</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Production Rate <span className="normal-case dark:text-gray-100">(Hz)</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      # Defects
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {production.slice(1, production.length).map((machine, machineIdx) => (
                    <tr
                      key={`production-machine-${machineIdx}`}
                      className="text-center odd:bg-white even:bg-slate-50 dark:even:bg-slate-50 dark:odd:bg-white"
                    >
                      <td className="px-6 py-2 whitespace-nowrap text-left">
                        <div className="flex items-center">
                          <span className="h-6 w-6 rounded-full bg-sky-600/75" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{machine.machineID}</div>
                            <div className="text-sm font-normal text-gray-500">
                              <span className="font-medium text-sky-600/75">{machine.nProducts} products</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {parseFloat(machine.defectRate).toFixed(2)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {parseFloat(machine.meanProductionTime).toFixed(1)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {parseFloat(machine.productionRate).toFixed(3)}
                      </td>

                      {machine.nDefects !== 0 ? (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100/50 text-rose-600">
                            {machine.nDefects}
                          </span>
                        </td>
                      ) : (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-teal-100/50 text-teal-600">
                            {machine.nDefects}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {productionSelect.name === "State Tracking" ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-4 min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 bg-gray-50 dark:bg-slate-600 sm:rounded">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-slate-600 w-full">
                    <tr className="text-center text-xs text-gray-500 dark:text-white uppercase tracking-wide">
                      <th scope="col" className="px-6 py-3 font-medium text-left">
                        Machine
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Defect
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Readtime
                      </th>
                    </tr>
                  </thead>

                  {productionState !== null ? (
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="text-center">
                        <td className="px-6 py-2 whitespace-nowrap text-left">
                          <div className="flex items-center">
                            <span className="h-6 w-6 rounded-full bg-sky-600/75" />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{productionState.machineID}</div>
                              <div className="text-sm font-normal text-gray-500">
                                <span className="font-medium text-xs text-sky-600/75">{productionState._id.$oid}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap text-gray-600">{productionState.productID}</td>

                        <td className="whitespace-nowrap text-sm">
                          {productionState.defect === false ? (
                            <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-teal-200/50 text-teal-700">
                              None
                            </span>
                          ) : (
                            <span className="px-2 inline-flex leading-5 font-semibold rounded-full bg-rose-200/50 text-rose-700">
                              Found
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap text-sm">
                          {productionState.action === "IN" ? (
                            <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-sky-200/50 text-sky-700">
                              {productionState.action.toLowerCase()}
                            </span>
                          ) : (
                            <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-purple-200/50 text-purple-700">
                              {productionState.action.toLowerCase()}
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap text-sm text-gray-600">
                          <span>{productionState.readTime.split(" ")[1].slice(0, 8)}</span>
                          <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
                          <span>{productionState.readTime.split(" ")[0]}</span>
                        </td>
                      </tr>
                    </tbody>
                  ) : null}
                </table>
              </div>
            </div>
          ) : null}

          {productionSelect.name === "Sensor Failure" ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-4 min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 bg-gray-50 dark:bg-slate-600 sm:rounded">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-slate-600 w-full">
                    <tr className="text-center text-xs text-gray-500 dark:text-white uppercase tracking-wide">
                      <th scope="col" className="px-6 py-3 font-medium text-left">
                        Sensor
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Failure
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Severity
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Readtime
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {sensorFailure.map((sensor, sensorIdx) => (
                      <tr
                        key={`production-machine-${sensorIdx}`}
                        className="text-center odd:bg-white even:bg-slate-50 dark:even:bg-slate-50 dark:odd:bg-white"
                      >
                        <td className="px-6 py-2 whitespace-nowrap text-left">
                          <div className="flex items-center">
                            <span className="h-6 w-6 rounded-full bg-amber-500" />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 capitalize">{sensor.sensorID}</div>
                              <div className="text-xs font-normal text-gray-500">
                                Associated with <span className="font-medium text-amber-600/75">{sensor.machineID}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-sky-200/50 text-sky-700">
                            {sensor.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-sky-200/80 text-sky-700">
                            {sensor.failureType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {sensor.failureSeverity === "LOW" ? (
                            <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-lime-200/80 text-lime-700">
                              {sensor.failureSeverity}
                            </span>
                          ) : null}
                          {sensor.failureSeverity === "MEDIUM" ? (
                            <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-amber-200/80 text-amber-700">
                              {sensor.failureSeverity}
                            </span>
                          ) : null}
                          {sensor.failureSeverity === "HIGH" ? (
                            <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-rose-200/80 text-rose-700">
                              {sensor.failureSeverity}
                            </span>
                          ) : null}
                          {sensor.failureSeverity === "CRITICAL" ? (
                            <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-rose-700/80 text-white">
                              {sensor.failureSeverity}
                            </span>
                          ) : null}
                        </td>
                        <td className="whitespace-nowrap text-sm text-gray-600">
                          <span>{sensor.readingTime.split(" ")[1].slice(0, 8)}</span>
                          <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
                          <span>{sensor.readingTime.split(" ")[0]}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">{sensor.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </Tab>

      {/* JSON Representations */}
      <Tab label="JSON">
        <div className="grid w-full grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div
              className="text-center tracking-wider capitalize p-3 rounded-lg border-2
              bg-blue-300/50 border-blue-300/50 text-slate-700
              dark:bg-slate-700/50 dark:border-slate-500/50 dark:text-white"
            >
              Initial State
            </div>
            <div
              className="text-center tracking-wider capitalize p-3 rounded-lg border-2
              bg-blue-300/50 border-blue-300/50 text-slate-700
              dark:bg-slate-700/50 dark:border-slate-500/50 dark:text-white"
            >
              Final State
            </div>
          </div>

          {/* Initial JSON */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div
              className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl pr-2 shadow border-2 
              bg-white/50 border-slate-500/10 dark:bg-slate-700/5"
            >
              <CopyClipboard json={factoryInitial} />
              <Scrollbar style={{ minHeight: "56vh" }}>
                <ReactJson
                  indentWidth={4}
                  iconStyle="triangle"
                  name={false}
                  collapsed={2}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  enableClipboard={false}
                  src={factoryInitial}
                  theme="codeschool:inverted"
                  style={jsonStyle}
                />
              </Scrollbar>
            </div>

            {/* Final JSON */}
            <div
              className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl pr-2 shadow border-2 
              bg-white/50 border-slate-500/10 dark:bg-slate-700/5"
            >
              <CopyClipboard json={factoryFinal} />
              <Scrollbar style={{ minHeight: "56vh" }}>
                <ReactJson
                  id="react-json-final"
                  indentWidth={4}
                  iconStyle="triangle"
                  name={false}
                  collapsed={2}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  enableClipboard={false}
                  src={factoryFinal}
                  theme="hopscotch:inverted"
                  style={jsonStyle}
                />
              </Scrollbar>
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>
  )
}
