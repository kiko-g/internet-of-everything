import * as React from "react"
import Header from "../components/Header"
import Setup from "../components/Setup"
import Representation from "../components/Representation"

export default function App() {
  return (
    <div className="homepage min-h-screen bg-coolgray-300 dark:bg-bluegray-700 font-inter">
      <Header siteTitle="Simulation" />
      <div className="min-h-adjusted mx-auto p-6">
        <div className="grid grid-cols-4 space-x-8">
          <div className="col-span-4 sm:col-span-1">
            <Setup />
          </div>
          <div className="col-span-4 sm:col-span-3">
            <Representation />
          </div>
        </div>
      </div>
    </div>
  )
}
