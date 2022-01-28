# Changelog
# Sprint 4
## Edge and Emulator
#### Closed PBIs
- Track Products around the Factory.
  - Effort: 258
- Develop a dashboard to see the current state of the factory .
  - Effort: 215
- Generate QR codes readings that make sense.
  - Effort: 172
- Handle action messages received by machines.
  - Effort: 129
- Define route to send data to frontend.
  - Effort: 86
#### Increment
- Helped integration with other verticals.
- Improved emulator server.
- Developed a dashboard to see the factory in real time.
- Machines now print a message when they receive an action message.
#### Sprint Estimated Total Effort: 860

<br/>

## Simulator
#### Closed PBIs
- Have tests and lint in the workflow
  - Effort: 129
- Retrieve live information of the machines from the emulator server
  - Effort: 301
- Backend simulation result improvement 
  - Effort: 258 
- Test batches behaviour 
  - Effort: 215
- Test machine behaviour 
  - Effort: 215
- Test sensors behaviour 
  - Effort: 215
- Retrieve information from sensor failure server.
  - Effort: 172
- Create a unified page to accommodate other verticals work.
  - Effort: 172
- As a user, I want to be able to see the final outcome of a simulation.
  - Effort: 172
- As a user, I want to be able upload my own JSON representation of the factory.
  - Effort: 172
- Fault Analysis Representation
  - Effort: 129   
- As a user, I want to see the representation of the sensors in each machine.
  - Effort: 43
#### Increment
- Received and displayed information from the backend allowing integration with other verticals.
- Improved functioning of the simulation
#### Sprint Estimated Total Effort: 2193

<br/>

## Chaos Engineering
#### Closed PBIs
- Refactor: display overvibration needs to work with mqtt.
  - Effort: 43
#### Increment
- Continued introducing more errors and sent them via MQTT.
#### Sprint Estimated Total Effort: 43

<br/>

## Fault Analysis
#### Closed PBIs
- As a Developer, I want to build an API to access product state and possible failures, so that the frontend can display the information.
  - Effort: 258
- As a User, I want to know the current state of a product, so that I can track it during production.
  - Effort: 215
- As a Developer, I want to build a database to allow an efficient access to the state of a product, so that vertical 2 can display it in the front-end. #211
  - Effort: 215
- As a User, I want to handle malformed errors in JSON in order to have a secure way of detecting failures.
  - Effort: 86
- As a Developer, I want to send the failure output messages to Vertical 1, so that they can perform an action in the production line. #207
  - Effort: 86
### Increment
- Concluded the integration with other verticals by sending messages as http request to the server and helping API implementation.
- Added unity tests to automatically check if the code is working as expected.
#### Sprint Estimated Total Effort: 860

<br/>

## Global Product Increment
- Intregration between emulator and fault analysis allowing data to be correctly sent from the backend to the frontend and displayed accordingly.
- Created a dashboard to see he current state of the factory.
- Develpoment of a MVP (Minimum Viable Product).
#### Global Sprint Estimated Total Effort: 3956
---

# Sprint 3
## Edge and Emulator
#### Closed PBIs
- Implement a server to process data that comes fom the edge layer.
  - Effort: 172
- Define a machine configuration file and the respective parser.
  - Effort: 86
- Create object to represent each sensor.
  - Effort: 86
- Implement an object emulating a working machine.
  - Effort: 86
- Generate sensor data.
  - Effort: 86
- Implement an object that emulates the state of a raw material.
  - Effort: 43
- Send a machine's configuration file to the server once the machine and the server are first connected.
  - Effort: 43
- Implement an MQTT Client on server.
  - Effort: 43
#### Increment
##### Edge
- Added generated data by some sensors.
- That data is sent by MQTT to the topics defined in wiki (`machine/id` and `product/id`).
- Defined structure of config file for each machine.
- During boot of each machine that config file is sent via MQTT to the topic `startup`.
- The config file is parsed in order to create in runtime the necessary java objects to run the machines and the sensors.
##### Emulator
- Parse the config file of each machine and create the necessary objects.
- Parse the messages received by the machine's sensors.
#### Sprint Estimated Total Effort: 645

<br/>

## Simulator
#### Closed PBIs
- Readjust JSON Parser for new input.
  - Effort: 301
- Simulate sensors behaviour.
  - Effort: 258
- Adjust factory representation in simulation UI.
  - Effort: 215
- Create sensor abstraction for the machines.
  - Effort: 215
- Generate a final JSON representation of the factory.
  - Effort: 215
- As a user, I want to toggle between the initial and final representation of the machines.
  - Effort: 215
- Create Batch class.
  - Effort: 215
- As a Batch, I want to know in which machine an error occurred when I need to be discarded.
  - Effort: 172
