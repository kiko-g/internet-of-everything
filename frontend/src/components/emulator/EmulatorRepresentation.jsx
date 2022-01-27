import React, { useEffect, useState } from "react"
import Tabs from "../utilities/Tabs"
import EmulatorGraph from "./EmulatorGraph"
import SelectProduction from "../SelectProduction"
import Stat from "../Stat"
import { productionOptions } from "../../utils"
import InputBox from "../utilities/InputBox"

const requestPath = "http://localhost:9000"

export default function EmulatorRepresentation() {
  // production states
  const [productionSelect, setProductionSelect] = useState(productionOptions[0])
  const [production, setProduction] = useState([])
  const [sensorFailure, setSensorFailure] = useState({ found: true, data: [] })
  const [productionState, setProductionState] = useState({ found: true, data: [] })
  const [searchProductValue, setSearchProductValue] = useState("")
  const [searchFailureValue, setSearchFailureValue] = useState("")

  useEffect(() => {}, [])

  const Tab = (props) => <>{props.children}</>

  /**
   * @brief installs periodic production fetch when component is mounted
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(requestPath + "/production")
        .then((response) => response.json())
        .then((data) => {
          setProduction(data)
        })
        .catch((error) => console.error(error))
    }, 8000)

    return () => {
      clearTimeout(intervalId)
    }
  }, [])

  const requestFindProduct = () => {
    if (searchProductValue === "") return
    fetch(requestPath + "/product-state?productID=" + searchProductValue)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) setProductionState({ found: false, data: [] })
        else setProductionState({ found: true, data: data })
      })
      .catch((error) => console.error(error))
  }

  const requestFindFailure = () => {
    fetch(requestPath + "/failure?machineID=" + searchFailureValue)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) setSensorFailure({ found: false, data: [] })
        else setSensorFailure({ found: true, data: data })
      })
      .catch((error) => console.error(error))
  }

  return (
    <Tabs activeIndex={0}>
      {/* Realtime Emulator */}
      <Tab label="Emulator">
        <EmulatorGraph />
      </Tab>

      {/* Realtime Production */}
      <Tab label="Production">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div className="px-1 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-4 min-w-full">
            <div className="flex items-center justify-between space-x-4 w-full">
              <SelectProduction selectedHook={[productionSelect, setProductionSelect]} options={productionOptions} />
              {productionSelect.name === "Production" && production.length !== 0 ? (
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
                    placeholder={`Type your product or material ID`}
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
              {productionSelect.name === "Sensor Failure" ? (
                <>
                  <InputBox
                    label=""
                    classnames="flex-1 h-16"
                    placeholder={`Type your machine ID to find problems with its sensors`}
                    state={[searchFailureValue, setSearchFailureValue]}
                  />
                  <button
                    type="button"
                    title="Clear input"
                    onClick={requestFindFailure}
                    className="flex items-center h-16 p-3 rounded text-sm duration-200
                  bg-amber-500/80 hover:bg-amber-400 text-white"
                  >
                    <span>Find failure</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {productionSelect.name === "Production" ? (
            <div className="shadow overflow-hidden border-b border-gray-200 bg-gray-50 dark:bg-slate-600 sm:rounded col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-4 min-w-full">
              <table className="table-auto w-full divide-y divide-gray-200">
                <thead className="w-full">
                  <tr className="text-center text-xs text-gray-500 dark:text-white uppercase tracking-wide">
                    <th scope="col" className="px-6 py-3 font-medium text-left">
                      Machine
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Defect Rate
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
                  {production.length !== 0 ? (
                    production.slice(1, production.length).map((machine, machineIdx) => (
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
                    ))
                  ) : (
                    <tr key={`no-production`} className="text-center w-full">
                      <td colSpan={5} className="p-4 bg-rose-100/50 text-rose-800">
                        No production found yet!
                      </td>
                    </tr>
                  )}
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

                  <tbody className="bg-white divide-y divide-gray-200">
                    {productionState.found ? (
                      productionState.data.map((product, step) => (
                        <tr key={`product-step-${step}`} className="text-center">
                          <td className="px-6 py-2 whitespace-nowrap text-left">
                            <div className="flex items-center">
                              <span className="h-6 w-6 rounded-full bg-sky-600/75" />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.machineID}</div>
                                <div className="text-sm font-normal text-gray-500">
                                  <span className="font-medium text-xs text-sky-600/75">{product._id.$oid}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap text-gray-600">{product.productID}</td>

                          <td className="whitespace-nowrap text-sm">
                            {product.defect === false ? (
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
                            {product.action === "IN" ? (
                              <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-sky-200/50 text-sky-700">
                                {product.action.toLowerCase()}
                              </span>
                            ) : (
                              <span className="capitalize px-2 inline-flex leading-5 font-semibold rounded-full bg-purple-200/50 text-purple-700">
                                {product.action.toLowerCase()}
                              </span>
                            )}
                          </td>

                          <td className="whitespace-nowrap text-sm text-gray-600">
                            <span>{product.readingTime.split(" ")[1].slice(0, 8)}</span>
                            <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
                            <span>{product.readingTime.split(" ")[0]}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={`no-product`} className="text-center">
                        <td colSpan={5} className="p-4 bg-rose-100/50 text-rose-800">
                          No products matching your input!
                        </td>
                      </tr>
                    )}
                  </tbody>
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
                    {sensorFailure.found ? (
                      sensorFailure.data.map((sensor, sensorIdx) => (
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
                      ))
                    ) : (
                      <tr key={`no-failure`} className="text-center">
                        <td colSpan={6} className="p-4 bg-rose-100/50 text-rose-800">
                          No products matching your input!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </Tab>
    </Tabs>
  )
}
