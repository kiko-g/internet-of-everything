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

TODO: adicionar descrição

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

TODO: adicionar descrição

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

TODO: adicionar descrição