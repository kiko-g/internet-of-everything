import * as React from "react";
import Basic from './input/Basic'
import Button from './partials/Button'

export default function SimulationSetup() {
  return (
    <div className="hidden md:grid md:grid-cols-4 space-x-0 dark:text-gray-50">
      <div className="col-span-3 p-8 pt-4 dark:bg-bluegray-600">
        <div className="grid grid-cols-3 gap-y-4 gap-x-16">
          <Basic label="Amount" />
          <Basic label="Whatever" />
          <Basic label="Something" />
          <Basic label="Something Else" />
          <Basic label="Another one" />
        </div>
      </div>
      <div className="col-span-1 p-3 dark:bg-bluegray-600">
        <Button text="Run" />
      </div>
    </div>
  );
}
