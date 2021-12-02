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
        <Representation />
      </div>
    </div>
  );
}
