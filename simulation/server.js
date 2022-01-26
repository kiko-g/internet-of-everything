import express from "express"
import pkg from "body-parser"
const { json, urlencoded } = pkg
import Simulation from "./Simulation.js"

// Initialize Express EndPoint
const app = express()
const PORT = process.env.port || 8080

app.use(json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})
app.use(urlencoded({ extended: true }))

// Function that the front end will call
app.post("/run", (req, res) => {
  // Front end send the factory JSON in the request body
  let userJson = req.body.settings
  // check if the JSON is done has expected
  if (
    userJson.batches == undefined ||
    userJson.startMachineID == undefined ||
    userJson.machines == undefined
    ) {
    res.status(400).send("Missing attributes on JSON.")
  } else {
    // Run the Simulation
    let simulation = new Simulation(userJson)
    let endState = simulation.run()

    // Send the JSON representation of the final factory state
    res.status(200).send(endState)
  }
})

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
