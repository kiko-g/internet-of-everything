import * as React from "react";
import Header from "./Header";
import Representation from "./Representation";
import SimulationSetup from "./SimulationSetup";

export default function App() {
  return (
    <div className="min-h-screen bg-bluegray-200 dark:bg-bluegray-600">
      <Header siteTitle="Simulation" />
      <div className="min-h-adjusted mx-auto">
        <SimulationSetup />
        <div className="mx-10 border-t-4 border-bluegray-600 opacity-80"></div>
        <Representation />
      </div>
    </div>
  );
}
