import React, { useEffect, useState } from "react"
import Tabs from "../utilities/Tabs"
import EmulatorGraph from "./EmulatorGraph"
import { options } from "../../utils"
import { factories } from "../../data"

export default function EmulatorRepresentation() {
  const factory = factories[0] // json array in data/index.js
  const [detailed, setDetailed] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [displayType, setDisplayType] = useState(options[0])

  useEffect(() => {}, [displayType])

  const Tab = (props) => <>{props.children}</>

  return (
    <Tabs activeIndex={0}>
      {/* Graph schema */}
      <Tab label="Graph">
        <EmulatorGraph />
      </Tab>

      {/* Detailed list view */}
      <Tab label="Production">
        TODO
      </Tab>
    </Tabs>
  )
}
