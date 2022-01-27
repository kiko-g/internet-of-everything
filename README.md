# Internet of Everything

# Setup Instructions
To run our project you need to have `Docker` installed.

After that, run the following command on terminal, under the root:
```bash
docker-compose up -d
```
It is possible to visualize what is happening under localhost:FRONTEND_PORT (default: localhost:3000)

# Modules
## Edge Layer
Simulates the industry floor.

## Emulator and Simulator, the Digital Twin
A virtual representation of the factory that spans its lifecycle and is updated from the edge layer. It also simulates how the factory should work if perfect conditions were met.

## Fault Analysis
It's necessary to analyse every machine output, to guarantee that no error occured or is going to occur in a near future. It also ensures the self healing of the machines.

## Chaos Engineering
Sending non standardized messages to test if the project is resilient to the errors.

# Architeture Overview
![Architeture Overview](https://i.imgur.com/kBvuDSL.png)

