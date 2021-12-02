import * as React from "react";
import Header from "./Header";

export default function App() {
  return (
    <div className="min-h-screen bg-bluegray-200 dark:bg-bluegray-600">
      <Header siteTitle="Simulation" />
      <div className="min-h-adjusted w-4/5 m-auto my-2 overflow-hidden">
      </div>
    </div>
  );
}
