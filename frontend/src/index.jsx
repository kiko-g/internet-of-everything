import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./pages/App"
import Emulator from "./pages/Emulator"
import reportWebVitals from "./test/reportWebVitals"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import About from "./pages/About"

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/emulator" element={<Emulator />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
