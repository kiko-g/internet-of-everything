import express from "express";
import pkg from "body-parser";
const { json, urlencoded } = pkg;
import Simulation from "./Simulation.js";

const app = express();
const PORT = process.env.port || 8080;

app.use(json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(urlencoded({ extended: true }));

app.post("/startSimulation", (req, res) => {
    //let machineID = req.body.machineID;
    let piecesQty = req.body.piecesQty;

    if (isNaN(piecesQty))
        res.status(400).send("A quantidade de peças tem de ser um número.");
    /* else if (isNaN(machineID))
        res.status(400).send("A ID da máquina tem de ser um número."); */ else {
        //TODO: Receive user input from front end
        let simulation = new Simulation("./factory.json", piecesQty);

        let endState = simulation.run();

        res.send(endState);
    }
});

app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);
