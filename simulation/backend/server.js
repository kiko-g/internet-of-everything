import express from "express";
import pkg from "body-parser";
const { json, urlencoded } = pkg;
import Simulation from "./Simulation.js";

const app = express();
const PORT = process.env.port || 8080;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/startSimulation", (req, res) => {
    //TODO: Receive user input from front end
    let simulation = new Simulation("./factory.json", 30);
    
    let endState = simulation.run();

    res.send(endState);
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
