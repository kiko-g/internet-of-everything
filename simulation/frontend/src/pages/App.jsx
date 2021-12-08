import * as React from "react"
import Header from "../components/Header"
import Configuration from "../components/Configuration"
import Representation from "../components/Representation"

export default function App() {
  return (
    <div className="homepage min-h-screen bg-bluegray-200 dark:bg-coolgray-400 font-inter">
      <Header siteTitle="Simulation" />
      <div className="min-h-adjusted mx-auto p-6">
        <div className="grid grid-cols-12 space-x-0 space-y-8 md:space-x-8 md:space-y-0">
          <div className="col-span-12 sm:col-span-3">
            <Configuration />
          </div>
          <div className="col-span-12 sm:col-span-9 m-0">
            <Representation />
          </div>
        </div>
      </div>
    </div>
  )
}
