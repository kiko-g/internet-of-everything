import * as React from "react"
import Header from "../components/Header"
import Configuration from "../components/Configuration"
import Representation from "../components/Representation"

export default function App() {
  return (
    <div className="homepage min-h-screen bg-slate-200 dark:bg-slate-500 font-sans font-medium">
      <Header siteTitle="Simulation" />
      <div className="min-h-adjusted mx-auto p-6">
        <div className="grid grid-cols-12 space-x-0 space-y-8 lg:space-x-8 lg:space-y-0">
          <div className="col-span-12 lg:col-span-3">
            <Configuration />
          </div>
          <div className="col-span-12 lg:col-span-9 m-0">
            <Representation />
          </div>
        </div>
      </div>
    </div>
  )
}
