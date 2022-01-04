import React from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Representation from "../components/Representation"

export default function App() {
  return (
    <div className="homepage min-h-screen bg-slate-200 dark:bg-slate-500 font-sans font-medium">
      <Header siteTitle="Simulation" />
      <div className="min-h-adjusted mx-auto p-6">
        <div className="grid grid-cols-12 space-x-0 space-y-8 xl:space-x-8 xl:space-y-0">
          <div className="col-span-12 xl:col-span-3">
            <Sidebar />
          </div>
          <div className="col-span-12 xl:col-span-9 m-0">
            <Representation />
          </div>
        </div>
      </div>
    </div>
  )
}
