import React, { useEffect, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { PlusCircleIcon, DocumentReportIcon } from "@heroicons/react/solid"
import PresetsModal from "./utilities/PresetsModal"

export default function Presets({ factoryInitialState, presetsState }) {
  const [uploaded, setUploaded] = useState({ name: "", size: "" })
  const [presets, setPresets] = presetsState
  const [selected, setSelected] = factoryInitialState

  useEffect(() => {}, [presets])

  return (
    <div className="bg-slate-100 p-4 rounded-xl">
      <div className="w-full mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {presets.map((factory, index) => {
              let sensorAmount = 0
              let startMachineID = ""
              factory.forEach((machine) => {
                sensorAmount += machine.sensors.length
                if (machine.prevMachineID === "null") startMachineID = machine.id
              })

              return (
                <RadioGroup.Option
                  key={`option-factory-${index}`}
                  value={factory}
                  className={({ active, checked }) =>
                    `${active ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60" : ""}
                ${
                  checked ? "bg-sky-900/75 text-white" : "bg-white"
                } relative rounded-xl shadow-md px-3 py-2 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label as="p" className={`font-medium  ${checked ? "text-white" : "text-gray-700"}`}>
                              {`Factory ${index}`}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline text-xs ${checked ? "text-sky-100" : "text-gray-500"}`}
                            >
                              <span>{`${factory.length} machine${factory.length === 1 ? ` ` : `s`}`}</span>
                              <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
                              <span>{`${sensorAmount} sensors`}</span>
                              <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
                              <span>{`Start id: ${startMachineID}`}</span>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-white">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              )
            })}
          </div>
        </RadioGroup>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <PresetsModal />
        <form className="flex items-center space-x-6" title="Upload your JSON preset">
          <label
            htmlFor="presetUpload"
            className="px-3 py-2 text-sm font-medium rounded-xl
            text-white bg-slate-700/30 hover:bg-slate-700/40
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Add preset&nbsp;
            <PlusCircleIcon className="w-4 h-4 mb-0.5 inline-flex" />
          </label>
          <input
            type="file"
            accept=".json"
            id="presetUpload"
            name="presetUpload"
            className="sr-only"
            onChange={(e) => {
              const handleChangeFile = (file) => {
                let fileData = new FileReader()
                fileData.readAsText(file)
                fileData.onloadend = (e) => setPresets([...presets, JSON.parse(e.target.result)])
              }

              let file = e.target.files[0]
              handleChangeFile(file)

              setUploaded({
                name: e.target.files[0].name,
                size: Number(parseFloat(e.target.files[0].size / 1000.0).toFixed(1)) + "KB",
              })
            }}
          />
        </form>
      </div>

      <div className="mt-1 flex items-end justify-end">
        <div className="flex text-xs text-slate-500">
          {uploaded.name !== "" ? (
            <>
              {uploaded.name} ({uploaded.size})&nbsp;
              <DocumentReportIcon className="h-4 w-4" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
