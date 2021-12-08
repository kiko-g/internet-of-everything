import React from "react"
import Collapsed from "./utilities/Collapsed"

export default function Settings() {
  return (
    <div className="bg-bluegray-100 p-4 rounded-lg w-full space-y-4 mx-auto">
      <Collapsed color="bluegray" headline="Setting A">
        Settings
      </Collapsed>
      <Collapsed color="bluegray" headline="Setting B">
        Settings
      </Collapsed>
      <div className="grid grid-cols-2 space-x-2">
        <Collapsed color="bluegray" headline="Setting C">
          Settings
        </Collapsed>
        <Collapsed color="bluegray" headline="Setting D">
          Settings
        </Collapsed>
      </div>
    </div>
  )
}
