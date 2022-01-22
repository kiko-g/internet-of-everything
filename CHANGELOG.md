# Changelog

# Sprint 4

## Edge

TODO: adicionar descrição

## Emulator

TODO: adicionar descrição

## Simulator

TODO: adicionar descrição

## Chaos Engineering

TODO: adicionar descrição

## Fault Analysis

TODO: adicionar descrição

# Sprint 3

## Edge

- added generated data by some sensors
- that data is sent by MQTT to the topics defined in wiki (`machine/id` and `product/id`)
- defined structure of config file for each machine
- during boot of each machine that config file is sent via MQTT to the topic `startup`
- the config file is parsed in order to create in runtime the necessary java objects to run the machines and the sensors

## Emulator

- parse the config file of each machine and create the necessary objects
- parse the messages received by the machine's sensors

## Simulator

TODO: adicionar descrição

## Chaos Engineering

TODO: adicionar descrição

## Fault Analysis
### Closed PBIs
- As a programmer, I want to update the graph parser, once it was updated, so as to update internally the manufacturing structure.
- As a failure detection vertical, I want to receive sensor updates according to the new format, so that I can correctly interpret the failures. 
- As a User, I want to analyse the variance of the sensor measures so that I can prevent failures.
- As a user, I want to be able to know the production rate of each machine, so that I can detect machines that are producing many defective products.
- As a user, I want to know how many products passed the quality control, so that I can detect if the machines are generating too many defective products. 
- As a User, I want to know if the machine measures are within the expected range, so that I can handle failures. 
- As a User, I want to analyse the values of all the machine sensors, so that I can detect failures with more confidence. 
### Increment
- Add quality state in the product output message and discard defective products - getOutputMessage of the ProductSensor
- Calculate rate of defective products based on the output messages:
  - Defective subprodutcts in each machine
- Add output/input messages to the Wiki
- Add more sensors - Voltage, Vibration, Pressure, Rotation - add failure detection for these sensors
- Update the states to fit the new graph input

## Global Product Increment
- Start integration between Emulator and Fault Analysis

# Sprint 2

## Edge

- make the Edge a MQTT Client

## Mosquitto

- create a MQTT Broker using mosquitto

## Emulator

- make the emulator a MQTT Client
- store information relative to the factory topology

## Simulator

TODO: adicionar descrição

## Chaos Engineering

TODO: adicionar descrição

## Fault Analysis
### Closed PBIs
- As a User I want the product phases to be defined, so that I can have a reference of the production state of my product.
- As a User I want to know the the location(production phase) of each product, so that I can give tracking information to the end user.
- As a User, I want to be able to know the machine graph and visualise it, so that I can locate the products. 
- As a User I want to know when a product enters/leaves a machine, so that the product can be tracked.

### Increment
Add github workflow run
Machine Graph as file
Define the input and output for each machine and define the default values of the machine
Receive messages
Update machine product counter and inputs
Update phase state
Compute number of products in each phase

# Sprint 1

## Edge

- technology setup

## Emulator

- technology setup

## Simulator

TODO: adicionar descrição

## Chaos Engineering

TODO: adicionar descrição

## Fault Analysis
### Closed PBIs
- As a Machine, I want to be able to save all my previous states, so that my data can be analysed. 
- As a Machine, I want to receive my data, so that my state can be updated.
- As a Machine, I want to know if I am overheating, so that I can activate the cooling system.

### Increment
Define an input and output message format to communicate with machines.
