import express from "express";
import pkg from "body-parser";
const { json, urlencoded } = pkg;
import Simulation from "./Simulation.js";

const app = express();
const PORT = 8080;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/startSimulation", (req, res) => {
    let simulation = new Simulation("./factory.json", 30);
    let simu = simulation.run();
    //console.log(simu);
    res.send(simu);
});

app.listen(PORT, () => console.log("Servidor a executar na porta 8080..."));
