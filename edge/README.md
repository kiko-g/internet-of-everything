# Edge 
## How to run (with docker): 
1. Run docker compose on detached mode.
```
    sudo docker-compose build 
    sudo docker-compose up -d
```
2. To get the log prints from publisher
```
    sudo docker logs publisher --follow
``` 
3. To get the log prints from the listner (edge layer)
```
    sudo docker logs listener
```
4. To stop the project. 
```
    sudo docker-compose stop
```

## How to run (without docker):

1. Install Mosquitto MQTT Broker *(default port is 1883)*
```
    > sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
    > sudo apt-get update
    > sudo apt-get install mosquitto
    > sudo apt-get install mosquitto-clients
    > sudo apt clean
    > sudo service mosquitto <start|stop> 
```
2. > gradle build
3. Start the **Machine Listener**
    > gradle runMachineListener
4. Open a new terminal and start the **Temperature Sensor**
    > gradle runTemperatureSensor