- As a simulator, I want to be able to send the machine's information to the front-end.
  - Effort: 172
- As a Simulator, I want to be able to manage the inputs and outputs of the machines.
  - Effort: 172
- As a Machine, I want to be able to represent my state in JSON.
  - Effort: 172
- As a machine, I want to be able to generate my state based on a normal distribution after each batch.
  - Effort: 172
- Parse Simulation response.
  - Effort: 172
- As a simulator, I have to be able to process the user's input to generate a simulation.
  - Effort: 129
- As a simulator, I have to receive the user's input.
  - Effort: 86
- As a Machine, I want to be able to send batches to other machines.
  - Effort: 86
- As a Machine, I want to be able to receive batches from other machines.
  - Effort: 86
- Readjust machine structure.
  - Effort: 86
- As a Batch, I want to represent my state in JSON.
  - Effort: 86
- Presets radio allow user to change the initial factory configuration.
  - Effort: 86
- Upload a JSON file and it gets registered as a preset.
  - Effort: 86
- New machine properties properly displayed.
  - Effort: 86
- Graph node shows machine properties on click.
  - Effort: 86 
- Simulation graph is rebuilt and properly displayed.
  - Effort: 43
- Factory representation for the simulation follows the new specification.
  - Effort: 43
#### Increment
Complete functioning of the factory simulation, generating sensors values and batches processing.
Functional GUI that allows for upload of a factory configuration and running simulation for any nunber of given batches. 
#### Sprint Estimated Total Effort: 3612

<br/>

## Chaos Engineering
#### Closed PBIs
- As a chaos engineer, i want to test the error handling mechanisms to see if they can correctly identify the errors injected.
  - Effort: 129
- As a chaos engineer, I want to target a specific machine to receive sequential errors. 
  - Effort: 86
- As a chaos engineer, i want to be able to easily select the script to execute from a command.
  - Effort: 86
### Increment 
- Beginning integration with other verticals to tests.
- Simple CLI to select types of errors to simulate.
### Sprint Estimated Total Effort: 301

<br/>

## Fault Analysis
#### Closed PBIs
- As a User, I want to analyse the values of all the machine sensors, so that I can detect failures with more confidence.
  - Effort: 258
- As a User, I want to analyse the variance of the sensor measures so that I can prevent failures.
  - Effort: 172
- As a user, I want to know how many products passed the quality control, so that I can detect if the machines are generating too many defective products.
  - Effort: 172
- As a programmer, I want to update the graph parser, once it was updated, so as to update internally the manufacturing structure.
  - Effort: 129
- As a failure detection vertical, I want to receive sensor updates according to the new format, so that I can correctly interpret the failures. 
  - Effort: 129
- As a user, I want to be able to know the production rate of each machine, so that I can detect machines that are producing many defective products.
  - Effort: 129
- As a User, I want to know if the machine measures are within the expected range, so that I can handle failures.
  - Effort: 129
#### Increment
- Add quality state in the product output message and discard defective products - getOutputMessage of the ProductSensor.
- Calculate rate of defective products based on the output messages:
  - Defective subprodutcts in each machine.
- Add output/input messages to the Wiki.
- Add more sensors - Voltage, Vibration, Pressure, Rotation - add failure detection for these sensors.
- Update the states to fit the new graph input.
#### Sprint Estimated Total Effort: 1118

<br/>

## Global Product Increment
- Start integration between Emulator and Fault Analysis.
#### Global Sprint Estimated Total Effort: 5719
---

