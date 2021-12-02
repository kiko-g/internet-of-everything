import * as React from "react";
import Basic from './input/Basic'

export default function SimulationSetup() {
  return (
    <div className="grid grid-cols-4 space-x-0 dark:text-gray-50">
      <div className="col-span-3 p-8 pt-4 bg-bluegray-300 dark:bg-bluegray-600">
        <div className="grid grid-cols-3 gap-y-4 gap-x-16">
          <Basic label="Amount" />
          <Basic />
          <Basic />
          <Basic />
          <Basic />
          <Basic />
        </div>
      </div>
      <div className="col-span-1 p-3 bg-bluegray-400 dark:bg-bluegray-700">
        Run section
      </div>
    </div>
  );
}
