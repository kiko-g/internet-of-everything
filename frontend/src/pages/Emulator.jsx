import React, { useEffect } from "react"
import Header from "../components/Header"
import EmulatorRepresentation from "../components/emulator/EmulatorRepresentation"

export default function Emulator() {
  useEffect(() => {
    document.title = "IOE | Emulator"
  }, [])

  return (
    <div className="homepage min-h-screen bg-slate-200 dark:bg-slate-600 font-sans font-medium">
      <Header currentLocation="Emulator" />
      <div className="min-h-adjusted mx-auto p-6">
        <div className="grid grid-cols-12 space-x-0 space-y-8 xl:space-x-8 xl:space-y-0">
          <div className="col-span-12 xl:col-span-12 m-0">
            <EmulatorRepresentation />
          </div>
        </div>
      </div>
    </div>
  )
}