# Sprint 2
## Edge and Emulator
#### Closed PBIs
- Implement a server that knows the topology of the factory (machine's nodes graph).
  - Effort: 129
- Implement an MQTT Client on Edge layer.
  - Effort: 43 
- Make an MQTT broker to allow communication between edge and server layers.
  - Effort: 43
#### Edge Increment
- Make the Edge an MQTT Client.
#### Mosquitto Increment
- Create an MQTT Broker using mosquitto.
#### Emulator Increment
- Make the emulator is a MQTT Client.
- Store information relative to the factory topology.
#### Sprint Estimated Total Effort: 215

<br/>

## Simulator
#### Closed PBIs
- As a user, I want to be able to see the layout of the factory floor.
  - Effort: 215
- As a Simulator, I want to be able to read the representation of the factory floor from a JSON file.
  - Effort: 172
- Machines show their input, output and links.
  - Effort: 86
- Factory has an interactive graph representation.
  - Effort: 86
- As a user, I want to be able to change variables in a UI.
  - Effort: 43
- As a user, I want to see the actual state of each machine before the simulation.
  - Effort: 43
### Increment
Parse the fatory JSON and create a simulation representation based on it.
#### Sprint Estimated Total Effort: 645

<br/>

## Chaos Engineering
#### Closed PBIs
- As a chaos engineer, I want to modify the data format to check if the system can handle it.
  - Effort: 86 
- As a chaos engineer, I want to cause a machine to display overheating to see if the system can detect it and react to it properly.
  - Effort: 86
- As a chaos engineer, i want to have a simple endpoint server to view my error injections.
  - Effort: 86 
- As a chaos engineer, i want to overload the system with messages, to simulate a Ddos attack.
  - Effort: 86 
- As a chaos engineer, I want to create new fake machine data readings to see if the system can detect them.
  - Effort: 86 
- As a chaos engineer, I want to cause a machine to display over-vibration to see if the system can detect it and react to it properly.
  - Effort: 43
- As a chaos engineer, I want to cause a machine to display over-pressure to see if the system can detect it and react to it properly.
  - Effort: 43 
- As a chaos engineer, I want cause a machine to display negative values where it doesn't make sense (ex.: vibration) to see if the system can react to it properly.
  - Effort: 43
- V4 feature /python-github-actions.
  - Effort: 43 
#### Increment
- Setup of github workflow run.
- Creation of scripts simulating various errors in json used in the communication.
- Improvements in the mock server and endpoints structure.
#### Sprint Estimated Total Effort: 602

<br/>

## Fault Analysis
#### Closed PBIs
- As a User, I want to be able to know the machine graph and visualise it, so that I can locate the products.
  - Effort: 258
- As a User I want to know the the location(production phase) of each product, so that I can give tracking information to the end user.
  - Effort: 215
- As a User I want the product phases to be defined, so that I can have a reference of the production state of my product.
  - Effort: 129
- As a User I want to know when a product enters/leaves a machine, so that the product can be tracked.
  - Effort: 86
- Define Github Actions in Java.
  - Effort: 43
#### Increment
- Add github workflow run.
- Machine Graph as file.
- Define the input and output for each machine and define the default values of the machine.
- Receive messages.
- Update machine product counter and inputs.
- Update phase state.
- Compute number of products in each phase.
#### Sprint Estimated Total Effort: 731

<br/>

## Global Product Increment
- Started deeply implementing each vertical seperately.
#### Global Sprint Estimated Total Effort: 2193
---

# Sprint 1
## Edge and Emulator
#### Closed PBIs
- Technology Setup.
  - Effort: 43
#### Increment
##### Edge Increment
- Java project setup.
- MQTT (Mosquitto) setup for communication .
##### Emulator Increment
- Technology setup
#### Sprint Estimated Total Effort: 43

<br/>

## Simulator
### Closed PBIs
- As a simulator, I want to be able to instantiate machines.
  - Effort: 86
- As a simulator, I want to be able to create a representation of the factory floor.
  - Effort: 86
- As a simulator, I want to loop through the machines and update them.
  - Effort: 86
- As a user, I want to have a clear-cut and complete UI so that I can have control over the simulation.
  - Effort: 86
- As a user, I want to be able to see representations of the machines.
  - Effort: 43
- As a user, I want to have a button to be able to start a simulation.
  - Effort: 43
#### Increment
- Create a base structure of the factory and a base simulation.
#### Sprint Estimated Total Effort: 430

<br/>

## Chaos Engineering
#### Closed PBIs
- As a chaos engineer, I want to send incoherent data to check if the system is capable of handling it.
  - Effort: 43
- As a chaos engineer, I want to delete a machine's data reading to see how the systems reacts.
  - Effort: 43
#### Increment
- Setup of mock server and endpoints representing the factory.
#### Sprint Estimated Total Effort: 86

<br/>

## Fault Analysis
#### Closed PBIs
- As a Machine, I want to know if I am overheating, so that I can activate the cooling system.
  - Effort: 129
- As a Machine, I want to be able to save all my previous states, so that my data can be analysed.
  - Effort: 86
- As a Machine, I want to receive my data, so that my state can be updated.
  - Effort: 86
- Define an input and output message format to communicate with machines.
  - Effort: 43 
#### Increment
- Define an input and output message format to communicate with machines.
- Receive and store data.
#### Sprint Estimated Total Effort: 344

<br/>

## Global Product Increment
- Start the development of the project, with the tools selected in Sprint 0.
#### Global Sprint Estimated Total Effort: 903

---
## Sprint 0
Initalizing the project, by deciding the tools to be used.
- Use of Java for different verticals.
- Use of MQTT for communication between machines.
- Use of React as the interface tool.
- Use of JSON to swap information between machines and verticals.
- Use of docker to aggregate components.

Also, the project was splitted in 4 verticals: Emulator and Edge Layer, Simulator, Fault Analysis and Chaos Engineering.
