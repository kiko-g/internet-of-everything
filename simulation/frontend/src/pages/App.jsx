import React, { useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Representation from "../components/Representation"
import { factories } from "../data"

export default function App() {
  const [presets, setPresets] = useState(factories)
  const [factoryInitial, setFactoryInitial] = useState(factories[0])
  const [factoryFinal, setFactoryFinal] = useState([])

  return (
    <div className="homepage min-h-screen bg-slate-200 dark:bg-slate-500 font-sans font-medium">
      <Header siteTitle="Simulation" />
      <div className="min-h-adjusted mx-auto p-6">
        <div className="grid grid-cols-12 space-x-0 space-y-8 xl:space-x-8 xl:space-y-0">
          <div className="col-span-12 xl:col-span-3">
            <Sidebar
              factoryInitialState={[factoryInitial, setFactoryInitial]}
              factoryFinalState={[factoryFinal, setFactoryFinal]}
              presetsState={[presets, setPresets]}
            />
          </div>
          <div className="col-span-12 xl:col-span-9 m-0">
            <Representation
              factoryInitialState={[factoryInitial, setFactoryInitial]}
              factoryFinalState={[factoryFinal, setFactoryFinal]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
